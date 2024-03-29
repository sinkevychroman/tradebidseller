import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {WebService} from '../../utils';

const TAG = 'PrivacyPolicy';

const PrivacyPolicy = () => {
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

  return (
    <WebView
      style={{backgroundColor: 'ffffff', flex: 1}}
      source={{uri: WebService.BASE_URL + 'privacy/mobile'}}
      //source={{uri: 'https://tradebid.ecommerce.auction/privacy/mobile'}}
      renderLoading={LoadingIndicatorView}
      startInLoadingState={true}
    />
  );
};

export default PrivacyPolicy;
