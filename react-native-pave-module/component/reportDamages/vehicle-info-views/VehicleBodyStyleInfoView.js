/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
import {UPDATE_BODY_TYPE_URL} from '../../../constants/index';
import {Logger} from '../../../utils/AppLogger';
export const VehicleBodyStyleInfoView = (props) => {
  VehicleBodyStyleInfoView.PropTypes = {
    vehicleBodyStyle: PropTypes.string.isRequired,
    vehicleId: PropTypes.string.isRequired,
  };

  const [vehicleBodyStyleInfoValue, setVehicleBodyStyleInfoValue] = useState(
    '-',
  );

  useEffect(() => setVehicleBodyStyleInfoValue(props.vehicleBodyStyle), [
    props.vehicleBodyStyle,
  ]);

  function _callAPI(transmission) {
    if (props.vehicleId !== '' && transmission.trim() !== '') {
      var formData = new FormData();
      formData.append('body_type', transmission);
      var requestOptions = {
        method: 'POST',
        body: formData,
        redirect: 'follow',
      };

      fetch(UPDATE_BODY_TYPE_URL + props.vehicleId, requestOptions)
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
      <Text style={styles.titleTextVehicle}>Body Style</Text>
      <TextInput
        style={{color: '#000'}}
        placeholderTextColor="#666"
        height={20}
        padding={0}
        keyboardType="default"
        textTransform="uppercase"
        placeholder=""
        onChangeText={setVehicleBodyStyleInfoValue}
        value={vehicleBodyStyleInfoValue}
        onEndEditing={(event) => _callAPI(event.nativeEvent.text)}
      />
    </View>
  );
};
export default VehicleBodyStyleInfoView;
