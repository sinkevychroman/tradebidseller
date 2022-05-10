/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {replaceUnderscore} from '../../utils';
import ItemDamageTextView from './ItemDamageTextView';

const NotNormalDamageItemView = (props) => {
  const {value} = props;
  return (
    <View style={{flexDirection: 'column'}}>
      <ItemDamageTextView
        title={'Component'}
        content={replaceUnderscore(value?.component) ?? '-'}
      />
      <ItemDamageTextView title={'DAMAGE TYPE'} content={value?.label ?? '-'} />
      <ItemDamageTextView
        title={'REPAIR METHOD'}
        content={value?.repair_method ?? '-'}
      />
      <ItemDamageTextView
        title={'DESCRIPTION'}
        content={value?.description ?? '-'}
      />
      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          width: '150%',
          height: 1,
          backgroundColor: '#dadada',
          marginLeft: -10,
        }}
      />
      <View style={{height: 10}} />
    </View>
  );
};

export default NotNormalDamageItemView;
