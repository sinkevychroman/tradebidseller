//This is the class for the actions creators and action dispatchers

import {
  WebService,
  FunctionUtils,
  ApiUtils,
  PrefrenceManager,
} from '../../../utils';
import * as constants from './constants';

const TAG = 'Sell Action';

//action for start loader
export function actionStartRequest() {
  return {
    type: constants.START_REQUEST,
  };
}
/* action for end loader */
export function actionEndRequest() {
  return {
    type: constants.END_REQUEST,
  };
}

/* action for set error */
export function actionSetError(error) {
  return {
    type: constants.RESP_ERROR,
    error,
  };
}

/* action for set message error */
export function actionSetMessageError(error) {
  return {
    type: constants.MSG_ERROR,
    error,
  };
}

//ChasicDetail action get data
export function actionGetChasicDetail(response) {
  return {
    type: constants.GET_CHASIS_DETAIL,
    response,
  };
}

//VehicleDetail action get data
export function actionGetVehicleDetail(response) {
  return {
    type: constants.GET_VEHICLE_DETAIL,
    response,
  };
}

//PAV SESSION CREATE DATA ACTION
export function actionSessionCreate(response) {
  return {
    type: constants.GET_CREATE_SESSION,
    response,
  };
}

//Post Data CREATE DATA ACTION
export function actionPostDataInsert(response) {
  return {
    type: constants.RESPONSE_POST_REQUEST,
    response,
  };
}

//Post Data SESSION CHECK ACTION
export function actionsessionCheck(response) {
  return {
    type: constants.SESSION_CHECK_REQUEST,
    response,
  };
}

//this will dispatch the action accroding to the need
export function getRegisterVehicleDetails(registartionNumber) {
  return dispatch => {
    dispatch(actionStartRequest());
    return ApiUtils.getExAPIData(
      `${WebService.SWEEP_URL}request_type=full_irish_uk_history&registration_number=${registartionNumber}&key=Sp0975127Ghx31d&format=json&vehicle_mileage=0&mileage_type=k&get_valuation=true`,
    )
      .then(response => {
        dispatch(actionEndRequest());
        dispatch(actionGetVehicleDetail(response));
      })
      .catch(e => {
        dispatch(actionEndRequest());
        dispatch(actionSetError(JSON.stringify(e.errors)));
        dispatch(actionSetMessageError(JSON.stringify(e.message)));
        // FunctionUtils.showToast(JSON.stringify(e.message));
      });
  };
}

//this will dispatch the action accroding to the need
export function getChasisDetails(registartionNumber) {
  return dispatch => {
    dispatch(actionStartRequest());
    return ApiUtils.getExAPIData(
      `${WebService.SWEEP_URL}request_type=irish_uk_mileage&registration_number=${registartionNumber}&key=Sp0975127Ghx31d&format=json&vehicle_mileage=0&mileage_type=k&get_valuation=true`,
    )
      .then(response => {
        dispatch(actionEndRequest());
        dispatch(actionGetChasicDetail(response));
      })
      .catch(e => {
        dispatch(actionEndRequest());
        dispatch(actionSetError(JSON.stringify(e.errors)));
        dispatch(actionSetMessageError(JSON.stringify(e.message)));
        // FunctionUtils.showToast(JSON.stringify(e.message));
      });
  };
}

//this will dispatch the action accroding to the need
export function postSessionDetails(params) {
  return dispatch => {
    dispatch(actionStartRequest());
    return ApiUtils.postExAPIData(params)
      .then(response => {
        dispatch(actionEndRequest());
        dispatch(actionSessionCreate(response));
      })
      .catch(e => {
        dispatch(actionEndRequest());
        dispatch(actionSetError(JSON.stringify(e.errors)));
        dispatch(actionSetMessageError(JSON.stringify(e.message)));
        // FunctionUtils.showToast(JSON.stringify(e.message));
      });
  };
}

//this will dispatch the action accroding to the need
export function postVahicalData(params) {
  return dispatch => {
    dispatch(actionStartRequest());
    return ApiUtils.postwithtoken(WebService.POST_VEHICLE, params)
      .then(response => {
        console.log('postVahicalData res =========', response);
        dispatch(actionEndRequest());
        dispatch(actionPostDataInsert(response));
      })
      .catch(e => {
        console.log('error postVahicalData res =========', e);

        dispatch(actionEndRequest());
        dispatch(actionSetError(JSON.stringify(e.errors)));
        dispatch(actionSetMessageError(JSON.stringify(e.message)));
      });
  };
}

//this will dispatch the action accroding to the check Session
export function checkSession(endpoint, params) {
  return dispatch => {
    dispatch(actionStartRequest());
    return ApiUtils.postwithtoken(endpoint, params)
      .then(response => {
        console.log('response =============================', response);
        dispatch(actionEndRequest());
        dispatch(actionsessionCheck(response));
      })
      .catch(e => {
        console.log('e =============================', e);
        dispatch(actionEndRequest());
        dispatch(actionSetError(JSON.stringify(e.errors)));
        dispatch(actionSetMessageError(JSON.stringify(e.message)));
      });
  };
}
