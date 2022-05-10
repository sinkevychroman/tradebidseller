/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {replaceUnderscore, getGradeScoreColor} from '../../utils';
import ProgressiveImage from '../../../ui/progressiveImage/ProgressiveImage';
import ButtonTypeView from '../../ButtonTypeView';
import useScreenDimensions from '../../../../hook/UseScreenDimensions';
import ItemDamageTextLandscapeView from './ItemDamageTextLandscapeView';

const NormalDamageItemLandscapeView = (props) => {
  const screenData = useScreenDimensions();

  const screenWidth = screenData.width;
  const screenHeight = screenData.height;

  const {sessionKey, value, index} = props;
  var unixTimeString = Math.round(new Date().getTime() / 1000);
  return (
    <View style={{flexDirection: 'row', flex: 10, alignItems: 'center'}}>
      {value.user_response !== 'reject' ? (
        <View
          style={{
            height: 16,
            width: 16,
            backgroundColor: getGradeScoreColor(value?.grade_score ?? 0),
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginHorizontal: 3,
            borderRadius: 100,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              fontWeight: '500',
              color: '#ffffff',
            }}>
            {index + 1}
          </Text>
        </View>
      ) : (
        <View
          style={{
            height: 16,
            width: 16,
            marginHorizontal: 3,
          }}
        />
      )}

      <ItemDamageTextLandscapeView
        flex={1.5}
        content={replaceUnderscore(value?.component) ?? '-'}
      />
      {value?.cropped_url.trim() !== '' ? (
        <View style={{flex: 1.8, alignItems: 'center', marginVertical: 5}}>
          <ProgressiveImage
            style={{
              height: screenData.height / 4,
              // width: undefined,
              aspectRatio: 1,
              resizeMode: 'contain',
            }}
            source={{
              uri: value?.cropped_url + '?' + unixTimeString,
            }}
          />
        </View>
      ) : (
        <View style={{flex: 1.8}} />
      )}

      <ItemDamageTextLandscapeView flex={1.5} content={value?.label ?? '-'} />
      <ItemDamageTextLandscapeView
        flex={1.5}
        content={value?.description ?? '-'}
      />

      <ItemDamageTextLandscapeView
        flex={1.5}
        content={value?.repair_method ?? '-'}
      />

      <View style={{height: 50, flex: 2.2, alignItems: 'flex-start'}}>
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
          height={48}
          style={{
            width: screenData.width / 5.1,
          }}
        />
      </View>
    </View>
  );
};

export default NormalDamageItemLandscapeView;
