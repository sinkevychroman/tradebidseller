/* eslint-disable react-native/no-inline-styles */
// VehicleDisplacementInfoView.js;
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
import {UPDATE_DISPLACEMENT_URL} from '../../../constants/index';
import {Logger} from '../../../utils/AppLogger';
export const VehicleDisplacementInfoView = (props) => {
  VehicleDisplacementInfoView.PropTypes = {
    vehicleDisplacement: PropTypes.string.isRequired,
    vehicleId: PropTypes.string.isRequired,
  };

  const [vehicleDisplacementValue, setVehicleDisplacementValue] = useState('-');

  useEffect(() => setVehicleDisplacementValue(props.vehicleDisplacement), [
    props.vehicleDisplacement,
  ]);

  function _callAPI(displacement) {
    Logger(displacement);
    if (props.vehicleId !== '' && displacement.trim() !== '') {
      var formData = new FormData();
      formData.append('displacement', displacement);
      var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };
      Logger(requestOptions);
      fetch(UPDATE_DISPLACEMENT_URL + props.vehicleId, requestOptions)
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
      <Text style={styles.titleTextVehicle}>Displacement</Text>
      <TextInput
        style={{color: '#000'}}
        placeholderTextColor="#666"
        height={20}
        padding={0}
        keyboardType="default"
        textTransform="capitalize"
        placeholder=""
        onChangeText={setVehicleDisplacementValue}
        value={vehicleDisplacementValue}
        onEndEditing={(event) => _callAPI(event.nativeEvent.text)}
      />
    </View>
  );
};

export default VehicleDisplacementInfoView;
