/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import useScreenDimensions from '../../hook/UseScreenDimensions';

const ItemSelectMethodCaptureVin = ({icon, label, onPress}) => {
  const screenData = useScreenDimensions();
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: screenData.width / 6,
          height: screenData.height / 4,
          backgroundColor: 'rgba(18, 18,18, 1)',
          borderRadius: 5,
          // padding: 10,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'flex-start',
          alignSelf: 'center',
          margin: 12,
          padding: 5,
        }}>
        <Image
          style={{
            height: screenData.height / 10,
            width: screenData.height / 10,
          }}
          source={icon}
        />
        <Text
          style={{
            color: '#9099a8',
            textAlign: 'center',
            fontWeight: 'bold',
            margin: 5,
          }}>
          {label ?? ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemSelectMethodCaptureVin;
