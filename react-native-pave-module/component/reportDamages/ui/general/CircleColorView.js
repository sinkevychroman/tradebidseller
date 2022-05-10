import React from 'react';
import {View, Text} from 'react-native';

const CircleColorView = (props) => {
  const {hexColor} = props;
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

export default CircleColorView;
