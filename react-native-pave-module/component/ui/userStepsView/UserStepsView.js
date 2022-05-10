/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import useScreenDimensions from '../../../hook/UseScreenDimensions';
import PropTypes from 'prop-types';

const UserStepsView = (props) => {
  UserStepsView.propTypes = {
    currentStepString: PropTypes.string.isRequired,
    isSupportLandscape: PropTypes.bool.isRequired,
  };

  UserStepsView.defaultProps = {
    currentStepNumber: '0',
    isSupportLandscape: false,
  };

  var screenData = useScreenDimensions();
  /////////////////////////////////////////////////////////////////

  return screenData.isLandscape && props.isSupportLandscape ? (
    <View style={[styles.container, {width: screenData.screenWidth}]}>
      <View style={styles.item}>
        <View
          style={[
            props.currentStepString === '1'
              ? styles.currentContainerItem
              : styles.containerItem,
          ]}>
          <Text
            style={
              props.currentStepString === '1'
                ? styles.currentNumberLabel
                : styles.numberLabel
            }>
            1
          </Text>
        </View>
        <View>
          <Text style={styles.label}>CAPTURE</Text>
          <Text style={styles.label}>Vehicle</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.item}>
        <View
          style={[
            props.currentStepString === '2'
              ? styles.currentContainerItem
              : styles.containerItem,
          ]}>
          <Text
            style={
              props.currentStepString === '2'
                ? styles.currentNumberLabel
                : styles.numberLabel
            }>
            2
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Disclosures&</Text>
          <Text style={styles.label}>Announcements</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.item}>
        <View
          style={[
            props.currentStepString === '3'
              ? styles.currentContainerItem
              : styles.containerItem,
          ]}>
          <Text
            style={
              props.currentStepString === '3'
                ? styles.currentNumberLabel
                : styles.numberLabel
            }>
            3
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Approve&</Text>
          <Text style={styles.label}>Review Inspection</Text>
        </View>
      </View>
    </View>
  ) : (
    <View style={[styles.containerPortrait, {width: screenData.screenWidth}]}>
      <View style={styles.itemPortrait}>
        <View
          style={[
            props.currentStepString === '1'
              ? styles.currentContainerItem
              : styles.containerItem,
          ]}>
          <Text
            style={
              props.currentStepString === '1'
                ? styles.currentNumberLabel
                : styles.numberLabel
            }>
            1
          </Text>
        </View>
        <View>
          <Text style={styles.label}>CAPTURE</Text>
          <Text style={styles.label}>Vehicle</Text>
        </View>
      </View>
      <View style={styles.linePortrait} />
      <View
        style={[
          styles.itemPortrait,
          {
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
          },
        ]}>
        <View
          style={[
            props.currentStepString === '2'
              ? styles.currentContainerItem
              : styles.containerItem,
          ]}>
          <Text
            style={
              props.currentStepString === '2'
                ? styles.currentNumberLabel
                : styles.numberLabel
            }>
            2
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text style={styles.label}>Disclosures&</Text>
          <Text style={styles.label}>Announcements</Text>
        </View>
      </View>
      <View style={styles.linePortrait} />
      <View style={[styles.itemPortrait, {alignItems: 'flex-end'}]}>
        <View
          style={[
            props.currentStepString === '3'
              ? styles.currentContainerItem
              : styles.containerItem,
          ]}>
          <Text
            style={
              props.currentStepString === '3'
                ? styles.currentNumberLabel
                : styles.numberLabel
            }>
            3
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.label}>Approve&</Text>
          <Text style={styles.label}>Review</Text>
          <Text style={styles.label}>Inspection</Text>
        </View>
      </View>
    </View>
  );
};

export default UserStepsView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  containerPortrait: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  item: {flexDirection: 'row'},
  itemPortrait: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 2,
  },
  line: {
    backgroundColor: '#1ebf79',
    height: 2,
    width: 20,
    marginHorizontal: 20,
  },
  linePortrait: {
    backgroundColor: '#1ebf79',
    height: 2,
    width: 20,
    marginTop: 10,
    marginHorizontal: 20,
  },
  containerItem: {
    width: 24,
    height: 24,
    backgroundColor: '#1ebf79',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
  containerItemPortrait: {
    width: 24,
    height: 24,
    backgroundColor: '#1ebf79',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
  currentContainerItem: {
    width: 24,
    height: 24,
    backgroundColor: '#edeeef',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#1ebf79',
    marginBottom: 5,
  },
  numberLabel: {color: 'white', fontWeight: 'bold', fontSize: 12},
  currentNumberLabel: {color: 'black', fontWeight: 'bold', fontSize: 12},
});
