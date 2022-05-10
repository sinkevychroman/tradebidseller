/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, Platform} from 'react-native';
import React from 'react';
import useScreenDimensions from '../../../hook/UseScreenDimensions';
import {colors} from '../../../styles/base';

const GuideRotateView = () => {
  /* USER GUIDE ROTATE SCREEN */
  const screenData = useScreenDimensions();

  const screenWidth = screenData.width;
  const screenHeight = screenData.height;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        height: screenHeight,
        width: screenWidth,
        backgroundColor: colors.purpleButton,
        flexDirection: 'column',
      }}>
      <View style={{height: Platform.OS === 'ios' ? 60 : 20}} />
      <Image
        style={{height: 50, width: 100, resizeMode: 'contain'}}
        source={require('../../../assets/logo-white.png')}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          resizeMode: 'contain',
        }}>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 15,
            textAlign: 'center',
            marginVertical: 10,
            marginHorizontal: 80,
            fontWeight: 'bold',
          }}>
          ROTATE TO CONTINUE
        </Text>
        <View style={{height: 10}} />
        <Image
          style={{
            height: screenWidth / 2.2,
            width: screenWidth / 2.2,
            resizeMode: 'contain',
          }}
          source={require('../../../assets/icon_screen_rotation.png')}
        />
        <View style={{height: 10}} />
        <Text
          style={{
            color: '#ffffff',
            fontSize: 16,
            textAlign: 'center',
            marginVertical: 10,
            marginHorizontal: 80,
            fontWeight: 'bold',
          }}>
          Please rotate your device to landscape mode to continue to use PAVE.
        </Text>
      </View>
      <View style={{height: 20}} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          alignContent: 'center',
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: '#ffffff',
            fontSize: 15,
            textAlign: 'center',
            marginVertical: 10,
            marginHorizontal: 80,
            fontWeight: 'bold',
          }}>
          User Tip:
        </Text>

        <View
          style={{
            padding: 6,
            borderRadius: 20,
            backgroundColor: '#6D6D6D',
            marginVertical: 10,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Image
            style={{
              height: 50,
              width: 60,
              resizeMode: 'contain',
            }}
            source={require('../../../assets/ic_lock_tip.png')}
          />
        </View>
        <Text
          style={{
            color: colors.disabledButton,
            fontSize: 14,
            textAlign: 'center',
            marginVertical: 10,
            marginHorizontal: 50,
            fontWeight: 'bold',
          }}>
          Unlock your display mode to allow your screen to rotate automatically
        </Text>
      </View>
      <View style={{height: 40}} />
    </View>
  );
};
export default GuideRotateView;
