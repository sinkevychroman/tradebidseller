/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

const ButtonTypeView = (key, callback, isReverse) => {
  // const {key = 'NOT_FOUND'} = props;
  const borderRadius = 35;
  const height = 40;
  const colorDefaultText = '#858585';

  var YES_COLOR = '#F50702';
  var NO_COLOR = '#3ECE8A';

  if (isReverse) {
    YES_COLOR = '#3ECE8A';
    NO_COLOR = '#F50702';
  }

  const styles = StyleSheet.create({
    button: {
      borderRadius: borderRadius,
      height: height,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      height: height,
      borderRadius: borderRadius,
    },
  });

  const [stateButton, setStateButton] = useState(null);

  useEffect(() => {
    callback(key, stateButton);
  }, [stateButton]);

  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 3,
        backgroundColor: '#F2F3F4',
        borderRadius: borderRadius,
        width: 300,
      }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setStateButton(true)}>
        <View
          style={[
            styles.button,
            {backgroundColor: stateButton ? YES_COLOR : 'transparent'},
          ]}>
          <Text style={{color: stateButton ? 'white' : colorDefaultText}}>
            YES
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.container}
        onPress={() => setStateButton(null)}>
        <View
          style={[
            styles.button,
            {backgroundColor: stateButton === null ? 'white' : 'transparent'},
          ]}>
          <Text style={{color: colorDefaultText}}>N/A</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.container}
        onPress={() => setStateButton(false)}>
        <View
          style={[
            styles.button,
            {
              backgroundColor:
                stateButton != null && !stateButton ? NO_COLOR : 'transparent',
            },
          ]}>
          <Text
            style={{
              color:
                stateButton != null && !stateButton
                  ? 'white'
                  : colorDefaultText,
            }}>
            NO
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonTypeView;
