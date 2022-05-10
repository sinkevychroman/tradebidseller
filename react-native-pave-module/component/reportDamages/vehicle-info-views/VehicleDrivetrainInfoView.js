// VehicleDrivetrainInfoView

/* eslint-disable react-native/no-inline-styles */
// VehicleDisplacementInfoView.js;
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
import {UPDATE_DRIVETRAIN_URL} from '../../../constants/index';
import {Logger} from '../../../utils/AppLogger';
export const VehicleDrivetrainInfoView = (props) => {
  VehicleDrivetrainInfoView.PropTypes = {
    vehicleDrivetrain: PropTypes.string.isRequired,
    vehicleId: PropTypes.string.isRequired,
  };

  const [vehicleDrivetrainValue, setVehicleDrivetrainValue] = useState('-');

  useEffect(() => setVehicleDrivetrainValue(props.vehicleDrivetrain), [
    props.vehicleDrivetrain,
  ]);

  function _callAPI(drivetrain) {
    Logger(drivetrain);
    if (props.vehicleId !== '' && drivetrain.trim() !== '') {
      var formData = new FormData();
      formData.append('drivetrain', drivetrain);
      var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };
      Logger(requestOptions);
      fetch(UPDATE_DRIVETRAIN_URL + props.vehicleId, requestOptions)
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
      <Text style={styles.titleTextVehicle}>Drivetrain</Text>
      <TextInput
        style={{color: '#000'}}
        placeholderTextColor="#666"
        height={20}
        padding={0}
        keyboardType="default"
        placeholder=""
        onChangeText={setVehicleDrivetrainValue}
        value={vehicleDrivetrainValue}
        onEndEditing={(event) => _callAPI(event.nativeEvent.text)}
      />
    </View>
  );
};

export default VehicleDrivetrainInfoView;
