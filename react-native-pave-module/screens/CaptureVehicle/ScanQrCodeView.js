/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Image, Modal} from 'react-native';
import AppButton from '../../component/ui/appButton/AppButton';
import useScreenDimensions from '../../hook/UseScreenDimensions';
import PropTypes from 'prop-types';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Logger} from '../../utils/AppLogger';
import {colors} from '../../styles/base';

const ScanQrCodeView = (props) => {
  ScanQrCodeView.PropTypes = {
    isVisible: PropTypes.bool.isVisible,
    closeModal: PropTypes.func.isRequired,
    onScanSuccess: PropTypes.func.isRequired,
  };

  ScanQrCodeView.defaultProps = {
    isVisible: false,
    closeModal: () => {
      Logger('closeModal Not Yet Implemented');
    },
    onScanSuccess: () => {
      Logger('onScanSuccess Not Yet Implemented');
    },
  };

  const screenData = useScreenDimensions();

  const onSuccess = (e) => {
    props.onScanSuccess(e.data);
    props.closeModal();
  };

  return (
    <View>
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType="fade"
        transparent={false}
        visible={props.isVisible}
        styles={{
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}>
        <View style={styles.centeredView}>
          <View
            style={[
              {height: screenData.height, width: screenData.width},
              styles.modalView,
            ]}>
            <RNCamera
              ratio={'16:9'}
              style={{
                flex: 1,
                height: screenData.height,
                width: screenData.width,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.torch}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onBarCodeRead={(e) => {
                Logger('ScanQrCodeView', e);
                onSuccess(e);
              }}
            />
            <View
              style={{
                position: 'absolute',
                flex: 1,
                height: screenData.height / 2,
                width: screenData.height / 2,
                borderColor: 'rgba(0, 0, 0, 0.5)',
                borderWidth: screenData.height,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: screenData.height / 2,
                  width: screenData.height / 2,
                  borderColor: colors.primary,
                  borderWidth: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}></View>
            </View>
            <Image
              style={{
                height: 50,
                width: 120,
                resizeMode: 'contain',
                position: 'absolute',
                top: 10,
              }}
              source={require('../../assets/logo-white.png')}
            />
            <AppButton
              style={{
                marginRight: 20,
                position: 'absolute',
                right: 20,
                bottom: 20,
              }}
              backgroundColor={colors.purpleTransparent}
              label={'CANCEL'}
              onPress={() => {
                props.closeModal();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ScanQrCodeView;

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
