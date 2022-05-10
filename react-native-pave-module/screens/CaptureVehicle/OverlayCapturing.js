/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import {SvgUri} from 'react-native-svg';

import useScreenDimensions from '../../hook/UseScreenDimensions';

import SelectMethodCaptureVinView from './SelectMethodCaptureVinView';
import {CAGES, getTutorial, getCages} from '../../model/cage';
import ManualInputOdomView from './ManualInputOdomView';
import {Logger} from '../../utils/AppLogger';
import {colors} from '../../styles/base';
import AppButton from '../../component/ui/appButton/AppButton';

const OverlayCapturingView = (props) => {
  const screenData = useScreenDimensions();

  const [isSelectMethodVisible, setSelectMethodVisible] = useState(false);

  const {
    sessionId,
    cage,
    onSuccessOdometerInput = () => {
      Logger('Not Yet Implemented');
    },
    onSuccessVinInputChange = () => {
      Logger('Not Yet Implemented');
    },
  } = props;

  let isDebugging = false;

  const [isCaptured, setIsCaptured] = useState(true);
  const [isInputManualOdomVisible, setInputManualOdomVisible] = useState(false);

  function wait(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  useEffect(() => {
    let timeOutTask = setTimeout(() => {
      setIsCaptured(false);
    }, 2000);

    let delayShowSelectMethodTask = wait(1000).then(() => {
      setSelectMethodVisible(true);
    });

    return () => {
      clearTimeout(delayShowSelectMethodTask);
      clearTimeout(timeOutTask);
    };
  }, [cage]);

  const HeaderView = () => {
    // const screenData = useScreenDimensions();
    var indexCage = -1;

    let lengthCages = getCages().length;

    getCages().forEach((item, index) => {
      if (cage.name === item.name) {
        indexCage = index + 1;
      }
    });

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: isDebugging && 'red',
          width: !screenData.isLandscape
            ? screenData.width - 20
            : screenData.width - 150,
          alignSelf: 'center',
          marginTop: !screenData.isLandscape ? 50 : 0,
        }}>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <Text style={styles.text}>VEHICLE DATA</Text>
          <Text style={styles.text}>{sessionId}</Text>
        </View>

        <Image
          style={{
            height: 50,
            width: 100,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={require('../../assets/logo-white.png')}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            left: 10,
          }}>
          <Text
            style={[
              styles.text,
              {fontWeight: '800', fontSize: 18, alignSelf: 'center'},
            ]}>
            {
              <Text style={{color: colors.primary}}>
                {indexCage < 10 ? `0${indexCage}` : `${indexCage}`}
              </Text>
            }
            {`/${lengthCages}`}
          </Text>
          <Text style={[styles.text, {fontWeight: '500', fontSize: 20}]}>
            {props.cage.name}
          </Text>
        </View>
      </View>
    );
  };

  const FooterView = () => {
    const width = screenData.width - 50;
    return (
      <View
        style={{
          flexDirection: !screenData.isLandscape ? 'column' : 'row',
          justifyContent: 'space-between',
          backgroundColor: isDebugging && 'blue',
          width: width,
          height: !screenData.isLandscape ? 180 : 70,
          alignSelf: 'center',
          alignItems: 'center',
          flex: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            borderRadius: 5,
            backgroundColor: colors.purpleTransparent,

            alignItems: 'center',
            // width: width - 100,
            flex: !screenData.isLandscape ? 5 : 8,
            marginEnd: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              color: 'white',
              padding: 5,
              fontWeight: '400',
            }}>
            {getTutorial(props.cage)}
          </Text>
        </View>

        <AppButton
          label={'CANCEL'}
          backgroundColor={colors.purpleTransparent}
          onPress={props.onPressCancelCapture}
        />
      </View>
    );
  };

  const CaptureButton = () => {
    const height = 30;
    return (
      <TouchableOpacity
        onPress={() => {
          props.onPressCamera();
          setIsCaptured(true);
          setTimeout(() => setIsCaptured(false), 1500);
        }}
        disabled={isCaptured}>
        <View
          style={{
            height: height * 2,
            width: height * 2,
            borderRadius: (height * 2) / 2,
            backgroundColor: colors.greenButton,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: 'white',
          }}>
          <Image
            style={{height: height, width: height}}
            source={require('../../assets/ic_camera.png')}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const ManualInputOdomButton = () => {
    const height = 30;
    return (
      <TouchableOpacity
        onPress={() => {
          setInputManualOdomVisible(true);
        }}>
        <View
          style={{
            height: height * 2,
            width: height * 2,
            borderRadius: (height * 2) / 2,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: height, width: height}}
            source={require('../../assets/ic_keyboard_black.png')}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const ManualInputVinCodeButton = () => {
    const height = 30;
    return (
      <TouchableOpacity
        onPress={() => {
          Logger('click ...');
          setSelectMethodVisible(true);
        }}>
        <View
          style={{
            height: height * 2,
            width: height * 2,
            borderRadius: (height * 2) / 2,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: height, width: height}}
            source={require('../../assets/icon-ellipsis.png')}
          />
        </View>
      </TouchableOpacity>
    );
  };

  var heightCageImage;
  var widthCageImage;

  if (props.cage.name === CAGES.VIN.name) {
    heightCageImage = screenData.isLandscape
      ? screenData.height / 2 + 100
      : screenData.height;
    widthCageImage = screenData.isLandscape
      ? screenData.width / 2 + 100
      : screenData.width;
  } else {
    heightCageImage = screenData.height - 50;
    widthCageImage = screenData.width - 100;
  }

  if (screenData.isLandscape || cage.name === CAGES.VIN.name) {
    return (
      <View>
        {cage.name === CAGES.VIN.name ? (
          <SelectMethodCaptureVinView
            sessionKey={sessionId}
            isVisible={isSelectMethodVisible}
            closeModal={() => {
              setInputManualOdomVisible(false);
            }}
            showMethod={() => {
              setSelectMethodVisible(true);
            }}
            hideMethod={() => {
              setSelectMethodVisible(false);
            }}
            onSuccessVinInputChange={onSuccessVinInputChange}
          />
        ) : null}
        {/* {vinRejected && (
          <InputVinView sessionID={'sessionID'} isVisible={vinRejected} />
        )} */}

        {cage.name === CAGES.ODOMETER.name ? (
          <ManualInputOdomView
            sessionKey={sessionId}
            isVisible={isInputManualOdomVisible}
            closeModal={() => {
              setInputManualOdomVisible(false);
            }}
            onSuccess={() => {
              // TODO: handle success case here
              onSuccessOdometerInput();
            }}
          />
        ) : (
          <View />
        )}
        {/* dynamic Cage */}
        <View
          style={{
            width: screenData.width,
            height: screenData.height,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          {cage.dynamicCage ? (
            <View
              style={{
                height: heightCageImage,
                width: widthCageImage,
              }}>
              <SvgUri width="100%" height="100%" uri={cage.dynamicCage.url} />
            </View>
          ) : (
            cage.name !== CAGES.VIN.name && (
              <Image
                style={{
                  height: heightCageImage,
                  width: widthCageImage,
                  resizeMode: 'contain',
                }}
                source={cage.source}
              />
            )
          )}

          {/* VinCode custom */}
          {cage.name === CAGES.VIN.name
            ? getCageVinCode(screenData.isLandscape)
            : null}

          <View style={{position: 'absolute', top: 10}}>
            <HeaderView cage={cage} />
          </View>

          <View
            style={{
              position: 'absolute',
              right: 50,
            }}>
            {/* {cage.name === CAGES.ODOMETER.name ? (
              <View>
                <ManualInputOdomButton />
                <View style={{height: 14}} />
              </View>
            ) : null} */}

            {cage.name === CAGES.VIN.name ? (
              <View>
                <ManualInputVinCodeButton />
                <View style={{height: 14}} />
              </View>
            ) : null}

            <CaptureButton />
          </View>

          <View style={{position: 'absolute', bottom: 10}}>
            <FooterView cage={props.cage} />
          </View>
        </View>
      </View>
    );
  } else {
    return <View />;
  }
};

const getCageVinCode = (isLandscape) => {
  if (!isLandscape) {
    return (
      <View
        style={{
          flexDirection: 'column',
          height: 150,
          width: 500,
          justifyContent: 'center',
          transform: [{rotate: '90deg'}],
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            alignSelf: 'center',
          }}>
          MAKE SURE YOUR VEHICLE'S VIN IS VISIBLE IN YOUR PHOTO
        </Text>
        <Image
          style={{
            height: '70%',
            width: '90%',
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={CAGES.VIN.source}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: 'column',
          height: 150,
          width: 500,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            alignSelf: 'center',
          }}>
          MAKE SURE YOUR VEHICLE'S VIN IS VISIBLE IN YOUR PHOTO
        </Text>
        <Image
          style={{
            height: '70%',
            width: '90%',
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={CAGES.VIN.source}
        />
      </View>
    );
  }
};

const highlightText = (text) => {
  const style = {
    color: '#27d089',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  };
  const NO_WIDTH_SPACE = '​';

  const highlight = (string) =>
    string.split(' ').map((word, i) => (
      <Text key={i}>
        <Text style={styles.style}>{word} </Text>
        {NO_WIDTH_SPACE}
      </Text>
    ));
  return highlight(text);
};

const styles = StyleSheet.create({
  text: {color: 'white'},
  centeredView: {
    flex: 1,
    margin: 0, // This is the important style you need to set full screen modal
    alignItems: undefined,
    justifyContent: undefined,
  },
  modalView: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    // padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default OverlayCapturingView;
