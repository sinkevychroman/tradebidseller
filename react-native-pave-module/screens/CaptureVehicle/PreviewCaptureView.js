import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Modal,
  NativeModules,
} from 'react-native';
import PropTypes from 'prop-types';
import useScreenDimensions from '../../hook/UseScreenDimensions';

import EventBus from '../../model/EventBus';

import SessionUploadManager from '../../model/SessionUpload';
import {Logger} from '../../utils/AppLogger';
import {colors} from '../../styles/base';
const {PaveModule} = NativeModules;

const PreviewCaptureView = (props) => {
  const screenData = useScreenDimensions();
  const {sessionId, cage, counterTime, visibleModal} = props;
  const [counter, setCounter] = useState(5);

  const [isCancelled, setIsCancelled] = useState(false);

  const styles = StyleSheet.create({
    counter: {
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 1,
      position: 'absolute',
      right: screenData.isLandscape ? 100 : 10,
    },
  });

  // const taskCountDown = () => {
  //   if (counter > 0) {
  //     setCounter(counter - 1);
  //   }
  //   if (counter === 0) {
  //     stopIntervalCountDown();
  //     _acceptPictureButtonClick();
  //   }
  // };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
      // setCounter(5);
    };
  });

  if (counter === 0 && !isCancelled) {
    // clearInterval(myInterval);
    _acceptPictureButtonClick();
    Logger('_acceptPictureButtonClick');
  }

  // const handler = () => {
  //   Logger('handler run', counter);
  //   if (counter > 0) {
  //     setCounter(counter - 1);
  //   }
  //   if (counter === 0 && !isCancelled) {
  //     // clearInterval(myInterval);
  //     _acceptPictureButtonClick();
  //   }
  // };

  // const stopIntervalCountDown = useInterval(handler, 1000);

  let buttonSize = 60;

  function _acceptPictureButtonClick() {
    props.callBackFinishCapture();
    props.setVisibleModal(!props.visibleModal);

    Logger('TrackEvent', sessionId, {
      APPROVE_PHOTO: `${cage.id}`,
    });

    const sessionUpload = SessionUploadManager.getInstance().getSessionUpload(
      sessionId,
    );

    Logger(props.photoData.uri);

    sessionUpload.setPhotoUploadStatus({
      sessionID: sessionId,
      cageID: cage.id,
      status: {
        isSuccess: false,
        isUploading: true,
        photoUri: props.photoData.uri,
      },
    });

    EventBus.getInstance().fireEvent('SESSION_UPLOAD_PHOTO', sessionUpload);

    PaveModule.uploadPhoto(
      props.sessionId,
      `${props.cage.id}`,
      props.photoData.uri,
      (res, err) => {
        if (err) {
          Logger('PaveModule UploadPhoto fail');
          Logger('TrackEvent', sessionId, {
            UPLOAD_FAIL: `${cage.id}`,
          });

          sessionUpload.setPhotoUploadStatus({
            sessionID: sessionId,
            cageID: cage.id,
            status: {
              isSuccess: false,
              isUploading: false,
              photoUri: props.photoData.uri,
            },
          });
          EventBus.getInstance().fireEvent(
            'SESSION_UPLOAD_PHOTO',
            sessionUpload,
          );
        } else {
          Logger(
            'PaveModule UploadPhoto successful ' +
              `${props.sessionId} # ${props.cage.id}`,
            props.cage.name,
          );
          Logger('TrackEvent', sessionId, {
            UPLOAD_DONE: `${cage.id}`,
          });

          sessionUpload.setPhotoUploadStatus({
            sessionID: sessionId,
            cageID: cage.id,
            status: {
              isSuccess: true,
              isUploading: false,
              photoUri: props.photoData.uri,
            },
          });
          EventBus.getInstance().fireEvent(
            'SESSION_UPLOAD_PHOTO',
            sessionUpload,
          );
        }
      },
    );
  }

  function _onCancelButtonClick() {
    props.setVisibleModal(!props.visibleModal);
    setIsCancelled(true);
    setCounter(counterTime);
    // stopIntervalCountDown();
    // clearInterval(myInterval);
    // stopIntervalCountDown();
  }

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType="slide"
      transparent={false}
      visible={props.visibleModal}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
      }}>
      <View
        style={{
          height: screenData.height,
          width: screenData.width,
        }}>
        <View>
          <Image
            style={{
              height: screenData.height,
              width: screenData.width,
              resizeMode: 'contain',
            }}
            source={{uri: props.photoData.uri, isStatic: true}}
          />

          <View
            style={{
              flexDirection: 'column',
              position: 'absolute',
              right: 40,
              justifyContent: 'center',
              height: screenData.height,
            }}>
            <TouchableOpacity onPress={_onCancelButtonClick}>
              <View
                style={{
                  height: buttonSize,
                  width: buttonSize,
                  borderRadius: buttonSize / 2,
                  borderWidth: 2,
                  borderColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#3F2039',
                }}>
                <Image
                  style={{
                    height: buttonSize - 20,
                    width: buttonSize - 20,
                    tintColor: 'white',
                  }}
                  source={require('../../assets/ic_camera.png')}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={_acceptPictureButtonClick}>
              <View
                style={{
                  height: buttonSize,
                  width: buttonSize,
                  borderRadius: buttonSize / 2,
                  borderWidth: 2,
                  borderColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                  backgroundColor: colors.primary,
                  opacity: 0.8,
                }}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    tintColor: 'white',
                  }}
                  source={require('../../assets/ic_tick.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.counter}>
          <Text style={{color: 'white'}}>{counter}</Text>
        </View>
      </View>
    </Modal>
  );
};

const useInterval = (handler, interval) => {
  const [intervalId, setIntervalId] = useState();
  useEffect(() => {
    const id = setInterval(handler, interval);
    setIntervalId(id);
    return () => clearInterval(id);
  }, []);
  return () => clearInterval(intervalId);
};

export default PreviewCaptureView;
