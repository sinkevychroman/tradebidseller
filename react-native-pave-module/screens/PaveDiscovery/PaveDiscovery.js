/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import useScreenDimensions from '../../hook/UseScreenDimensions';
import NativeCall from '../../nativeCall/Native';

import {ReportDamagesView} from '../../component/reportDamages/ReportDamagesView';

import PaveCapture from '../CaptureVehicle/CaptureVehicleScreen';
import SessionUploadManager from '../../model/SessionUpload';

import getPhotoStatusSession from '../../nativeCall/Native';
import EventBus from '../../model/EventBus';
import InputPhoneNumberView from '../../component/InputPhoneNumberNotify/InputPhoneNumberView';
import UserStepsView from '../../component/ui/userStepsView/UserStepsView';
import {Logger} from '../../utils/AppLogger';
import {colors} from '../../styles/base';

import UploadPhotoOptionalView from '../../component/uploadPhotoOptional/UploadPhotoOptional';
import ProgressUploadPhotoView from '../../component/progressUploadPhoto/ProgressUploadPhotoView';
import Loader from '../../component/progressUploadPhoto/ui/loader';

const ProcessingInspectionCountDownView = (props) => {
  const {
    ttw = 270,
    callbackTimeOut = () => {
      Logger('Not Yet Implemented');
    },
    sessionID,
    setIsContinue,
    counterRefresh = 0,
  } = props;
  const screenData = useScreenDimensions();

  const [counter, setCounter] = useState(ttw);
  const [isInputPhoneNumberVisible, setIsInputPhoneNumberVisible] =
    useState(false);
  const [isProgressUploadPhotoVisible, setProgressUploadPhotoVisible] =
    useState(false);

  const [isPause, setIsPause] = useState(false);

  const [isUploadPhotoOptionalVisible, setIsUploadPhotoOptionalVisible] =
    useState(false);

  const CountDownView = (time) => {
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}>
        <Text style={{fontSize: 27, fontWeight: '700', fontStyle: 'italic'}}>
          PROCESSING INSPECTION
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
            alignItems: 'flex-end',
          }}>
          <Text style={{fontSize: 25}}>Approximately</Text>
          <Text style={{fontSize: 35, fontWeight: '700'}}>
            {(function () {
              return toHHMMSS(time);
            })()}
          </Text>
          <Text style={{fontSize: 25}}> remaining</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (counter > 0) {
        !isPause && setCounter(counter - 1);
      } else if (counter === 0) {
        // setCounter(ttw);
      }
    }, 1000);

    let timeOutTask = setTimeout(() => {
      callbackTimeOut();
    }, ttw * 1000 * 3);
    return () => {
      clearInterval(myInterval);
      clearTimeout(timeOutTask);
    };
  });

  const ProcessingView = (
    <View>
      {/* ProgressUploadPhotoView */}
      <ProgressUploadPhotoView
        sessionId={sessionID}
        isVisible={isProgressUploadPhotoVisible}
        hideModal={() => {
          setProgressUploadPhotoVisible(false);
        }}
      />
      {/* InputPhoneNumberView */}
      <InputPhoneNumberView
        sessionID={sessionID}
        isVisible={isInputPhoneNumberVisible}
        hideModal={() => {
          setIsInputPhoneNumberVisible(false);
          setIsPause(false);
        }}
        onSuccess={() => {
          setIsInputPhoneNumberVisible(false);
          setIsPause(false);
          setIsContinue(true);
          // TODO: handle success case
        }}
      />
      {/* UploadPhotoOptionalView */}
      <UploadPhotoOptionalView
        sessionID={sessionID}
        isVisible={isUploadPhotoOptionalVisible}
        hideModal={() => {
          setIsUploadPhotoOptionalVisible(false);
          setIsPause(false);
          setIsContinue(true);
        }}
      />

      {/* UserStepsView */}
      <View
        style={{
          flexDirection: 'column',
          height: screenData.height - 80,
          width: screenData.width,
        }}>
        {screenData.isLandscape ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image
              style={styles.imageLogo}
              source={require('../../assets/logo_dark.png')}
            />
            <UserStepsView currentStepString={'3'} isSupportLandscape={true} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <Image
              style={styles.imageLogo}
              source={require('../../assets/logo_dark.png')}
            />
            <UserStepsView currentStepString={'3'} />
          </View>
        )}

        {/* FINALIZING INSPECTION */}
        <View
          style={{
            width: screenData.width,
            height: 0.5,
            backgroundColor: 'gray',
          }}
        />
        {counter === 0 ? (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}>
            <Text
              style={{fontSize: 35, fontWeight: '700', fontStyle: 'italic'}}>
              FINALIZING INSPECTION
            </Text>
          </View>
        ) : (
          CountDownView(counter)
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          position: 'absolute',
          bottom: screenData.isLandscape ? -44 : 6,
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsUploadPhotoOptionalVisible(true);
            setIsPause(true);
            setIsContinue(false);
          }}
          style={{marginRight: 10}}>
          <View
            style={{
              height: 50,
              width: 100,
              borderRadius: 25,
              backgroundColor: colors.greenButton,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>ADD IMAGE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
  const VIEW_MODE = {
    UPLOADING: 'UPLOADING',
    PROCESSING: 'PROCESSING',
  };

  const [viewMode, setViewMode] = useState(VIEW_MODE.UPLOADING);

  // useEffect(() => {
  //   let timeOutTask = setTimeout(() => {
  //     !isPause && callbackTimeOut();
  //   }, ttw * 1000);
  //   return () => {
  //     clearTimeout(timeOutTask);
  //   };
  // }, [isPause]);

  return viewMode === VIEW_MODE.PROCESSING ? (
    ProcessingView
  ) : (
    <ProgressUploadPhotoView
      sessionId={sessionID}
      counterRefresh={counterRefresh}
      callBackUploadDone={() => {
        setViewMode(VIEW_MODE.PROCESSING);
        setCounter(ttw);
      }}
    />
  );
};

const PaveSDKClassic = (props) => {
  const {
    sessionID,
    onBackWhenQCDone = () => {
      Logger('Not Yet Implemented');
    },
    isLiteVersion = false,
  } = props;

  const STAGE = {
    CAPTURE: 'CAPTURE',
    REPORT: 'REPORT',
    PROCESSING: 'PROCESSING',
    LOADING: 'LOADING',
  };

  const [stage, setStage] = useState(STAGE.LOADING);
  const [counterRefresh, setCounterRefresh] = useState(0);

  const [isContinue, setIsContinue] = useState(true);

  const [isPassQC, setIsPassQC] = useState(false);
  // var isContinue = true;

  // const setIsContinue = (bool) => {
  //   Logger('====> setIsContinue ', bool);
  //   this.isContinue = bool;
  //   bool && EventBus.getInstance().fireEvent('SESSION_UPLOAD_PHOTO', {});
  // };

  var listTimeoutTask = [];

  useEffect(() => {
    Logger('TrackEvent', sessionID, {
      IsPassQC: `${isPassQC}`,
    });
    const createAlert = () =>
      Alert.alert('Go Back', 'You will be returned to the previous screen.', [
        {text: 'OK', onPress: () => onBackWhenQCDone()},
      ]);
    if (isPassQC) {
      createAlert();
    }
  }, [isPassQC]);

  const checkPhoto = async () => {
    NativeCall.getInspectionProgress(sessionID)
      .then((res) => {
        Logger('PaveSDKClassic - checkPhoto', ` res.isReported ${res.passQC}`);
        Logger(res);
        if (res.isReported) {
          setStage(STAGE.PROCESSING);
        } else if (
          res.photos.missing.length > 0 ||
          res.photos.rejected.length > 0
        ) {
          setStage(STAGE.CAPTURE);
        } else {
          var timeout = setTimeout(() => {
            setCounterRefresh(counterRefresh + 1);
          }, 10 * 1000); //10s refresh

          listTimeoutTask.push(timeout);
          setStage(STAGE.PROCESSING);

          //Because first time it will be started.
          if (res.passQC && counterRefresh === 1) {
            setIsPassQC(true);
          }
        }
      })
      .catch((err) => {
        Logger(err);
      });
  };

  useEffect(() => {
    let interval = setInterval(() => {
      NativeCall.getInspectionProgress(sessionID)
        .then((res) => {
          const uploadChecker =
            SessionUploadManager.getInstance().getSessionUpload(sessionID);
          const isEditingDA = uploadChecker.isCheckDeclare;
          if (!isEditingDA) return;
          if (res.isReported) {
            setIsPassQC(true);
          }
          if (res.passQC && !res.isReported) {
            setIsPassQC(true);
          }
        })
        .catch((err) => {
          Logger(err);
        });
    }, 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // useEffect(() => {
  //   Logger('Run Effect isContinue && EventBus.getInstance().fireEvent ');
  //   isContinue && EventBus.getInstance().fireEvent('SESSION_UPLOAD_PHOTO', {});
  // }, [isContinue]);

  useEffect(() => {
    if (counterRefresh > 0) {
      setTimeout(() => {
        isContinue && checkPhoto();
      }, 10 * 1000);
    } else {
      isContinue && checkPhoto();
    }

    var listener = (data) => {
      // handle the event
      //Uploaded all Photo , ReCall API
      Logger('EventBus Here isAllDoneUpload ===>', data);
      if (data.isAllDoneUpload) {
        var timeout = setTimeout(() => {
          setCounterRefresh(counterRefresh + 1);
        }, 30 * 1000); //10s refresh
        listTimeoutTask.push(timeout);
      }
    };

    EventBus.getInstance().addListener('SESSION_UPLOAD_PHOTO', listener);

    return () => {
      EventBus.getInstance().removeListener(listener);

      if (listTimeoutTask.length > 0) {
        listTimeoutTask.forEach((timer) => clearTimeout(timer));
      }
    };
  }, [counterRefresh]);

  const timeOutCounter = () => {
    setCounterRefresh(counterRefresh + 1);

    Logger('counterRefresh', counterRefresh);
  };

  switch (stage) {
    case STAGE.LOADING:
      return <Loader />;
    case STAGE.PROCESSING:
      return (
        <ProcessingInspectionCountDownView
          {...props}
          sessionID={sessionID}
          callbackTimeOut={timeOutCounter}
          ttw={60}
          setIsContinue={setIsContinue}
          counterRefresh={counterRefresh}
        />
      );
    // case STAGE.REPORT:
    //   return <ReportDamagesView {...props} sessionID={sessionID} />;
    case STAGE.CAPTURE:
      return (
        <PaveCapture
          sessionId={sessionID}
          onCaptureDone={() => {
            setStage(STAGE.PROCESSING);
          }}
          onCancelButtonClick={() => {
            props.cancelled();
          }}
        />
      );
    default:
      return <View />;
  }
};

const toHHMMSS = (secs) => {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};
const styles = StyleSheet.create({
  imageLogo: {
    height: 40,
    width: 80,
    resizeMode: 'contain',
    marginLeft: 20,
    marginBottom: 10,
  },
});
export default PaveSDKClassic;
