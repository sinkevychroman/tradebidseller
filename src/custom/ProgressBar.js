// import React, { Component } from 'react';
// import { View, SafeAreaView, StatusBar, StyleSheet, Image, Text, TextInput, ScrollView, TouchableOpacity, Linking, ActivityIndicator, Alert, Platform } from 'react-native';
// import { colors, images, strings, fonts } from '../themes';
// import { moderateScale } from '../utils/ResponsiveUi'
// import { Actions, ActionConst } from 'react-native-router-flux';
// import { ConstantUtils, PrefrenceManager } from '../utils';

// const TAG = "ProgressBar";
// export default class ProgressBar extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {

//         }
//     }

//     async componentDidMount() {

//     }

//     render() {
//         const { visible, progressBarColor, backgroundColor } = this.props
//         return (
//             <View style={{
//                 width: visible ? '100%' : 0,
//                 height: visible ? '100%' : 0,
//                 backgroundColor: backgroundColor == undefined ? colors.color_half_black : backgroundColor,
//                 position: 'absolute',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//             }}>
//                 <Image source={images.loaderRound} style={{height: moderateScale(70), width: moderateScale(70), resizeMode: 'contain'}}/>
//                 {/* <ActivityIndicator size="large" color={progressBarColor == undefined ? colors.app_pink : progressBarColor} /> */}
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {

//     }
// })



import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet,Text, Image} from 'react-native';
import { colors, images, strings, fonts } from '../themes';
import { moderateScale } from "../utils/ResponsiveUi";

const ProgressBar = () => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute'
      }}>
      <View
        style={{
          backgroundColor: colors.gray_background,
          height: moderateScale(100),
          width: moderateScale(100),
          borderRadius: moderateScale(15),
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* <ActivityIndicator
          size={"large"}
          animating={true}
          color={colors.white}
        /> */}
        <Image
          source={images.loader_car} style={{resizeMode: 'contain',height: moderateScale(100),
          width: moderateScale(100),alignSelf: 'center'
}}
        />
      </View>
    </View>
  );
};

export default ProgressBar;