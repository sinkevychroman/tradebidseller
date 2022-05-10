import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {getCages} from '../../model/cage';
import PAVESDK from '../../index';
import {GET_PHOTO_STATUS_URL} from '../../constants/index';
import {Logger} from '../../utils/AppLogger';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

// PhotoGridView.propTypes = {
//   launchImageLibrary: PropTypes.func.isRequired,
//   launchCamera: PropTypes.func.isRequired,
//   sessionID: PropTypes.func.isRequired,
// };

// PhotoGridView.defaultProps = {
//   sessionID: '',
//   launchImageLibrary: () => {
//     console.log('Not Yet Implemented');
//   },
//   launchCamera: () => {
//     console.log('Not Yet Implemented');
//   },
// };

function PhotoGridView(props, ref) {
  const [sessionKey, setSessionKey] = useState(props.sessionID);

  let items = getCages().map((v, i) => {
    return {
      id: i,
      src: '',
      cage: v,
      isUploaded: false,
      isUploading: false,
    };
  });

  items = [
    ...items,
    {
      id: items.length,
      src: null,
      cage: {},
      isUploaded: false,
      isUploading: false,
    },
  ]; // include optional cage

  useEffect(() => {
    fetch(GET_PHOTO_STATUS_URL + sessionKey)
      .then((response) => {
        return response.status === 200 ? response.json() : Promise.reject;
      })
      .then((json) => {
        [...json.photos]
          .filter((photo) => photo.approved || photo.reason === 'ACCEPTED')
          .map((photo) => {
            Logger(photo);
            ItemList.forEach((item) => {
              if (item.cage.id === photo.photo_code) {
                item.isUploaded = true;
                item.src = photo.cdn_url;
              }
            });
          });
        setItemList([...ItemList]);
        // console.log(ItemList);
      });
    return () => {};
  }, []);

  const cancelPhoto = (index) => {
    ItemList[index].src = '';
    setItemList([...ItemList]);
  };

  const uploadAllPhoto = () => {
    ItemList.filter((item) => (item.src ? true : false)).forEach((item) => {
      // PAVESDK upload
      const uploadOptions = {
        sessionID: props.sessionID,
        photoCode: item.cage.id.toString(), // String: 02 - 13
        photo: item.src, // file://...
      };

      item.isUploading = true;
      PAVESDK.uploadSessionPhoto(uploadOptions)
        .then((res) => {
          Logger(
            Platform.OS,
            `Upload Photo successful # ${uploadOptions.photoCode} ${item.cage.name}`,
            `${uploadOptions.photo}`,
          );
          item.isUploading = false;
          item.isUploaded = true;
          setItemList([...ItemList]);
        })
        .catch((err) => {
          item.isUploading = false;

          Logger(err);
          setItemList([...ItemList]);
        });
    });
  };

  const shouldShowImage = (item, index) => {
    return (
      <>
        <View style={{marginTop: 10}}>
          {item.src ? (
            <View style={styles.itemViewContainImage}>
              <Image
                style={styles.image}
                source={{uri: item.src, isStatic: true}}
              />
            </View>
          ) : (
            <TouchableOpacity onPress={() => onPressItem(item)}>
              <View style={styles.itemViewContainer}>
                <Image
                  style={
                    item.cage.source
                      ? styles.imageDefault
                      : {height: 30, width: 30}
                  }
                  source={
                    item.cage.source ?? require('../../assets/icon-add.png')
                  }
                />
              </View>
            </TouchableOpacity>
          )}
          {showTitleCage(item)}
        </View>
      </>
    );
  };

  const showTitleCage = (item) => {
    return (
      <TouchableOpacity>
        <View
          style={{
            backgroundColor: '#908198',
            margin: 10,
            height: 30,
            borderRadius: 5,
            justifyContent: 'center',
          }}>
          <Text style={styles.titleImage}>{item.cage.name ?? 'Optional'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const clearAllPhoto = () => {
    ItemList.filter((item) => !item.isUploaded).forEach((item) => {
      item.src = '';
    });

    setItemList([...ItemList]);
  };

  useImperativeHandle(ref, () => ({
    clearAllPhoto,
    uploadAllPhoto,
  }));

  const onPressItem = (item) => {
    props.launchImageLibrary((source) => {
      let itemList = [...ItemList];
      var count = 0;

      itemList.forEach((value) => {
        if (value.id === item.id) {
          value.src = source.uri;
        }
        if (value.src) {
          count++;
          if (count === itemList.length) {
            Logger('Fully loaded');
            itemList = [...itemList, {id: count + 1, src: null}];
          }
        }
      });
      setItemList(itemList);
    });
  };
  const [ItemList, setItemList] = useState(items);

  const shouldShowCancelButton = (item, index) => {
    if (item.src && !(item.isUploaded || item.isUploading)) {
      return (
        <TouchableWithoutFeedback onPress={() => cancelPhoto(index)}>
          <Image
            style={styles.cancelBtn}
            source={require('../../assets/icon-cancel.png')}
          />
        </TouchableWithoutFeedback>
      );
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <View>
          {shouldShowImage(item, index)}
          {shouldShowCancelButton(item, index)}
        </View>
      </>
    );
  };

  return (
    <>
      <FlatList data={ItemList} renderItem={renderItem} numColumns={3} />
    </>
  );
}

export default PaveGirdPhoto = forwardRef(PhotoGridView);

const heightItem = screenWidth / 3;
const widthItem = screenWidth / 3 - 20;

const styles = StyleSheet.create({
  itemViewContainer: {
    height: heightItem,
    width: widthItem,
    backgroundColor: 'white',
    opacity: 0.4,
    margin: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: widthItem,
    height: heightItem,
    borderRadius: 5,

    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
    bottom: 0,
  },
  titleImage: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },

  itemViewContainImage: {
    height: heightItem,
    width: widthItem,
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
  },
  cancelBtn: {
    height: 35,
    width: 35,
    // marginTop: 0,
    marginLeft: widthItem - 10,
    alignItems: 'flex-end',
    position: 'absolute',
  },

  imageDefault: {
    zIndex: 1,
    height: 100,
    width: 100,
    resizeMode: 'contain',
    tintColor: 'black',
  },
});
