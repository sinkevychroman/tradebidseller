/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {replaceUnderscore, getGradeScoreColor} from '../../utils';

import useScreenDimensions from '../../../../hook/UseScreenDimensions';

const GridListDamageNameView = (props) => {
  const {damageViewData} = props;
  let newData = damageViewData.detectedDamages;
  newData = newData.filter((data) => data.user_response !== 'reject');
  let damageData = [];

  if (
    damageViewData.view === 'LEFT VIEW' ||
    damageViewData.view === 'RIGHT VIEW'
  ) {
    damageData = newData.filter((data) => data.damage_group !== 'TIRE');
  } else {
    damageData = [...newData];
  }

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
      numColumns={2}
      data={damageData}
      renderItem={({item, index}) => {
        return (
          <ItemGridViewDamageName
            key={index.toString()}
            item={item}
            index={index}
          />
        );
      }}
    />
  );
};

export const ItemGridViewDamageName = ({item, index}) => {
  // console.log(index, item);
  const screenData = useScreenDimensions();
  return item?.user_response === 'reject' ? (
    <View />
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: screenData.isLandscape
            ? screenData.height - 40
            : screenData.width / 2 - 20,
          margin: 2.5,
          backgroundColor: getGradeScoreColor(item?.grade_score ?? 0),
          flexDirection: 'row',
          height: 32,
          line: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 100,
        }}>
        <View
          style={{
            borderRadius: 100,
            backgroundColor: '#fff',
            width: 20,
            height: 20,
            alignItems: 'center',
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#000',
              alignSelf: 'center',
              alignContent: 'center',
              textAlign: 'center',
            }}>
            {index + 1}
          </Text>
        </View>
        <View style={{width: 5}} />
        <Text
          numberOfLines={1}
          style={{color: '#fff', flexShrink: 1, fontSize: 12}}>
          {replaceUnderscore(item?.damage_name ?? '')}
        </Text>
      </View>
    </View>
  );
};

export default GridListDamageNameView;
