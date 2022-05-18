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
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import useScreenDimensions from '../../hook/UseScreenDimensions';

import UserStepsView from '../../component/ui/userStepsView/UserStepsView';

import {Logger} from '../../utils/AppLogger';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AppButton from '../ui/appButton/AppButton';

import {colors} from '../../styles/base';

import NativeCall from '../../nativeCall/Native';
import {ProgressBar} from '../ui/progressBar/ProgressBar';

import {REACT_APP_IMG_URL_UPLOAD_USER} from '../../constants/index';
import ProgressiveImage from '../ui/progressiveImage/ProgressiveImage';

const MAX_OPTIONAL_PHOTO = 17;

const UploadPhotoOptionalView = props => {
  const {sessionID, isVisible} = props;

  const screenData = useScreenDimensions();

  const showImagePicker = callback => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        Logger('User cancelled image picker');
      } else if (response.error) {
        Logger('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        Logger('User tapped custom button: ', response.customButton);
      } else {
        callback({uri: response});
        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
      }
    });
  };

  const showCameraImagePicker = callback => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        Logger('User cancelled image picker');
      } else if (response.error) {
        Logger('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        Logger('User tapped custom button: ', response.customButton);
      } else {
        callback({uri: response});
        // You can also display the image using data:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data};
      }
    });
  };

  let items = [
    {
      id: 0,
      src: null,
      cage: {},
      isUploaded: false,
      isUploading: false,
    },
    {
      id: 1,
      src: null,
      cage: {},
      isUploaded: false,
      isUploading: false,
    },
  ]; // include optional cage

  const onPressItem = item => {
    showImagePickerOptionAlertHandler(item);
  };

  const [ItemList, setItemList] = useState(items);

  const shouldShowImage = (item, index) => {
    return (
      <>
        <View style={{marginTop: 10}}>
          {item.src || item.url ? (
            <View style={_styles.itemViewContainImage}>
              <ProgressiveImage
                style={_styles.image}
                source={
                  item.url
                    ? {uri: item.url}
                    : {uri: item.src.uri, isStatic: true}
                }
              />
            </View>
          ) : (
            <TouchableOpacity onPress={() => onPressItem(item)}>
              <View style={_styles.itemViewContainer}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('../../assets/icon-add.png')}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  };

  const shouldProgressBar = (item, index) => {
    return (
      item.isUploading &&
      !item.isUploaded && (
        <ProgressBar
          style={{width: 100, alignSelf: 'center'}}
          indeterminate={item.isUploading}
        />
      )
    );
  };

  const cancelPhoto = index => {
    ItemList[index].src = '';
    setItemList([...ItemList]);
  };

  const showImagePickerOptionAlertHandler = item => {
    const _callBackImagePicker = source => {
      let itemList = [...ItemList];
      var count = 0;
      itemList.forEach(value => {
        if (value.id === item.id) {
          value.src = source.uri;
        }
        count++;
        Logger(`value.src ${value.src}`);
        if (value.src) {
          Logger('====>', count, itemList.length);
          if (count === itemList.length && count <= MAX_OPTIONAL_PHOTO) {
            itemList = [...itemList, {id: count + 1, cage: null, src: null}];
          }
        }
      });
      setItemList(itemList);
    };
    //function to make three option alert
    Alert.alert(
      //title
      'Choose Picture',
      //body
      'Click here to capture or upload additional photos of the vehicle.',
      [
        {
          text: 'Take Photo',
          onPress: () => {
            showCameraImagePicker(_callBackImagePicker);
          },
        },
        {
          text: 'Photo Library',
          onPress: () => {
            showImagePicker(_callBackImagePicker);
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: true},
    );
  };

  const uploadAllPhoto = () => {
    ItemList.filter(item => item.src && !item.isUploaded).forEach(item => {
      item.isUploading = true;
      setItemList([...ItemList]);

      let formdata = new FormData();

      let photo = item.src;
      formdata.append('image', {
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri,
      });
      formdata.append('index', `${item.id}`);
      formdata.append('session_key', sessionID);

      var requestOptions = {
        method: 'POST',
        body: formdata,
      };

      fetch(REACT_APP_IMG_URL_UPLOAD_USER.replace(/\/$/, ''), requestOptions)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then(result => {
          item.isUploading = false;
          item.isUploaded = true;
          setItemList([...ItemList]);
        })
        .catch(error => {
          Logger('error', error);
          item.isUploading = false;
          setItemList([...ItemList]);
        });
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index + 'v'}>
        {shouldShowImage(item, index)}
        {shouldShowCancelButton(item, index)}
        {shouldProgressBar(item, index)}
      </View>
    );
  };

  const shouldShowCancelButton = (item, index) => {
    if (item.src && !(item.isUploaded || item.isUploading)) {
      return (
        <TouchableWithoutFeedback onPress={() => cancelPhoto(index)}>
          <Image
            style={_styles.cancelBtn}
            source={require('../../assets/icon-cancel.png')}
          />
        </TouchableWithoutFeedback>
      );
    }
  };

  useEffect(() => {
    const itemPhoto = [];
    isVisible &&
      NativeCall.getInspectionProgress(sessionID)
        .then(res => {
          Logger('UPLOAD', res);
          [...res.userPhotos].forEach((item, index) => {
            Logger(item);
            itemPhoto.push({
              id: index,
              src: null,
              cage: {},
              isUploaded: true,
              isUploading: false,
              url: item.url,
            });
          });
          itemPhoto.push({
            id: itemPhoto.length,
            src: null,
            cage: {},
            isUploaded: false,
            isUploading: false,
          });

          setItemList([...itemPhoto]);
        })
        .catch(err => {
          Logger(err);
        });
  }, [isVisible]);

  return (
    <Modal
      supportedOrientations={['portrait', 'landscape']}
      animationType="fade"
      transparent={true}
      visible={isVisible}
      styles={{
        iconContainer: {
          top: 10,
          right: 12,
        },
      }}>
      <View style={styles.centeredView}>
        <View style={[{height: screenData.height}, styles.modalView]}>
          {screenData.isLandscape ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Image
                style={styles.imageLogo}
                source={require('../../assets/logo_dark.png')}
              />
              <UserStepsView
                currentStepString={'3'}
                isSupportLandscape={true}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <Image
                style={styles.imageLogo}
                source={require('../../assets/logo_dark.png')}
              />
              <UserStepsView currentStepString={'3'} />
            </View>
          )}
          <View
            style={{
              width: screenData.width,
              height: 0.5,
              backgroundColor: 'gray',
            }}
          />
          <Text style={styles.textStyle}>
            Click here to capture or upload additional photos of the vehicle.
          </Text>
          <FlatList
            key={screenData.isLandscape ? 'h' : 'v'}
            style={{
              width: screenData.width - 20,
              height: screenData.height - 50,
            }}
            data={ItemList}
            renderItem={renderItem}
            numColumns={screenData.isLandscape ? 5 : 3}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          right: 10,
          bottom: 10,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <AppButton
          backgroundColor={colors.purpleButton}
          label={'BACK'}
          onPress={() => props.hideModal()}
        />
        <View
          style={{
            paddingRight: 10,
            paddingLeft: 10,
            alignItems: 'flex-end',
          }}>
          <AppButton
            backgroundColor={colors.primary}
            label={'UPLOAD ALL'}
            onPress={() => {
              uploadAllPhoto();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
export default UploadPhotoOptionalView;
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
    backgroundColor: 'white',
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
    lineHeight: 24,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const heightItem = 100;
const widthItem = 100;
const _styles = StyleSheet.create({
  itemViewContainer: {
    height: heightItem,
    width: widthItem,
    backgroundColor: 'white',
    opacity: 0.4,
    margin: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: widthItem,
    height: heightItem,
    borderRadius: 5,

    justifyContent: 'flex-end',
    alignSelf: 'flex-start',
    bottom: 0,
  },
  titleImage: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },

  itemViewContainImage: {
    height: heightItem,
    width: widthItem,
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
  },
  cancelBtn: {
    height: 35,
    width: 35,
    // marginTop: 0,
    marginLeft: widthItem - 10,
    alignItems: 'flex-end',
    position: 'absolute',
  },

  imageDefault: {
    zIndex: 1,
    height: 100,
    width: 100,
    resizeMode: 'contain',
    tintColor: 'black',
  },
});
