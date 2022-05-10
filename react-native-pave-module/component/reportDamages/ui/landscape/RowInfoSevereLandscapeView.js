/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import CircleColorView from '../general/CircleColorView';
import GridListDamageNameLandscapeView from './GridListDamageNameLandscapeView';

const RowInfoSevereLandscapeView = (props) => {
  const {damageViewData} = props;
  return (
    <View
      style={{
        flexDirection: 'column',
        marginBottom: 30,
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          width: 300,
          alignSelf: 'center',
          justifyContent: 'space-around',
          alignItems: 'center',
          textAlign: 'center',
        }}>
        <Text style={{fontSize: 20}}>Info</Text>
        <CircleColorView hexColor={'#718093'} />
        <CircleColorView hexColor={'#f9ca24'} />
        <CircleColorView hexColor={'#f0932b'} />
        <CircleColorView hexColor={'#e84118'} />
        <Text style={{fontSize: 20}}>Severe</Text>
      </View>

      <GridListDamageNameLandscapeView damageViewData={damageViewData} />
    </View>
  );
};

export default RowInfoSevereLandscapeView;
