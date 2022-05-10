/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {UPDATE_DAMAGE_BY_UUID_URL} from '../../constants/index';
import {Logger} from '../../utils/AppLogger';
import {colors} from '../../styles/base';

export const ButtonTypeView = (props) => {
  ButtonTypeView.propTypes = {
    sessionKey: PropTypes.string.isRequired,
    damageUuid: PropTypes.string.isRequired,
    userResponse: PropTypes.string.isRequired,
    showUpdateButton: PropTypes.func.isRequired,
    hideUpdateButton: PropTypes.func.isRequired,
  };

  ButtonTypeView.defaultProps = {
    height: 48,
    userResponse: '',
  };
  const borderRadius = 35;
  const height = props.height ?? 48;
  const colorDefaultText = '#9099a8';

  const [stateButton, setStateButton] = useState(null);

  // Logger(
  //   props.damageUuid + ' ' + `${props.userResponse === '' ? 'empty' : 'other'}`,
  // );

  useEffect(() => {
    // Logger(
    //   props.damageUuid +
    //     ' ' +
    //     `${props.userResponse === '' ? 'empty' : props.userResponse}`,
    // );
    var status = null;
    if (props.userResponse === 'accept') {
      status = true;
      // setStateButton(true);
    } else if (props.userResponse === 'reject') {
      status = false;
      // setStateButton(false);
    } else {
      status = null;
      // setStateButton(null);
    }
    setStateButton(status);
    // setStateButton(status);
    // Logger(stateButton);
  }, [props.damageUuid, props.userResponse]);

  const styles = StyleSheet.create({
    button: {
      borderRadius: borderRadius,
      height: height,
      fontWeight: 'bold',
      fontSize: 13,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      height: height,
      borderRadius: borderRadius,
      alignSelf: 'center',
    },
    textButton: {
      fontWeight: 'bold',
      fontSize: 13,
      color: '#9099a8',
    },
  });

  function _onYesButtonClick() {
    setStateButton(true);
    Logger('YES');
    props.showUpdateButton();
    callApiUpdateDamageByUuid(true);
  }

  function _onNoButtonClick() {
    setStateButton(false);
    Logger('NO');
    props.showUpdateButton();
    callApiUpdateDamageByUuid(false);
  }

  function _onNAButtonClick() {
    props.showUpdateButton();
    setStateButton(null);
    Logger('N/A');
    callApiUpdateDamageByUuid(true);
  }

  function callApiUpdateDamageByUuid(isAccept) {
    Logger('callApiUpdateDamageByUuid isAccept', isAccept);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'multipart/form-data');
    myHeaders.append('Accept', 'application/json, text/plain, */*');

    var formdata = new FormData();
    formdata.append('session_key', props.sessionKey);
    formdata.append('response', isAccept ? 'accept' : 'reject');
    formdata.append('uuid', props.damageUuid);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    Logger('requestOptions', requestOptions);

    fetch(UPDATE_DAMAGE_BY_UUID_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Logger('update_damages_by_uuid response', result);
      })
      .catch((error) => Logger('error', error));
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flex: 3,
          backgroundColor: '#F2F3F4',
          borderRadius: borderRadius,
          width: 300,
          height: height + 2,
          alignSelf: 'center',
        },
        props.style,
      ]}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => _onYesButtonClick()}>
        <View
          style={[
            styles.button,
            {backgroundColor: stateButton ? colors.greenButton : 'transparent'},
          ]}>
          <Text
            style={[
              styles.textButton,
              {
                color: stateButton ? 'white' : colorDefaultText,
              },
            ]}>
            YES
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.container}
        onPress={() => _onNAButtonClick()}>
        <View
          style={[
            styles.button,
            {backgroundColor: stateButton === null ? '#ffffff' : 'transparent'},
          ]}>
          <Text style={styles.textButton}>N/A</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.container}
        onPress={() => _onNoButtonClick()}>
        <View
          style={[
            styles.button,
            {
              backgroundColor:
                stateButton != null && !stateButton
                  ? colors.purpleButton
                  : 'transparent',
            },
          ]}>
          <Text
            style={[
              styles.textButton,
              {
                color:
                  stateButton != null && !stateButton
                    ? 'white'
                    : colorDefaultText,
              },
            ]}>
            NO
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonTypeView;
