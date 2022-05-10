import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Alert,
  Platform,
  ImageBackground,
} from 'react-native';
import {colors, images, strings, fonts} from '../../themes';
import {moderateScale} from '../../utils/ResponsiveUi';
import {Actions, ActionConst} from 'react-native-router-flux';
import {ConstantUtils, PrefrenceManager} from '../../utils';
import Orientation from 'react-native-orientation-locker';

const TAG = 'Splash';
export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      launchScreens: 1,
    };
  }

  async componentDidMount() {
    Orientation.lockToPortrait();
    let token = await PrefrenceManager.getPreference(ConstantUtils.USER_TOKEN);
    console.log(TAG, 'USER_TOKEN', token);
    this.setLaunchScreens();
  }

  async setLaunchScreens() {
    let isLoggedIn = await PrefrenceManager.getPreference(
      ConstantUtils.IS_USER_LOGIN,
    );
    console.log(TAG, 'isLoggedIn', isLoggedIn);
    if (this.isBlank(isLoggedIn)) {
      setTimeout(() => Actions.reset(ConstantUtils.LOGIN), 3000);
    } else {
       setTimeout(() => Actions.reset(ConstantUtils.SELL), 3000); //uncommented
      //setTimeout(() => Actions.reset(ConstantUtils.SELLSTEP3), 3000); 
    }
  }

  isBlank(text) {
    if (
      text == undefined ||
      text == null ||
      text == '' ||
      text.trim().length < 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {appLanguage} = this.state;
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          imageStyle={{resizeMode: 'cover'}}
          style={styles.backgroundImage}>
          <View
            style={{
              height: '25%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
            }}>
            <Image
              source={images.app_logo_white}
              style={{resizeMode: 'contain', width: '65%', height: '100%'}}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
