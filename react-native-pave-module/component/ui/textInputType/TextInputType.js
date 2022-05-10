import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Navigator,
} from 'react-native';

import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import {Logger} from '../../../utils/AppLogger';
const TextInputView = (type, key, callback) => {
  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);

  const [stringDate, setStringDate] = useState('');

  var apiStringDate = '';

  const [result, setResult] = useState(['', '']);

  const [inputTextValue, setInputTextValue] = useState('');
  const styles = StyleSheet.create({
    textInput: {
      color: '#000',
      height: 35,
      width: 200,
      borderColor: 'gray',
      borderWidth: 0.3,
      borderRadius: 2,
      paddingHorizontal: 15,
    },
  });

  useEffect(() => {
    if (result[1] === '') {
      callback(key, result[0]);
    } else {
      callback(key, result);
    }
  }, [result]);

  const getTextPlaceHolders = (key) => {
    switch (key) {
      case 'ACCIDENT_REPAIR':
        return {
          textHolder: '$',
          isNumber: true,
        };
      case 'ALL_KEYS_ARE_PRESENT?':
        return {
          textHolder: 'Number of keys',
          isNumber: true,
        };
      case 'RECENT_KILOMETERS_UNKNOWN':
        return {
          textHolder: 'Mileage',
          isNumber: true,
        };

      default:
        return {
          textHolder: 'Input here',
          isNumber: false,
        };
    }
  };

  function onChangeInputText(text) {
    setInputTextValue(text);
    result[0] = `${text}`;
    setResult([...result]);

    // callback(key, text);
  }

  const onChange = (event, selectedDate) => {
    // Logger(event);
    // Logger('selectedDate', selectedDate);
    if (Platform.OS === 'android') {
      if (event.type !== 'dismissed') {
        setShow(false);
        setDateData(selectedDate);
      } else {
        setShow(false);
      }
    } else {
      setDateData(selectedDate);
    }
  };

  function setDateData(selectedDate) {
    setDate(selectedDate);
    setStringDate(moment.utc(selectedDate).format('MM/DD/YYYY'));
    apiStringDate = moment.utc(selectedDate).format('YYYY-MM-DD');
    result[1] = `${apiStringDate}`;
    setResult([...result]);
    onChangeInputText(inputTextValue);
  }

  const textHolder = getTextPlaceHolders(key);

  // ['text', 'date-number', 'number']
  switch (type) {
    case 'number':
      return (
        <View style={{flexDirection: 'column'}}>
          <TextInput
            placeholderTextColor="#666"
            style={styles.textInput}
            onChangeText={onChangeInputText}
            placeholder={'Repair Total'}
            keyboardType={'numeric'}
            value={inputTextValue}
          />
        </View>
      );

    case 'text': {
      return (
        <View style={{flexDirection: 'column'}}>
          <TextInput
            placeholderTextColor="#666"
            style={styles.textInput}
            onChangeText={onChangeInputText}
            placeholder={
              textHolder.isNumber ? textHolder.textHolder : 'Input here'
            }
            keyboardType={textHolder.isNumber ? 'numeric' : 'default'}
            value={inputTextValue}
          />
        </View>
      );
    }
    case 'date-number': {
      Logger('render TextInputView');
      const style = {
        flexDirection: 'row',
        height: 35,
        width: 200,
        borderColor: 'gray',
        borderWidth: 0.3,
        borderRadius: 2,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      };
      return (
        <View style={{flexDirection: 'column'}}>
          <TextInput
            placeholderTextColor="#666"
            style={styles.textInput}
            onChangeText={(text) => {
              onChangeInputText(text);
            }}
            value={inputTextValue}
            placeholder={'Mileage'}
            keyboardType={'numeric'}
          />
          <View style={style}>
            <Text>{stringDate}</Text>
            <TouchableOpacity
              disabled={show}
              onPress={() => {
                setShow(true);
                if (Platform.OS === 'ios') {
                  setDateData(new Date());
                }
              }}>
              <Image
                style={{height: 25, width: 25, right: 0, opacity: 0.5}}
                source={require('../../../assets/ic-calendar.png')}
              />
            </TouchableOpacity>
          </View>

          {show && (
            <DatePicker
              style={{width: 300}}
              value={date ?? ''}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      );
    }
  }
};

export default TextInputView;
