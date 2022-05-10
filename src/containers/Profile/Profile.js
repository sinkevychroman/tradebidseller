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
import TextField from '../../custom/TextField';
import Button from '../../custom/Button';
import NetInfo from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
const {width, height} = Dimensions.get('window');

const TAG = 'Profile';
export default class Profile extends Component {
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

  async componentDidMount() {}

  setBackListener() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
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
      this.backHandler.remove();
    }
  }

  hideShowPassword() {
    this.setState({hideShowPass: !this.state.hideShowPass});
  }

  render() {
    const {isLoading, email, password} = this.state;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight,
          backgroundColor: colors.colorWhite,
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{'Profile Screen In Process'}</Text>
        </View>
        {isLoading && <ProgressBar visible={isLoading} />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorWhite,
    alignItems: 'center',
  },
});
