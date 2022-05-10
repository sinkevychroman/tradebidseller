/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {replaceUnderscore} from '../../utils';

const ItemDamageTextView = ({title, content}) => {
  return (
    <View style={{flexDirection: 'column', marginTop: 5, marginBottom: 5}}>
      <Text style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
        {replaceUnderscore(title ?? '')}
      </Text>
      {content === '' ? (
        <View />
      ) : (
        <Text style={{fontSize: 20}}>{content}</Text>
      )}
    </View>
  );
};

export default ItemDamageTextView;
