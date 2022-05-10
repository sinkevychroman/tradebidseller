import React, {useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {CHECK_ADDITIONAL_MODIFY} from '../../constants/index';

import {CAGES, getCages, MapCages} from '../../model/cage';
import {RNCamera} from 'react-native-camera';

import OverlayCapturingView from './OverlayCapturing';

import PreviewCaptureView from './PreviewCaptureView';

import PrepareCaptureVehicle from './PrepareCaptureVehicle';

import useScreenDimensions from '../../hook/UseScreenDimensions';

import NativeCall from '../../nativeCall/Native';

import TableViewDeclaration from '../../component/disclosureAnnouncement/DisclosureAnnouncement';

import SessionUploadManager from '../../model/SessionUpload';

import {InputVinView} from './SelectMethodCaptureVinView';

import {ManualInputOdomViewNotModal} from './ManualInputOdomView';

import EventBus from '../../model/EventBus';

import {Logger} from '../../utils/AppLogger';
import GuideRotateView from '../../component/ui/guideRotateView/GuideRotateView';

const CaptureVehicleScreen = (props) => {
  let camera;
  const {
    cage,
    sessionId,
    callBackFinishCapture = () => {},
    onCancelButtonClick = () => {},
  } = props;

  const screenData = useScreenDimensions();

  const [imageData, setImageData] = useState(null);

  const _takePhoto = async (callback) => {
    const captureOptions = {
      quality: 1,
      base64: true,
      fixOrientation: true,
      forceUpOrientation: true,
    };
    if (camera) {
      // for test upload photo | un-comment below lines to test
      camera.takePictureAsync(captureOptions).then((data) => {
        setImageData(data);
        callback();
      });
    }
  };

  Logger('CaptureVehicleScreen Cage', cage);

  const [visiblePreviewPhoto, setVisiblePreviewPhoto] = useState(false);

  //////////////////////////////////////////////////xxxxxxxxxxxxxxxxxxxxxxxx

  const _onPressCamera = () => {
    const callBack = () => {
      setVisiblePreviewPhoto(!visiblePreviewPhoto);
    };
    _takePhoto(callBack);
  };

  const _resumeCamera = () => {
    camera.resumePreview();
  };

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  function _onSuccessOdometerInput() {
    const uploadChecker = SessionUploadManager.getInstance().getSessionUpload(
      sessionId,
    );

    uploadChecker.setPhotoUploadStatus({
      sessionID: sessionId,
      cageID: CAGES.ODOMETER.id,
      status: {
        isSuccess: true,
        isUploading: false,
      },
    });

    EventBus.getInstance().fireEvent('SESSION_UPLOAD_PHOTO', uploadChecker);
    callBackFinishCapture();
  }

  function _onSuccessVinInputChange() {
    const uploadChecker = SessionUploadManager.getInstance().getSessionUpload(
      sessionId,
    );

    uploadChecker.setPhotoUploadStatus({
      sessionID: sessionId,
      cageID: CAGES.VIN.id,
      status: {
        isSuccess: true,
        isUploading: false,
      },
    });
    EventBus.getInstance().fireEvent('SESSION_UPLOAD_PHOTO', uploadChecker);

    callBackFinishCapture();
  }

  //////////////////////////////////////////////////xxxxxxxxxxxxxxxxxxxxxxxx

  if (cage.name === CAGES.VIN.name && cage.rejected) {
    return (
      <InputVinView
        onSuccessVinInputChange={_onSuccessVinInputChange}
        sessionID={sessionId}
        onBack={() => onCancelButtonClick()}></InputVinView>
    );
  }

  if (cage.name === CAGES.ODOMETER.name && cage.rejected) {
    return (
      <ManualInputOdomViewNotModal
        sessionID={sessionId}
        onSuccess={_onSuccessOdometerInput}
        onCancel={() => onCancelButtonClick()}
      />
    );
  }

  return !screenData.isLandscape ? (
    <GuideRotateView />
  ) : (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <RNCamera
        ratio={'16:9'}
        ref={(ref) => {
          camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={{position: 'absolute'}}>
        <OverlayCapturingView
          sessionId={sessionId}
          style={{position: 'absolute'}}
          cage={cage}
          onPressCamera={_onPressCamera}
          onPressCancelCapture={() => {
            onCancelButtonClick();
          }}
          onResumeCamera={_resumeCamera}
          onSuccessOdometerInput={_onSuccessOdometerInput}
          onSuccessVinInputChange={_onSuccessVinInputChange}
        />
      </View>
      {imageData && (
        <PreviewCaptureView
          {...props}
          visibleModal={visiblePreviewPhoto}
          setVisibleModal={setVisiblePreviewPhoto}
          photoData={imageData}
          callBackFinishCapture={callBackFinishCapture}
          cage={cage}
          counterTime={5}
        />
      )}
    </View>
  );
};

const PaveCapture = (props) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const [cageInstance, setCageInstance] = useState(CAGES.DEFAULT);

  const [listCage, setListCage] = useState(getCages());

  const {sessionId, onCaptureDone = () => {}} = props;

  const [showDisclosure, setShowDisclosure] = useState(false);

  const [turnOnDisclosure, setTurnOnDisclosure] = useState(false);

  function shouldCageRejected(listCageCapture, cageReject) {
    var lastIndexOfCage = -1;
    listCageCapture.forEach((itemCage, index) => {
      if (itemCage.name === cageReject.name) {
        lastIndexOfCage = index;
      }
    });

    if (lastIndexOfCage < listCage.indexOf(cageInstance)) {
      let sessionUpload = SessionUploadManager.getInstance().getSessionUpload(
        sessionId,
      );

      let statusUpload = sessionUpload.listPhotoUploads.get(cageReject.id);

      if (!statusUpload.status.isUploading) {
        listCage.push(cageReject);
        SessionUploadManager.getInstance()
          .getSessionUpload(sessionId)
          .setListCage(listCage);

        setListCage(listCage);
      }
    }
  }

  const _getDynamicCage = (sessionID) => {
    return new Promise((resolve, reject) => {
      NativeCall.getInspectionDetails(sessionID)
        .then((result) => {
          Logger('getInspectionDetails', result);
          if (result.cageDetected) {
            // console.log(result);
            return result.cages;
          } else {
            reject('No Cage Detected');
          }
        })
        .then((cagesDynamics) => {
          const dynamicCages = new Map();
          [...cagesDynamics].forEach((cage) => {
            switch (cage.name) {
              case CAGES.LEFT_VIEW.name: {
                const cageLeftView = {
                  ...CAGES.LEFT_VIEW,
                  dynamicCage: {url: cage.outline},
                };

                dynamicCages.set(CAGES.LEFT_VIEW.name, cageLeftView);
                break;
              }
              case CAGES.RIGHT_VIEW.name: {
                const cageRightView = {
                  ...CAGES.RIGHT_VIEW,
                  dynamicCage: {url: cage.outline},
                };

                dynamicCages.set(CAGES.RIGHT_VIEW.name, cageRightView);
                break;
              }

              case CAGES.FRONT_VIEW.name: {
                const cageFrontView = {
                  ...CAGES.FRONT_VIEW,
                  dynamicCage: {url: cage.outline},
                };

                dynamicCages.set(CAGES.FRONT_VIEW.name, cageFrontView);

                break;
              }
              case CAGES.REAR_VIEW.name: {
                const cageRearView = {
                  ...CAGES.REAR_VIEW,
                  dynamicCage: {url: cage.outline},
                };

                dynamicCages.set(CAGES.REAR_VIEW.name, cageRearView);
                break;
              }
            }
          });
          return dynamicCages;
        })
        .then((dynamicCages) => {
          resolve(dynamicCages);
        });
    });
  };

  const _getRejectedCage = (sessionID) => {
    return new Promise((resolve, reject) => {
      NativeCall.getInspectionProgress(sessionID, 3000)
        .then((res) => {
          Logger('CaptureVehicle getInspectionProgress', res);
          if (res.photos.rejected.length === 0) {
            reject(false);
          } else {
            return res.photos;
          }
        })
        .then((photos) => {
          var reject = [...photos.rejected].map((item) => {
            let cage = MapCages.get(item.nameCage);

            let obj = {
              id: cage.id,
              source: cage.source,
              name: cage.name,
            };
            return {...obj, rejected: true, message: item.message};
          });

          reject
            .filter(
              (cage) =>
                !(
                  cage.name === CAGES.VIN.name ||
                  cage.name === CAGES.ODOMETER.name
                ),
            )
            .forEach((cage) => {
              Logger('for Each cage reject :', cage);
              Logger(cage.name, listCage.includes(cage));

              // if (
              //   cage.name === CAGES.VIN.name ||
              //   cage.name === CAGES.ODOMETER.name
              // ) {
              //   return;
              // }

              if (!listCage.includes(cage)) {
                // listCage.push(cage); //Not available
                Logger('CASE #1 : HERE =>> ');
                shouldCageRejected(listCage, cage);
                Logger('CASE #1 : ADD CASE #1 =>> ');

                return; // important
              } else if (
                listCage.includes(cage) &&
                listCage.indexOf(cageInstance) <= listCage.indexOf(cage)
              ) {
                return;
              } else if (
                listCage.indexOf(cageInstance) > listCage.lastIndexOf(cage)
              ) {
                //Over index, May be have bugs
                //Check uploading in Task,
                Logger('CASE #2 : HERE =>> Over index');
                shouldCageRejected(listCage, cage);
                Logger('CASE #2 : HERE =>> Add Cage');
                return;
              } else {
              }
            });
        });

      Logger('  => Check listCage add Reject :', listCage);
      resolve(true);
    });
  };

  //Get All Cage Capture
  useEffect(() => {
    NativeCall.getInspectionProgress(sessionId, 4000)
      .then((res) => {
        return res.photos;
      })
      .then((photos) => {
        Logger(photos);

        const finishedCages = [...photos.finished].map((item) => {
          return MapCages.get(item.nameCage);
        });

        const inspectingCage = [...photos.inspect].map((item) => {
          return MapCages.get(item.nameCage);
        });

        const missingCage = [...photos.missing].map((item) => {
          return item;
        });

        const reject = [...photos.rejected].map((item) => item.nameCage);

        const rejectedMessages = [...photos.rejected];

        // console.log('finishedCages', finishedCages);
        // console.log('inspectingCage', inspectingCage);
        // console.log('missingCage', missingCage);
        // console.log('reject', reject);

        return {
          finishedCages: finishedCages.concat(inspectingCage),
          missingCage: missingCage.concat(reject),
          reject: [...reject],
          rejectedMessages: [...rejectedMessages],
        };
      })
      .then((listFilter) => {
        var intersectionsCage = [];
        intersectionsCage = listCage.filter((cage) => {
          return listFilter.missingCage.includes(cage.name);
        });
        let filterCage = intersectionsCage.filter((cage) => {
          return !listFilter.finishedCages.includes(cage);
        });

        if (filterCage.length !== 13) {
          //ignore vin case and odom Case  if recapture
          // filterCage = [...filterCage].filter((cage) => {
          //   return cage.name !== CAGES.VIN.name;
          // });
        }
        // cage.name !== CAGES.VIN.name && cage.name !== CAGES.ODOMETER.name;

        let rejected = listFilter.reject;

        let rejectedMessages = listFilter.rejectedMessages;

        let result = filterCage.map((cage) => {
          if (rejected.includes(cage.name)) {
            let message = '';

            rejectedMessages.forEach((photoInformation) => {
              if (photoInformation.nameCage === cage.name) {
                message = photoInformation.message;
              }
            });

            return {
              ...cage,
              rejected: true,
              message,
            };
          } else {
            return {
              ...cage,
              rejected: false,
            };
          }
        });

        SessionUploadManager.getInstance()
          .getSessionUpload(sessionId)
          .setListCage(result);
        return result;
      })
      .then((cages) => {
        // setTurnOnDisclosure(cages.length === 11);
        setListCage(cages);
        setCageInstance(cages[0]);

        let cageUnknown = cages[0];
        if (cageUnknown.id === CAGES.DEFAULT.id) {
          onCaptureDone();
        }
      })
      .catch((e) => {
        if (e.error) {
          if (cageInstance.id === CAGES.DEFAULT.id) {
            onCaptureDone();
          }
        }
      });

    return () => {};
  }, [sessionId]);

  useEffect(() => {
    fetch(CHECK_ADDITIONAL_MODIFY + sessionId)
      .then((response) => response.json())
      .then((json) => {
        setTurnOnDisclosure(!json.status || !json.createdAt);
      });
  }, [sessionId]);

  // Check Rejected Cage
  useEffect(() => {
    //check Reject Photo
    /*  NativeCall.getInspectionProgress(sessionId)
      .then((res) => {
        Logger('CaptureVehicle getInspectionProgress', res);
        return res.photos;
      })
      .then((photos) => {
        var reject = [...photos.rejected].map((item) => {
          let cage = MapCages.get(item.nameCage);

          let obj = {
            id: cage.id,
            source: cage.source,
            name: cage.name,
          };
          return {...obj, rejected: true, message: item.message};
        });

        // console.log(reject);

        reject.forEach((cage) => {
          console.log('for Each cage reject :', cage);
          console.log(cage.name, listCage.includes(cage));

          if (
            cage.name === CAGES.VIN.name ||
            cage.name === CAGES.ODOMETER.name
          ) {
            return;
          }

          if (!listCage.includes(cage)) {
            // listCage.push(cage); //Not available

            console.log('CASE #1 : HERE =>> ');
            shouldCageRejected(listCage, cage);
            console.log('CASE #1 : ADD CASE #1 =>> ');

            return; // important
          } else if (
            listCage.includes(cage) &&
            listCage.indexOf(cageInstance) <= listCage.indexOf(cage)
          ) {
            return;
          } else if (
            listCage.indexOf(cageInstance) > listCage.lastIndexOf(cage)
          ) {
            //Over index, May be have bugs
            //Check uploading in Task,
            console.log('CASE #2 : HERE =>> Over index');
            shouldCageRejected(listCage, cage);
            console.log('CASE #2 : HERE =>> Add Cage');
            return;
          } else {
          }
        });
      });

    console.log('  => Check listCage add Reject :', listCage); */
  }, [cageInstance]);

  //Check Dynamic Cage
  useEffect(() => {
    /*  NativeCall.getInspectionDetails(sessionId)
      .then((result) => {
        console.log('getInspectionDetails', result);
        if (result.cageDetected) {
          // console.log(result);
          return result.cages;
        }
      })
      .then((cagesDynamics) => {
        const dynamicCages = new Map();
        [...cagesDynamics].forEach((cage) => {
          switch (cage.name) {
            case CAGES.LEFT_VIEW.name: {
              const cageLeftView = {
                ...CAGES.LEFT_VIEW,
                dynamicCage: {url: cage.outline},
              };

              dynamicCages.set(CAGES.LEFT_VIEW.name, cageLeftView);
              break;
            }
            case CAGES.RIGHT_VIEW.name: {
              const cageRightView = {
                ...CAGES.RIGHT_VIEW,
                dynamicCage: {url: cage.outline},
              };

              dynamicCages.set(CAGES.RIGHT_VIEW.name, cageRightView);
              break;
            }

            case CAGES.FRONT_VIEW.name: {
              const cageFrontView = {
                ...CAGES.FRONT_VIEW,
                dynamicCage: {url: cage.outline},
              };

              dynamicCages.set(CAGES.FRONT_VIEW.name, cageFrontView);

              break;
            }
            case CAGES.REAR_VIEW.name: {
              const cageRearView = {
                ...CAGES.REAR_VIEW,
                dynamicCage: {url: cage.outline},
              };

              dynamicCages.set(CAGES.REAR_VIEW.name, cageRearView);
              break;
            }
          }
        });
        return dynamicCages;
      })
      .then((dynamicCages) => {
        // console.log('dynamicCages', dynamicCages);

        const newCages = listCage.forEach((cageElement, index) => {
          const cageDynamic = dynamicCages.get(cageElement.name);

          if (cageDynamic) {
            listCage[index] = cageDynamic;
          }
        });
        // console.log('dynamicCages', newCages);

        if (JSON.stringify(newCages) === JSON.stringify(listCage)) {
          return;
        } else {
          return () => {
            setListCage(newCages);
          };
        }
      }); */
  }, [cageInstance]);

  // Merge Rejected Cage and Dynamic Cage
  useEffect(() => {
    Promise.all([_getRejectedCage(sessionId), _getDynamicCage(sessionId)]).then(
      (values) => {
        Logger('_getRejectedCage()', values[0]);
        Logger('_getDynamicCage()', values[1]);
        const dynamicCages = values[1];

        const newCages = listCage.forEach((cageElement, index) => {
          const cageDynamic = dynamicCages.get(cageElement.name);

          if (cageDynamic) {
            const object = listCage[index];

            listCage[index] = {
              ...object,
              dynamicCage: cageDynamic.dynamicCage,
            };
            Logger('dynamicCages', object);
          }
        });

        Logger('newCages', newCages);

        if (!newCages) {
          return;
        }
        if (JSON.stringify(newCages) === JSON.stringify(listCage)) {
          return;
        } else {
          setListCage(newCages);
          // return () => {
          //   setListCage(newCages);
          // };
        }
      },
    );
  }, [cageInstance]);

  function _callBackFinishCapture() {
    var indexCage;

    Logger('listCage.length', listCage.length);

    if (listCage.indexOf(cageInstance) >= 0) {
      indexCage = listCage.lastIndexOf(cageInstance) + 1;
    } else {
      listCage.forEach((cage, index) => {
        //for Dynamic Cage. Find index cage of listCage.
        if (cage.name === cageInstance.name) {
          indexCage = index + 1;
        }
      });
    }

    if (indexCage === listCage.length) {
      Logger('Done Capture');

      if (turnOnDisclosure) {
        //Show D&A. First Time Capture Vehicle
        setShowDisclosure(true);
      } else {
        onCaptureDone();
      }
    } else {
      setCageInstance(listCage[indexCage]);
      setIsCapturing(false);
    }
  }

  if (!isCapturing) {
    return (
      <PrepareCaptureVehicle
        cage={cageInstance}
        callbackTimeOut={() => {
          setIsCapturing(true);
        }}
        sessionID={sessionId}
      />
    );
  } else {
    return showDisclosure ? (
      <TableViewDeclaration
        sessionID={sessionId}
        onDoneDeclaration={() => {
          setShowDisclosure(false);
          onCaptureDone();
        }}
      />
    ) : (
      <CaptureVehicleScreen
        {...props}
        cage={cageInstance}
        callBackFinishCapture={_callBackFinishCapture}
      />
    );
  }
};

const styles = StyleSheet.create({
  text: {color: 'white'},
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default PaveCapture;
