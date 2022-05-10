/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Dimensions, Text} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);
export const TireRowInfoSevere = () => {
  const tireCircleColor = (color, title) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          margin: 5,
          justifyContent: 'flex-start',
          alignSelf: 'flex-start',
          alignItems: 'flex-start',
          alignContent: 'flex-start',
        }}>
        {circleColor(color)}
        <View style={{width: 10}} />
        <Text style={{fontSize: 20, fontWeight: '600'}}>{title}</Text>
      </View>
    );
  };
  const circleColor = (hexColor) => {
    return (
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 100,
          backgroundColor: hexColor,
        }}
      />
    );
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        marginBottom: 30,
      }}>
      <View
        style={{
          flexDirection: 'column',

          textAlign: 'center',
        }}>
        <View style={{flexDirection: 'column'}}>
          {tireCircleColor('#00b894', 'Like New')}
          {tireCircleColor('#f9ca24', 'Good Condition')}
          {tireCircleColor('#f0932b', 'Medium Worn')}
          {tireCircleColor('#b71540', 'Major Worn')}
          {tireCircleColor('#74b9ff', 'Snow Tire')}
        </View>
      </View>
    </View>
  );
};
