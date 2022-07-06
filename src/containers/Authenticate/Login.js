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
} from 'react-native';
import {colors, images, strings, fonts} from '../../themes';
import {moderateScale} from '../../utils/ResponsiveUi';
import {Actions, ActionConst} from 'react-native-router-flux';
import {
  ConstantUtils,
  ApiUtils,
  WebService,
  FunctionHelper,
  NetworkUtils,
} from '../../utils';
import * as globals from '../../utils/globals';
import ProgressBar from '../../custom/ProgressBar';
import TextField from '../../custom/TextField';
import Button from '../../custom/Button';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ActionCreators} from '../../redux/actions';
import thunk from 'redux-thunk';
import {FunctionUtils, PrefrenceManager, PreferenceKey} from '../../utils';
import Loader from '../../components/LoaderOpacity';
import axios from 'react-native-axios';
const {width, height} = Dimensions.get('window');
// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isTesting} from '../../utils/globals';

const TAG = 'Login';
class Login extends Component {
  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
    this.state = {
      isLoading: false,
      latitude: 0,
      longitude: 0,
      //email: 'test17.auctionsoftware+04@gmail.com',
      //password: '123456789',
      email: '',
      password: '',
      hideShowPass: true,
      isRemember: false,
    };
    this.passwordRef = this.updateRef.bind(this, 'password');
  }

  /**
   * To Set testing data
   * @function setTestingData
   */
  setTestingData() {
    console.log(TAG, 'setTestingData');
    if (isTesting) {
      this.setState({
        email: 'test17.auctionsoftware+15@gmail.com',
        password: '12345678',
      });
    }
  }

  async componentDidMount() {
    console.log(TAG, 'UNSAFE_componentDidMount');
    let isUserRemember = await AsyncStorage.getItem(
      ConstantUtils.IS_USER_REMEMBER,
    );
    let email = await AsyncStorage.getItem(ConstantUtils.USER_EMAIL);
    let password = await AsyncStorage.getItem(ConstantUtils.USER_PASSWORD);

    if (isUserRemember == 'true') {
      this.setState({
        email: email,
        password: password,
        isRemember: true,
      });
    }

    //To set Testing
    this.setTestingData();
  }

  setBackListener() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  backAction = async () => {
    console.log(TAG, 'backAction', 'Not Login Screen');
    if (Actions.currentScene === ConstantUtils.LOGIN) {
      Alert.alert(strings.APP_NAME, 'Do you want to close the application?', [
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
        {text: 'No', onPress: () => {}},
      ]);
      return true;
    } else {
      Actions.pop();
      console.log(TAG, 'backAction', 'Not Login Screen');
    }
  };

  componentWillUnmount() {
    if (Platform.OS == 'android') {
      console.log(TAG, 'componentWillUnmount', 'Remove Back Action');
      // this.backHandler.remove();
    }
  }

  hideShowPassword() {
    console.log(TAG, 'hideShowPassword');
    this.setState({hideShowPass: !this.state.hideShowPass});
  }

  validateSignin() {
    const {email, password} = this.state;
    if (email.length === 0 || email.trim().length === 0) {
      FunctionUtils.showToast(strings.emailBlankError);
    } else if (password.length === 0 || password.trim().length === 0) {
      FunctionUtils.showToast(strings.passwordBlank);
    } else {
      this.loginBtnClick();
    }
  }

  async loginBtnClick() {
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected) {
      this.setState({isLoading: true});
      const formData = new FormData();
      formData.append('business_email', this.state.email);
      formData.append('password', this.state.password);
      this.props.loginReq(formData).then(async () => {
        const {loginResData, msgError, error} = this.props;
        let errorData;
        console.log('loginResData', loginResData);
        if (loginResData && loginResData.statusCode === 200) {
          if (this.state.isRemember) {
            AsyncStorage.setItem(ConstantUtils.IS_USER_REMEMBER, 'true');
          } else {
            AsyncStorage.setItem(ConstantUtils.IS_USER_REMEMBER, 'false');
          }
          AsyncStorage.setItem(ConstantUtils.IS_USER_LOGIN, 'true');

          AsyncStorage.setItem(
            ConstantUtils.USER_PASSWORD,
            this.state.password,
          );
          AsyncStorage.setItem(ConstantUtils.USER_TOKEN, loginResData.token);
          AsyncStorage.setItem(ConstantUtils.USER_EMAIL, this.state.email);

          FunctionUtils.showToast(loginResData.message);
          if (this.state.isRemember) {
            globals.rememberBtnVal = true;
            globals.userEmail = this.state.email;
            globals.userPass = this.state.password;
          } else {
            globals.rememberBtnVal = false;
            globals.userEmail = '';
            globals.userPass = '';
          }
          this.setState(
            {isLoading: false, isRemember: false, email: '', password: ''},
            Actions.push(ConstantUtils.SELL),
          );
        } else {
          this.setState({isLoading: false});
          // console.log("msgError=======================", msgError);
          FunctionUtils.showToast(loginResData.message);
        }
      });
    } else {
      this.setState({isLoading: false});
      FunctionUtils.showToast(strings.INTERNET_CONNECTION);
    }
  }

  focusTextInput() {
    console.log(TAG, 'focusTextInput');
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    // this.textInput.current.focus();
    this.password.focus();
  }

  rememberMeBtnClick() {
    this.setState({isRemember: !this.state.isRemember});
  }

  changePass(text) {
    console.log(TAG, 'changePass -> text :', text);
    this.setState({password: text});
  }

  render() {
    const {isLoading, email, password} = this.state;
    console.log(TAG, 'password ->' + this.state.password);
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight,
          backgroundColor: colors.colorWhite,
        }}>
        <View style={{flex: 1, backgroundColor: colors.colorWhite}}>
          <View
            style={{
              height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
            }}>
            <StatusBar
              translucent
              backgroundColor={colors.status_bar_color}
              barStyle="light-content"
            />
          </View>
          <View style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
              <ScrollView>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <Image
                    source={images.app_logo}
                    resizeMode="contain"
                    style={{
                      height: moderateScale(180),
                      width: moderateScale(180),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: moderateScale(22),
                      fontFamily: fonts.Poppins_Medium,
                      color: colors.colorBlack,
                    }}>
                    {'Sign In'}
                  </Text>
                  <View
                    style={{
                      marginTop: moderateScale(40),
                      alignItems: 'center',
                    }}>
                    <TextField
                      onChangeText={text => this.setState({email: text})}
                      placeHolder={strings.place_holder_email}
                      isPassword={false}
                      icon={images.email_logo}
                      height={moderateScale(45)}
                      width={'100%'}
                      value={email}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.focusTextInput();
                      }}
                      blurOnSubmit={false}
                      marginBottom={moderateScale(16)}
                      secondletterkeyboard={true}
                    />
                    <TextField
                      onChangeText={text => this.setState({password: text})}
                      placeHolder={strings.place_holder_password}
                      ref={this.passwordRef}
                      icon={images.password_logo}
                      height={moderateScale(45)}
                      width={'100%'}
                      value={password}
                      isHideShowPass={this.state.hideShowPass}
                      isPassword={true}
                      passwordStatus={this.state.hideShowPass}
                      onPressHideShow={() => {
                        this.hideShowPassword();
                      }}
                      returnKeyType="done"
                    />
                    <View
                      style={{
                        marginTop: moderateScale(5),
                        paddingHorizontal: moderateScale(5),
                        justifyContent: 'space-between',
                        height: moderateScale(40),
                        flexDirection: 'row',
                        //width: "100%",
                        alignItems: 'center',
                      }}>
                      <Button
                        title={strings.username_password_remember}
                        titleStyle={styles.tvUserpassStyle}
                        style={styles.btnUserpassRememberStyle}
                        isRememberButton={true}
                        isChecked={this.state.isRemember}
                        onPress={() => {
                          this.rememberMeBtnClick();
                        }}
                      />

                      {/*  
                      <Button
                        buttonTitle={strings.username_password_remember}
                        height={moderateScale(30)}
                        isRememberButton={true}
                        isRemember={this.state.isRemember}
                        width={'40%'}
                        backgroundColor={colors.transparent}
                        onButtonPress={() => this.rememberMeBtnClick()}
                        textStyle={{
                          color: colors.colorBlack,
                          fontSize: moderateScale(14),
                          alignSelf: 'flex-start',
                          marginTop: moderateScale(10),
                          fontFamily: fonts.Poppins_Light,
                        }}
                      /> */}

                      <Button
                        title={strings.forgot_password}
                        titleStyle={styles.tvForgotPassStyle}
                        style={styles.btnForgotPassStyle}
                        isForgot={true}
                        onPress={() => {
                          Linking.openURL(
                            WebService.BASE_URL + WebService.RESET_PASSWORD,
                          );
                        }}
                      />

                      {/* <Button
                        buttonTitle={strings.forgot_password}
                        height={moderateScale(30)}
                        width={'40%'}
                        backgroundColor={colors.trasparent}
                        onButtonPress={() =>
                          Linking.openURL(WebService.RESET_PASSWORD)
                        }
                        textStyle={{
                          color: colors.colorBlack,
                          fontSize: moderateScale(14),
                          alignSelf: 'flex-start',
                          marginTop: moderateScale(10),
                          fontFamily: fonts.Poppins_Light,
                          width: '100%',
                        }}
                      /> */}
                    </View>

                    <Button
                      title={strings.login_text}
                      titleStyle={styles.tvLoginStyle}
                      style={styles.btnLoginStyle}
                      onPress={() => {
                        this.validateSignin();
                      }}
                    />

                    {/* <Button
                      buttonTitle={strings.login_text}
                      height={moderateScale(42)}
                      width={width - moderateScale(25)}
                      borderRadiusApply={moderateScale(4)}
                      backgroundColor={colors.colorBlue}
                      marginTop={moderateScale(20)}
                      onButtonPress={() => this.validateSignin()}
                      textStyle={{
                        color: colors.colorWhite,
                        fontSize: moderateScale(16),
                        alignSelf: 'center',
                        fontFamily: fonts.Poppins_Medium,
                      }}
                    /> */}

                    {/* <Button
                      title={strings.create_account}
                      titleStyle={styles.tvCreateAccountStyle}
                      style={styles.btnCreateAccountStyle}
                      onPress={() => { Linking.openURL(WebService.CREATE_NEW_ACCOUNT) }}

                    /> */}
                    {/* <Button
                      buttonTitle={strings.create_account}
                      height={moderateScale(30)}
                      width={'60%'}
                      marginTop={moderateScale(20)}
                      backgroundColor={colors.transparent}
                      onButtonPress={() =>
                        Linking.openURL(WebService.CREATE_NEW_ACCOUNT)
                      }
                      textStyle={{
                        color: colors.colorBlue,
                        fontSize: moderateScale(14),
                        fontFamily: fonts.Poppins_Regular,
                        alignSelf: 'flex-end',
                        marginTop: moderateScale(10),
                      }}
                    /> */}
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
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
    isloading: state.loginReducer.isLoading,
    error: state.loginReducer.error, //accessing the redux state
    msgError: state.loginReducer.msgError, //accessing the redux state
    clientPortalResData: state.loginReducer.clientPortalResData,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorWhite,
    alignItems: 'center',
  },
  btnUserpassRememberStyle: {
    width: '35%',
    height: moderateScale(30),
    backgroundColor: 'transparent',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  tvUserpassStyle: {
    color: colors.colorBlack,
    fontSize: moderateScale(14),
    // marginTop: moderateScale(10),
    top: moderateScale(5),
    fontFamily: fonts.Poppins_Light,
    height: moderateScale(30),
  },
  btnForgotPassStyle: {
    height: moderateScale(30),
    width: '60%',
    backgroundColor: colors.trasparent,
  },
  tvForgotPassStyle: {
    color: colors.colorBlack,
    fontSize: moderateScale(14),
    alignSelf: 'flex-start',
    marginTop: moderateScale(10),
    fontFamily: fonts.Poppins_Light,
    width: '100%',
    height: moderateScale(30),
    maxWidth: '100%',
    textAlign: 'right',
  },
  btnLoginStyle: {
    height: moderateScale(42),
    width: width - moderateScale(25),
    borderRadius: moderateScale(4),
    backgroundColor: colors.colorBlue,
    marginTop: moderateScale(20),
  },
  tvLoginStyle: {
    color: colors.colorWhite,
    fontSize: moderateScale(16),
    alignSelf: 'center',
    fontFamily: fonts.Poppins_Medium,
  },
  btnCreateAccountStyle: {
    height: moderateScale(30),
    width: '60%',
    marginTop: moderateScale(20),
    backgroundColor: colors.transparent,
  },
  tvCreateAccountStyle: {
    color: colors.colorBlue,
    fontSize: moderateScale(14),
    fontFamily: fonts.Poppins_Regular,
    alignSelf: 'flex-end',
    marginTop: moderateScale(10),
  },
});
