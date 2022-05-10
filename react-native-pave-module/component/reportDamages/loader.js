import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
  Platform,
} from 'react-native';
import {colors} from '../../styles/base';

const Loader = (props) => {
  const {loading, ...attributes} = props;
  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      transparent={true}
      animationType={'fade'}
      visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Text style={styles.text}>
            Please wait while results are being loaded to your device.
          </Text>
          <ActivityIndicator
            size="large"
            color={Platform.OS === 'ios' ? null : colors.primary}
            animating={loading}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  text: {fontSize: 20, fontWeight: '700', textAlign: 'center'},
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 120,
    width: 300,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
export default Loader;
