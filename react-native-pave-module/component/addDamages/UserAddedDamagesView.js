/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import AddDamagesView from './AddDamagesView';
import {isLandscape} from './utils.js';
import AppButton from '../ui/appButton/AppButton';
import {
  AUTHORIZATION_TOKEN,
  GET_EXTERIORS_ANNOTATED_URL,
} from '../../constants/index';
import {colors} from '../../styles/base';
import useScreenDimensions from '../../hook/UseScreenDimensions';
import {Logger} from '../../utils/AppLogger';
import ProgressiveImage from '../ui/progressiveImage/ProgressiveImage';
import GuideRotateView from '../../component/ui/guideRotateView/GuideRotateView.js';

const UserAddedDamagesView = props => {
  const [exteriorsAnnotatedData, setExteriorsAnnotatedData] = useState(null);
  const [isLandscapeState, setLandscapeState] = useState(isLandscape());
  const [addDamagesViewVisible, setAddDamagesViewVisible] = useState(false);
  // passing data for modal
  const [taskIdValue, setTaskIdValue] = useState('');
  const [cageXValue, setCageXValue] = useState(0);
  const [cageYValue, setCageYValue] = useState(0);
  const [cageWidthValue, setCageWidthValue] = useState(0);
  const [cageHeightValue, setCageHeightValue] = useState(0);
  const [actualImageWidthValue, setActualImageWidthValue] = useState(0);
  const [actualImageHeightValue, setActualImageHeightValue] = useState(0);
  const [originalImageWidthValue, setOriginalImageWidthValue] = useState(0);
  const [originalImageHeightValue, setOriginalImageHeightValue] = useState(0);

  const [imgUrlValue, setImgUrlValue] = useState('');
  const [svgUrlValue, setSvgUrlValue] = useState('');

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setLandscapeState(isLandscape());
    });
    callApi();
  }, []);

  function callApi() {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', AUTHORIZATION_TOKEN);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(GET_EXTERIORS_ANNOTATED_URL + props.sessionKey, requestOptions)
      .then(response => response.text())
      .then(result => {
        Logger('UserAddedDamages response', JSON.parse(result));
        const resData = JSON.parse(result);

        var driverSideItem = null;
        var frontItem = null;
        var passengerSideItem = null;
        var rearItem = null;
        var odometer = null;
        resData.annotatedImages.forEach(element => {
          if (element.photoCode === '03') {
            odometer = element;
          }
          if (element.photoCode === '04') {
            driverSideItem = element;
          }
          if (element.photoCode === '05') {
            frontItem = element;
          }
          if (element.photoCode === '07') {
            passengerSideItem = element;
          }
          if (element.photoCode === '08') {
            rearItem = element;
          }
        });
        var sortedArray = [
          driverSideItem,
          frontItem,
          passengerSideItem,
          rearItem,
          odometer,
        ];
        resData.annotatedImages = sortedArray;

        setExteriorsAnnotatedData(resData);
      })
      .catch(error => Logger('error', error));
  }

  Logger('UserAddedDamagesView props', props);
  return (
    <View>
      {/* ADD DAMAGES VIEW | show as modal */}
      <Modal
        animationType="slide"
        transparent={false}
        supportedOrientations={['landscape']}
        visible={addDamagesViewVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AddDamagesView
              {...props}
              style={{position: 'absolute'}}
              taskId={taskIdValue}
              cageX={cageXValue}
              cageY={cageYValue}
              cageWidth={cageWidthValue}
              cageHeight={cageHeightValue}
              actualImageHeight={actualImageHeightValue}
              actualImageWidth={actualImageWidthValue}
              originalImageHeight={originalImageHeightValue}
              originalImageWidth={originalImageWidthValue}
              imgUrl={imgUrlValue}
              svgUrl={svgUrlValue}
              closeModal={() => {
                setAddDamagesViewVisible(false);
                callApi();
              }}
            />
          </View>
        </View>
      </Modal>
      {/* ************************************* */}
      {/* USER ADDED DAMAGES VIEW */}
      {isLandscapeState ? (
        <ScrollView>
          {/* check screen orientation */}

          <SafeAreaView>
            <View>
              <Image
                style={styles.imageLogo}
                source={require('../../assets/logo_dark.png')}
              />
              <Text style={styles.titleText}>User Added Damages</Text>
              <FlatList
                scrollEnabled={true}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                data={exteriorsAnnotatedData?.annotatedImages ?? []}
                renderItem={({item, index}) => {
                  return (
                    <ItemGridView
                      item={item}
                      index={index}
                      onPress={() => {
                        setTaskIdValue(item?.taskId);
                        setCageXValue(item?.cageInfo?.cage?.x ?? 0);
                        setCageYValue(item?.cageInfo?.cage?.y ?? 0);
                        setCageWidthValue(item?.cageInfo?.cage?.width ?? 0);
                        setCageHeightValue(item?.cageInfo?.cage?.height ?? 0);
                        setImgUrlValue(item?.annotated_images);
                        setSvgUrlValue(item?.cageInfo?.cageSvg);
                        setActualImageWidthValue(
                          item?.cageInfo?.actual_image?.width,
                        );
                        setActualImageHeightValue(
                          item?.cageInfo?.actual_image?.height,
                        );
                        setOriginalImageWidthValue(
                          item?.cageInfo?.original_image?.width,
                        );
                        setOriginalImageHeightValue(
                          item?.cageInfo?.original_image?.height,
                        );
                        setAddDamagesViewVisible(true);
                      }}
                    />
                  );
                }}
              />
              <View style={{height: 50}} />
            </View>
          </SafeAreaView>
        </ScrollView>
      ) : (
        <GuideRotateView />
      )}
      {/* show buttons if screen is orientation */}
      {isLandscapeState && exteriorsAnnotatedData ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',

            bottom: 20,
            right: 20,
          }}>
          <AppButton
            backgroundColor={colors.purpleButton}
            label={'CANCEL'}
            onPress={() => {
              props?.onCloseModal();
            }}
          />
          <View style={{width: 10}} />

          <AppButton
            backgroundColor={colors.greenButton}
            label={'CONFIRM'}
            onPress={() => {
              props?.onCloseModal();
            }}
          />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export const ItemGridView = ({item, index, onPress}) => {
  const screenData = useScreenDimensions();
  var unixTimeString = Math.round(new Date().getTime() / 1000);

  const screenWidth = screenData.width;
  const screenHeight = screenData.height;
  function getTitleByIndex(indexItem) {
    switch (indexItem) {
      case 0:
        return 'PASSENGER SIDE';
      case 1:
        return 'FRONT';
      case 2:
        return 'DRIVER SIDE';
      case 3:
        return 'REAR';
    }
  }

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 8,
        marginVertical: 8,
        backgroundColor: 'white',
      }}
      magnification={0.5}
      activeOpacity={0.7}
      onPress={onPress}>
      <View
        style={{
          width: screenWidth / 2.5,
          height: screenHeight / 2,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          overflow: 'hidden',
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <ProgressiveImage
          style={[
            {
              backgroundColor: 'white',
              width: screenWidth / 2.5,
              height: screenHeight / 2,
              resizeMode: 'cover',
            },
          ]}
          source={{
            uri: item.annotated_images + '?' + unixTimeString,
            headers: {Pragma: 'no-cache'},
          }}
        />
        <View style={styles.overlay} />
        <Text style={styles.itemTitle}>{getTitleByIndex(index)}</Text>
        <Text style={styles.tutorialText}>You Can Click To Add Damages</Text>
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginVertical: 10,
  },
  itemTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: 60,
    left: 40,
  },
  tutorialText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    textTransform: 'capitalize',
    bottom: 50,
    left: 40,
    opacity: 0.8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  imageLogo: {
    height: 50,
    width: 100,
    marginStart: 20,
    resizeMode: 'contain',
    position: 'absolute',
  },
  centeredView: {
    flex: 1,
    margin: 0, // This is the important style you need to set full screen modal
    alignItems: undefined,
    justifyContent: undefined,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    // padding: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default UserAddedDamagesView;
