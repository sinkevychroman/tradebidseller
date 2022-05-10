/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Platform,
  View,
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {
  replaceUnderscore,
  getTireColorByName,
  getTireTreadDepthByConditionName,
} from '../utils';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';
import {AUTHORIZATION_TOKEN, UPDATE_TIRE_URL} from '../../../constants/index';
import useScreenDimensions from '../../../hook/UseScreenDimensions';
import {StatusBarHeight, isIPhoneX} from '../../../component/addDamages/utils';
var screenWidth = Math.round(Dimensions.get('window').width);
var screenHeight = Math.round(Dimensions.get('window').height);
import {Logger} from '../../../utils/AppLogger';
import {colors} from '../../../styles/base';

export const TireDetectedDamageLayout = (props) => {
  var screenData = useScreenDimensions();
  screenWidth = Math.round(Dimensions.get('window').width);
  screenHeight = Math.round(Dimensions.get('window').height);
  TireDetectedDamageLayout.PropTypes = {
    vehicleId: PropTypes.string.isRequired,
    dataDetectedDamages: PropTypes.object.isRequired,
    sessionID: PropTypes.string.isRequired,
  };

  // console.log(
  //   Platform.OS + ' TireDetectedDamageLayout  ',
  //   props.dataDetectedDamages,
  // );
  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      // setLoading(true);
      screenWidth = Math.round(Dimensions.get('window').width);
      screenHeight = Math.round(Dimensions.get('window').height);
      // if (screenWidth2 > screenHeight2) {
      //   screenWidth = screenHeight2;
      //   screenHeight = screenWidth2;
      // } else {
      //   screenWidth = screenWidth2;
      //   screenHeight = screenHeight2;
      // }
      setEditModalVisible(false);
    });
  });

  var frontLeftTireData = null;
  var rearLeftTireData = null;
  var frontRightTireData = null;
  var rearRightTireData = null;

  var damageNameFrontLeft = '';
  var damageNameRearLeft = '';
  var damageNameFrontRight = '';
  var damageNameRearRight = '';

  props.dataDetectedDamages.detectedDamages.forEach((item) => {
    if (item.component === 'TIRE_FRONT_LEFT') {
      damageNameFrontLeft = item.damage_name;
      frontLeftTireData = item;
    }
    if (item.component === 'TIRE_REAR_LEFT') {
      damageNameRearLeft = item.damage_name;
      rearLeftTireData = item;
    }
    if (item.component === 'TIRE_FRONT_RIGHT') {
      damageNameFrontRight = item.damage_name;
      frontRightTireData = item;
    }
    if (item.component === 'TIRE_REAR_RIGHT') {
      damageNameRearRight = item.damage_name;
      rearRightTireData = item;
    }
  });

  const [damageNameFrontLeftValue, setDamageNameFrontLeftValue] = useState(
    damageNameFrontLeft,
  );
  const [damageNameRearLeftValue, setDamageNameRearLeftValue] = useState(
    damageNameRearLeft,
  );
  const [damageNameFrontRightValue, setDamageNameFrontRightValue] = useState(
    damageNameFrontRight,
  );
  const [damageNameRearRightValue, setDamageNameRearRightValue] = useState(
    damageNameRearRight,
  );

  const [editModalVisible, setEditModalVisible] = useState(false);

  const TireItemDamageText = ({content}) => {
    return (
      <View style={{flexDirection: 'column', marginTop: 5, marginBottom: 0}}>
        <Text style={{fontSize: 20}}>{content}</Text>
      </View>
    );
  };

  const carOutlineBox = () => {
    return (
      <View
        style={{
          width: screenWidth / 1.7,
          height: 350,
          alignSelf: 'center',
          marginBottom: 30,
        }}>
        <View
          style={{
            borderWidth: 5,
            width: screenWidth / 2,
            height: 350,
            borderRadius: 20,
            alignSelf: 'center',
            opacity: 0.5,
          }}
        />
        {createWheel({
          top: 40,
          left: 0,
          damageName: damageNameFrontLeftValue,
        })}
        {createWheel({
          top: 40,
          right: 0,
          damageName: damageNameFrontRightValue,
        })}
        {createWheel({
          bottom: 40,
          left: 0,
          damageName: damageNameRearLeftValue,
        })}
        {createWheel({
          bottom: 40,
          right: 0,
          damageName: damageNameRearRightValue,
        })}
      </View>
    );
  };

  const carOutlineBoxLandscape = () => {
    return (
      <View
        style={{
          width: screenWidth / 4,
          height: 350,
          alignSelf: 'center',
          marginBottom: 30,
        }}>
        <View
          style={{
            borderWidth: 5,
            width: screenWidth / 2,
            height: 350,
            borderRadius: 20,
            alignSelf: 'center',
            opacity: 0.5,
          }}
        />
        {createWheel({
          top: 40,
          left: 0,
          damageName: damageNameFrontLeftValue,
        })}
        {createWheel({
          top: 40,
          right: 0,
          damageName: damageNameFrontRightValue,
        })}
        {createWheel({
          bottom: 40,
          left: 0,
          damageName: damageNameRearLeftValue,
        })}
        {createWheel({
          bottom: 40,
          right: 0,
          damageName: damageNameRearRightValue,
        })}
      </View>
    );
  };
  // const getTireColor = (grade_score) => {
  //   switch (grade_score) {
  //     case 0:
  //       return '#00b894';
  //     case 1:
  //       return '#f9ca24';
  //     case 2:
  //       return '#f0932b';
  //     case 3:
  //       return '#b71540';
  //     case 4:
  //       return '#74b9ff';
  //     default:
  //       return '#fff';
  //   }
  // };
  const createWheel = ({top, bottom, left, right, damageName}) => {
    return (
      <View
        style={{
          height: 90,
          width: 40,
          borderRadius: 10,
          top: top ?? null,
          bottom: bottom ?? null,
          left: left ?? null,
          right: right ?? null,
          position: 'absolute',
          backgroundColor:
            damageName === '' ? 'white' : getTireColorByName(damageName),
        }}>
        <ImageBackground
          source={require('../../../assets/tire_frame.png')}
          resizeMode="stretch"
          style={{
            height: 90,
            width: 40,
            borderRadius: 10,
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };
  const createTireDetail = (val) => {
    Logger('createTireDetail value', val);
    return (
      <View style={{flexDirection: 'column'}}>
        {/* <Text>{value.damageGroup}</Text> */}
        <Text style={{fontWeight: '700', textAlign: 'left', fontSize: 20}}>
          {replaceUnderscore(val?.component) ?? '-'}
        </Text>

        <TireItemDamageText content={val?.label ?? '-'} />
        <TireItemDamageText content={val?.tolerance ?? '-'} />
        <TireItemDamageText
          content={getTireTreadDepthByConditionName(val?.damage_name) ?? '-'}
        />
        <EditButtonView damageName={val?.component ?? '-'} />
        <View style={{height: 30}} />
      </View>
    );
  };

  const styles = StyleSheet.create({
    buttonFacebookStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: colors.greenButton,
      height: 36,
      width: 100,
      borderRadius: 30,
      marginTop: 5,
    },
    buttonImageIconStyle: {
      padding: 5,
      height: 18,
      width: 18,
      resizeMode: 'stretch',
      tintColor: '#fff', // for ios
    },
    buttonTextStyle: {
      color: '#fff',
      marginBottom: 0,
      marginLeft: 8,
      fontWeight: '700',
      fontSize: 16,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // marginTop: 22,
    },
    modalView: {
      height: 260,
      width: screenWidth / 1.2,
      // margin: 20,
      flexDirection: 'column',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      justifyContent: 'center',
    },
    cancelButton: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      // marginBottom: 15,
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'left',
    },
  });
  const [selectedTireNameValue, setSelectedTireNameValue] = useState('');

  const EditButtonView = (propss) => {
    EditButtonView.PropTypes = {damageName: PropTypes.string.isRequired};
    return (
      <TouchableOpacity
        style={styles.buttonFacebookStyle}
        activeOpacity={0.5}
        onPress={() => {
          if (props.isUpdateButtonVisible) {
            Alert.alert(
              "PAVE's Notification",
              'Please update your Exterior Damage first',
            );
          } else {
            Logger('editModalVisible');
            Logger(editModalVisible);
            setSelectedTireNameValue(propss.damageName);
            setEditModalVisible(true);
          }
        }}>
        <Image
          tintColor="#fff" // for android
          source={require('../../../assets/icon-edit.png')}
          style={styles.buttonImageIconStyle}
        />
        <Text style={styles.buttonTextStyle}>EDIT</Text>
      </TouchableOpacity>
    );
  };

  const EditModalView = ({selectedTire}) => {
    const placeholder = {
      label: 'Choose damage type ...',
      value: null,
      color: '#9EA0A4',
    };
    const [selectedTireCondition, setSelectedTireCondition] = useState('');
    const pickerSelectStyles = StyleSheet.create({
      inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#9EA0A4',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#9EA0A4',
        borderRadius: 8,
        width: 300,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
    });

    function _callAPI(component, damageTire) {
      if (props.sessionID !== '') {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', AUTHORIZATION_TOKEN);
        var requestData = {component: component, damageTire: damageTire};
        var jsonRequestData = JSON.stringify(requestData);

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: jsonRequestData,
          redirect: 'follow',
        };

        fetch(UPDATE_TIRE_URL + props.sessionID, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            var responseData = JSON.parse(result);
            Logger(responseData);
            if (responseData.success === true) {
              switch (component) {
                case 'TIRE_FRONT_LEFT':
                  setDamageNameFrontLeftValue(damageTire);
                  break;
                case 'TIRE_REAR_LEFT':
                  setDamageNameRearLeftValue(damageTire);
                  break;
                case 'TIRE_FRONT_RIGHT':
                  setDamageNameFrontRightValue(damageTire);
                  break;
                case 'TIRE_REAR_RIGHT':
                  setDamageNameRearRightValue(damageTire);
                  break;
                default:
                  break;
              }

              props.reloadData();
            } else {
              Alert.alert('Update failed', responseData.message);
            }
          })

          .catch((error) => Logger('error', error));
      }
    }

    return (
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType="fade"
        transparent={true}
        visible={editModalVisible}
        styles={{
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                height: 50,
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 22,
                  fontWeight: '700',
                  textAlign: 'left',
                }}>
                {selectedTireNameValue.split('_').join(' ') ?? ''}
              </Text>
              <TouchableOpacity
                style={{width: 20, height: 20, margin: 5}}
                onPress={() => {
                  setEditModalVisible(!editModalVisible);
                }}>
                <Image
                  tintColor="gray"
                  style={{tintColor: 'gray', width: 24, height: 24}}
                  source={require('../../../assets/icon-close.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{height: 30}} />
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              value={selectedTireCondition}
              onValueChange={(value) => {
                if (value !== null) {
                  Logger('onValueChange', value.toUpperCase());
                  setSelectedTireCondition(value);
                }
              }}
              items={damagesList}
              style={pickerSelectStyles}
              placeholder={placeholder}
              Icon={() => {
                return (
                  <View
                    style={{
                      marginTop: 20,
                      marginEnd: 10,
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
            <View style={{height: 50}} />
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                style={{
                  ...styles.cancelButton,
                  backgroundColor: colors.purpleButton,
                  flex: 1,
                }}
                onPress={() => {
                  setEditModalVisible(!editModalVisible);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <View style={{width: 20}} />
              <TouchableHighlight
                style={{
                  ...styles.cancelButton,
                  backgroundColor: colors.greenButton,
                  flex: 1,
                }}
                onPress={() => {
                  Logger(
                    `update ${selectedTireNameValue} ${selectedTireCondition}`,
                  );
                  _callAPI(selectedTireNameValue, selectedTireCondition);
                  setEditModalVisible(!editModalVisible);
                }}>
                <Text style={styles.textStyle}>Update</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <View>
        {createTireDetail(frontLeftTireData)}
        {createTireDetail(rearLeftTireData)}
        {carOutlineBox()}
        {createTireDetail(frontRightTireData)}
        {createTireDetail(rearRightTireData)}
      </View>

      <EditModalView />
    </View>
  );
};

export const TireDetectedDamageLayoutLandscape = (props) => {
  var screenData = useScreenDimensions();
  screenWidth = Math.round(Dimensions.get('window').width);
  screenHeight = Math.round(Dimensions.get('window').height);
  TireDetectedDamageLayout.PropTypes = {
    vehicleId: PropTypes.string.isRequired,
    dataDetectedDamages: PropTypes.object.isRequired,
    sessionID: PropTypes.string.isRequired,
  };

  // console.log(
  //   Platform.OS + ' TireDetectedDamageLayout  ',
  //   props.dataDetectedDamages,
  // );
  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      // setLoading(true);
      screenWidth = Math.round(Dimensions.get('window').width);
      screenHeight = Math.round(Dimensions.get('window').height);
      // if (screenWidth2 > screenHeight2) {
      //   screenWidth = screenHeight2;
      //   screenHeight = screenWidth2;
      // } else {
      //   screenWidth = screenWidth2;
      //   screenHeight = screenHeight2;
      // }
      setEditModalVisible(false);
    });
  });

  var frontLeftTireData = null;
  var rearLeftTireData = null;
  var frontRightTireData = null;
  var rearRightTireData = null;

  var damageNameFrontLeft = '';
  var damageNameRearLeft = '';
  var damageNameFrontRight = '';
  var damageNameRearRight = '';

  props.dataDetectedDamages.detectedDamages.forEach((item) => {
    if (item.component === 'TIRE_FRONT_LEFT') {
      damageNameFrontLeft = item.damage_name;
      frontLeftTireData = item;
    }
    if (item.component === 'TIRE_REAR_LEFT') {
      damageNameRearLeft = item.damage_name;
      rearLeftTireData = item;
    }
    if (item.component === 'TIRE_FRONT_RIGHT') {
      damageNameFrontRight = item.damage_name;
      frontRightTireData = item;
    }
    if (item.component === 'TIRE_REAR_RIGHT') {
      damageNameRearRight = item.damage_name;
      rearRightTireData = item;
    }
  });

  const [damageNameFrontLeftValue, setDamageNameFrontLeftValue] = useState(
    damageNameFrontLeft,
  );
  const [damageNameRearLeftValue, setDamageNameRearLeftValue] = useState(
    damageNameRearLeft,
  );
  const [damageNameFrontRightValue, setDamageNameFrontRightValue] = useState(
    damageNameFrontRight,
  );
  const [damageNameRearRightValue, setDamageNameRearRightValue] = useState(
    damageNameRearRight,
  );

  const [editModalVisible, setEditModalVisible] = useState(false);

  const carOutlineBoxLandscape = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 350,
          alignSelf: 'center',
          marginBottom: 30,
        }}>
        <View
          style={{
            borderWidth: 5,
            width: '80%',
            height: 350,
            borderRadius: 20,
            alignSelf: 'center',
            opacity: 0.5,
          }}
        />
        {createWheel({
          top: 40,
          left: 0,
          damageName: damageNameFrontLeftValue,
        })}
        {createWheel({
          top: 40,
          right: 0,
          damageName: damageNameFrontRightValue,
        })}
        {createWheel({
          bottom: 40,
          left: 0,
          damageName: damageNameRearLeftValue,
        })}
        {createWheel({
          bottom: 40,
          right: 0,
          damageName: damageNameRearRightValue,
        })}
      </View>
    );
  };

  const createWheel = ({top, bottom, left, right, damageName}) => {
    return (
      <View
        style={{
          height: 90,
          width: 40,
          borderRadius: 10,
          top: top ?? null,
          bottom: bottom ?? null,
          left: left ?? null,
          right: right ?? null,
          position: 'absolute',
          backgroundColor:
            damageName === '' ? 'white' : getTireColorByName(damageName),
        }}>
        <ImageBackground
          source={require('../../../assets/tire_frame.png')}
          resizeMode="stretch"
          style={{
            height: 90,
            width: 40,
            borderRadius: 10,
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  const createTireDetail = (val) => {
    return (
      <View style={{flexDirection: 'column'}}>
        {/* <Text>{value.damageGroup}</Text> */}
        <Text style={{fontWeight: '700', textAlign: 'left', fontSize: 16}}>
          {replaceUnderscore(val?.component) ?? '-'}
        </Text>

        <TireItemDamageText content={val?.label ?? '-'} />
        <TireItemDamageText content={val?.tolerance ?? '-'} />
        <TireItemDamageText
          content={getTireTreadDepthByConditionName(val?.damage_name) ?? '-'}
        />
        <EditButtonView damageName={val?.component ?? '-'} />
        <View style={{height: 30}} />
      </View>
    );
  };

  const createTireDetailLandscape = (val) => {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-end',
          // marginHorizontal: 20,
        }}>
        {/* <Text>{value.damageGroup}</Text> */}
        <Text style={{fontWeight: '700', textAlign: 'right', fontSize: 16}}>
          {replaceUnderscore(val?.component) ?? '-'}
        </Text>

        <TireItemDamageText
          content={val?.label ?? '-'}
          isTextAlignRight={true}
        />
        <TireItemDamageText
          content={val?.tolerance ?? '-'}
          isTextAlignRight={true}
        />
        <TireItemDamageText
          content={getTireTreadDepthByConditionName(val?.damage_name) ?? '-'}
          isTextAlignRight={true}
        />
        <EditButtonView damageName={val?.component ?? '-'} />
        <View style={{height: 30}} />
      </View>
    );
  };

  const TireItemDamageText = ({content, isTextAlignRight}) => {
    return (
      <View
        style={{
          flexDirection: 'column',
          marginTop: 5,
          marginBottom: 0,
          marginEnd: 0,
        }}>
        <Text
          style={{
            fontSize: 14,
            textAlign: isTextAlignRight ? 'right' : 'left',
          }}>
          {content}
        </Text>
      </View>
    );
  };

  const [selectedTireNameValue, setSelectedTireNameValue] = useState('');

  const EditButtonView = (propss) => {
    EditButtonView.PropTypes = {damageName: PropTypes.string.isRequired};
    return (
      <TouchableOpacity
        style={styles.buttonFacebookStyle}
        activeOpacity={0.5}
        onPress={() => {
          if (props.isUpdateButtonVisible) {
            Alert.alert(
              "PAVE's Notification",
              'Please update your Exterior Damage first',
            );
          } else {
            Logger('editModalVisible');
            Logger(editModalVisible);
            setSelectedTireNameValue(propss.damageName);
            setEditModalVisible(true);
          }
        }}>
        <Image
          tintColor="#fff" // for android
          source={require('../../../assets/icon-edit.png')}
          style={styles.buttonImageIconStyle}
        />
        <Text style={styles.buttonTextStyle}>EDIT</Text>
      </TouchableOpacity>
    );
  };

  const EditModalView = ({selectedTire}) => {
    const placeholder = {
      label: 'Choose damage type ...',
      value: null,
      color: '#9EA0A4',
    };
    const [selectedTireCondition, setSelectedTireCondition] = useState('');
    const pickerSelectStyles = StyleSheet.create({
      inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#9EA0A4',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
      inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#9EA0A4',
        borderRadius: 8,
        width: 300,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },
    });

    function _callAPI(component, damageTire) {
      if (props.sessionID !== '') {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', AUTHORIZATION_TOKEN);
        var requestData = {component: component, damageTire: damageTire};
        var jsonRequestData = JSON.stringify(requestData);

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: jsonRequestData,
          redirect: 'follow',
        };

        fetch(UPDATE_TIRE_URL + props.sessionID, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            var responseData = JSON.parse(result);
            Logger(responseData);
            if (responseData.success === true) {
              switch (component) {
                case 'TIRE_FRONT_LEFT':
                  setDamageNameFrontLeftValue(damageTire);
                  break;
                case 'TIRE_REAR_LEFT':
                  setDamageNameRearLeftValue(damageTire);
                  break;
                case 'TIRE_FRONT_RIGHT':
                  setDamageNameFrontRightValue(damageTire);
                  break;
                case 'TIRE_REAR_RIGHT':
                  setDamageNameRearRightValue(damageTire);
                  break;
                default:
                  break;
              }

              props.reloadData();
            } else {
              Alert.alert('Update failed', responseData.message);
            }
          })

          .catch((error) => Logger('error', error));
      }
    }

    return (
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType="fade"
        transparent={true}
        visible={editModalVisible}
        styles={{
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                height: 50,
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 22,
                  fontWeight: '700',
                  textAlign: 'left',
                }}>
                {selectedTireNameValue.split('_').join(' ') ?? ''}
              </Text>
              <TouchableOpacity
                style={{width: 20, height: 20, margin: 5}}
                onPress={() => {
                  setEditModalVisible(!editModalVisible);
                }}>
                <Image
                  tintColor="gray"
                  style={{tintColor: 'gray', width: 24, height: 24}}
                  source={require('../../../assets/icon-close.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{height: 30}} />
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              value={selectedTireCondition}
              onValueChange={(value) => {
                if (value !== null) {
                  Logger('onValueChange', value.toUpperCase());
                  setSelectedTireCondition(value);
                }
              }}
              items={damagesList}
              style={pickerSelectStyles}
              placeholder={placeholder}
              Icon={() => {
                return (
                  <View
                    style={{
                      marginTop: 20,
                      marginEnd: 10,
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
            <View style={{height: 50}} />
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                style={{
                  ...styles.cancelButton,
                  backgroundColor: colors.purpleButton,
                  flex: 1,
                }}
                onPress={() => {
                  setEditModalVisible(!editModalVisible);
                }}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <View style={{width: 20}} />
              <TouchableHighlight
                style={{
                  ...styles.cancelButton,
                  backgroundColor: colors.greenButton,
                  flex: 1,
                }}
                onPress={() => {
                  Logger(
                    `update ${selectedTireNameValue} ${selectedTireCondition}`,
                  );
                  _callAPI(selectedTireNameValue, selectedTireCondition);
                  setEditModalVisible(!editModalVisible);
                }}>
                <Text style={styles.textStyle}>Update</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={{
          flexDirection: 'row',
          flex: 3,
          width:
            Platform.OS === 'ios'
              ? screenWidth - (StatusBarHeight === 0 ? 20 : StatusBarHeight) * 2
              : screenWidth,
          alignSelf: 'center',
        }}>
        <View style={{flex: 1}}>
          {createTireDetail(frontLeftTireData)}
          {createTireDetail(rearLeftTireData)}
        </View>
        <View style={{flex: 1}}>{carOutlineBoxLandscape()}</View>
        <View style={{flex: 1.25}}>
          {createTireDetailLandscape(frontRightTireData)}
          {createTireDetailLandscape(rearRightTireData)}
        </View>
      </View>

      <EditModalView />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonFacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: colors.greenButton,
    height: 36,
    width: 100,
    borderRadius: 30,
    marginTop: 5,
  },
  buttonImageIconStyle: {
    padding: 5,
    height: 18,
    width: 18,
    resizeMode: 'stretch',
    tintColor: '#fff', // for ios
  },
  buttonTextStyle: {
    color: '#fff',
    marginBottom: 0,
    marginLeft: 8,
    fontWeight: '700',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    height: 260,
    width: screenWidth / 1.2,
    // margin: 20,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
  },
  cancelButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'left',
  },
});
export const damagesList = [
  {
    label: 'LIKE_NEW',
    value: 'LIKE_NEW',
  },
  {
    label: 'GOOD_CONDITION',
    value: 'GOOD_CONDITION',
  },
  {
    label: 'WORN_MEDIUM',
    value: 'WORN_MEDIUM',
  },
  {
    label: 'WORN_MAJOR',
    value: 'WORN_MAJOR',
  },
  {
    label: 'WINTER_TREAD',
    value: 'WINTER_TREAD',
  },
  {
    label: 'BULGED',
    value: 'BULGED',
  },
  {
    label: 'WEATHER_CRACKED',
    value: 'WEATHER_CRACKED',
  },
  {
    label: 'MISSMATCH_TIRE',
    value: 'MISSMATCH_TIRE',
  },
  {
    label: 'FLAT_TIRE',
    value: 'FLAT_TIRE',
  },
];
