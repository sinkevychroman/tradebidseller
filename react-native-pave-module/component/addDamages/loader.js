import React, {Component} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator, Text} from 'react-native';
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
          <Text style={styles.text}>Please wait...</Text>
          <ActivityIndicator animating={loading} />
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
