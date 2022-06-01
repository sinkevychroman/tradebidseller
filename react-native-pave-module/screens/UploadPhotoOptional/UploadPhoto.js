/* eslint-disable react-native/no-inline-styles */
/*This is an example of Image Picker in React Native*/
import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

import PaveGirdPhoto from './PhotoGridVIew';

import {launchImageLibrary} from 'react-native-image-picker';

import {Logger} from '../../utils/AppLogger';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const UploadPhotoOptional = (props) => {
  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const showImagePicker = (callback) => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Logger('User cancelled image picker');
      } else if (response.error) {
        Logger('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        Logger('User tapped custom button: ', response.customButton);
      } else {
        callback({uri: response.uri});

        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
      }
    });
  };

  // function showImagePicker(callback) {
  //   ImagePicker.showImagePicker(options, (response) => {
  //     if (response.didCancel) {
  //       Logger('User cancelled image picker');
  //     } else if (response.error) {
  //       Logger('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       Logger('User tapped custom button: ', response.customButton);
  //     } else {
  //       callback({uri: response.uri});
  //       // You can also display the image using data:
  //       // const source = {uri: 'data:image/jpeg;base64,' + response.data};
  //     }
  //   });
  // }

  const refPaveGirdPhoto = useRef(null);

  const clearAllPhoto = () => {
    refPaveGirdPhoto.current.clearAllPhoto();
  };

  const uploadPhotos = () => {
    refPaveGirdPhoto.current.uploadAllPhoto();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.imageLogo}
          source={require('../../assets/logo_dark.png')}
        />
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 15,
            fontWeight: '500',
            opacity: 0.7,
          }}>
          {props.sessionID}
        </Text>
        <TouchableOpacity style={{alignSelf: 'center'}} onPress={clearAllPhoto}>
          <Text
            style={{
              ...styles.textButton,
              color: '#0099FF',
            }}>
            Clear
          </Text>
        </TouchableOpacity>
      </View>
      <PaveGirdPhoto
        {...props}
        ref={refPaveGirdPhoto}
        launchImageLibrary={showImagePicker}
      />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.btnUpload} onPress={uploadPhotos}>
          <Text style={styles.textButton}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnUpload, {backgroundColor: '#646465'}]}
          onPress={() => {
            Alert.alert(
              //title
              'Are you sure?',
              //body
              'Make sure all your photos must finish uploading.\nDo you wish to leave?',
              [
                {
                  text: 'Leave',
                  onPress: () => {
                    props.cancelled();
                  },
                },
                {
                  text: 'Stay',
                  onPress: () => {},
                },
              ],
              {cancelable: true},
            );
          }}>
          <Text style={styles.textButton}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadPhotoOptional;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: screenWidth - 20,
    justifyContent: 'space-between',
  },

  imageLogo: {
    height: 50,
    width: 100,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  container: {
    width: screenWidth,
    height: screenHeight - 50, // offset iphone X
    alignContent: 'center',
    // marginTop: Platform.OS === 'ios' ? 10 : 0,
    // marginBottom: Platform.OS === 'ios' ? 1000 : 0,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginEnd: 200,
  },
  btnUpload: {
    backgroundColor: '#0099FF',
    margin: 10,
    borderRadius: 3,
    height: 35,
    width: screenWidth / 2 - 50,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 20,
    fontWeight: '300',
    color: 'white',
    alignSelf: 'center',
  },
});
