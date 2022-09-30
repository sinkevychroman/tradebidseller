import React, {Component, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {WebService} from '../../utils';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ConstantUtils} from '../../utils';
import Orientation from 'react-native-orientation-locker';

const TAG = 'ArbitrationPolicy';

const ArbitrationPolicy = props => {
  useEffect(() => {
    // Update the document title using the browser API
    Orientation.lockToLandscape();
    console.log('ARBITRATION_POLICY_LOCKTOPORTRAIT');
  });

  const LoadingIndicatorView = () => {
    return (
      <ActivityIndicator
        color="#0a1142"
        size="large"
        style={{
          flex: 1,
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          position: 'absolute',
        }}
      />
    );
  };

  const arbitaryUpdate = async () => {
    console.log('UPDATE_ARBITARY_START');

    const token = await AsyncStorage.getItem(ConstantUtils.USER_TOKEN);

    const host = WebService.BASE_URL;
    const url = `${host}${WebService.ARBITARY_UPDATE}`;

    let options = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    return fetch(url, options).then(response => {
      console.log('ARBITARY_UPDATE_RESPONSE', response);
      AsyncStorage.setItem(ConstantUtils.IS_ARBITRATION_POLICY, 'true');
      Actions.pop();
      Orientation.lockToPortrait();
    });
  };

  return (
    <WebView
      style={{backgroundColor: 'ffffff', flex: 1}}
      source={{
        uri: WebService.BASE_URL + 'arbitration/mobile',
      }}
      renderLoading={LoadingIndicatorView}
      startInLoadingState
      scalesPageToFit
      javaScriptEnabled={true}
      domStorageEnabled={true}
      onNavigationStateChange={navState => {
        console.log('navstateurl', navState.url);

        if (navState.url === WebService.BASE_URL + 'arbitration/success') {
          arbitaryUpdate();
        }
      }}
    />
  );
};

export default ArbitrationPolicy;
