import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import PropTypes from 'prop-types';
import {Logger} from '../../../utils/AppLogger';
import {colors} from '../../../styles/base';

const CustomizeRadioButton = (props) => {
  CustomizeRadioButton.propTypes = {
    onPressButton: PropTypes.func.require,
    isChoose: PropTypes.bool,
  };

  CustomizeRadioButton.defaultProps = {
    onPressButton: () => {
      Logger('Not yet implemented');
    },
    isChoose: false,
  };

  let iconChecked = require('../../../assets/ic_radio_button_checked.png');

  let iconUnchecked = require('../../../assets/ic_radio_button_unchecked.png');

  //   const [isCheck, setIsCheck] = useState(false);

  //   function _onClickRadioButton() {
  //     setIsCheck(true);
  //   }

  return (
    <View>
      <TouchableOpacity onPress={props.onPressButton}>
        <Image
          source={props.isChoose ? iconChecked : iconUnchecked}
          style={{tintColor: colors.primary}}
        />
      </TouchableOpacity>
    </View>
  );
};

const RadioListView = (items, itemChoose, key, callback) => {
  const listItems = [...items].map((e) => {
    var object = {value: e, isCheck: false};
    return object;
  });

  const [dataList, setDataList] = useState(listItems);

  function _onClickRadioButton(index) {
    dataList.forEach((e) => (e.isCheck = false));
    dataList[index].isCheck = true;
    setDataList([...dataList]);
    callback(key, dataList[index].value);
  }

  return (
    <View>
      {dataList.map((item, index) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            key={index}>
            <CustomizeRadioButton
              style={{height: 50, width: 50}}
              isChoose={itemChoose ? item.value === itemChoose : item.isCheck}
              onPressButton={() => _onClickRadioButton(index)}
            />
            <TouchableOpacity onPress={() => _onClickRadioButton(index)}>
              <Text style={{marginLeft: 10}}> {item.value}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default RadioListView;
