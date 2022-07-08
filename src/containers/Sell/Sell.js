import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  PermissionsAndroid,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Alert,
  Platform,
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
  AppState,
  Keyboard,
} from 'react-native';
import {colors, images, strings, fonts} from '../../themes';
import {moderateScale} from '../../utils/ResponsiveUi';
import {Actions, ActionConst} from 'react-native-router-flux';
import {
  ConstantUtils,
  NetworkUtils,
  FunctionHelper,
  FunctionUtils,
  PrefrenceManager,
  PreferenceKey,
} from '../../utils';
import ProgressBar from '../../custom/ProgressBar';
import Button from '../../custom/Button';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');
import TextField from '../../custom/TextField';
import ButtonDropdown from '../../custom/ButtonDropdown';
import {color, cos} from 'react-native-reanimated';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from '../../redux/actions';
import PAVESDK, {PaveSDKClassic} from 'react-native-pave-module';
import Loader from '../../components/LoaderOpacity';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance, useColorScheme} from 'react-native-appearance';
import {isTesting} from '../../utils/globals';
import WebService from '../../utils/WebService';
import * as globals from '../../utils/globals';
import Smartlook from 'smartlook-react-native-wrapper';
import {request, requestMultiple, PERMISSIONS} from 'react-native-permissions';

const DEMO_OPTIONS_1 = ['Buy Now', 'Auction'];

const TAG = '==:== Sell :';

function isValidFunction(func) {
  return func && typeof func === 'function';
}
class Sell extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      isLoading: false,
      latitude: 0,
      longitude: 0,
      registrationNumber: '',
      milageKM: '',
      auctionType: 'Select Auction Type',
      reservedPrice: '',
      startPrice: '1',
      inspectionDate: '',
      discription: '',
      hideShowPass: true,
      isRemember: false,
      isVehicleVerifyed: false,
      showVehicleVerifyed: false,
      dateSelectedStr: moment().format('DD-MM-YYYY'),
      dateSelected: new Date(),
      showDate: false,
      emailid: '',
      isActivityIndicator: false,
      appState: AppState.currentState,
    };

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  async componentDidMount() {
    //this.sessionCheck();
    Smartlook.setupAndStartRecording(WebService.KEY_SMARTLOOK);

    this.configureAppState();
    this.requestPermissions();

    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        console.log(TAG, 'componentDidMount', 'unlockAllOrientations');
        Orientation.lockToPortrait();
        this.setBackListener();
      },
    );

    let email_id = await AsyncStorage.getItem(ConstantUtils.USER_EMAIL);
    this.setState({
      emailid: email_id,
    });
    if (email_id.includes(ConstantUtils.EMAIL_EXTENSION)) {
      this.setState({
        auctionType: 'Auction',
        reservedPrice: '2',
      });
    }
  }

  handleAppStateChange(nextAppState) {
    
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected) {
      if (
        this.state.appState.match(/inactive|background/) &&
        nextAppState === 'active' &&
        this.state.appState !== 'active'
      ) {
        console.log('App has come to the foreground!');

        this.sessionCheck();
      }
      this.setState({appState: nextAppState});
    } else {
      FunctionUtils.showToast(strings.INTERNET_CONNECTION);
    }
  }

  requestPermissions() {
    switch (Platform.OS) {
      case 'ios':
        requestMultiple([
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.MICROPHONE,
        ]).then(statuses => {
          console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
          console.log('MICROPHONE', statuses[PERMISSIONS.IOS.MICROPHONE]);
        });
        break;

      case 'android':
        requestMultiple([
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
        ]).then(statuses => {
          console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
          console.log('MICROPHONE', statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);
        });
        break;

      default:
        break;
    }
  }

  configureAppState() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange,
    );
  }

  setBackListener() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  backAction = () => {
    return true;
    // console.log(TAG, 'backAction', 'Not Login Screen');
    // Actions.pop();
    // return false;
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);

    if (Platform.OS === 'android') {
      this.backHandler.remove();
    }
  }

  handleBackButtonClick() {
    if (Actions.currentScene === ConstantUtils.SELL) {
      BackHandler.exitApp();
      // Alert.alert(strings.APP_NAME, 'Do you want to close the application?', [
      //   {text: 'Yes', onPress: () => BackHandler.exitApp()},
      //   {text: 'No', onPress: () => {}},
      // ]);
    }
  }

  hideShowPassword() {
    this.setState({hideShowPass: !this.state.hideShowPass});
  }

  /**
   * @function showInvalidRegistration
   */
  async showInvalidRegistration() {
    this.setState({
      isLoading: false,
      showVehicleVerifyed: true,
      isVehicleVerifyed: false,
    });
    FunctionUtils.showToast(
      'Vehicle Registration Not Found – Please Try Again',
    );
  }

  async getRegisterVehicleDetail() {
    console.log(TAG, 'getRegisterVehicleDetail');
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected) {
      this.setState({
        isLoading: false,
        isVehicleVerifyed: false,
        showVehicleVerifyed: false,
        isActivityIndicator: true,
      });
      this.props
        .getRegisterVehicleDetails(this.state.registrationNumber)
        .then(async () => {
          const {vehicleDetailData, msgError, error} = this.props;
          console.log(TAG, 'vehicleDetailData -> ', vehicleDetailData);

          if (
            vehicleDetailData !== undefined &&
            vehicleDetailData.hasOwnProperty('VehicleDetailsResponse')
          ) {
            let {VehicleDetailsResponse} = vehicleDetailData;
            if (VehicleDetailsResponse.hasOwnProperty('VehicleDetailsResult')) {
              let {VehicleDetailsResult} = VehicleDetailsResponse;
              if (
                VehicleDetailsResult !== undefined &&
                VehicleDetailsResult.hasOwnProperty('chassisNo') &&
                VehicleDetailsResult != null
              ) {
                let {chassisNo} = VehicleDetailsResult;

                if (chassisNo !== undefined) {
                  this.setState({
                    isLoading: false,
                    isVehicleVerifyed: true,
                    showVehicleVerifyed: true,
                  });
                  // this.getFullChasisNumber();
                } else {
                  this.setState({
                    isLoading: false,
                    isVehicleVerifyed: false,
                    showVehicleVerifyed: true,
                  });
                  FunctionUtils.showToast(strings.vehical_error);
                }
              } else {
                await this.showInvalidRegistration();
              }
            } else {
              await this.showInvalidRegistration();
            }
          } else {
            console.log(
              TAG,
              'Invalid vehicleDetailData Or VehicleDetailsResponse',
            );
            await this.showInvalidRegistration();
          }
        });
    } else {
      this.setState({isLoading: false});
      FunctionUtils.showToast(strings.INTERNET_CONNECTION);
    }
  }

  async getFullChasisNumber() {
    console.log(TAG, 'getFullChasisNumber');
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected) {
      this.setState({isLoading: false});
      this.props
        .getChasisDetails(this.state.registrationNumber)
        .then(async () => {
          const {vehicleChasisData, msgError, error} = this.props;
          let errorData;
          if (vehicleChasisData) {
            if (
              vehicleChasisData.VehicleDetailsResponse.VehicleDetailsResult
                .ChassisNumber
            ) {
              this.setState({isVehicleVerifyed: true});
            } else {
              this.setState({isVehicleVerifyed: false});
            }
            console.log(
              'ChasisData=================================',
              vehicleChasisData,
            );
            this.setState({isLoading: false, showVehicleVerifyed: true});
          } else {
            this.setState({
              isLoading: false,
              showVehicleVerifyed: true,
              isVehicleVerifyed: false,
            });
            FunctionUtils.showToast(vehicleChasisData.message);
          }
        });
    } else {
      this.setState({isLoading: false});
      FunctionUtils.showToast(strings.INTERNET_CONNECTION);
    }
  }

  PaveSDKClassicScreen(props) {
    global.sessionKey = props.session_key;
    Actions.push(ConstantUtils.SELLSTEP2, {sessionData: props});
    // Actions.push(ConstantUtils.SELLSTEP3);
  }

  sessionValidation() {
    console.log(TAG, 'sessionValidation');
    const {
      registrationNumber,
      milageKM,
      isVehicleVerifyed,
      showVehicleVerifyed,
      auctionType,
      reservedPrice,
      startPrice,
      discription,
      isRemember,
      dateSelectedStr,
      dateSelected,
    } = this.state;
    if (
      registrationNumber.length === 0 ||
      registrationNumber.trim().length === 0
    ) {
      FunctionUtils.showToast('Please enter the vehicle registration number');
    } else if (registrationNumber.length > 0 && !isVehicleVerifyed) {
      FunctionUtils.showToast(
        'Please enter the valid vehicle registration number',
      );
    } else if (milageKM.length === 0 || milageKM.trim().length === 0) {
      FunctionUtils.showToast('Please enter vehicle mileage.');
    } else if (auctionType === 'Select Auction Type') {
      FunctionUtils.showToast('Please select Auction Type');
    }
    // else if (startPrice.length === 0 && startPrice < 1) {
    //   FunctionUtils.showToast('Please enter Start Price');
    // }
    else if (reservedPrice.length === 0 || reservedPrice <= 1) {
      FunctionUtils.showToast('Reserve price Must be greater than 1');
    } else if (discription.length === 0) {
      FunctionUtils.showToast('Please enter Description');
    } else {
      let firstStepData = {
        gi_vin: registrationNumber,
        desc_proc: discription,
        rprice: reservedPrice,
        sprice: startPrice,
        auction_type: auctionType == 'Auction' ? 'auction' : 'buynow',
        is_asis: isRemember ? 1 : 0,
        milageKM: milageKM,
        dateSelectedStr: dateSelectedStr,
        dateSelected: dateSelected,
      };
      this.createSession(firstStepData);
    }
  }

  logout() {
    Alert.alert('Logout', 'Are you sure want to logout app?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Logout', onPress: () => this.cleanData()},
    ]);
  }

  // async cleanData() {
  //   try {
  //     await AsyncStorage.clear();
  //     Actions.reset('Login');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async cleanData() {
    try {
      let isUserRemember = await AsyncStorage.getItem(
        ConstantUtils.IS_USER_REMEMBER,
      );
      let email = await AsyncStorage.getItem(ConstantUtils.USER_EMAIL);
      let password = await AsyncStorage.getItem(ConstantUtils.USER_PASSWORD);
      if (isUserRemember === 'true') {
        await AsyncStorage.removeItem(ConstantUtils.IS_USER_LOGIN);
        await AsyncStorage.removeItem(ConstantUtils.USER_TOKEN);
        globals.rememberBtnVal = true;
        globals.userEmail = email;
        globals.userPass = password;
      } else {
        await AsyncStorage.clear();
      }
      Actions.reset(ConstantUtils.LOGIN);
    } catch (e) {
      console.log(e);
    }
  }

  async createSession(firstStepData) {
    console.log(TAG, 'createSession -> firstStepData :', firstStepData);
    const {milageKM} = this.state;
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected) {
      this.setState({isLoading: true});
      const {vehicleChasisData, vehicleDetailData} = this.props;
      const {VehicleDetailsResult} = vehicleDetailData.VehicleDetailsResponse;
      let param = JSON.stringify({
        vehicle: {
          vin: this.state.registrationNumber,
          model_year: VehicleDetailsResult.YearOfManufacture,
          vehicle_make: VehicleDetailsResult.Make,
          vehicle_model: VehicleDetailsResult.Model,
          vehicle_trim: VehicleDetailsResult.Variant,
          vehicle_bodystyle: VehicleDetailsResult.BodyTypeDescription,
          vehicle_transmission: VehicleDetailsResult.TransmissionType,
          vehicle_exterior_color: VehicleDetailsResult.Colour,
          odom_reading: milageKM,
          odom_unit: 'KILOMETRES',
        },
      });
      console.log('param=======================', param);
      this.props.postSessionDetails(param).then(async () => {
        const {sessionCreatedData} = this.props;
        let errorData;
        if (sessionCreatedData) {
          console.log(
            'sessionCreatedData=================================',
            sessionCreatedData,
          );
          this.setState({isLoading: false});
          let step1Data = firstStepData;
          step1Data.session_id = sessionCreatedData.session_key;
          // alert(step1Data.session_id)
          await PrefrenceManager.setPreferenceValue(
            PreferenceKey.STEP1_DATA,
            JSON.stringify(step1Data),
          );
          this.PaveSDKClassicScreen(sessionCreatedData);
        } else {
          this.setState({isLoading: false});
          FunctionUtils.showToast(sessionCreatedData.message);
        }
      });
    } else {
      this.setState({isLoading: false});
      FunctionUtils.showToast(strings.INTERNET_CONNECTION);
    }
  }

  onAuctionButtonClick() {
    this.refs.dropdown_2.show();
  }

  _dropdown_6_onSelect(idx, value) {
    // this.sessionCheck();
    this.setState({
      auctionType: value,
    });
  }

  // Now
  setTime = (event, date) => {
    if (date !== undefined) {
      // dismissedAction
      var dateString = moment(date).format('DD-MM-YYYY');
      this.setState({
        dateSelectedStr: dateString,
        dateSelected: date,
        showDate: false,
      });
    }
  };

  async sessionCheck() {
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected) {
      this.props.checkSession(null).then(async () => {
        const {sessioncheckdata, msgError, error} = this.props;
        if (sessioncheckdata && sessioncheckdata.status === 'success') {
          console.log(
            'TOKEN IS VALID, SUCCESS #################################################################',
          );
        } else {
          FunctionUtils.showToast(sessioncheckdata.message);
          Alert.alert(
            ConstantUtils.TRADEBID,
            ConstantUtils.LOGINSESSIONEXPIRE,
            [
              {
                text: ConstantUtils.LOGINAGAIN,
                onPress: () => {
                  console.log('OK Pressed');
                  this.cleanData();
                  Actions.reset(ConstantUtils.LOGIN);
                },
              },
            ],
          );
        }
      });
    } else {
      FunctionUtils.showToast(strings.INTERNET_CONNECTION);
    }
  }

  render() {
    const colorScheme = Appearance.getColorScheme();

    console.log('colorScheme', colorScheme);
    const {
      isLoading,
      email,
      registrationNumber,
      milageKM,
      auctionType,
      reservedPrice,
      inspectionDate,
      discription,
      isVehicleVerifyed,
      showVehicleVerifyed,
      startPrice,
      dateSelected,
      dateSelectedStr,
      showDate,
      emailid,
      isActivityIndicator,
    } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
            }}>
            <StatusBar
              translucent
              backgroundColor={colors.colorWhite}
              barStyle="dark-content"
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  height: moderateScale(60),
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: colors.grayColor_check_box,
                  borderBottomWidth: moderateScale(0.8),
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: '80%',
                    height: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontFamily: fonts.Poppins_SemiBold,
                      fontSize: moderateScale(17),
                    }}>
                    {'Submit Your Vehicle'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{height: moderateScale(30), width: moderateScale(30)}}
                  onPress={() => this.logout()}>
                  <Image
                    source={images.logout}
                    style={{
                      height: moderateScale(30),
                      width: moderateScale(30),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: moderateScale(120),
                  width: width,
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  {FunctionHelper.tabView('01', 'Vehicle Details', false, true)}
                  {FunctionHelper.doubleArrow()}
                  {FunctionHelper.tabView(
                    '02',
                    'Vehicle Inspection',
                    false,
                    false,
                  )}
                  {FunctionHelper.doubleArrow()}
                  {FunctionHelper.tabView('03', 'Vehicle Review', false, false)}
                </View>
              </View>
              <View
                style={{
                  width: width,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: moderateScale(20),
                }}>
                <TextField
                  onChangeText={text =>
                    this.setState(
                      {
                        registrationNumber: text.replace(/[^0-9A-Za-z]/g, ''),
                      },
                      () => {
                        console.log(
                          TAG,
                          'registrationNumber->',
                          registrationNumber,
                        );
                      },
                    )
                  }
                  placeHolder={'Vehicle registration'}
                  placeHolderTextColor={colors.darkGray}
                  isPassword={false}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  value={registrationNumber}
                  maxLength={35}
                  returnKeyType="search"
                  isActivityIndicatorShow={isActivityIndicator}
                  isCarNumber={showVehicleVerifyed}
                  validImg={
                    isVehicleVerifyed ? images.done_verify : images.close
                  }
                  onBlur={e => {
                    registrationNumber.length > 0
                      ? this.getRegisterVehicleDetail()
                      : null;
                  }}
                  onSubmitEditing={() => {
                    registrationNumber.length > 0
                      ? this.getRegisterVehicleDetail()
                      : null;
                  }}
                  blurOnSubmit={false}
                  // marginBottom={moderateScale(16)}
                />

                <TextField
                  onChangeText={text => {
                    let replacedText = text.replace(/[^0-9]/g, '');
                    if (
                      replacedText.charAt(0) === '0' &&
                      replacedText.length > 0
                    ) {
                      replacedText = '0';
                    }

                    this.setState({milageKM: replacedText});
                  }}
                  placeHolder={'Mileage (KM)'}
                  numberpad={true}
                  placeHolderTextColor={colors.darkGray}
                  maxLength={7}
                  isPassword={false}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  // value={milageKM}
                  value={`${milageKM
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    // this.focusTextInput();
                  }}
                  blurOnSubmit={false}
                  marginBottom={moderateScale(16)}
                />
                {emailid.includes(ConstantUtils.EMAIL_EXTENSION) ? null : (
                  <View>
                    <ModalDropdown
                      ref="dropdown_2"
                      defaultValue=""
                      textStyle={{fontSize: 0, color: 'transparent'}}
                      style={styles.dropdown_6}
                      options={DEMO_OPTIONS_1}
                      dropdownStyle={styles.dropdown_2_dropdown}
                      onSelect={(idx, value) =>
                        this._dropdown_6_onSelect(idx, value)
                      }></ModalDropdown>
                    <ButtonDropdown
                      height={moderateScale(45)}
                      width={'100%'}
                      marginBottom={moderateScale(16)}
                      title={auctionType}
                      position="absolute"
                      onclick={() => this.onAuctionButtonClick()}
                    />
                  </View>
                )}
                {/* <TextField
                  placeHolder={'Start Price'}
                  placeHolderTextColor={colors.darkGray}
                  onChangeText={text =>
                    this.setState({startPrice: text.replace(/[^0-9]/g, '')})
                  }
                  isPassword={false}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  maxLength={14}
                  numberpad={true}
                  value={startPrice}
                  returnKeyType="done"
                  blurOnSubmit={false}
                  isPreText={true}
                  preText={'€'}
                  marginBottom={moderateScale(12)}
                /> */}
                {emailid.includes(ConstantUtils.EMAIL_EXTENSION) ? null : (
                  <TextField
                    placeHolder={'€ Reserve Price / Buy Now Price'}
                    placeHolderTextColor={colors.darkGray}
                    onChangeText={text =>
                      this.setState({
                        reservedPrice: text.replace(/[^0-9]/g, ''),
                      })
                    }
                    isPassword={false}
                    icon={images.email_logo}
                    height={moderateScale(55)}
                    maxLength={12}
                    numberpad={true}
                    value={
                      reservedPrice
                        ? `€ ${reservedPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                        : reservedPrice
                    }
                    returnKeyType="done"
                    onSubmitEditing={() => {
                      // this.focusTextInput();
                    }}
                    blurOnSubmit={false}
                    marginBottom={moderateScale(16)}
                  />
                )}
                {/* {
                  (emailid.includes(ConstantUtils.EMAIL_EXTENSION))?  null :
                <ButtonDropdown
                  height={moderateScale(45)}
                  width={width}
                  marginBottom={moderateScale(16)}
                  title={dateSelectedStr}
                  onclick={() => this.setState({ showDate: true })}
                />
                } */}
                <TextField
                  onChangeText={text => this.setState({discription: text})}
                  placeHolder={'Description'}
                  placeHolderTextColor={colors.darkGray}
                  isPassword={false}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  value={discription}
                  returnKeyType="default"
                  onBlur={e => {
                    Keyboard.dismiss();
                  }}
                  onSubmitEditing={() => {}}
                  blurOnSubmit={false}
                  _multiline={true}
                />
                {emailid.includes(ConstantUtils.EMAIL_EXTENSION) ? null : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      top: moderateScale(7),
                    }}>
                    <Button
                      title={strings.sell_vehicle_checkbox}
                      titleStyle={styles.tvSellVehicleCheckStyle}
                      style={styles.btnCheckVehicleCheckBoxStyle}
                      isvehicleCheckBox={true}
                      isRememberButton={true}
                      isChecked={this.state.isRemember}
                      isFromSell={true}
                      onPress={() => {
                        this.setState({isRemember: !this.state.isRemember});
                      }}
                    />
                    {/* <Button
                    buttonTitle={strings.sell_vehicle_checkbox}
                    height={moderateScale(30)}
                    isvehicleCheckBox={true}
                    isRememberButton={true}
                    isRemember={this.state.isRemember}
                    width={'64%'}
                    backgroundColor={colors.trasparent}
                    isFromSell={true}
                    onButtonPress={() =>
                      this.setState({ isRemember: !this.state.isRemember })
                    }
                    textStyle={{
                      color: colors.redColor,
                      fontSize: moderateScale(14),
                      fontWeight: '500',
                      alignSelf: 'flex-start',
                      marginTop: moderateScale(10),
                    }}
                  /> */}
                    <Image
                      source={images.as_is}
                      style={{
                        height: moderateScale(25),
                        width: moderateScale(70),
                        // marginTop: moderateScale(7),
                      }}
                    />
                  </View>
                )}
                <Button
                  title={strings.next_button_text}
                  titleStyle={styles.tvNextStyle}
                  style={styles.btnNextStyle}
                  onPress={() => {
                    this.sessionValidation();
                  }}
                />
                {/* <Button
                  buttonTitle={strings.next_button_text}
                  height={moderateScale(42)}
                  width={width - moderateScale(25)}
                  borderRadiusApply={moderateScale(4)}
                  backgroundColor={colors.colorBlue}
                  marginTop={moderateScale(20)}
                  onButtonPress={() => this.sessionValidation()}
                  textStyle={{
                    color: colors.colorWhite,
                    fontSize: moderateScale(16),
                    alignSelf: 'center',
                    fontFamily: fonts.Poppins_Regular,
                  }}
                /> */}
                {showDate && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={dateSelected}
                    mode={'date'}
                    is24Hour={true}
                    display="spinner"
                    onChange={this.setTime}
                    minimumDate={new Date()}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      bottom: 0,
                      backgroundColor:
                        colorScheme == 'dark' ? 'black' : 'white',
                    }}
                  />
                )}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        {isLoading && <Loader />}
      </SafeAreaView>
    );
  }
}

//Following the code for connecting the container class with redux
const mapStateToProps = state => {
  return {
    loginResData: state.loginReducer.loginResData, //accessing the redux state
    vehicleDetailData: state.sellReducer.vehicleDetailData, //accessing the redux state
    vehicleChasisData: state.sellReducer.vehicleChasisData,
    sessionCreatedData: state.sellReducer.sessionCreatedData,
    sessioncheckdata: state.sellReducer.sessioncheckdata,
    isloading: state.loginReducer.isLoading,
    error: state.loginReducer.error, //accessing the redux state
    msgError: state.loginReducer.msgError, //accessing the redux state
    clientPortalResData: state.loginReducer.clientPortalResData,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sell);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorWhite,
    alignItems: 'center',
  },
  safeAreaStyle: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.colorWhite,
  },
  dropdown_6: {
    // position: 'absolute',
    width: width,
    left: moderateScale(16),
    height: moderateScale(70),
    alignSelf: 'center',
  },
  dropdown_6_image: {
    width: 40,
    height: 40,
  },
  dropdown_2_dropdown: {
    width: '92%',
    height: moderateScale(70),
    left: moderateScale(90),
  },
  btnCheckVehicleCheckBoxStyle: {
    height: moderateScale(30),
    width: '64%',
    // backgroundColor: 'red',
    backgroundColor: colors.trasparent,
  },
  tvSellVehicleCheckStyle: {
    color: colors.redColor,
    fontSize: moderateScale(14),
    fontWeight: '500',
    alignSelf: 'center',
    // marginTop: moderateScale(10),
  },
  btnNextStyle: {
    height: moderateScale(42),
    width: width - moderateScale(25),
    borderRadius: moderateScale(4),
    backgroundColor: colors.colorBlue,
    marginTop: moderateScale(20),
  },
  tvNextStyle: {
    color: colors.colorWhite,
    fontSize: moderateScale(16),
    alignSelf: 'center',
    fontFamily: fonts.Poppins_Regular,
  },
});
