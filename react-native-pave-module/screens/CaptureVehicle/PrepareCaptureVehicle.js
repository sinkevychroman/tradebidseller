import {func} from 'prop-types';
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
  ScrollView,
} from 'react-native';

import useScreenDimensions from '../../hook/UseScreenDimensions';

import {getTutorial, CAGES} from '../../model/cage';

import SessionUploadManager from '../../model/SessionUpload';

import GuideRotateView from '../../component/ui/guideRotateView/GuideRotateView';

import RejectedMessageView from './RejectedMessageView';
import {Logger} from '../../utils/AppLogger';

const PrepareCaptureVehicle = (props) => {
  const screenData = useScreenDimensions();

  const {cage, callbackTimeOut, sessionID} = props;

  const [counter, setCounter] = useState(5);

  function _onClickNextButton() {
    props.callbackTimeOut();
  }

  if (cage.name === CAGES.VIN.name) {
    props.callbackTimeOut();
  }
  useEffect(() => {
    let myInterval;
    if (cage.rejected) {
      Logger('message rejected', cage.message);
      if (cage.name === CAGES.ODOMETER.name) {
        props.callbackTimeOut();
      }
    } else {
      myInterval = setInterval(() => {
        if (counter > 0) {
          setCounter(counter - 1);
        }
        if (counter === 0) {
          clearInterval(myInterval);
          props.callbackTimeOut();
        }
      }, 1000);
    }

    return () => {
      if (myInterval) {
        clearInterval(myInterval);
      }
    };
  });

  const styles = StyleSheet.create({
    counter: {
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: '#30C686',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 1,
      position: 'absolute',
      right: screenData.isLandscape ? 150 : 10,
    },
    nextButton: {
      height: 50,
      width: 100,
      borderRadius: 25,
      backgroundColor: '#30C686',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (screenData.isLandscape) {
    if (cage.rejected) {
      return (
        <RejectedMessageView
          title={cage.name}
          message={cage.message}
          onRetakePhoto={props.callbackTimeOut}></RejectedMessageView>
      );
    }
    return (
      <View style={{height: screenData.height, width: screenData.width}}>
        <View
          style={{
            height: screenData.height,
            width: screenData.width,
            backgroundColor: 'black',
            // opacity: 0.9,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 28,
              fontWeight: '500',
              marginTop: 15,
            }}>
            Coming up next
          </Text>
          <Image
            style={{
              height: screenData.isLandscape ? screenData.height - 200 : 300,
              width: 300,
              resizeMode: 'contain',
              marginTop: 5,
            }}
            source={props?.cage?.source}></Image>
          <View
            style={{
              width: screenData.width - 50,
              marginTop: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: '400',
                marginRight: 100,
                marginLeft: 44,
                marginBottom: 12,
                textAlign: 'center',
              }}>
              {getTutorial(props.cage)}
            </Text>
          </View>
          <TouchableOpacity onPress={_onClickNextButton}>
            <View style={styles.nextButton}>
              <Text style={{color: 'white'}}>NEXT</Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              position: 'absolute',
              right: 44,
              height: screenData.height - 20,
            }}>
            <_getPhotoBarView
              style={{
                width: 200,
                right: 100,
              }}
              sessionID={sessionID}
            />
          </View>
          <View style={styles.counter}>
            <Text style={{color: 'white'}}>{counter}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return <GuideRotateView />;
  }
};

function _getPhotoBarView(props) {
  const {sessionID} = props;
  const sessionUpload = SessionUploadManager.getInstance().getSessionUpload(
    sessionID,
  );

  return (
    <ScrollView
      style={{
        backgroundColor: 'black',
      }}>
      {[...sessionUpload.listCage].map((cage, index) => {
        const uploader = sessionUpload.listPhotoUploads.get(cage.id);

        return (
          <View
            key={index}
            style={{
              borderColor: 'white',
              borderWidth: 0.5,
              padding: 5,
              margin: 5,
              borderRadius: 5,
            }}>
            <Image
              style={{
                width: 70,
                height: 40,
                resizeMode: 'contain',
              }}
              source={
                uploader ? {uri: uploader.status.photoUri} : cage.source
              }></Image>
          </View>
        );
      })}
    </ScrollView>
  );
}

export default PrepareCaptureVehicle;
