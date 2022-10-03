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
} from '../../utils';
import ProgressBar from '../../custom/ProgressBar';
import Button from '../../custom/Button';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');
import TextField from '../../custom/TextField';
import ButtonDropdown from '../../custom/ButtonDropdown';
import {color} from 'react-native-reanimated';
import PAVESDK, {PaveSDKClassic} from 'react-native-pave-module';
import Orientation from 'react-native-orientation-locker';

const TAG = '==:== SellStep2 :';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export default class SellStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      latitude: 0,
      longitude: 0,
      email: '',
      password: '',
      hideShowPass: true,
      isRemember: false,
    };
  }

  componentDidMount() {
    console.log(TAG, 'componentDidMount', 'lockToLandscape');

    Orientation.lockToLandscape();
    this.fixRNDimensions();

    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => {
        console.log(TAG, 'componentDidMount', 'unlockAllOrientations');
        this.setBackListener();
      },
    );
    //Orientation.lockToPortrait();
    //Alert.alert(global.sessionKey);
    //this.getPaveProgress()
  }

  fixRNDimensions() {
    const windowDim = Dimensions.get('window');
    const screenDim = Dimensions.get('screen');

    console.log(Orientation.orientation, 'asdasasads');

    Orientation.getOrientation = orientation => {
      console.log(orientation, 'orientation get');
    };

    if (windowDim.width < windowDim.height) {
      console.log('fixing dimensions after rotation', windowDim);
      Dimensions.set({
        screen: {
          ...screenDim,
          width: screenDim.height,
          height: screenDim.width,
        },
        window: {
          ...windowDim,
          width: windowDim.height,
          height: windowDim.width,
        },
      });
    }
  }

  getPaveProgress() {
    console.log(TAG, 'getPaveProgress_OUT');
    PAVESDK.getInspectionProgress(sessionKey).then(res => {
      Alert.alert(
        'getPaveProgress IN',
        JSON.stringify(res),
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
    });
  }

  setBackListener() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  backAction = async () => {
    return true;

    // if (Actions.currentScene === ConstantUtils.LOGIN) {
    //   Alert.alert(strings.APP_NAME, 'Do you want to close the application?', [
    //     { text: 'Yes', onPress: () => BackHandler.exitApp() },
    //     { text: 'No', onPress: () => { } },
    //   ]);
    //   return true;
    // } else {
    //   Actions.pop();
    //   console.log(TAG, 'backAction', 'Not Login Screen');
    // }
  };

  componentWillUnmount() {
    console.log(TAG, 'Orientation', 'unlockAllOrientations');
    Orientation.lockToPortrait();
    if (Platform.OS == 'android') {
      console.log(TAG, 'componentWillUnmount', 'Remove Back Action');
      // this.backHandler.remove();
    }
  }

  hideShowPassword() {
    this.setState({hideShowPass: !this.state.hideShowPass});
  }

  // PaveSDKClassicScreen(props) {
  //   return (
  //     <PaveSDKClassic
  //       {...props}
  //       sessionID={"USW-6Z7Q7BB9LC"}
  //       cancelled={() => {
  //         props.navigation.goBack();
  //       }}
  //       completed={() => {
  //         props.navigation.goBack();
  //       }}
  //     />
  //   );
  // }

  render() {
    const {isLoading, email, password} = this.state;
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
          }}>
          <StatusBar
            translucent
            backgroundColor={colors.colorBlack}
            barStyle="light-content"
          />
        </View>
        {/* <ScrollView style={{ flex: 1 }}> */}
        {/* <ScrollView style={{ height: "100%", width: "100%" }}> */}
        <View style={{height: '100%', width: '100%'}}>
          <PaveSDKClassic
            {...this.props.sessionData}
            isLiteVersion={true}
            sessionID={global.sessionKey}
            cancelled={() => {
              console.log(TAG, 'PaveSDKClassic');
              Actions.pop();
            }}
            completed={() => {
              // PAVESDK.getInspectionProgress(global.sessionKey).then(res => {
              //  Actions.reset(ConstantUtils.SELLSTEP3);
              // Alert.alert(
              //   JSON.stringify(global.sessionKey),
              //   JSON.stringify(res),
              //   [
              //     {
              //       text: 'Ok',
              //       style: 'cancel',
              //     },
              //   ],
              // );
              // });
            }}
            onBackWhenQCDone={() => {
              // props.navigation.goBack();
              PAVESDK.getInspectionProgress(global.sessionKey).then(res => {
                console.log('global.sessionKey', global.sessionKey);
                console.log('onBackWhenQCDone', res);
                setTimeout(() => {
                  Actions.reset(ConstantUtils.SELLSTEP3, {
                    isMiles: this.props.isMiles,
                  });
                }, 3000);
              });
            }}
            onDoneSession={() => {
              // props.navigation.goBack();
            }}
          />
        </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}

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
});
