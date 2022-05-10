/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import AppButton from '../../component/ui/appButton/AppButton';
import {INPUT_VIN_URL} from '../../constants/index';

import useScreenDimensions from '../../hook/UseScreenDimensions';
import {Logger} from '../../utils/AppLogger';
import {colors} from '../../styles/base';
// var screenWidth = Math.round(Dimensions.get('window').width);
// var screenHeight = Math.round(Dimensions.get('window').height);

const SelectMethodCaptureVinView = (props) => {
  const screenData = useScreenDimensions();

  var screenWidth = screenData.width;
  var screenHeight = screenData.height;

  const [isInputVinVisible, setInputVinVisible] = useState(false);
  const [errorMessageValue, setErrorMessageValue] = useState('');
  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setInputVinVisible(false);
      props.showMethod();
    });
  }, []);
  const ItemSelectMethodCaptureVin = ({icon, label, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            width: 120,
            height: 100,
            backgroundColor: 'rgba(18, 18,18, 1)',
            borderRadius: 5,
            // padding: 10,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignSelf: 'center',
            margin: 12,
            padding: 5,
          }}>
          <Image
            style={{
              height: 50,
              width: 50,
            }}
            source={icon}
          />
          <Text
            style={{
              color: '#9099a8',
              textAlign: 'center',
              fontWeight: 'bold',
              margin: 5,
            }}>
            {label ?? ''}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const InputVinView = () => {
    const [inputVinValue, setInputVinValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    const {
      onSuccessVinInputChange = () => {
        Logger('Not Yet Implemented');
      },
    } = props;

    function callApiInputVin() {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'multipart/form-data');
      myHeaders.append('Accept', 'application/json,text/plain, */*');
      // myHeaders.append(
      //   'API-KEY',
      //   'Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2U3OGI2MDE1NjljNDc5MzIwNmZmYzQiLCJpYXQiOjE1NjcyMTU2Mzd9.HEWpjWAoBekeNuH0VtJTvqJwl4vXuJlF_9J9a6Rrkfo',
      // );

      var formdata = new FormData();
      formdata.append('session_key', props.sessionKey);
      formdata.append('vin', inputVinValue);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      };

      fetch(INPUT_VIN_URL, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          Logger(result);
          var resData = JSON.parse(result);
          if (resData.status === 'Rejected') {
            setErrorMessageValue(resData.message);
          } else {
            setInputVinVisible(false);
            onSuccessVinInputChange();
          }
        })
        .catch((error) => Logger('error', error));
    }

    return (
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType="fade"
        transparent={true}
        visible={isInputVinVisible}
        styles={{
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {height: screenHeight, width: screenWidth},
            ]}>
            <ScrollView
              contentContainerStyle={[
                {height: screenHeight, width: screenWidth, flex: 1},
                styles.modalView,
              ]}>
              <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 50}
                style={{width: '100%', alignItems: 'center'}}>
                <Text style={styles.text}>Please Input the Vehicle's VIN</Text>
                <View
                  style={{
                    height: 50,
                    width: screenWidth * 0.8,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: 120,
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      color: '#000',
                      fontSize: 20,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                    placeholderTextColor="#666"
                    autoCapitalize="characters"
                    placeholder={'ENTER YOUR VIN'}
                    numberOfLines={1}
                    value={inputVinValue}
                    onChangeText={(text) => {
                      setIsValid(text.length === 17 ? true : false);
                      setInputVinValue(text);
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
              {errorMessageValue ? (
                <Text style={{color: 'red', fontSize: 18, marginTop: 15}}>
                  {errorMessageValue}
                </Text>
              ) : (
                <View style={{marginTop: 15}} />
              )}

              <View style={{flexDirection: 'row', marginTop: 15}}>
                <AppButton
                  style={{marginRight: 20}}
                  backgroundColor={colors.purpleTransparent}
                  label={'BACK'}
                  onPress={() => {
                    setInputVinVisible(false);
                    props.showMethod();
                  }}
                />

                <AppButton
                  backgroundColor={
                    isValid ? colors.greenButton : colors.disabledButton
                  }
                  label={'SUBMIT'}
                  onPress={() => {
                    if (isValid) {
                      callApiInputVin();
                    }
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
      <InputVinView onSuccessVinInputChange={props.onSuccessVinInputChange} />
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType="fade"
        transparent={true}
        visible={props.isVisible}
        styles={{
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}>
        <View style={styles.centeredView}>
          <View style={[{height: screenHeight}, styles.modalView]}>
            <Text style={styles.title1}>
              Select the best method to capture the vehicle’s VIN
            </Text>

            <View style={{flexDirection: 'row'}}>
              <ItemSelectMethodCaptureVin
                icon={require('../../assets/ic_input_vin.png')}
                label={'INPUT VIN MANUALLY'}
                onPress={() => {
                  // setSelectMethodVisible(!isSelectMethodVisible);
                  props.hideMethod();
                  setInputVinVisible(true);
                }}
              />
              {/* <ItemSelectMethodCaptureVin
                icon={require('../../assets/ic_scan_qr.png')}
                label={'SCAN QR CODE'}
              />
              <ItemSelectMethodCaptureVin
                icon={require('../../assets/ic_scan_barcode.png')}
                label={'SCAN BARCODE'}
              /> */}
              <ItemSelectMethodCaptureVin
                icon={require('../../assets/ic_capture_vin.png')}
                label={'CAPTURE VIN'}
                onPress={() => {
                  props.hideMethod();
                  // setSelectMethodVisible(!isSelectMethodVisible);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectMethodCaptureVinView;

export const InputVinView = (props) => {
  const [inputVinValue, setInputVinValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const {
    onSuccessVinInputChange = () => {
      Logger('Not Yet Implemented');
    },
    sessionID,
    onBack = () => {},
  } = props;
  const screenData = useScreenDimensions();

  // const [isInputVinVisible, setInputVinVisible] = useState(true);
  const [errorMessageValue, setErrorMessageValue] = useState('');

  var screenWidth = screenData.width;
  var screenHeight = screenData.height;

  function callApiInputVin() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'multipart/form-data');
    myHeaders.append('Accept', 'application/json,text/plain, */*');
    // myHeaders.append(
    //   'API-KEY',
    //   'Beaer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2U3OGI2MDE1NjljNDc5MzIwNmZmYzQiLCJpYXQiOjE1NjcyMTU2Mzd9.HEWpjWAoBekeNuH0VtJTvqJwl4vXuJlF_9J9a6Rrkfo',
    // );

    var formdata = new FormData();
    formdata.append('session_key', sessionID);
    formdata.append('vin', inputVinValue);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(INPUT_VIN_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Logger(result);
        var resData = JSON.parse(result);
        if (resData.status === 'Rejected') {
          setErrorMessageValue(resData.message);
        } else {
          onSuccessVinInputChange();
        }
      })
      .catch((error) => Logger('error', error));
  }

  return (
    <View style={styles.centeredView}>
      <View
        style={[styles.modalView, {height: screenHeight, width: screenWidth}]}>
        <ScrollView
          contentContainerStyle={[
            {height: screenHeight, width: screenWidth, flex: 1},
            styles.modalView,
          ]}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 50}
            style={{width: '100%', alignItems: 'center'}}>
            <Image
              style={{
                height: 100,
                width: 200,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={require('../../assets/logo-white.png')}></Image>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 30,
                color: '#00D582',
                alignSelf: 'center',
              }}>
              OOPS
            </Text>

            <Text style={styles.text}>
              WE'RE HAVING TROUBLE READING YOUR VIN
            </Text>
            <View
              style={{
                height: 50,
                width: screenWidth * 0.8,
                backgroundColor: 'white',
                alignItems: 'center',
                borderRadius: 120,
                justifyContent: 'center',
              }}>
              <TextInput
                style={{
                  width: '100%',
                  textAlign: 'center',
                  color: '#000',
                  fontSize: 20,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                placeholderTextColor="#666"
                autoCapitalize="characters"
                placeholder={'ENTER YOUR VIN'}
                numberOfLines={1}
                value={inputVinValue}
                onChangeText={(text) => {
                  setIsValid(text.length === 17 ? true : false);
                  setInputVinValue(text);
                }}
              />
            </View>
          </KeyboardAvoidingView>
          {errorMessageValue ? (
            <Text style={{color: 'red', fontSize: 18, marginTop: 15}}>
              {errorMessageValue}
            </Text>
          ) : (
            <View style={{marginTop: 15}} />
          )}

          <View style={{flexDirection: 'row', marginTop: 15}}>
            <AppButton
              style={{marginRight: 20}}
              backgroundColor={colors.purpleTransparent}
              label={'BACK'}
              onPress={() => {
                // setInputVinVisible(false);
                // props.showMethod();
                onBack();
              }}
            />

            <AppButton
              backgroundColor={
                isValid ? colors.greenButton : colors.disabledButton
              }
              label={'SUBMIT'}
              onPress={() => {
                if (isValid) {
                  callApiInputVin();
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title1: {
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: 2,
    color: 'white',
    textShadowColor: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  centeredView: {
    flex: 1,
    margin: 0, // This is the important style you need to set full screen modal
    alignItems: undefined,
    justifyContent: undefined,
  },
  modalView: {
    backgroundColor: 'rgba(1, 1, 1, 0.8)',
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
