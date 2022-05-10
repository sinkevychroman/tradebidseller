/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

const ItemDamageTextLandscapeView = (props) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        marginTop: 5,
        marginBottom: 5,
        paddingHorizontal: 4,
        flex: props.flex,
      }}>
      {props.content === '' ? (
        <View />
      ) : (
        <Text style={{fontSize: 12, color: 'rgba(0,0,0,0.65)'}}>
          {props.content}
        </Text>
      )}
    </View>
  );
};

export default ItemDamageTextLandscapeView;
