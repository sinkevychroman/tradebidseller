/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Platform} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
import {UPDATE_EXT_COL_URL} from '../../../constants/index';
import {Logger} from '../../../utils/AppLogger';
export default VehicleExtColorView = (props) => {
  VehicleExtColorView.PropTypes = {
    vehicleExtColor: PropTypes.string.isRequired,
    vehicleId: PropTypes.string.isRequired,
  };

  const [vehicleColorValue, setVehicleColorValue] = useState('-');
  useEffect(() => setVehicleColorValue(props.vehicleExtColor), [
    props.vehicleExtColor,
  ]);

  function _callAPI(color) {
    Logger(color);
    if (props.vehicleId !== '') {
      var formData = new FormData();
      formData.append('ext_col', color);
      var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };
      Logger(requestOptions);
      fetch(UPDATE_EXT_COL_URL + props.vehicleId, requestOptions)
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
    <View style={styles.rowTextBox2}>
      <View style={styles.textBoxContent}>
        <Text style={styles.titleTextVehicle}>EXT. COLOUR</Text>
        <TextInput
          style={{color: '#000'}}
          placeholderTextColor="#666"
          height={30}
          padding={0}
          keyboardType="default"
          textTransform="capitalize"
          placeholder=""
          onChangeText={setVehicleColorValue}
          value={vehicleColorValue}
          onEndEditing={(event) => _callAPI(event.nativeEvent.text)}
        />
      </View>
    </View>
  );
};
