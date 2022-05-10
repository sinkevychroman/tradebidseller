import {View, Image, Text, StyleSheet, StatusBar} from 'react-native';
import React, {Component} from 'react';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {ConstantUtils, PrefrenceManager, PreferenceKey} from '.';
import {Actions} from 'react-native-router-flux';
import {colors, images, strings, fonts} from '../themes';
import {moderateScale} from '../utils/ResponsiveUi';

const TAG = 'FunctionHelper';
export default class FunctionHelper {
  static changeDateFormat(dateString, formate) {
    var dateMonthAsWord = moment(dateString).format(formate);
    var dateANDtime = dateMonthAsWord;
    return dateANDtime;
  }

  static changeDateFormatWithInput(dateString, inputFormat, outputFormate) {
    var dateMonthAsWord = moment(dateString, inputFormat).format(outputFormate);
    var dateANDtime = dateMonthAsWord;
    return dateANDtime;
  }

  static showToast(toastString) {
    setTimeout(() => Toast.show(toastString, Toast.SHORT), 10);
  }

  static showLongToast(toastString) {
    setTimeout(() => Toast.show(toastString, Toast.LONG), 10);
  }

  static validateEmail = email => {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  };

  static GetFilename = url => {
    if (url) {
      var m = url.split('/').pop().split('#')[0].split('?')[0];
      return m;
    }
    return '';
  };

  static async clearData() {
    console.log('Cleardata method called');
    await PrefrenceManager.clearPreference();
    Actions.reset('Login');
  }

  static tabView(step, stepName, isCompleteStep, isCurrentTab) {
    return (
      <View style={styles.tabViewMain}>
        <View
          style={[
            styles.tabViewSub,
            {
              backgroundColor: isCompleteStep
                ? colors.completed_step_pink
                : colors.colorWhite,
            },
          ]}>
          <Text
            style={
              ([styles.textRoundView],
              {
                color: isCompleteStep
                  ? colors.colorWhite
                  : isCurrentTab
                  ? colors.colorBlue
                  : colors.darkGray,
              })
            }>
            {step}
          </Text>
        </View>
        <Text
          style={[
            styles.textTabName,
            {
              color: isCompleteStep
                ? colors.completed_step_pink
                : isCurrentTab
                ? colors.colorBlue
                : colors.darkGray,
            },
          ]}>
          {stepName}
        </Text>
      </View>
    );
  }

  static doubleArrow() {
    return (
      <View style={styles.doubleArrowView}>
        <Image source={images.double_arrow} style={styles.doubleArrowImage} />
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
  tabViewMain: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabViewSub: {
    height: moderateScale(45),
    width: moderateScale(45),
    borderRadius: moderateScale(22.5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: colors.colorBlack,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: moderateScale(4),
    elevation: 3,
  },
  textRoundView: {
    fontSize: moderateScale(22),
    fontFamily: fonts.Poppins_Medium,
    color: colors.darkGray,
  },
  textTabName: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(10),
    fontFamily: fonts.Poppins_Medium,
    color: colors.darkGray,
    fontWeight:'300'
  },
  safeAreaStyle: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.light_gray,
  },
  doubleArrowView: {
    width: '5%',
    height: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center'
  },
  doubleArrowImage: {
    height: moderateScale(10),
    width: moderateScale(10),
    top: moderateScale(10),
    resizeMode: 'contain',
    tintColor: colors.darkGray,
  },
});
