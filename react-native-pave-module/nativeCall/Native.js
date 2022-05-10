import {NativeModules} from 'react-native';
import {GET_PHOTO_STATUS_URL} from '../constants/index';
import {Logger} from '../utils/AppLogger';

const {PaveModule} = NativeModules;
const initializeWithKey = (key) => {
  PaveModule.initializeWithKey(key);
  return;
};

const createNewSessionWithVehicle = (data) => {
  const redirectUrl = data?.redirect_url || '';
  const vehicle = data?.vehicle || {};
  const vin = vehicle.vin || '';
  const year = vehicle.model_year || '';
  const make = vehicle.vehicle_make || '';
  const model = vehicle.vehicle_model || '';
  const bodyType = vehicle.vehicle_bodystyle || '';
  const trim = vehicle.vehicle_bodystyle || '';
  const transmission = vehicle.transmission || '';
  const extColor = vehicle.exterior_color || '';
  const intColor = vehicle.interior_color || '';
  const odomReading = vehicle.odom_reading
    ? vehicle.odom_reading.toString()
    : '0';
  const odomUnit = vehicle.odom_unit || '';

  return new Promise((resolve, reject) => {
    PaveModule.createSessionWithVehicle(
      vin,
      year,
      make,
      model,
      bodyType,
      trim,
      transmission,
      extColor,
      intColor,
      odomReading,
      odomUnit,
      (res, err) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      },
    );
  });
};

const uploadSessionPhoto = (data) => {
  const sessionID = data?.sessionID || false;
  const photoCode = data?.photoCode || false;
  const photo = data?.photo || false;
  return new Promise((resolve, reject) => {
    if (!sessionID || !photoCode || !photo) {
      reject({error: true, message: 'Missing required data'});
    }
    PaveModule.uploadPhoto(sessionID, photoCode, photo, (res, err) => {
      if (err) {
        Logger('PaveModule UploadPhoto fail');
        reject({error: true, message: err || 'Upload fail'});
      }
      resolve(res);
      Logger('PaveModule UploadPhoto successful');
    });
  });
};

const getInspectionProgress = (sessionID, timeout = 10000) => {
  return new Promise((resolve, reject) => {
    if (!sessionID) {
      reject({error: true, message: 'Missing SessionID'});
    }

    const timer = setTimeout(() => {
      reject(new Error(`Promise timed out after ${timeout} ms`));
      Logger('TrackEvent', sessionID, {
        LOG: 'Get Progress Timeout',
      });
    }, timeout);

    PaveModule.getInspectionProgress(sessionID, (res, err) => {
      clearTimeout(timer);
      if (err) {
        reject({error: true, message: err || 'Unknown error'});
      }
      resolve(res);
    });
  });
};

const getInspectionDetails = (sessionID) => {
  return new Promise((resolve, reject) => {
    if (!sessionID) {
      reject({error: true, message: 'Missing SessionID'});
    }
    PaveModule.getInspectionDetails(sessionID, (res, err) => {
      if (err) {
        reject({error: true, message: err || 'Unknown error'});
      }
      resolve(res);
    });
  });
};

const getSessionResults = (sessionID) => {
  return new Promise((resolve, reject) => {
    if (!sessionID) {
      reject({error: true, message: 'Missing SessionID'});
    }
    PaveModule.getReportDamage(sessionID, (res, err) => {
      if (err) {
        reject({error: true, message: err || 'Unknown error'});
      }
      resolve(res);
    });
  });
};

const completeSession = (sessionID) => {
  return new Promise((resolve, reject) => {
    if (!sessionID) {
      reject({error: true, message: 'Missing SessionID'});
    }
    PaveModule.completeSession(sessionID, (res, err) => {
      if (err) {
        reject({error: true, message: err || 'Unknown error'});
      }
      resolve({
        error: false,
        message: `Complete session ${sessionID}`,
      });
    });
  });
};

const getInspectionResult = (sessionID) => {
  return new Promise((resolve, reject) => {
    if (!sessionID) {
      reject({error: true, message: 'Missing SessionID'});
    }
    PaveModule.getReportDamage(sessionID, (res, err) => {
      if (err) {
        reject({error: true, message: err || 'Unknown error'});
      } else {
        resolve(res);
      }
    });
  });
};

// const getReportDamage = (sessionID) => {
//   return new Promise((resolve, reject) => {
//     if (!sessionID) {
//       reject({error: true, message: 'Missing SessionID'});
//     }
//     PaveModule.getReportDamage(sessionID, (res, err) => {
//       if (err) {
//         reject({error: true, message: err || 'Unknown error'});
//       }
//       resolve(res);
//     });
//   });
// };

const createSession = (redirectUrl) => {
  return new Promise((resolve, reject) => {
    PaveModule.createSession(redirectUrl, (res, err) => {
      if (err) {
        reject({error: true, message: 'Unknown error'});
      } else {
        resolve(res);
      }
    });
  });
};

const getPhotoStatusSession = (sessionID) => {
  return new Promise((resolve, reject) => {
    if (!sessionID) {
      reject({error: true, message: 'Missing SessionID'});
    }
    fetch(GET_PHOTO_STATUS_URL + sessionID).then((response) => {
      response.status === 200
        ? resolve(response.json())
        : reject('Unknown error');
    });
  });
};

const startSession = (sessionID) => {
  return new Promise((resolve, reject) => {
    if (!sessionID) {
      reject({error: true, message: 'Missing SessionID'});
    }
    PaveModule.startSession(sessionID, (res, err) => {
      if (err) {
        reject({error: true, message: err || 'Unknown error'});
      }
      resolve(res);
    });
  });
};

const getSessionFromLocal = () => {
  return new Promise((resolve, reject) => {
    PaveModule.getSessionListFromLocal((res, err) => {
      resolve(res);
    });
  });
};

export {
  initializeWithKey,
  createNewSessionWithVehicle,
  uploadSessionPhoto,
  getInspectionProgress,
  getInspectionDetails,
  getInspectionResult,
  completeSession,
  getPhotoStatusSession,
  createSession,
  startSession,
  getSessionFromLocal,
};

export default NativeCall = {
  initializeWithKey,
  createNewSessionWithVehicle,
  uploadSessionPhoto,
  getInspectionProgress,
  getInspectionDetails,
  getInspectionResult,
  completeSession,
  createSession,
  startSession,
  getSessionFromLocal,
};
