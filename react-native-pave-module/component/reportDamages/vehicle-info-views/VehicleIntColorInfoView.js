// VehicleIntColorInfoView;

/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
import {UPDATE_INT_COL_URL} from '../../../constants/index';
import {Logger} from '../../../utils/AppLogger';

export const VehicleIntColorInfoView = (props) => {
  VehicleIntColorInfoView.PropTypes = {
    vehicleIntColor: PropTypes.string.isRequired,
    vehicleId: PropTypes.string.isRequired,
  };

  const [vehicleIntColorValue, setVehicleIntColorValue] = useState('-');

  useEffect(() => setVehicleIntColorValue(props.vehicleIntColor), [
    props.vehicleIntColor,
  ]);

  function _callAPI(int_col) {
    if (props.vehicleId !== '' && int_col.trim() !== '') {
      var formData = new FormData();
      formData.append('int_col', int_col);
      var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };

      fetch(UPDATE_INT_COL_URL + props.vehicleId, requestOptions)
        .then((response) => {
          Logger(
            '==========>',
            response.status + ' ' + JSON.stringify(response),
          );
          //   alert(response.ok ? 'Successful' : 'Fail');
        })
        .catch((error) => Logger('error', error));
    }
  }

  return (
    <View style={styles.textBoxContent}>
      <Text style={styles.titleTextVehicle}>INT. COLOUR</Text>
      <TextInput
        style={{color: '#000'}}
        placeholderTextColor="#666"
        height={20}
        padding={0}
        keyboardType="default"
        placeholder=""
        onChangeText={setVehicleIntColorValue}
        value={vehicleIntColorValue}
        onEndEditing={(event) => _callAPI(event.nativeEvent.text)}
      />
    </View>
  );
};

export default VehicleIntColorInfoView;
