import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { colors, fonts, images } from '../themes';
import { moderateScale } from "../utils/ResponsiveUi";
const {width, height} = Dimensions.get('window');

const LoaderOpacity = () => {
  return (
    <View
      style={{
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
      }}
    >
      <View
        style={{
          backgroundColor: colors.colorWhite,
          height: moderateScale(100),
          width: moderateScale(100),
          borderRadius: moderateScale(15),
        }}
      >
      <Image source={images.loader_car} style={{resizeMode: 'contain',height: moderateScale(100),
          width: moderateScale(100),alignSelf: 'center'
}}/>
      </View>
    </View>
  );
};

export default LoaderOpacity;
