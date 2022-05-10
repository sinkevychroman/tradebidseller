/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {replaceUnderscore, getGradeScoreColor} from '../../utils';
import ProgressiveImage from '../../../ui/progressiveImage/ProgressiveImage';
import ButtonTypeView from '../../ButtonTypeView';
import useScreenDimensions from '../../../../hook/UseScreenDimensions';
import ItemDamageTextView from './ItemDamageTextView';

const NormalDamageItemView = (props) => {
  const screenData = useScreenDimensions();

  const screenWidth = screenData.width;
  const screenHeight = screenData.height;

  const {sessionKey, value, index} = props;

  var unixTimeString = Math.round(new Date().getTime() / 1000);
  return (
    <View style={{flexDirection: 'column'}}>
      {value.user_response !== 'reject' ? (
        <View
          style={{
            height: 24,
            backgroundColor: getGradeScoreColor(value?.grade_score ?? 0),
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '500',
              color: '#ffffff',
            }}>
            {index + 1}
          </Text>
        </View>
      ) : (
        <View />
      )}

      <View style={{flexDirection: 'row'}}>
        {value?.cropped_url.trim() !== '' ? (
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <ItemDamageTextView title={'cropped photo'} content={''} />
            <View style={{height: 14}} />
            <ProgressiveImage
              style={{
                height: screenWidth / 4,
                width: undefined,
                aspectRatio: 1,
                resizeMode: 'contain',
              }}
              source={{
                uri: value?.cropped_url + '?' + unixTimeString,
              }}
            />
          </View>
        ) : (
          <View />
        )}

        <View style={{flexDirection: 'column', flex: 1}}>
          <ItemDamageTextView
            title={'Component'}
            content={replaceUnderscore(value?.component) ?? '-'}
          />
          <ItemDamageTextView
            title={'DAMAGE TYPE'}
            content={value?.label ?? '-'}
          />
          <ItemDamageTextView
            title={'REPAIR METHOD'}
            content={value?.repair_method ?? '-'}
          />
        </View>
      </View>

      <ItemDamageTextView
        style={{marginTop: 20}}
        title={'DESCRIPTION'}
        content={value?.description ?? '-'}
      />
      <View style={{height: 10}} />
      <ButtonTypeView
        sessionKey={sessionKey ?? ''}
        damageUuid={value?.uuid ?? ''}
        userResponse={value?.user_response ?? ''}
        showUpdateButton={() => {
          props.showUpdateButton();
        }}
        hideUpdateButton={() => {
          props.hideUpdateButton();
        }}
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      />
      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          width: '150%',
          height: 1,
          backgroundColor: '#dadada',
          marginLeft: -10,
        }}
      />

      <View style={{height: 10}} />
    </View>
  );
};

export default NormalDamageItemView;
