/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

const CustomizeCheckBox = (props) => {
  const {onCheckedChange = (ischecked) => {}, isChecked} = props;
  let iconChecked = require('../../../assets/ic_check_box.png');

  let iconUnchecked = require('../../../assets/ic_check_box_outline_blank.png');

  const [isCheck, setIsCheck] = useState(isChecked);

  function _onClickCheckBox() {
    setIsCheck(!isCheck);
  }

  useEffect(() => {
    onCheckedChange(isCheck);
  }, [isCheck]);

  return (
    <View>
      <TouchableOpacity onPress={_onClickCheckBox}>
        <Image
          source={isCheck ? iconChecked : iconUnchecked}
          style={{tintColor: '#3ECE8A'}}
        />
      </TouchableOpacity>
    </View>
  );
};

const CheckBoxListView = (items, listChecked, key, callback) => {
  const listItems = [...items];

  const [dataChange, setDataChange] = useState([]);

  useEffect(() => {
    callback(key, dataChange);
  }, [dataChange]);

  return (
    <View>
      {listItems.map((item) => {
        return (
          <View
            key={item}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomizeCheckBox
              style={{height: 50, width: 50, alignSelf: 'center'}}
              onCheckedChange={(isCheck) => {
                if (isCheck) {
                  dataChange.push(item);
                } else {
                  dataChange.splice(dataChange.indexOf(item), 1);
                }
                setDataChange([...dataChange]);
              }}
              isChecked={listChecked ? listChecked.indexOf(item) >= 0 : false}
            />
            <Text style={{marginLeft: 10}}> {item}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default CheckBoxListView;
