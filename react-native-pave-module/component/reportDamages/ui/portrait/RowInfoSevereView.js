/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import CircleColorView from '../general/CircleColorView';
import GridListDamageNameView from './GridListDamageNameView';

const RowInfoSevereView = (props) => {
  const {damageViewData} = props;

  return (
    <View
      style={{
        flexDirection: 'column',
        marginBottom: 30,
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

      <GridListDamageNameView damageViewData={damageViewData} />

      <View
        style={[
          {
            width: '150%',
            height: 1,
            backgroundColor: '#dadada',
            marginLeft: -10,
            marginTop: 8,
          },
        ]}
      />
    </View>
  );
};

export default RowInfoSevereView;
