import createReducer from "../createReducer";
import * as constants from "../../actions/LoginAction/constants";

const intialState = {
  isLoading: false,
  clientPortalResData: null,
  loginResData: null,
  forgotPassResData: null,
  loginError: null,
  error: null,
  otpErrorData: null,
  otpResData: null,
  msgError: null,
  vehicleChasisData: null,
  vehicleDetailData: null,
  sessionCreatedData: null,
  postinsertdata:null,
  sessioncheckdata:null,
};
export const sellReducer = createReducer(intialState, {
  [constants.START_REQUEST](state) {
    return Object.assign({}, state, {
      isLoading: true,
    });
  },
  [constants.END_REQUEST](state, action) {
    return Object.assign({}, state, {
      isLoading: false,
    });
  },
  [constants.RESP_ERROR](state, action) {
    return Object.assign({}, state, {
      error: action.error,
    });
  },
  [constants.MSG_ERROR](state, action) {
    return Object.assign({}, state, {
      msgError: action,
    });
  },
  [constants.GET_VEHICLE_CHASIS](state, action) {
    return Object.assign({}, state, {
      vehicleChasisData: action.response,
      isLoading: false,
    });
  },
  [constants.GET_VEHICLE_DETAILS](state, action) {
    return Object.assign({}, state, {
      vehicleDetailData: action.response,
      isLoading: false,
    });
  },
  [constants.GET_CREATE_SESSION](state, action) {
    return Object.assign({}, state, {
      sessionCreatedData: action.response,
      isLoading: false,
    });
  },
  [constants.RESPONSE_POST_REQUEST](state, action) {
    return Object.assign({}, state, {
      postinsertdata: action.response,
      isLoading: false,
    });
  },
  [constants.SESSION_CHECK_REQUEST](state, action) {
    return Object.assign({}, state, {
      sessioncheckdata: action.response,
      isLoading: false,
    });
  },
});
