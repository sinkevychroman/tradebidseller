/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import useScreenDimensions from '../../hook/UseScreenDimensions';
import PropTypes from 'prop-types';
import {Logger} from '../../utils/AppLogger';
import {colors} from '../../styles/base';

const RejectedMessageView = (props) => {
  RejectedMessageView.PropTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onRetakePhoto: PropTypes.func.isRequired,
  };

  RejectedMessageView.defaultProps = {
    onRetakePhoto: () => {
      Logger('onRetakePhoto Not Yet Implemented');
    },
  };

  const screenData = useScreenDimensions();

  const NO_WIDTH_SPACE = '​';
  const highlight = (string) =>
    string.split(' ').map((word, i) => (
      <Text key={i}>
        <Text style={styles.text2}>{word} </Text>
        {NO_WIDTH_SPACE}
      </Text>
    ));

  return (
    <View style={styles.centeredView}>
      <View
        style={[
          {height: screenData.height, width: screenData.width},
          styles.modalView,
        ]}>
        <Image
          style={{
            height: 80,
            width: 160,
            resizeMode: 'contain',
          }}
          source={require('../../assets/logo-white.png')}
        />
        <Text style={styles.title1}>{props.title ?? ''}</Text>
        <View
          style={{flexDirection: 'row', width: 500, justifyContent: 'center'}}>
          <Text style={styles.text}>
            Your photo was rejected for reason{' '}
            {highlight(`"${props.message ?? ''}"`)}{' '}
          </Text>
          {/* <Text style={styles.text2}>{`"${props.message ?? ''}"`}</Text> */}
        </View>
        <Text style={[{marginBottom: 40}, styles.text]}>
          Please retake your photo.
        </Text>
        <_RetakeButton
          style={{
            alignSelf: 'center',
            width: 300,
          }}
          backgroundColor={colors.greenButton}
          label={'RETAKE PHOTO'}
          onPress={() => {
            props.onRetakePhoto();
          }}
        />
      </View>
    </View>
  );
};

const _RetakeButton = ({backgroundColor, label, onPress, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          alignItems: 'center',
          justifyContent: 'center',
          width: 200,
          elevation: 4,
          height: 50,
          backgroundColor: backgroundColor,
          borderRadius: 40,
        },
      ]}>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RejectedMessageView;

const styles = StyleSheet.create({
  title1: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  text2: {
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    margin: 0, // This is the important style you need to set full screen modal
    alignItems: undefined,
    justifyContent: undefined,
    backgroundColor: 'rgba(1, 1, 1, 0.8)',
  },
  modalView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
