/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  NativeModules,
  NativeEventEmitter,
  DeviceEventEmitter,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from '../../../styles/base';
import {Logger} from '../../../utils/AppLogger';

import EventBus from '../../../model/EventBus';
import useScreenDimensions from '../../../hook/UseScreenDimensions';

export const ProgressUploadPhotoItem = (props) => {
  ProgressUploadPhotoItem.propTypes = {
    sessionId: PropTypes.string.isRequired,
    cageObject: PropTypes.object.isRequired,
  };

  ProgressUploadPhotoItem.defaultProps = {
    sessionId: '',
    cageObject: {
      id: -101,
      name: 'UNKNOWN',
      uploadDone: false,
    },
  };

  const {sessionId, cageObject} = props;

  const [progress, setProgress] = useState(0);

  const [status, setStatus] = useState('');

  useEffect(() => {
    var listener = (data) => {
      let listDone = data.doneCheckList;
      if ([...listDone].includes(cageObject.id)) {
        setProgress(100);
      }
    };
    EventBus.getInstance().addListener('SESSION_UPLOAD_PHOTO', listener);

    return () => {
      EventBus.getInstance().removeListener(listener);
    };
  }, [sessionId]);

  useEffect(() => {
    Logger('cageObject', cageObject);
    if (cageObject.uploadDone) {
      setProgress(100);
    }
    Logger(sessionId);
    const myModuleEvt = new NativeEventEmitter(NativeModules.RNEventEmitter);

    let implementListener = (eventData) => {
      Logger(sessionId);

      const {session_id, photo_code, upload_progress} = eventData;
      Logger(eventData);

      if (sessionId === session_id && photo_code === `${cageObject.id}`) {
        setProgress(upload_progress);
      }
    };

    var subscription;

    if (Platform.OS === 'ios') {
      subscription = myModuleEvt.addListener(
        'UPLOAD_PROGRESS_EVENT',
        implementListener,
      );
    } else {
      subscription = DeviceEventEmitter.addListener(
        'UPLOAD_PROGRESS_EVENT',
        implementListener,
      );
    }

    return () => {
      subscription.remove();
    };
  }, [cageObject]);

  useEffect(() => {
    // setProgress(props.percent);
  }, [props.percent]);

  const screenData = useScreenDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: screenData.isLandscape ? 1 / 3 : 1 / 2,
      flexDirection: 'column',
      backgroundColor: 'black',
      marginVertical: 10,
      marginHorizontal: 10,
    },
    header: {flexDirection: 'row', padding: 20},
    label: {flexDirection: 'column'},
    progressBar: {
      backgroundColor: 'white',
      height: 20,
      width: '100%',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      justifyContent: 'center',
    },
    titlePhoto: {fontSize: 18, fontWeight: 'bold', color: 'white'},
    progressBar2: {
      backgroundColor: progress !== 100 ? colors.purpleButton : colors.primary,
      height: '100%',
      width: `${progress}%`,
    },
    statusText: {color: 'gray', fontWeight: '600'},
    percentText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          tintColor="#000" // for android
          source={
            progress !== 100
              ? require('../../../assets/ic_sync_white.png')
              : require('../../../assets/ic_tick.png')
          }
          style={{
            width: 40,
            height: 40,
            tintColor: colors.greenButton,
            marginEnd: 20,
          }}
        />
        <View style={styles.label}>
          <Text style={styles.titlePhoto}>{cageObject.name}</Text>
          <Text style={styles.statusText}>
            {progress !== 100 || cageObject.uploadDone ? status : 'Sent'}
          </Text>
        </View>
      </View>

      <View style={[styles.progressBar]}>
        <View style={styles.progressBar2}>
          <Text style={styles.percentText}>{`${progress}%`}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressUploadPhotoItem;
