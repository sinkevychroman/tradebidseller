/* eslint-disable no-unreachable */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Dimensions, Platform, Text} from 'react-native';

import {StatusBarHeight} from './utils.js';
import {Svg, G, Path} from 'react-native-svg';
import {Logger} from '../../utils/AppLogger';
var screenWidth = Math.round(Dimensions.get('window').width);
var screenHeight = Math.round(Dimensions.get('window').height);

const CageView = ({
  cageX,
  cageY,
  cageHeight,
  cageWidth,
  actualImageHeight,
  actualImageWidth,
  containerWidthValue,
  containerHeightValue,
  cageRatio,
  svgObject,
}) => {
  const [newDetectedDamages, setArrayNewDamages] = useState([
    {
      damage_group: '',
      component: '',
      damage_type: '',
      damage_location: {x: 0, y: 0},
      original_image: {width: 0, height: 0},
      actual_image: {width: 0, height: 0},
      grade_score: 0,
    },
  ]);

  var widthRatio = screenWidth / actualImageWidth;
  var heightRatio = screenHeight / actualImageHeight;
  var emptySpace =
    (screenWidth - containerWidthValue - StatusBarHeight) * widthRatio;

  if (!svgObject) {
    return <View />;
  }

  let data = svgObject.svg.g[0].path;

  function callApiAddDamage(data) {
    Logger('callApiAddDamage request ====> ', data);
    var detected_damages = {detected_damages: data};
    Logger(
      'callApiAddDamage JSON request ====> ',
      JSON.stringify(detected_damages),
    );
    // console.log(
    //   'callApiAddDamage request ====> ',
    //   JSON.stringify(`"{\"detected_damages\":[\"${data}\"]}\"}`),
    // );

    //     "body": "{\"detected_damages\":[{\"damage_group\":\"BODY\",\"component\":\"DOOR_REAR_LEFT\",\"damage_type\":\"HAS_DECAL\",\"damage_location\":{\"x\":542,\"y\":238},\"original_image\":{\"width\":1920,\"height\":1080},\"actual_image\":{\"width\":830,\"height\":466},\"grade_score\":0},{\"damage_group\":\"PART\",\"component\":\"LIGHT_TAIL_REAR_LEFT\",\"damage_type\":\"TAPPED_REPAIR\",\"damage_location\":{\"x\":802,\"y\":233},\"original_image\":{\"width\":1920,\"height\":1080},\"actual_image\":{\"width\":830,\"height\":466},\"grade_score\":1}]}",
    //     "method": "PUT",
    //     "mode": "cors"
    // });

    // fetch(
    //   `https://server-api-dev.paveapi.com/api/tasks/${taskId}/user-add-damage`,
    //   {
    //     credentials: 'include',
    //     headers: {
    //       Accept: 'application/json, text/plain, */*',
    //       'Accept-Language': 'en-US,en;q=0.5',
    //       'Content-Type': 'application/json;charset=utf-8',
    //       Authorization:
    //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2U3OGI2MDE1NjljNDc5MzIwNmZmYzQiLCJpYXQiOjE1NjcyMTU2Mzd9.HEWpjWAoBekeNuH0VtJTvqJwl4vXuJlF_9J9a6Rrkfo',
    //     },
    //     referrer: `https://capture-dev.paveapi.com/${props.sessionKey}/result/adddamages?=`,
    //     body: `${JSON.stringify(data)}`,
    //     method: 'PUT',
    //     mode: 'cors',
    //   },
    // )
    //   .then((response) => response.text())
    //   .then((result) => {
    //     console.log(JSON.parse(result));
    //   })
    //   .catch((err) => console.log('error', err));
  }

  const paths = [...data]
    .map((path) => {
      return path.$;
    })
    .map((path, index) => {
      return (
        <Path
          key={index}
          d={path.d}
          dataName={path['data-name']}
          fill={path.fill}
          group={path.group}
          id={path.id}
          stroke={path.stroke}
          strokeWidth={path['stroke-width']}
          transform={path.transform}
          onPress={(evt) => {
            Logger(path.group, path['data-name']);
            Logger(Platform.OS, evt.nativeEvent);

            let damageX =
              evt.nativeEvent.locationX + (cageX * widthRatio - emptySpace);
            let damageY = evt.nativeEvent.locationY + cageY * heightRatio;

            const newDamage = {
              damage_group: path.group,
              component: path['data-name'],
              damage_type: 'DENTED_MEDIUM',
              damage_location: {x: damageY, y: damageX},
              original_image: {width: 1920, height: 1080},
              actual_image: {
                width: actualImageWidth,
                height: actualImageHeight,
              },
              grade_score: 1,
            };

            // console.log(newDetectedDamages);

            const newArray2 = [...newDetectedDamages, newDamage];
            // console.log(newArray2);
            // console.log(newDetectedDamages.detected_damages);
            callApiAddDamage(newArray2);
            setArrayNewDamages(newArray2);
          }}
        />
      );
    });

  // if (Platform.OS === 'ios') {
  //   emptySpace =
  //     (screenWidth - containerWidthValue - StatusBarHeight) * widthRatio;
  // } else {
  //   emptySpace = (screenWidth - containerWidthValue) * widthRatio;
  // }

  return (
    <View>
      <Svg
        width={cageWidth * widthRatio}
        height={cageHeight * heightRatio}
        viewBox={svgObject.svg.$.viewBox}
        style={{
          opacity: 0.7,
          left: cageX * widthRatio - emptySpace,
          top: cageY * heightRatio,
        }}>
        <G children={paths} dataName="1-cage" id="1-cage" />
      </Svg>
      {newDetectedDamages
        ?.filter((item) => item != null)
        .map((item) => {
          Logger('render item ', item);
          return (
            <View
              style={{
                alignItems: 'center',
                top: item?.damage_location?.x - 11,
                left: item?.damage_location?.y - 11,
                position: 'absolute',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: 18,
                  width: 18,
                  borderRadius: 111,
                  borderWidth: 6,
                  borderColor: 'red',
                }}
              />
              <View
                style={{
                  marginLeft: 0,
                  justifyContent: 'center',
                  height: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                }}>
                <Text
                  style={{
                    color: 'rgba(0, 0, 0, 0.8)',
                    fontSize: 16,
                    fontWeight: '700',
                  }}>
                  {item?.component ?? ''}
                </Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default CageView;
