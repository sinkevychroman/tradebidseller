/**
 * Define all type of string constants, which are used in api
 */

// ============================================================
// ================= AUTHORIZATION TOKENS =====================
// ============================================================

export const AUTHORIZATION_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2U3OGI2MDE1NjljNDc5MzIwNmZmYzQiLCJpYXQiOjE1NjcyMTU2Mzd9.HEWpjWAoBekeNuH0VtJTvqJwl4vXuJlF_9J9a6Rrkfo';
export const NOTIFY_SMS_AUTHORIZATION_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg2NjQ3NjgsImlkIjoxfQ.jb9ecXRQw_ok7JYBNyvJYurJPgWos1izCrcFc7trFxg';

// ============================================================
// =======================  API URLs ==========================
// ============================================================

// Copy here
export const REACT_APP_BASE_URL_V1 = 'https://paveapi.com/v1/';
export const REACT_APP_BASE_URL = 'https://session.paveapi.com/api/';
export const REACT_APP_AGENT_BASE_URL = 'https://agent.paveapi.com/api/';
export const CAPTURE_BASE_URL = 'https://capture.paveapi.com/';
export const NOTIFY_BASE_URL = 'https://notify.paveapi.com/api/notify';
export const REPORT_BASE_URL = 'https://reports.paveapi.com/api/';
export const APP_PAVE_API_SESSION = 'https://reports.paveapi.com/api/';
export const DAMAGE_BASE_API = 'https://damages.paveapi.com/api/';

//End Copy

// ======================== REACT_APP_BASE_URL

export const START_SESSION_URL = REACT_APP_BASE_URL + 'start';
export const REACT_APP_IMG_URL_UPLOAD = REACT_APP_BASE_URL + 'photos/';
export const REACT_APP_IMG_URL_UPLOAD_USER =
  REACT_APP_BASE_URL + 'user_photos/';
export const REACT_APP_REPORT_URL = REACT_APP_BASE_URL + 'user_photos/';
export const API_KEY_GENERATION_SESSION = REACT_APP_BASE_URL + 'user_photos/';
export const APP_PAVE_API_SESSION_PROGRESS = REACT_APP_BASE_URL + 'sessions/';
export const UPDATE_ODOMETER_URL = REACT_APP_BASE_URL + 'odom_update/';
export const UPDATE_DAMAGE_BY_UUID_URL =
  REACT_APP_BASE_URL + 'update_damages_by_uuid';
export const UPDATE_DRIVETRAIN_URL = REACT_APP_BASE_URL + 'drivetrain_update/';
export const UPDATE_BODY_TYPE_URL = REACT_APP_BASE_URL + 'body_type_update/';
export const UPDATE_DISPLACEMENT_URL =
  REACT_APP_BASE_URL + 'displacement_update/';
export const UPDATE_ENGINE_TYPE_URL =
  REACT_APP_BASE_URL + 'engine_type_update/';
export const UPDATE_EXT_COL_URL = REACT_APP_BASE_URL + 'ext_col_update/';
export const UPDATE_FUEL_TYPE_URL = REACT_APP_BASE_URL + 'fuel_type_update/';
export const UPDATE_INT_COL_URL = REACT_APP_BASE_URL + 'int_col_update/';
export const UPDATE_TRANSMISSION_URL =
  REACT_APP_BASE_URL + 'transmission_update/';
export const INPUT_VIN_URL = REACT_APP_BASE_URL + 'input_vin';
export const GET_PHOTO_STATUS_URL = REACT_APP_BASE_URL + 'sessions/';
export const SYNC_DAMAGES_URL = REACT_APP_BASE_URL + 'sync_damages';
export const CHECK_ADDITIONAL_MODIFY = DAMAGE_BASE_API + 'additional/modify/';

// ====================== REACT_APP_BASE_URL_V1
// export const REACT_APP_BASE_URL_V1 = 'https://dash-dev.paveapi.com/v1/';
export const GENERATE_SESSION_ID =
  REACT_APP_BASE_URL_V1 +
  'generate-session-id/3775f2dd-b491-40f5-87dd-32e6b0d7f554';

// ====================== REACT_APP_AGENT_BASE_URL

export const REACT_APP_AGENT_BASE_TASK_URL = (taskId) =>
  REACT_APP_AGENT_BASE_URL + 'tasks/' + taskId + '/user-add-damage';
export const GET_EXTERIORS_ANNOTATED_URL =
  REACT_APP_AGENT_BASE_URL + 'tasks/exteriors-annotated/';
export const UPDATE_TIRE_URL =
  REACT_APP_AGENT_BASE_URL + 'tasks/user-update-tire/';
export const USER_UPDATE_ODOMETER_URL =
  REACT_APP_AGENT_BASE_URL + 'inspections/';
export const REPORT_FILE_URL = REPORT_BASE_URL + 'report/';
