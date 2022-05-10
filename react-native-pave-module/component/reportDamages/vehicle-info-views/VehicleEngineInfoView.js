/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
import {UPDATE_ENGINE_TYPE_URL} from '../../../constants/index';
import {Logger} from '../../../utils/AppLogger';
export const VehicleEngineInfoView = (props) => {
  VehicleEngineInfoView.PropTypes = {
    vehicleEngine: PropTypes.string.isRequired,
    vehicleId: PropTypes.string.isRequired,
  };

  const [vehicleEngineValue, setVehicleEngineValue] = useState('-');

  useEffect(() => setVehicleEngineValue(props.vehicleBodyStyle), [
    props.vehicleBodyStyle,
  ]);

  function _callAPI(engine_type) {
    Logger(engine_type);
    if (props.vehicleId !== '' && engine_type.trim() !== '') {
      var formData = new FormData();
      formData.append('engine_type', engine_type);
      var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };
      Logger(requestOptions);
      fetch(UPDATE_ENGINE_TYPE_URL + props.vehicleId, requestOptions)
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
      <Text style={styles.titleTextVehicle}>Engine</Text>
      <TextInput
        style={{color: '#000'}}
        placeholderTextColor="#666"
        height={20}
        padding={0}
        keyboardType="default"
        textTransform="capitalize"
        placeholder=""
        onChangeText={setVehicleEngineValue}
        value={vehicleEngineValue}
        onEndEditing={(event) => _callAPI(event.nativeEvent.text)}
      />
    </View>
  );
};
export default VehicleEngineInfoView;
