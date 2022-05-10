/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Modal,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import AppButton from '../../component/ui/appButton/AppButton';

import useScreenDimensions from '../../hook/UseScreenDimensions';
import {
  AUTHORIZATION_TOKEN,
  USER_UPDATE_ODOMETER_URL,
} from '../../constants/index';
import {Logger} from '../../utils/AppLogger';
import {colors} from '../../styles/base';

const ManualInputOdomView = (props) => {
  const screenData = useScreenDimensions();

  const [errorMessageValue, setErrorMessageValue] = useState('');
  const [odomValue, setOdomValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const [odomUnitValue, setOdomUnitValue] = useState('kilometres');

  function _callAPI(odom_reading, odom_unit) {
    Logger(odom_reading, odom_unit.toUpperCase());
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json, text/plain, */*');
    myHeaders.append('Authorization', AUTHORIZATION_TOKEN);

    var formdata = new FormData();
    formdata.append('odom_reading', odom_reading);
    formdata.append('odom_unit', odom_unit);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      USER_UPDATE_ODOMETER_URL + props.sessionKey + '/user_odom_update',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        Logger(result);
        const response = JSON.parse(result);
        if (response.success) {
          props.closeModal();
          props.onSuccess();
        } else {
          setErrorMessageValue(response.message);
        }
      })
      .catch((error) => Logger('error', error));
  }
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,

      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      color: '#000',
      paddingRight: 20, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 14,
    },
  });
  return (
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
        <View style={[{height: screenData.height}, styles.modalView]}>
          <ScrollView
            contentContainerStyle={[
              {height: screenData.height, width: screenData.width, flex: 1},
              styles.modalView,
            ]}>
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 50}
              style={{}}>
              <Text style={styles.text}>Please input your odometers below</Text>

              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: 50,
                    width: screenData.width * 0.4,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: 5,
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    style={{color: '#000', fontSize: 20}}
                    placeholderTextColor="gray"
                    autoCapitalize="characters"
                    keyboardType="numeric"
                    numberOfLines={1}
                    onChangeText={(text) => {
                      setIsValid(text.length !== 0 ? true : false);
                      setOdomValue(text);
                      setErrorMessageValue('');
                    }}
                    value={odomValue}
                    placeholder={'12345'}
                  />
                </View>
                <View style={{width: 10}} />
                <View
                  style={{
                    height: 50,
                    width: screenData.width * 0.4,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: 5,
                    paddingRight: 15,
                    justifyContent: 'center',
                    paddingLeft: 10,
                  }}>
                  <RNPickerSelect
                    value={odomUnitValue === 'miles' ? 'miles' : 'kilometres'}
                    onValueChange={(value) => {
                      if (value !== null) {
                        Logger('onValueChange', value.toUpperCase());
                        setOdomUnitValue(value);
                      }
                    }}
                    items={[
                      {label: 'KILOMETRES', value: 'kilometres'},
                      {label: 'MILES', value: 'miles'},
                    ]}
                    style={pickerSelectStyles}
                    // placeholder={{label: 'KILOMETRES', value: 'kilometres'}}
                    Icon={() => {
                      return (
                        <View
                          style={{
                            marginTop: Platform.OS === 'ios' ? 4 : 20,
                            backgroundColor: 'transparent',
                            borderTopWidth: 8,
                            borderTopColor: 'gray',
                            borderRightWidth: 8,
                            borderRightColor: 'transparent',
                            borderLeftWidth: 8,
                            borderLeftColor: 'transparent',
                            width: 0,
                            height: 0,
                          }}
                        />
                      );
                    }}
                  />
                </View>
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
                  //   setInputVinVisible(false);
                  //   setSelectMethodVisible(true);
                  setErrorMessageValue('');
                  props.closeModal();
                }}
              />

              <AppButton
                backgroundColor={
                  isValid ? colors.greenButton : colors.disabledButton
                }
                label={'SUBMIT'}
                onPress={() => {
                  Logger(odomValue);
                  Logger(odomUnitValue);
                  if (isValid) {
                    _callAPI(odomValue, odomUnitValue);
                  } else {
                    setErrorMessageValue('Odometer must be filled out');
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

export const ManualInputOdomViewNotModal = (props) => {
  const screenData = useScreenDimensions();

  const [errorMessageValue, setErrorMessageValue] = useState('');
  const [odomValue, setOdomValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const {
    onSuccess = () => {
      Logger('Not Yet Implemented');
    },
    onCancel = () => {
      Logger('Not Yet Implemented');
    },
    sessionID = '',
  } = props;

  const [odomUnitValue, setOdomUnitValue] = useState('kilometres');

  function _callAPI(odom_reading, odom_unit) {
    Logger(odom_reading, odom_unit.toUpperCase());
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json, text/plain, */*');
    myHeaders.append('Authorization', AUTHORIZATION_TOKEN);

    var formdata = new FormData();
    formdata.append('odom_reading', odom_reading);
    formdata.append('odom_unit', odom_unit);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      USER_UPDATE_ODOMETER_URL + sessionID + '/user_odom_update',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => {
        Logger(result);
        const response = JSON.parse(result);
        if (response.success) {
          onSuccess();
        } else {
          setErrorMessageValue(response.message);
        }
      })
      .catch((error) => Logger('error', error));
  }
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      color: '#000',
      paddingRight: 20, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 14,
    },
  });
  return (
    <View style={styles.centeredView}>
      <View style={[{height: screenData.height}, styles.modalView]}>
        <ScrollView
          contentContainerStyle={[
            {height: screenData.height, width: screenData.width, flex: 1},
            styles.modalView,
          ]}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 50}
            style={{}}>
            <Image
              style={{
                height: 100,
                width: 200,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={require('../../assets/logo-white.png')}
            />
            <Text
              style={{
                fontWeight: '700',
                fontSize: 30,
                color: colors.primary,
                alignSelf: 'center',
              }}>
              OOPS
            </Text>

            <Text style={styles.text}>
              WE'RE HAVING TROUBLE READING YOUR ODOMETER
            </Text>

            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 50,
                  width: screenData.width * 0.4,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{color: '#000', fontSize: 20}}
                  placeholderTextColor="gray"
                  autoCapitalize="characters"
                  keyboardType="numeric"
                  numberOfLines={1}
                  onChangeText={(text) => {
                    setIsValid(text.length !== 0 ? true : false);
                    setOdomValue(text);
                    setErrorMessageValue('');
                  }}
                  value={odomValue}
                  placeholder={'12345'}
                />
              </View>
              <View style={{width: 10}} />
              <View
                style={{
                  height: 50,
                  width: screenData.width * 0.4,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  borderRadius: 5,
                  paddingRight: 15,
                  justifyContent: 'center',
                  paddingLeft: 10,
                }}>
                <RNPickerSelect
                  value={odomUnitValue === 'miles' ? 'miles' : 'kilometres'}
                  onValueChange={(value) => {
                    if (value !== null) {
                      Logger('onValueChange', value.toUpperCase());
                      setOdomUnitValue(value);
                    }
                  }}
                  items={[
                    {label: 'KILOMETRES', value: 'kilometres'},
                    {label: 'MILES', value: 'miles'},
                  ]}
                  style={pickerSelectStyles}
                  // placeholder={{label: 'KILOMETRES', value: 'kilometres'}}
                  Icon={() => {
                    return (
                      <View
                        style={{
                          marginTop: Platform.OS === 'ios' ? 4 : 20,
                          backgroundColor: 'transparent',
                          borderTopWidth: 8,
                          borderTopColor: 'gray',
                          borderRightWidth: 8,
                          borderRightColor: 'transparent',
                          borderLeftWidth: 8,
                          borderLeftColor: 'transparent',
                          width: 0,
                          height: 0,
                        }}
                      />
                    );
                  }}
                />
              </View>
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
                setErrorMessageValue('');
                onCancel();
              }}
            />

            <AppButton
              backgroundColor={
                isValid ? colors.greenButton : colors.disabledButton
              }
              label={'SUBMIT'}
              onPress={() => {
                Logger(odomValue);
                Logger(odomUnitValue);
                if (isValid) {
                  _callAPI(odomValue, odomUnitValue);
                } else {
                  setErrorMessageValue('Odometer must be filled out');
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
    // </Modal>
  );
};

const styles = StyleSheet.create({
  title1: {
    // textShadow: '1px 1px 2px',
    textShadowOffset: {width: 2, height: 1},
    textShadowRadius: 2,
    color: 'white',
    textShadowColor: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  text: {color: 'white', marginBottom: 20, textAlign: 'center', fontSize: 20},
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
  textBoxContent: {
    height: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  titleTextVehicle: {
    color: colors.text,
    letterSpacing: 2,
    fontSize: 14,
    marginBottom: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  rowTextBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.border,
    zIndex: 9,
  },
  dividerBoxContent: {
    borderRightWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ManualInputOdomView;
