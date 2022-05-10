/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
import {UPDATE_TRANSMISSION_URL} from '../../../constants/index';
import {Logger} from '../../../utils/AppLogger';
export const VehicleTransmissionInfoView = (props) => {
  VehicleTransmissionInfoView.PropTypes = {
    vehicleTransmission: PropTypes.string.isRequired,
    vehicleId: PropTypes.string.isRequired,
  };

  const [vehicleTransmissionValue, setVehicleTransmissionValue] = useState('-');

  useEffect(() => setVehicleTransmissionValue(props.vehicleTransmission), [
    props.vehicleTransmission,
  ]);

  function _callAPI(transmission) {
    if (props.vehicleId !== '' && transmission.trim() !== '') {
      var formData = new FormData();
      formData.append('transmission', transmission);
      var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };
      Logger(requestOptions);
      fetch(UPDATE_TRANSMISSION_URL + props.vehicleId, requestOptions)
        .then((response) =>
          Logger(
            '==========>',
            response.status + ' ' + JSON.stringify(response),
          ),
        )
        .catch((error) => Logger('error', error));
    }
  }

  return (
    <View style={styles.textBoxContent}>
      <Text style={styles.titleTextVehicle}>Transmission</Text>
      <TextInput
        style={{color: '#000'}}
        placeholderTextColor="#666"
        height={20}
        padding={0}
        keyboardType="default"
        textTransform="uppercase"
        placeholder=""
        onChangeText={setVehicleTransmissionValue}
        value={vehicleTransmissionValue}
        onEndEditing={(event) => _callAPI(event.nativeEvent.text)}
      />
    </View>
  );
};
export default VehicleTransmissionInfoView;
