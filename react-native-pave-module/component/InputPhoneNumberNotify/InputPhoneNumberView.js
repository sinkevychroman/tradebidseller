/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import AppButton from '../ui/appButton/AppButton';
import useScreenDimensions from '../../hook/UseScreenDimensions';
import {
  NOTIFY_SMS_AUTHORIZATION_TOKEN,
  NOTIFY_BASE_URL,
} from '../../constants/index';
import {Logger} from '../../utils/AppLogger';
import {colors} from '../../styles/base';

const InputPhoneNumberView = (props) => {
  const {sessionID} = props;
  const screenData = useScreenDimensions();
  const [phoneNumberValue, setPhoneNumberValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errorMessageValue, setErrorMessageValue] = useState('');

  function _callApi() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', NOTIFY_SMS_AUTHORIZATION_TOKEN);
    myHeaders.append('Accept', 'application/json, text/plain, */*');

    // var formdata = new FormData();
    // formdata.append('session_key', props.sessionKey ?? '');
    // formdata.append('phone', phoneNumberValue.trim());

    var body = JSON.stringify({
      session_key: sessionID,
      phone: phoneNumberValue.trim(),
    });

    Logger('body', body);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body,
      redirect: 'follow',
    };

    fetch(NOTIFY_BASE_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Logger('InputPhoneNumber ', result);
        const response = JSON.parse(result);
        if (response.session_key) {
          props.hideModal();
          props.onSuccess();
        } else {
          setErrorMessageValue(response.message);
        }
      })
      .catch((error) => Logger('error', error));
  }
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
              <Image
                style={styles.imageLogo}
                source={require('../../assets/logo-white.png')}
              />
              <Text style={styles.textStyle}>
                Enter your cell phone number to receive an SMS{'\n'}with your
                link when your inspection is complete.
              </Text>
              <View
                style={{
                  height: 50,
                  width: screenData.width * 0.8,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  borderRadius: 120,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <TextInput
                  style={{
                    color: '#000',
                    fontSize: 20,
                    textAlign: 'center',
                    width: '100%',
                  }}
                  keyboardType="phone-pad"
                  placeholderTextColor="#666"
                  placeholder={'ENTER YOUR PHONE NUMBER'}
                  numberOfLines={1}
                  value={phoneNumberValue}
                  onChangeText={(text) => {
                    setPhoneNumberValue(text);
                    setErrorMessageValue('');
                    if (text.trim().length === 0) {
                      setIsValid(false);
                    } else {
                      setIsValid(true);
                    }
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
                  //   setInputVinVisible(false);
                  props.hideModal();
                }}
              />

              <AppButton
                backgroundColor={
                  isValid ? colors.greenButton : colors.disabledButton
                }
                label={'SAVE'}
                onPress={() => {
                  if (isValid) {
                    _callApi();
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
export default InputPhoneNumberView;
export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  imageLogo: {
    height: 50,
    width: 140,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    margin: 0, // This is the important style you need to set full screen modal
    alignItems: undefined,
    justifyContent: undefined,
  },
  modalView: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
