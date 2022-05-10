/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import {validURL, sortDetectedDamages, sortDamageAreas} from './utils';
import PropTypes from 'prop-types';
import styles from './styles';
import createStyles, {fonts, colors} from '../../styles/base.js';
import UserAddedDamagesView from '../addDamages/UserAddedDamagesView.js';
import {VehicleInfoView} from './vehicle-info-views/VehicleInfoView';
import {
  TireDetectedDamageLayout,
  TireDetectedDamageLayoutLandscape,
} from './vehicle-tire-views/TireDetectedDamageLayout';
import {TireRowInfoSevere} from './vehicle-tire-views/TireRowInfoSevere';
import Loader from './loader.js';
import AppButton from '../ui/appButton/AppButton';
import ReportWebView from './ReportWebView';
import useScreenDimensions from '../../hook/UseScreenDimensions';
import {SYNC_DAMAGES_URL, AUTHORIZATION_TOKEN} from '../../constants/index';
import UserStepsView from '../ui/userStepsView/UserStepsView';
import {Logger} from '../../utils/AppLogger';
import {StatusBarHeight, isIPhoneX} from './utils';
import ProgressiveImage from '../ui/progressiveImage/ProgressiveImage';
import ConfirmDamageTextView from './ui/general/ConfirmDamageTextView';
import RowInfoSevereView from './ui/portrait/RowInfoSevereView';
import RowInfoSevereLandscapeView from './ui/landscape/RowInfoSevereLandscapeView';
import NormalDamageItemView from './ui/portrait/NormalDamageItemView';
import NormalDamageItemLandscapeView from './ui/landscape/NormalDamageItemLandscapeView';
import NotNormalDamageItemView from './ui/portrait/NotNormalDamageItemView';
import NotNormalDamageItemLandscapeView from './ui/landscape/NotNormalDamageItemLandscapeView';
import NativeCall from '../../nativeCall/Native';
import UploadPhotoOptionalView from '../uploadPhotoOptional/UploadPhotoOptional';

// var screenWidth = Math.round(Dimensions.get('window').width);
// var screenHeight = Math.round(Dimensions.get('window').height);

ReportDamagesView.PropTypes = {
  sessionID: PropTypes.string,
};

export function ReportDamagesView(props) {
  const {sessionID, completed = () => {}} = props;
  const screenData = useScreenDimensions();

  const screenWidth = screenData.width;
  const sessionKey = sessionID;
  const [reportDamageData, setReportDamageData] = useState(null);
  const [isConfirmButtonVisible, setConfirmButtonVisible] = useState(true);
  const [modeScreen, setModeScreen] = useState('REPORT');
  const [isWebVisible, setIsWebVisible] = useState(false);
  const [isExpandAddButton, setIsExpandAddButton] = useState(false);
  const [isUploadPhotoOptionalVisible, setIsUploadPhotoOptionalVisible] =
    useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShowReport, setIsShowReport] = useState(false);

  let timeoutTask = null;

  function timeout(ms, promise) {
    timeoutTask = new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error('timeout'));
      }, ms);
      promise.then(resolve, reject);
    });
    return timeoutTask;
  }

  function callApiGetReportDamage() {
    timeout(
      10000,
      NativeCall.getInspectionResult(sessionKey)
        .then((res) => {
          setLoading(false);
          // Logger('====> grading', res.grading.autograde);
          // Logger('====> response', res.response);
          if (res.response.status === 'COMPLETE') {
            setIsCompleted(true);
            setIsShowReport(false);
          } else {
            setIsShowReport(true);
            setReportDamageData(res);
          }

          clearTimeout(timeoutTask);
        })
        .catch((_err) => {
          // Logger('getReportDamage error =====> ', err);
          setLoading(false);
          clearTimeout(timeoutTask);
        }),
    )
      .then(function () {
        // process response
        setLoading(false);
      })
      .catch(function () {
        // might be a timeout error
        setLoading(false);
        Alert.alert('Error', 'Request timeout');
        clearTimeout(timeoutTask);
      });
  }

  function callApiSyncDamages() {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', AUTHORIZATION_TOKEN);
    myHeaders.append('Content-Type', 'multipart/form-data');

    var formdata = new FormData();
    formdata.append('session_key', sessionID);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(SYNC_DAMAGES_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Logger(result);
        callApiGetReportDamage();
      })
      .catch((error) => console.log('error', error));
  }

  useEffect(() => {
    if (reportDamageData === null) {
      callApiGetReportDamage();
    }
  }, []);

  const vehicleInfoView = () => {
    return (
      <View
        style={{
          flexDirection: 'column',
          marginTop: screenData.isLandscape ? 0 : 20,
        }}>
        <View
          style={{
            position: 'absolute',
            height: 200,
            width: '150%',
            backgroundColor: '#F4F5F7',
          }}
        />

        <View style={{height: 100}} />
        <VehicleInfoView vehicleData={reportDamageData} />
      </View>
    );
  };

  const damageAreaView = (damageAreas) => {
    var dataSorted = sortDamageAreas(damageAreas);
    var unixTimeString = Math.round(new Date().getTime() / 1000);
    return (
      <View style={{flexDirection: 'column'}}>
        {dataSorted.map((value, index) =>
          value?.photoUrl.trim() !== '' ? (
            value.view !== 'TIRE' ? (
              <View key={index.toString()} style={{flexDirection: 'column'}}>
                <View
                  style={[
                    {
                      width: screenWidth,
                      height: 2,
                      backgroundColor: colors.whiteBackground,
                      marginLeft: -10,
                      marginTop: 20,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: 20,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    letterSpacing: 3,
                    marginBottom: 20,
                    marginTop: 30,
                    textDecorationLine: 'underline',
                    textDecorationColor: '#dadada',
                  }}>
                  {value.view ?? '-'}
                </Text>
                <ProgressiveImage
                  style={{
                    justifyContent: 'center',
                    height: undefined,
                    width: '100%',
                    aspectRatio: 16 / 9,
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: value?.photoUrl + '?' + unixTimeString,
                  }}
                />
                <View style={{height: 20}} />

                <RowInfoSevereView damageViewData={value} />

                {createDetailDetectedDamage(value)}
              </View>
            ) : (
              <View key={index.toString()} style={{flexDirection: 'column'}}>
                <View
                  style={[
                    {
                      width: screenWidth,
                      height: 2,
                      backgroundColor: colors.whiteBackground,
                      marginLeft: -10,
                      marginTop: 20,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: 20,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    letterSpacing: 3,
                    marginBottom: 20,
                    marginTop: 30,
                    textDecorationLine: 'underline',
                    textDecorationColor: '#dadada',
                  }}>
                  {'TIRE & WHEELS'}
                </Text>
                <ProgressiveImage
                  style={{
                    height: undefined,
                    width: screenWidth - 20,
                    aspectRatio: 16 / 9,
                    resizeMode: 'contain',
                  }}
                  source={{
                    uri: validURL(value?.photoUrl)
                      ? value?.photoUrl + '?' + unixTimeString
                      : 'https://via.placeholder.com/400x200/000000/FFFFFF/?text=Loading...',
                  }}
                />
                <View style={{height: 20}} />
                <TireRowInfoSevere />

                <TireDetectedDamageLayout
                  vehicleId={reportDamageData.vehicle.vehicle_id}
                  sessionID={sessionKey}
                  dataDetectedDamages={value}
                  isUpdateButtonVisible={!isConfirmButtonVisible}
                  syncData={callApiSyncDamages}
                  reloadData={() => {
                    setLoading(true);
                    setTimeout(() => {
                      callApiGetReportDamage();
                    }, 3000);
                  }}
                />
              </View>
            )
          ) : (
            <View />
          ),
        )}
      </View>
    );
  };

  const damageAreaViewLandscape = (damageAreas) => {
    var dataSorted = sortDamageAreas(damageAreas);
    var unixTimeString = Math.round(new Date().getTime() / 1000);
    return (
      <View style={{flexDirection: 'column'}}>
        {dataSorted.map((value, index) =>
          value?.photoUrl.trim() !== '' ? (
            value.view !== 'TIRE' ? (
              <View key={index.toString()} style={{flexDirection: 'column'}}>
                <View
                  style={[
                    {
                      width: screenWidth,
                      height: 2,
                      backgroundColor: colors.whiteBackground,
                      marginLeft: -10,
                      marginTop: 20,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: 20,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    letterSpacing: 3,
                    marginBottom: 20,
                    marginTop: 30,
                    textDecorationLine: 'underline',
                    textDecorationColor: '#dadada',
                  }}>
                  {value.view ?? '-'}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    marginBottom: 20,
                  }}>
                  <View style={{marginRight: 10}}>
                    <ProgressiveImage
                      style={{
                        height: undefined,
                        width: (screenData.width - StatusBarHeight * 2) / 2,
                        aspectRatio: 16 / 9,
                        resizeMode: 'contain',
                      }}
                      source={{
                        uri: validURL(value?.photoUrl)
                          ? value?.photoUrl + '?' + unixTimeString
                          : 'https://via.placeholder.com/400x200/000000/FFFFFF/?text=Loading...',
                      }}
                    />
                  </View>
                  <RowInfoSevereLandscapeView damageViewData={value} />
                </View>

                {createDetailDetectedDamageLandscape(value)}
              </View>
            ) : (
              <View key={index.toString()} style={{flexDirection: 'column'}}>
                <View
                  style={[
                    {
                      width: screenWidth,
                      height: 2,
                      backgroundColor: colors.whiteBackground,
                      marginLeft: -10,
                      marginTop: 20,
                    },
                  ]}
                />
                <Text
                  style={{
                    fontSize: 20,
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    letterSpacing: 3,
                    marginBottom: 20,
                    marginTop: 30,
                    textDecorationLine: 'underline',
                    textDecorationColor: '#dadada',
                  }}>
                  {'TIRE & WHEELS'}
                </Text>

                <View style={{flexDirection: 'row', marginBottom: 20}}>
                  <ProgressiveImage
                    style={{
                      height: undefined,
                      width: (screenData.width - StatusBarHeight * 2) / 2,
                      aspectRatio: 16 / 9,
                      resizeMode: 'contain',
                    }}
                    source={{
                      uri: value?.photoUrl + '?' + unixTimeString,
                    }}
                  />
                  <View style={{width: 20}} />
                  <TireRowInfoSevere />
                </View>
                <View style={{height: 30}} />
                <TireDetectedDamageLayoutLandscape
                  vehicleId={reportDamageData.vehicle.vehicle_id}
                  sessionID={sessionKey}
                  dataDetectedDamages={value}
                  isUpdateButtonVisible={!isConfirmButtonVisible}
                  syncData={callApiSyncDamages}
                  reloadData={() => {
                    setLoading(true);
                    setTimeout(() => {
                      callApiGetReportDamage();
                    }, 3000);
                  }}
                />
              </View>
            )
          ) : (
            <View />
          ),
        )}
      </View>
    );
  };

  const createDetailDetectedDamage = (value) => {
    var detectedDamages = sortDetectedDamages(value.detectedDamages);
    return (
      <View style={{flexDirection: 'column'}}>
        {detectedDamages.map((val, index) => {
          return val.damage_group !== 'TIRE' ? (
            <View key={index.toString()}>
              {/* <Text>{val.damage_group}</Text> */}
              <NormalDamageItemView
                sessionKey={sessionKey}
                value={val}
                index={index}
                showUpdateButton={() => {
                  setConfirmButtonVisible(false);
                }}
                hideUpdateButton={() => {
                  setConfirmButtonVisible(true);
                }}
              />
            </View>
          ) : (
            <NotNormalDamageItemView key={index.toString()} value={val} />
          );
        })}
      </View>
    );
  };
  const createDetailDetectedDamageLandscape = (value) => {
    var detectedDamages = sortDetectedDamages(value.detectedDamages);
    return (
      <View style={{flexDirection: 'column'}}>
        <LabelsBarView />
        {detectedDamages.map((val, index) => {
          return val.damage_group !== 'TIRE' ? (
            <View key={index.toString()}>
              <NormalDamageItemLandscapeView
                sessionKey={sessionKey}
                value={val}
                index={index}
                showUpdateButton={() => {
                  setConfirmButtonVisible(false);
                }}
                hideUpdateButton={() => {
                  setConfirmButtonVisible(true);
                }}
              />

              <View
                style={{
                  width: '150%',
                  height: 0.5,
                  marginLeft: -10,
                  backgroundColor: '#dadada',
                }}
              />
            </View>
          ) : (
            <View key={index.toString()}>
              <NotNormalDamageItemLandscapeView value={val} />

              <View
                style={{
                  width: '150%',
                  height: 0.5,
                  marginLeft: -10,
                  backgroundColor: '#dadada',
                }}
              />
            </View>
          );
        })}
      </View>
    );
    // }
  };
  const ItemLabelsBarView = (props) => {
    return (
      <View
        style={{
          backgroundColor: '#fafafa',
          flex: props.flex,
          alignContent: 'center',
          justifyContent: 'center',
          paddingLeft: 10,
        }}>
        <Text
          style={{
            textTransform: 'capitalize',
            fontWeight: '500',
            fontSize: 14,
            color: 'rgba(0,0,0,.85)',
          }}>
          {props.label}
        </Text>
      </View>
    );
  };

  const LabelsBarView = () => {
    return (
      <View
        style={{flexDirection: 'row', flex: 10, height: 70, marginLeft: -10}}>
        <ItemLabelsBarView flex={2} label={'Component'} />
        <ItemLabelsBarView flex={1.5} label={'Cropped photo'} />
        <ItemLabelsBarView flex={1.5} label={'Damage Type'} />
        <ItemLabelsBarView flex={1.5} label={'Severity'} />
        <ItemLabelsBarView flex={1.5} label={'Repair\nMethod'} />
        <ItemLabelsBarView flex={2} label={'Check Box'} />
      </View>
    );
  };

  const ExpandableAddButton = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        {isConfirmButtonVisible ? (
          <View style={{alignItems: 'flex-end'}}>
            {isExpandAddButton ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={{fontWeight: 'bold'}}>ADD DAMAGES</Text>
                <View style={{width: 10}} />
                <TouchableOpacity
                  onPress={() => {
                    setIsExpandAddButton(!isExpandAddButton);
                    setModeScreen('ADD');
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    elevation: 4,
                    height: 50,
                    backgroundColor: colors.greenButton,
                    borderRadius: 25,
                    marginEnd: 30,
                  }}>
                  <Image
                    style={{height: 24, width: 24, alignSelf: 'center'}}
                    source={require('../../assets/ic_edit_white.png')}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}

            {isExpandAddButton ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={{fontWeight: 'bold'}}>ADD IMAGES</Text>
                <View style={{width: 10}} />
                <TouchableOpacity
                  onPress={() => {
                    setIsExpandAddButton(!isExpandAddButton);
                    setTimeout(() => {
                      setIsUploadPhotoOptionalVisible(true);
                    }, 1000);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    elevation: 4,
                    height: 50,
                    backgroundColor: colors.greenButton,
                    borderRadius: 25,
                    marginEnd: 30,
                  }}>
                  <Image
                    style={{height: 24, width: 24, alignSelf: 'center'}}
                    source={require('../../assets/ic_photo_camera_white.png')}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}

            <TouchableOpacity
              onPress={() => {
                setIsExpandAddButton(!isExpandAddButton);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                elevation: 4,
                height: 50,
                backgroundColor: colors.greenButton,
                borderRadius: 25,
                marginEnd: 30,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                {!isExpandAddButton ? '+' : 'x'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  };

  const [loading, setLoading] = useState(true);
  const styles1 = StyleSheet.create({
    text: {fontSize: 20, fontWeight: '700', textAlign: 'center', marginTop: 10},
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040',
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 210,
      width: 300,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
    },
  });
  return (
    <View supportedOrientations={['portrait', 'landscape']}>
      {!isShowReport ? (
        <View />
      ) : (
        <View supportedOrientations={['portrait', 'landscape']}>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="fade"
            transparent={false}
            visible={isWebVisible}
            styles={{
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}>
            <ReportWebView
              {...props}
              sessionID={sessionID}
              onCloseModal={() => {
                setIsWebVisible(false);
                completed();
              }}
            />

            {/* <View style={{flexDirection: 'row', position: 'absolute', bottom: 26}}>
          <AppButton
            // style={{ right: 20}}
            backgroundColor={colors.greenButton}
            label={'CONDITION REPORT'}
            onPress={() => {
              setIsWebVisible(false);
              completed();
            }}
          />
          <AppButton
            // style={{position: 'absolute', bottom: 26, right: 20}}
            backgroundColor={colors.purpleButton}
            label={'CLOSE'}
            onPress={() => {
              setIsWebVisible(false);
              completed();
            }}
          />
        </View> */}
          </Modal>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="fade"
            transparent={false}
            visible={modeScreen === 'ADD'}
            styles={{
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            onRequestClose={() => {
              // alert('Modal has been closed.');
            }}>
            <UserAddedDamagesView
              sessionKey={sessionKey}
              onCloseModal={() => {
                setModeScreen('REPORT');
                setLoading(true);

                callApiGetReportDamage();
              }}
            />
          </Modal>
          <UploadPhotoOptionalView
            sessionID={sessionID}
            isVisible={isUploadPhotoOptionalVisible}
            hideModal={() => {
              setIsUploadPhotoOptionalVisible(false);
            }}
          />
          <SafeAreaView style={{backgroundColor: 'white'}}>
            <ScrollView>
              <View style={styles.body}>
                {vehicleInfoView(reportDamageData?.vehicle)}
                <ConfirmDamageTextView />
                {screenData.isLandscape
                  ? damageAreaViewLandscape(reportDamageData?.damageAreas ?? [])
                  : damageAreaView(reportDamageData?.damageAreas ?? [])}
              </View>
            </ScrollView>

            <View
              style={{
                position: 'absolute',
                top:
                  Platform.OS === 'ios'
                    ? screenData.isLandscape
                      ? 0
                      : isIPhoneX()
                      ? StatusBarHeight
                      : 20
                    : 0,
                width: '100%',
                // marginTop: StatusBarHeight,
                // marginTop: StatusBarHeight,
                alignSelf: 'center',
                backgroundColor: 'white',
                borderBottomWidth: 0.5,
                borderBottomColor: 'rgba(0, 0, 0, 0.25)',
                padding: 8,
              }}>
              {screenData.isLandscape ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
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
                    backgroundColor: 'white',
                  }}>
                  <Image
                    style={styles.imageLogo}
                    source={require('../../assets/logo_dark.png')}
                  />
                  <UserStepsView currentStepString={'3'} />
                </View>
              )}
            </View>

            {isExpandAddButton ? (
              <TouchableOpacity
                style={{
                  width: screenData.width,
                  height: screenData.height,
                  backgroundColor: colors.transparentWhite80,
                  position: 'absolute',
                }}
                onPress={() => {
                  setIsExpandAddButton(!isExpandAddButton);
                }}
              />
            ) : (
              <View />
            )}

            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                bottom: 26,
                right: 0,
              }}>
              <ExpandableAddButton />

              {!isConfirmButtonVisible ? (
                <TouchableOpacity
                  onPress={() => {
                    setLoading(true);
                    callApiSyncDamages();

                    setConfirmButtonVisible(true);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 140,
                    elevation: 4,
                    right: 20,
                    height: 50,
                    backgroundColor: colors.greenButton,
                    borderRadius: 40,
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                    UPDATE
                  </Text>
                </TouchableOpacity>
              ) : (
                <AppButton
                  disabled={isExpandAddButton}
                  style={{
                    right: 20,
                    alignSelf: 'flex-end',
                  }}
                  backgroundColor={
                    !isExpandAddButton
                      ? colors.greenButton
                      : colors.disabledButton
                  }
                  label={'CONFIRM'}
                  onPress={() => showDialogConfirmReport()}
                />
              )}
            </View>
          </SafeAreaView>
        </View>
      )}

      <Modal
        supportedOrientations={['portrait', 'landscape']}
        transparent={true}
        animationType={'fade'}
        visible={isCompleted}>
        <View style={styles1.modalBackground}>
          <View style={styles1.activityIndicatorWrapper}>
            <Text style={styles1.text}>This session ID was completed!</Text>
            <Text style={{textAlign: 'center', paddingHorizontal: 10}}>
              You will be returned to the previous screen.
            </Text>
            <AppButton
              style={{width: 80}}
              backgroundColor={colors.greenButton}
              label={'OK'}
              onPress={() => {
                Logger('OK completed');
                setIsCompleted(false);
                completed();
              }}
            />
          </View>
        </View>
      </Modal>
      <Loader loading={loading} />
    </View>
  );

  function showDialogConfirmReport() {
    Alert.alert(
      '',
      'Are you sure you want to proceed to confirm this session?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            //  console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setLoading(true);
            console.log('OK Pressed');

            callApiConfirmSession(3);
          },
        },
      ],
      {cancelable: false},
    );
  }

  function callApiConfirmSession(tries) {
    // Logger(sessionKey);
    NativeCall.completeSession(sessionKey)
      .then((res) => {
        setLoading(false);
        // Logger(res.error);
        // Logger(res);
        if (!res.error) {
          wait(1000).then(() => {
            setIsWebVisible(true);
          });
        } else {
          var triesLeft = tries - 1;
          Logger(triesLeft);
          if (triesLeft === 0) {
            Alert.alert(
              '',
              'Something went wrong.\nPlease try again later',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setLoading(false);
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            wait(5000).then(() => {
              callApiConfirmSession(triesLeft);
            });
          }
        }
      })
      .catch((error) => {
        Logger(error);
        setLoading(false);
      });
  }

  function wait(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }
}
