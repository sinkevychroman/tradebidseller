/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {TouchableOpacity, Text, Image, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
const AppButton = (props) => {
  AppButton.propTypes = {
    iconUri: PropTypes.string.isRequired,
  };

  AppButton.defaultProps = {
    iconUri: '',
  };

  const {backgroundColor, label, onPress, style} = props;
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          width: 140,
          elevation: 4,
          height: 50,
          backgroundColor: backgroundColor,
          borderRadius: 40,
        },
        style,
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {props.iconUri !== '' ? (
          <Image
            style={{
              height: 24,
              width: 24,
              resizeMode: 'contain',
              marginHorizontal: 5,
            }}
            source={props.iconUri}
          />
        ) : (
          <View />
        )}
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
