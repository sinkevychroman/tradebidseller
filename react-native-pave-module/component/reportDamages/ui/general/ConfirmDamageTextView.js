/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

const ConfirmDamageTextView = () => {
  return (
    <View>
      <Text
        style={{
          marginTop: 20,
          marginBottom: 20,
          textTransform: 'uppercase',
          alignSelf: 'center',
          fontSize: 26,
          fontWeight: '500',
        }}>
        Confirm Damage
      </Text>

      <Text
        style={{
          marginBottom: 20,
          alignSelf: 'center',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 18,
          color: '#7d838e',
          fontWeight: 'normal',
        }}>
        Carefully review the damage detected by PAVE accepting or denying each
        one as you feel fit.
      </Text>
    </View>
  );
};

export default ConfirmDamageTextView;
