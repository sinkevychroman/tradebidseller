/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles';
import VehicleOdometerInfoView from './VehicleOdometerInfoView';
import VehicleExtColorView from './VehicleExtColorView';
import VehicleTransmissionInfoView from './VehicleTransmissionInfoView';
import VehicleBodyStyleInfoView from './VehicleBodyStyleInfoView';
import VehicleEngineInfoView from './VehicleEngineInfoView';
import VehicleDisplacementInfoView from './VehicleDisplacementInfoView';
import VehicleDrivetrainInfoView from './VehicleDrivetrainInfoView';
import VehicleIntColorInfoView from './VehicleIntColorInfoView';
import VehicleFuelInfoView from './VehicleFuelInfoView';

import useScreenDimensions from '../../../hook/UseScreenDimensions';
import {StatusBarHeight} from '../../../component/addDamages/utils';

const _styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    height: '100%',
    alignSelf: 'center',
    width: 50,
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import ProgressiveImage from '../../ui/progressiveImage/ProgressiveImage';
export const VehicleInfoView = ({vehicleData}) => {
  const screenData = useScreenDimensions();
  // console.log(Platform.OS + ' vehicleData ', vehicleData?.vehicle ?? 'null');

  const [upLoading, setUploading] = useState(true);
  return (
    <View>
      {screenData.isLandscape ? (
        <View
          style={{
            flexDirection: 'row',
            // marginTop: 35,
            alignItems: 'flex-start',
            marginRight: 20,
            marginLeft: 4,
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <ProgressiveImage
            source={{
              uri: vehicleData?.vehicleThumbnailUrl,
            }}
            style={[
              // styles.vehicleThumbnailUrl,
              {
                width:
                  Platform.OS === 'ios'
                    ? (screenData.width -
                        (StatusBarHeight === 0 ? 20 : StatusBarHeight) * 2) /
                      2.2
                    : screenData.width / 2.2,

                aspectRatio: 16 / 9,
                height: undefined,

                resizeMode: 'contain',
              },
            ]}
          />
          <View
            style={{
              width:
                Platform.OS === 'ios'
                  ? (screenData.width - StatusBarHeight * 2) / 2
                  : screenData.width / 2,

              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              marginHorizontal: 20,
            }}>
            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.vehicleNameText}>
                {vehicleData?.vehicle?.year} {vehicleData?.vehicle?.make}{' '}
                {vehicleData?.vehicle?.model} {vehicleData?.vehicle?.trim}
              </Text>
              <View
                style={{
                  borderBottomWidth: 7,
                  borderBottomColor: '#dbdee0',
                  flexWrap: 'wrap',
                  alignSelf: 'center',
                  marginBottom: 40,
                }}>
                <Text style={styles.vehicleVinText}>
                  {vehicleData?.vehicle?.vin ?? ''}
                </Text>
              </View>
            </View>
            <VehicleOdometerInfoView
              vehicleId={vehicleData?.vehicle?.vehicle_id ?? ''}
              odomReadingValue={vehicleData?.vehicle?.odom_reading ?? '-'}
              odomUnitValue={vehicleData?.vehicle?.odom_unit ?? '-'}
            />
            {/* EXT COLOUR */}
            <VehicleExtColorView
              vehicleId={vehicleData?.vehicle?.vehicle_id ?? ''}
              vehicleExtColor={vehicleData?.vehicle?.ext_col_name ?? '-'}
            />
          </View>
          {/* ODOMETER */}
        </View>
      ) : (
        <View
          style={{
            alignSelf: 'center',
            marginTop: 20,
            width: '100%',
          }}>
          <ProgressiveImage
            source={{
              uri: vehicleData?.vehicleThumbnailUrl,
            }}
            style={styles.vehicleThumbnailUrl}
          />
          {/* <View>
            <Image
              source={{
                uri: vehicleData?.vehicleThumbnailUrl,
              }}
              style={styles.vehicleThumbnailUrl}
              onLoadEnd={() => {
                setUploading(false);
              }}></Image>
            {upLoading && (
              <ActivityIndicator style={[_styles.indicator]} size="large" />
            )}
          </View> */}

          <View
            style={{
              marginTop: 14,
              alignSelf: 'center',
            }}>
            <Text style={styles.vehicleNameText}>
              {vehicleData?.vehicle?.year} {vehicleData?.vehicle?.make}{' '}
              {vehicleData?.vehicle?.model} {vehicleData?.vehicle?.trim}
            </Text>
            <View
              style={{
                borderBottomWidth: 7,
                borderBottomColor: '#dbdee0',
                flexWrap: 'wrap',
                alignSelf: 'center',
                marginBottom: 40,
              }}>
              <Text style={styles.vehicleVinText}>
                {vehicleData?.vehicle?.vin ?? ''}
              </Text>
            </View>
          </View>
          {/* ODOMETER */}
          <VehicleOdometerInfoView
            vehicleId={vehicleData?.vehicle?.vehicle_id ?? ''}
            odomReadingValue={vehicleData?.vehicle?.odom_reading ?? '-'}
            odomUnitValue={vehicleData?.vehicle?.odom_unit ?? '-'}
          />
          {/* EXT COLOUR */}
          <VehicleExtColorView
            vehicleId={vehicleData?.vehicle?.vehicle_id ?? ''}
            vehicleExtColor={vehicleData?.vehicle?.ext_col_name ?? '-'}
          />
        </View>
      )}

      {/* table engine info */}
      <View style={{height: 40}} />
      <View style={styles.rowTextBox}>
        {/* TRANSMISSION */}
        <VehicleTransmissionInfoView
          vehicleId={vehicleData?.vehicle?.vehicle_id ?? ''}
          vehicleTransmission={vehicleData?.vehicle?.transmission ?? '-'}
        />
        <View style={styles.dividerBoxContent} />
        {/* BODY STYLE */}
        <VehicleBodyStyleInfoView
          vehicleId={vehicleData?.vehicle?.vehicle_id ?? ''}
          vehicleBodyStyle={vehicleData?.vehicle?.body_type ?? '-'}
        />
      </View>
      <View style={styles.rowTextBox}>
        {/* ENGINE */}
        <VehicleEngineInfoView
          vehicleId={vehicleData?.vehicle?.vehicle_id ?? ''}
          vehicleBodyStyle={vehicleData?.vehicle?.engine_type ?? '-'}
        />
        <View style={styles.dividerBoxContent} />
        {/* DISPLACEMENT */}
        <VehicleDisplacementInfoView
          vehicleId={vehicleData?.vehicle?.vehicle_id ?? ''}
          vehicleDisplacement={vehicleData?.vehicle?.displacement ?? '-'}
        />
      </View>
      <View style={styles.rowTextBox}>
        {/* DRIVETRAIN */}
        <VehicleDrivetrainInfoView
          vehicleId={vehicleData?.vehicle?.vehicle_id ?? ''}
          vehicleDrivetrain={vehicleData?.vehicle?.drivetrain ?? '-'}
        />
        <View style={styles.dividerBoxContent} />
        {/* INT COLOUR */}
        <VehicleIntColorInfoView
          vehicleId={vehicleData?.vehicle?.vehicle_id ?? ''}
          vehicleIntColor={vehicleData?.vehicle?.ext_col_name ?? '-'}
        />
      </View>
      <View style={styles.rowTextBox3}>
        {/* FUEL */}
        <VehicleFuelInfoView
          vehicleId={vehicleData?.vehicle?.vehicle_id ?? ''}
          vehicleFuel={vehicleData?.vehicle?.fuel_type ?? '-'}
        />
        <View style={styles.dividerBoxContent} />
        <View style={styles.textBoxContent} />
      </View>
    </View>
  );
};

export default VehicleInfoView;
