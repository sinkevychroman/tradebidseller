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
} from 'react-native';
import {colors, images, strings, fonts} from '../../themes';
import {moderateScale} from '../../utils/ResponsiveUi';
import {Actions, ActionConst} from 'react-native-router-flux';
import {
  ConstantUtils,
  PrefrenceManager,
  ApiUtils,
  WebService,
  FunctionHelper,
  PreferenceKey,
  FunctionUtils,
  NetworkUtils,
} from '../../utils';
import ProgressBar from '../../custom/ProgressBar';
import Button from '../../custom/Button';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');
import TextField from '../../custom/TextField';
import ButtonDropdown from '../../custom/ButtonDropdown';
import {color} from 'react-native-reanimated';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from '../../redux/actions';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import PAVESDK, {PaveSDKClassic} from 'react-native-pave-module';
import Orientation from 'react-native-orientation-locker';
import {Appearance, useColorScheme} from 'react-native-appearance';
import Toast, {DURATION} from 'react-native-easy-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/LoaderOpacity';
import Smartlook from 'smartlook-react-native-wrapper';
import PreferenceManager from '../../utils/PreferenceManager';

const DEMO_OPTIONS_1 = ['Buy Now', 'Auction'];

const TAG = 'SellStep3';
class SellStep3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      latitude: 0,
      longitude: 0,
      hideShowPass: true,
      isRemember: false,
      registrationNumber: '',
      milageKM: '',
      auctionType: 'Select Auction Type',
      reservedPrice: '',
      startPrice: '1',
      inspectionDate: '',
      discription: '',
      isVehicleVerifyed: false,
      showDate: false,
      make: '',
      model: '',
      year: '',
      transmission: '',
      fuelType: '',
      engineSize: '',
      dateSelectedStr: moment().format('DD-MM-YYYY'),
      dateSelected: new Date(),
      imageArray: [],
      sdkobject: null,
      session_id_state: '',
      is_asis: 0,
      emailid: '',
      appState: AppState.currentState,
    };

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }
  onSubmitData() {
    const {
      registrationNumber,
      milageKM,
      isVehicleVerifyed,
      auctionType,
      reservedPrice,
      startPrice,
      discription,
      isRemember,
      isLoading,
      make,
      model,
      year,
      transmission,
      fuelType,
      engineSize,
      dateSelectedStr,
      dateSelected,
      showDate,
    } = this.state;
    if (registrationNumber.trim().length === 0) {
      FunctionUtils.showToast('Please enter the vehicle registartion number');
    } else if (milageKM.length === 0 || milageKM.trim().length === 0) {
      FunctionUtils.showToast('Please enter the vehicle milage');
    } else if (auctionType === 'Select Auction Type') {
      FunctionUtils.showToast('Please select Auction Type');
    }
    // else if (startPrice.length === 0 && startPrice < 1) {
    //   FunctionUtils.showToast('Please enter Start Price');
    // }
    else if (reservedPrice.length === 0 && reservedPrice <= 1) {
      FunctionUtils.showToast('Reserve price Must be greater than 1');
    } else if (parseInt(startPrice) >= parseInt(reservedPrice)) {
      FunctionUtils.showToast(
        'Please enter start price less than reserved price',
      );
    } else if (discription.length === 0) {
      FunctionUtils.showToast('Please enter Discription');
    } else {
      this.dataStore();
    }
  }
  async cleanData() {
    try {
      await AsyncStorage.clear();
      Actions.reset('Login');
    } catch (e) {
      console.log(e);
    }
  }
  // async sessionCheck() {
  //   const isConnected = await NetworkUtils.isNetworkAvailable();
  //   if (isConnected) {
  //     this.props.checkSession(null).then(async () => {
  //       const {sessioncheckdata, msgError, error} = this.props;
  //       if (sessioncheckdata && sessioncheckdata.status === 'success') {
  //         console.log('check session 3 step');
  //       } else {
  //         // FunctionUtils.showToast(sessioncheckdata.message);
  //         // Alert.alert(
  //         //   ConstantUtils.TRADEBID,
  //         //   ConstantUtils.LOGINSESSIONEXPIRE,
  //         //   [
  //         //     {
  //         //       text: ConstantUtils.LOGINAGAIN,
  //         //       onPress: () => {
  //         //         console.log('OK Pressed');
  //         //         this.cleanData();
  //         //         Actions.reset(ConstantUtils.LOGIN);
  //         //       },
  //         //     },
  //         //   ],
  //         // );
  //       }
  //     });
  //   } else {
  //     FunctionUtils.showToast(strings.INTERNET_CONNECTION);
  //   }
  // }
  dataStore = async () => {
    const {
      registrationNumber,
      milageKM,
      isVehicleVerifyed,
      auctionType,
      reservedPrice,
      startPrice,
      discription,
      isRemember,
      isLoading,
      make,
      model,
      year,
      transmission,
      fuelType,
      engineSize,
      dateSelectedStr,
      dateSelected,
      showDate,
      session_id_state,
      is_asis,
    } = this.state;
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected) {
      this.setState({isLoading: true});

      const formData = new FormData();
      formData.append('gi_vin', registrationNumber);
      formData.append('desc_proc', discription);
      formData.append('sprice', `${startPrice}`);
      formData.append('rprice', `${reservedPrice}`);
      formData.append('session_id', session_id_state);
      formData.append(
        'auction_type',
        auctionType == 'Auction' ? 'auction' : 'buynow',
      );
      formData.append('is_asis', `${is_asis}`);
      formData.append('gi_mileage', `${milageKM}`);

      // const formData = new FormData();
      // formData.append('gi_vin', '02D55604');
      // formData.append('title', 'Test');
      // formData.append('sprice', '10000');
      // formData.append('rprice', '50000');
      // formData.append('session_id', 'USW-OHHZ7BZWLH');
      // formData.append('auction_type', 'auction');
      // formData.append('is_asis', '0');
      console.log('formData', formData);
      this.props.postVahicalData(formData).then(async () => {
        const {postinsertdata} = this.props;
        if (postinsertdata) {
          console.log('api response', postinsertdata);
          if (postinsertdata.status == 'success') {
            this.setState({isLoading: false});
            FunctionUtils.showToast(strings.vehicle_post_success);
            // this.toast.show(strings.vehicle_post_success, 500);
            setTimeout(() => {
              Actions.reset(ConstantUtils.SELL);
            }, 700);
          } else if (
            postinsertdata &&
            postinsertdata.status == 'failed' &&
            postinsertdata.data.statusCode &&
            postinsertdata.data.statusCode == 403
          ) {
            this.setState({isLoading: false});
            FunctionUtils.showToast(strings.vehicle_post_success);
            // this.toast.show(strings.vehicle_post_success, 500);
            setTimeout(() => {
              Actions.reset(ConstantUtils.SELL);
            }, 700);
          } else {
            this.setState({isLoading: false});
            FunctionUtils.showToast(postinsertdata.data.msg);
            Actions.reset(ConstantUtils.LOGIN);
          }
        } else {
          this.setState({isLoading: false});
          FunctionUtils.showToast(postinsertdata.data.msg);
          Actions.reset(ConstantUtils.LOGIN);
        }
      });
    } else {
      this.setState({isLoading: false});
      FunctionUtils.showToast(strings.INTERNET_CONNECTION);
    }
  };

  componentDidMount = async () => {
    // Smartlook.setupAndStartRecording(WebService.KEY_SMARTLOOK);
    //  this.sessionCheck();
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        console.log(TAG, 'componentDidMount', 'unlockAllOrientations');
        Orientation.lockToPortrait();
        this.setBackListener();
      },
    );

    this.configureAppState();

    let email_id = await AsyncStorage.getItem(ConstantUtils.USER_EMAIL);
    this.setState({
      emailid: email_id,
    });

    const {vehicleDetailData, vehicleChasisData, sessionCreatedData} =
      this.props;
    if (vehicleDetailData == null) {
      Actions.push(ConstantUtils.SELL);
    }
    const {VehicleDetailsResult} = vehicleDetailData.VehicleDetailsResponse;
    console.log('VehicleDetailsResult', VehicleDetailsResult);
    let dataStep1 = await PrefrenceManager.getPreference(
      PreferenceKey.STEP1_DATA,
    );
    let step1Data = JSON.parse(dataStep1);
    console.log(TAG, 'step1Data', step1Data);
    PAVESDK.getInspectionResult(step1Data.session_id).then(res => {
      console.log(
        'getInspectionResult===========================================',
        res,
      );
      this.setState({
        sdkobject: res,
      });
    });
    // PAVESDK.getInspectionDetails("USW-48O5HNOHI0").then(res => {
    //   console.log("getInspectionResult===========================================",res);
    // });

    this.setState({
      registrationNumber: step1Data.gi_vin,
      milageKM: step1Data.milageKM,
      auctionType: step1Data.auction_type == 'auction' ? 'Auction' : 'Buy Now',
      reservedPrice: step1Data.rprice,
      startPrice: step1Data.sprice,
      dateSelectedStr: step1Data.dateSelectedStr,
      discription: step1Data.desc_proc,
      make: VehicleDetailsResult.Make,
      model: VehicleDetailsResult.Model,
      year: VehicleDetailsResult.YearOfManufacture,
      transmission: VehicleDetailsResult.TransmissionType,
      fuelType: VehicleDetailsResult.FuelTypeDescription,
      engineSize: VehicleDetailsResult.enginecc,
      session_id_state: step1Data.session_id,
      is_asis: step1Data.is_asis,
    });
    let token = await PrefrenceManager.getPreference(ConstantUtils.USER_TOKEN);
    console.log(TAG, 'USER_TOKEN', token);
  };

  setBackListener() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  backAction = async () => {
    console.log(TAG, 'backAction', 'Not Login Screen');
    return true;
    // if (Actions.currentScene === ConstantUtils.LOGIN) {
    //   Alert.alert(strings.APP_NAME, 'Do you want to close the application?', [
    //     {text: 'Yes', onPress: () => BackHandler.exitApp()},
    //     {text: 'No', onPress: () => {}},
    //   ]);
    //   return true;
    // } else {
    //   Actions.pop();
    //   console.log(TAG, 'backAction', 'Not Login Screen');
    // }
  };

  componentWillUnmount() {
    if (Platform.OS == 'android') {
      console.log(TAG, 'componentWillUnmount', 'Remove Back Action');

      // this.backHandler.remove();
    }
    this.didFocusListener.remove();
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  configureAppState() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange,
    );
  }

  async handleAppStateChange(nextAppState) {
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected) {
      if (
        this.state.appState.match(/inactive|background/) &&
        nextAppState === 'active' &&
        this.state.appState !== 'active'
      ) {
        console.log('App has come to the foreground!');

        this.updateUserActive();
      }
      this.setState({appState: nextAppState});
    } else {
      FunctionUtils.showToast(strings.INTERNET_CONNECTION);
    }
  }

  async updateUserActive() {
    console.log('UPDATE_USER_ACTIVE_START');
    var user_id = await PreferenceManager.getPreferenceValue(
      ConstantUtils.USER_ID,
    );
    const token = await AsyncStorage.getItem(ConstantUtils.USER_TOKEN);

    const host = WebService.BASE_URL;
    const url = `${host}${WebService.UPDATE_USER_ACTIVE}`;

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: `Bearer ${token}`,
      },
      body: {user_id: user_id},
    };

    return fetch(url, options).then(response => {
      console.log('USER_UPDATE_RESPONSE', response);
    });
  }

  hideShowPassword() {
    this.setState({hideShowPass: !this.state.hideShowPass});
  }

  _dropdown_6_onSelect(idx, value) {
    this.setState({
      auctionType: value,
    });
  }

  onAuctionButtonClick() {
    this.refs.dropdown_2.show();
  }

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

  render() {
    const colorScheme = Appearance.getColorScheme();
    const {
      registrationNumber,
      milageKM,
      isVehicleVerifyed,
      auctionType,
      reservedPrice,
      startPrice,
      discription,
      isRemember,
      isLoading,
      make,
      model,
      year,
      transmission,
      fuelType,
      engineSize,
      dateSelectedStr,
      dateSelected,
      showDate,
      emailid,
    } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StatusBar />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
            <ScrollView>
              <View
                style={{
                  height: moderateScale(60),
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: colors.grayColor_check_box,
                  borderBottomWidth: moderateScale(0.8),
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
                  {FunctionHelper.tabView('01', 'Vehicle Details', true, false)}
                  {FunctionHelper.doubleArrow()}
                  {FunctionHelper.tabView(
                    '02',
                    'Vehicle Inspection',
                    true,
                    false,
                  )}
                  {FunctionHelper.doubleArrow()}
                  {FunctionHelper.tabView('03', 'Vehicle Review', false, true)}
                </View>
              </View>
              <View
                style={{
                  width: width,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: moderateScale(20),
                }}>
                <Text style={styles.titletext}>Vehicle Registration</Text>
                <TextField
                  onChangeText={text =>
                    this.setState({registrationNumber: text})
                  }
                  placeHolder={'Vehicle Registration'}
                  placeHolderTextColor={colors.darkGray}
                  isPassword={false}
                  availToEdit={false}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  value={registrationNumber}
                  returnKeyType="next"
                  // onSubmitEditing={() => {
                  //   this.focusTextInput();
                  // }}
                  blurOnSubmit={false}
                  // marginBottom={moderateScale(16)}
                />
                <Text style={styles.titletext}>Mileage (KM)</Text>
                <TextField
                  onChangeText={text => this.setState({milageKM: text})}
                  placeHolder={'Mileage (KM)'}
                  placeHolderTextColor={colors.darkGray}
                  isPassword={false}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  value={`${milageKM
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} KM`}
                  availToEdit={false}
                  returnKeyType="next"
                  // onSubmitEditing={() => {
                  //   this.focusTextInput();
                  // }}
                  blurOnSubmit={false}
                  marginBottom={moderateScale(16)}
                />
                <Text style={styles.titletext}>Make</Text>
                <TextField
                  onChangeText={text => this.setState({make: text})}
                  placeHolder={'Make'}
                  placeHolderTextColor={colors.darkGray}
                  isPassword={false}
                  availToEdit={false}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  value={make}
                  returnKeyType="next"
                  // onSubmitEditing={() => {
                  //   this.focusTextInput();
                  // }}
                  blurOnSubmit={false}
                  marginBottom={moderateScale(16)}
                />
                <Text style={styles.titletext}>Model</Text>
                <TextField
                  onChangeText={text => this.setState({model: text})}
                  placeHolder={'Modal'}
                  availToEdit={false}
                  placeHolderTextColor={colors.darkGray}
                  isPassword={false}
                  _multiline={true}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  value={model}
                  returnKeyType="next"
                  // onSubmitEditing={() => {
                  //   this.focusTextInput();
                  // }}
                  blurOnSubmit={false}
                  marginBottom={moderateScale(16)}
                />
                <Text style={styles.titletext}>Year</Text>
                <TextField
                  onChangeText={text => this.setState({year: text})}
                  placeHolder={'Year'}
                  availToEdit={false}
                  placeHolderTextColor={colors.darkGray}
                  isPassword={false}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  value={year}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  marginBottom={moderateScale(16)}
                />
                <Text style={styles.titletext}>Transmission</Text>
                <TextField
                  onChangeText={text => this.setState({transmission: text})}
                  placeHolder={'Transmission'}
                  availToEdit={false}
                  placeHolderTextColor={colors.darkGray}
                  isPassword={false}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  value={transmission}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this.focusTextInput();
                  }}
                  blurOnSubmit={false}
                  marginBottom={moderateScale(16)}
                />
                <Text style={styles.titletext}>Fuel Type</Text>
                <TextField
                  onChangeText={text => this.setState({fuelType: text})}
                  placeHolder={'Fuel Type'}
                  availToEdit={false}
                  placeHolderTextColor={colors.darkGray}
                  isPassword={false}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  value={fuelType}
                  returnKeyType="done"
                  blurOnSubmit={false}
                  marginBottom={moderateScale(16)}
                />
                <Text style={styles.titletext}>Engine Size</Text>
                <TextField
                  onChangeText={text => this.setState({engineSize: text})}
                  placeHolder={'Engine Size'}
                  availToEdit={false}
                  placeHolderTextColor={colors.darkGray}
                  isPassword={false}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  value={engineSize}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this.focusTextInput();
                  }}
                  blurOnSubmit={false}
                  marginBottom={moderateScale(16)}
                />
                {emailid.includes(ConstantUtils.EMAIL_EXTENSION) ? null : (
                  <>
                    <Text style={styles.titletext}>Auction Type</Text>
                    <View>
                      <ModalDropdown
                        ref="dropdown_2"
                        defaultValue=""
                        textStyle={{fontSize: 0, color: 'transparent'}}
                        style={styles.dropdown_6}
                        options={DEMO_OPTIONS_1}
                        dropdownStyle={styles.dropdown_2_dropdown}
                        disabled={true}
                        onSelect={(idx, value) =>
                          this._dropdown_6_onSelect(idx, value)
                        }></ModalDropdown>
                      <ButtonDropdown
                        height={moderateScale(45)}
                        width={'100%'}
                        marginBottom={moderateScale(16)}
                        title={auctionType}
                        position="absolute"
                        onclick={() => null}
                      />
                    </View>
                  </>
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
                {/* <TextField
                placeHolder={'Start Price'}
                placeHolderTextColor={colors.darkGray}
                onChangeText={text =>
                  this.setState({ startPrice: text.replace(/[^0-9]/g, '') })
                }
                isPassword={false}
                icon={images.email_logo}
                height={moderateScale(55)}
                maxLength={14}
                numberpad={true}
                value={startPrice}
                returnKeyType="done"
                blurOnSubmit={false}
                marginBottom={moderateScale(12)}
              /> */}
                {emailid.includes(ConstantUtils.EMAIL_EXTENSION) ? null : (
                  <>
                    <Text style={styles.titletext}>
                      Reserve Price / Buy Now Price
                    </Text>
                    <TextField
                      placeHolder={'Reserve Price'}
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
                      value={`€ ${reservedPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                      returnKeyType="done"
                      onSubmitEditing={() => {
                        // this.focusTextInput();
                      }}
                      blurOnSubmit={false}
                      marginBottom={moderateScale(16)}
                    />
                  </>
                )}
                <Text style={styles.titletext}>Description</Text>
                <TextField
                  onChangeText={text => this.setState({discription: text})}
                  placeHolder={'Description'}
                  placeHolderTextColor={colors.darkGray}
                  isPassword={false}
                  icon={images.email_logo}
                  height={moderateScale(55)}
                  value={discription}
                  _multiline={true}
                  returnKeyType="default"
                  // onSubmitEditing={() => {
                  //   this.focusTextInput();
                  // }}
                  blurOnSubmit={false}
                />
                <ScrollView horizontal={true}>
                  {this.state.sdkobject != null
                    ? this.state.sdkobject.damageAreas?.map(res => {
                        return (
                          <View
                            style={{
                              flexDirection: 'column',
                              alignContent: 'center',
                              justifyContent: 'center',
                              marginTop: moderateScale(20),
                              marginLeft: moderateScale(13),
                            }}>
                            <Image
                              source={
                                res.photoUrl != ''
                                  ? {uri: res.photoUrl}
                                  : images.placeHolder
                              }
                              style={{
                                width: moderateScale(100),
                                height: moderateScale(100),
                                borderRadius: moderateScale(10),
                              }}
                            />
                            <Text
                              style={{
                                fontSize: moderateScale(6),
                                alignSelf: 'center',
                                marginTop: moderateScale(5),
                              }}>
                              {res.view}
                            </Text>
                          </View>
                        );
                      })
                    : null}
                </ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '92%',
                    height: 50,
                    justifyContent: 'center',
                    marginTop: moderateScale(20),
                    alignItems: 'center',
                  }}>
                  {/* <Button
                  buttonTitle={'Edit'}
                  height={moderateScale(42)}
                  borderWidth={moderateScale(1)}
                  width={width / 2 - moderateScale(25)}
                  borderRadiusApply={moderateScale(4)}
                  backgroundColor={colors.trasparent}
                  isEditButton={true}
                  onButtonPress={() => alert('Inprocess')}
                  textStyle={{
                    color: colors.colorBlue,
                    fontSize: moderateScale(16),
                    fontFamily: fonts.Poppins_Regular,
                    alignSelf: 'center',
                  }}
                /> */}

                  <Button
                    title={'Submit'}
                    titleStyle={styles.tvSubmitStyle}
                    style={styles.btnSubmitStyle}
                    onPress={() => {
                      this.onSubmitData();
                    }}
                  />

                  {/* <Button
                  buttonTitle={'Submit'}
                  height={moderateScale(42)}
                  width={width / 2}
                  borderRadiusApply={moderateScale(4)}
                  backgroundColor={colors.colorBlue}
                  onButtonPress={() => this.onSubmitData()}
                  textStyle={{
                    color: colors.colorWhite,
                    fontSize: moderateScale(16),
                    fontFamily: fonts.Poppins_Regular,
                    alignSelf: 'center',
                  }}
                /> */}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
        <Toast
          ref={toast => (this.toast = toast)}
          position="center"
          style={{backgroundColor: 'black', borderRadius: 5, padding: 10}}
        />

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
              backgroundColor: colorScheme == 'dark' ? 'black' : 'white',
            }}
          />
        )}
        {/* {isLoading && <ProgressBar visible={isLoading} />} */}
        {isLoading && <Loader />}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginResData: state.loginReducer.loginResData, //accessing the redux state
    vehicleDetailData: state.sellReducer.vehicleDetailData, //accessing the redux state
    vehicleChasisData: state.sellReducer.vehicleChasisData,
    sessionCreatedData: state.sellReducer.sessionCreatedData,
    postinsertdata: state.sellReducer.postinsertdata,
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

export default connect(mapStateToProps, mapDispatchToProps)(SellStep3);

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
    height: moderateScale(45),
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
  btnSubmitStyle: {
    height: moderateScale(42),
    width: width / 2,
    borderRadius: moderateScale(4),
    backgroundColor: colors.colorBlue,
  },
  tvSubmitStyle: {
    color: colors.colorWhite,
    fontSize: moderateScale(16),
    fontFamily: fonts.Poppins_Regular,
    alignSelf: 'center',
  },
  titletext: {
    fontFamily: fonts.Poppins_Medium,
    fontSize: moderateScale(14),
    color: colors.colorBlack,
    alignSelf: 'flex-start',
    marginLeft: moderateScale(19),
    marginBottom: moderateScale(-10),
    marginTop: moderateScale(3),
  },
});
