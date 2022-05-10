// VehicleFuelInfoView;

/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
import {UPDATE_FUEL_TYPE_URL} from '../../../constants/index';
import {Logger} from '../../../utils/AppLogger';
export const VehicleFuelInfoView = (props) => {
  VehicleFuelInfoView.PropTypes = {
    vehicleFuel: PropTypes.string.isRequired,
    vehicleId: PropTypes.string.isRequired,
  };

  const [vehicleFuelValue, setVehicleFuelValue] = useState('-');

  useEffect(() => setVehicleFuelValue(props.vehicleFuel), [props.vehicleFuel]);

  function _callAPI(fuel_type) {
    Logger(fuel_type);
    if (props.vehicleId !== '' && fuel_type.trim() !== '') {
      var formData = new FormData();
      formData.append('fuel_type', fuel_type);
      var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };
      Logger(requestOptions);
      fetch(UPDATE_FUEL_TYPE_URL + props.vehicleId, requestOptions)
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
    <View style={styles.textBoxContent2}>
      <Text style={styles.titleTextVehicle}>FUEL</Text>
      <TextInput
        style={{color: '#000'}}
        placeholderTextColor="#666"
        height={20}
        padding={0}
        keyboardType="default"
        placeholder=""
        onChangeText={setVehicleFuelValue}
        value={vehicleFuelValue}
        onEndEditing={(event) => _callAPI(event.nativeEvent.text)}
      />
    </View>
  );
};

export default VehicleFuelInfoView;
