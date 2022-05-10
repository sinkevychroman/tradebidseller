/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View, Linking, Text, StyleSheet, Image} from 'react-native';
import {REPORT_FILE_URL} from '../../constants/index';
import {Logger} from '../../utils/AppLogger';
import {colors, dimensions} from '../../styles/base';
import AppButton from '../ui/appButton/AppButton';
import useScreenDimensions from '../../hook/UseScreenDimensions';
import {StatusBarHeight} from '../addDamages/utils';

const ReportWebView = (props) => {
  const {
    onDoneSession = () => {
      Logger('Not yet implement.');
    },
  } = props;
  const screenData = useScreenDimensions();
  var url = REPORT_FILE_URL + props.sessionID;

  return (
    <View
      style={{
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Image
        style={{
          width: screenData.isLandscape
            ? screenData.width / 4
            : screenData.width / 2,
          height: screenData.isLandscape
            ? screenData.width / 4
            : screenData.width / 2,
          flex: 1,
          resizeMode: 'contain',
        }}
        source={require('../../assets/confirm_report_success.jpg')}
      />

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: StatusBarHeight,
        }}>
        <AppButton
          iconUri={require('../../assets/ic_round_file_download_white.png')}
          style={{width: screenData.width / 2}}
          backgroundColor={colors.greenButton}
          label={'DONE'}
          onPress={() => {
            // Linking.openURL(url);
            onDoneSession();
          }}
        />
        <View style={{width: 10}} />
        <AppButton
          backgroundColor={colors.purpleButton}
          label={'CLOSE'}
          onPress={() => {
            props?.onCloseModal();
          }}
        />
      </View>
    </View>
  );
};

export default ReportWebView;
