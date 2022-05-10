/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Platform} from 'react-native';
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import {UPDATE_ODOMETER_URL} from '../../../constants/index';
import {Logger} from '../../../utils/AppLogger';
import {colors} from '../../../styles/base';

const VehicleOdometerInfoView = (props) => {
  VehicleOdometerInfoView.propTypes = {
    vehicleId: PropTypes.string.isRequired,
    odomReadingValue: PropTypes.string.isRequired,
    odomUnitValue: PropTypes.string.isRequired,
  };

  const styles = StyleSheet.create({
    textBoxContent: {
      height: 70,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      alignContent: 'center',
    },
    titleTextVehicle: {
      color: colors.text,
      letterSpacing: 2,
      fontSize: 14,
      marginBottom: 5,
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    rowTextBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 1,
      borderColor: colors.border,
      zIndex: 9,
    },
    dividerBoxContent: {
      borderRightWidth: 1,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      // paddingVertical: 12,
      // paddingHorizontal: 10,
      // borderWidth: 1,
      // borderColor: 'gray',
      // borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      color: '#000',
      paddingRight: 20, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 14,
      // paddingHorizontal: 10,
      // paddingVertical: 8,
      // borderWidth: 0.5,
      // borderColor: 'purple',
      // borderRadius: 8,
      // color: '#000',
      // alignSelf: 'center',
      // backgroundColor: 'black',
      // paddingRight: 20, // to ensure the text is never behind the icon
    },
  });

  const [odomReadingValue, setOdomReadingValue] = useState('-');
  const [odomUnitValue, setOdomUnitValue] = useState('-');

  useEffect(() => {
    setOdomReadingValue(props?.odomReadingValue ?? '---');
    setOdomUnitValue(props?.odomUnitValue ?? '---');
  }, [props?.odomReadingValue, props?.odomUnitValue]);

  function _callAPI(odom_reading, odom_unit) {
    Logger(odom_reading, odom_unit.toUpperCase());
    if (props.vehicleId !== '') {
      var formdata = new FormData();
      formdata.append('odom_reading', odom_reading);
      formdata.append('odom_unit', odom_unit.toUpperCase());

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };
      Logger(requestOptions);
      fetch(UPDATE_ODOMETER_URL + props.vehicleId, requestOptions)
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
    <View style={styles.rowTextBox}>
      <View style={styles.textBoxContent}>
        <Text style={styles.titleTextVehicle}>Odometer</Text>
        <TextInput
          style={{color: '#000'}}
          placeholderTextColor="#666"
          height={20}
          padding={0}
          keyboardType="numeric"
          placeholder=""
          onChangeText={setOdomReadingValue}
          value={odomReadingValue}
          onEndEditing={(event) =>
            _callAPI(event.nativeEvent.text, odomUnitValue)
          }
        />
      </View>
      <View style={styles.dividerBoxContent} />
      <View style={styles.textBoxContent}>
        <Text style={styles.titleTextVehicle}>Odometer Type</Text>

        {odomUnitValue !== '-' ? (
          <View
            style={{
              height: 20,
              width: 160,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'flex-end',
              textAlign: 'center',
            }}>
            <RNPickerSelect
              value={odomUnitValue === 'miles' ? 'miles' : 'kilometres'}
              onValueChange={(value) => {
                if (value !== null) {
                  Logger('onValueChange', value.toUpperCase());
                  setOdomUnitValue(value);
                  _callAPI(odomReadingValue, value.toUpperCase());
                }
              }}
              items={[
                {label: 'KILOMETRES', value: 'kilometres', color: '#000'},
                {label: 'MILES', value: 'miles', color: '#000'},
              ]}
              style={pickerSelectStyles}
              placeholder={{}}
              Icon={() => {
                return (
                  <View
                    style={{
                      marginTop: Platform.OS === 'ios' ? 4 : 20,
                      backgroundColor: 'transparent',
                      borderTopWidth: 8,
                      borderTopColor: 'gray',
                      borderRightWidth: 8,
                      borderRightColor: 'transparent',
                      borderLeftWidth: 8,
                      borderLeftColor: 'transparent',
                      width: 0,
                      height: 0,
                    }}
                  />
                );
              }}
            />
          </View>
        ) : (
          <View style={{height: 20}}>
            <Text>-</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default VehicleOdometerInfoView;
