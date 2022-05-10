/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import ProgressUploadPhotoItem from './ui/ProgressUploadPhotoItem';
import useScreenDimensions from '../../hook/UseScreenDimensions';
import {useEffect, useState} from 'react';

import {getCages, MapCages} from '../../model/cage';
import NativeCall from '../../nativeCall/Native';

import EventBus from '../../model/EventBus';

const ProgressUploadPhotoView = (props) => {
  ProgressUploadPhotoView.propTypes = {
    sessionId: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired,
    callBackUploadDone: PropTypes.func,
  };

  ProgressUploadPhotoView.defaultProps = {
    isVisible: false,
    sessionId: '',
    callBackUploadDone: () => {
      console.log('Not yet implement.');
    },
  };

  const screenData = useScreenDimensions();
  const {sessionId, callBackUploadDone, counterRefresh = 0} = props;

  const [cageUploads, setCageUploads] = useState();

  const styles = StyleSheet.create({
    centeredView: {
      // backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backgroundColor: 'white',
      flex: 1,
      margin: 0, // This is the important style you need to set full screen modal
      alignItems: undefined,
      justifyContent: undefined,
    },
    modalView: {
      backgroundColor: 'white',
      // padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  useEffect(() => {
    var listener = (data) => {
      if (data.isAllDoneUpload) {
        callBackUploadDone();
      }
    };
    EventBus.getInstance().addListener('SESSION_UPLOAD_PHOTO', listener);

    return () => {
      EventBus.getInstance().removeListener(listener);
    };
  }, [cageUploads]);

  useEffect(() => {
    let allCages = getCages();
    setCageUploads(allCages);
  }, []);

  useEffect(() => {
    NativeCall.getInspectionProgress(sessionId)
      .then((res) => {
        return res.photos;
      })
      .then((photos) => {
        const finishedCages = [...photos.finished].map((item) => {
          return MapCages.get(item.nameCage);
        });

        const inspectingCage = [...photos.inspect].map((item) => {
          return MapCages.get(item.nameCage);
        });

        const missingCage = [...photos.missing].map((item) => {
          return item;
        });

        const reject = [...photos.rejected].map((item) => item.nameCage);

        const rejectedMessages = [...photos.rejected];
        return {
          finishedCages: finishedCages.concat(inspectingCage),
          missingCage: missingCage.concat(reject),
          reject: [...reject],
          rejectedMessages: [...rejectedMessages],
        };
      })
      .then((data) => {
        let finishedCages = [...data.finishedCages].map((cage) => {
          return cage.id;
        });

        let allCages = getCages();
        let transfer = allCages.map((item) => {
          if (finishedCages.includes(item.id)) {
            return {...item, uploadDone: true};
          } else {
            return item;
          }
        });
        setCageUploads(transfer);
        if (data.missingCage.length === 0 && data.reject.length === 0) {
          callBackUploadDone();
        }
      });
  }, [counterRefresh]);

  useEffect(() => {
    let interval = setInterval(() => {
      NativeCall.getInspectionProgress(sessionId)
        .then((res) => {
          if (res.passQC) {
            callBackUploadDone();
            return;
          }
          return res.photos;
        })
        .then((photos) => {
          const finishedCages = [...photos.finished].map((item) => {
            return MapCages.get(item.nameCage);
          });
          const inspectingCage = [...photos.inspect].map((item) => {
            return MapCages.get(item.nameCage);
          });
          const missingCage = [...photos.missing].map((item) => {
            return item;
          });
          const reject = [...photos.rejected].map((item) => item.nameCage);
          const rejectedMessages = [...photos.rejected];

          return {
            finishedCages: finishedCages.concat(inspectingCage),
            missingCage: missingCage.concat(reject),
            reject: [...reject],
            rejectedMessages: [...rejectedMessages],
          };
        })
        .then((data) => {
          let finishedCages = [...data.finishedCages].map((cage) => {
            return cage.id;
          });

          let allCages = getCages();
          let transfer = allCages.map((item) => {
            if (finishedCages.includes(item.id)) {
              return {...item, uploadDone: true};
            } else {
              return item;
            }
          });
          setCageUploads(transfer);

          if (data.missingCage.length === 0 && data.reject.length === 0) {
            callBackUploadDone();
            return;
          }
        });
    }, 10 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [cageUploads]);

  const renderItem = ({item}) => {
    return <ProgressUploadPhotoItem sessionId={sessionId} cageObject={item} />;
  };

  return (
    <View style={styles.centeredView}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        {/* <Text
          style={{
            // textShadowOffset: {width: 2, height: 1},
            // textShadowRadius: 2,
            color: colors.text,
            // textShadowColor: colors.primary,
            fontSize: 18,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginHorizontal: 20,
            marginBottom: 20,
          }}>
          PLEASE WAIT AS YOUR IMAGES ARE GETTING TRANSFERRED
        </Text> */}
        {screenData.isLandscape ? (
          <FlatList
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
              position: 'absolute',
              zIndex: 2,
            }}
            key={'_'}
            keyExtractor={(item) => '_' + item.id}
            columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
            contentContainerStyle={{
              justifyContent: 'space-between',
            }}
            numColumns={3} // Landscape
            data={cageUploads}
            renderItem={renderItem}
          />
        ) : (
          <FlatList
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
              position: 'absolute',
              zIndex: 2,
            }}
            columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
            }}
            key={'#'}
            keyExtractor={(item) => '#' + item.id}
            numColumns={2}
            data={cageUploads}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
};

export default ProgressUploadPhotoView;
