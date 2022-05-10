/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {replaceUnderscore} from '../../utils';
import useScreenDimensions from '../../../../hook/UseScreenDimensions';
import ItemDamageTextLandscapeView from './ItemDamageTextLandscapeView';

const NotNormalDamageItemLandscapeView = (props) => {
  const {value} = props;

  const screenData = useScreenDimensions();

  return (
    <View style={{flexDirection: 'row'}}>
      {/* <Text>{value.damage_group}</Text> */}
      <View
        style={{
          height: 16,
          width: 16,
          marginHorizontal: 3,
        }}
      />
      <ItemDamageTextLandscapeView
        flex={1.5}
        content={replaceUnderscore(value?.component) ?? '-'}
      />
      <View
        style={{
          flex: 1.8,
          alignItems: 'center',
          height: 1,
          width: screenData.height / 4,
        }}
      />

      <ItemDamageTextLandscapeView flex={1.5} content={value?.label ?? '-'} />
      <ItemDamageTextLandscapeView
        flex={1.5}
        content={value?.description ?? '-'}
      />

      <ItemDamageTextLandscapeView
        flex={1.5}
        content={value?.repair_method ?? '-'}
      />

      <View style={{height: 1, flex: 2.2}} />
    </View>
  );
};

export default NotNormalDamageItemLandscapeView;
