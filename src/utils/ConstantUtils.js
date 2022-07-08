import {Platform, StatusBar, Dimensions} from 'react-native';
import {colors, images, strings, fonts} from '../themes';

export default ConstantUtils = {
  STATUSBAR_HEIGHT: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  APPBAR_HEIGHT: Platform.OS === 'ios' ? 22 : 0,
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,

  APIHEADER: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
  IMAGE_OPTIONS: {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,

    storageOptions: {
      skipBackup: true,
      cameraRoll: true,
    },
  },

  // Regex
  MOBILE_NUMBER_REGEX: /^\d{10}$/,

  // api status...
  SUCCESS: 'Success',
  FAIL: 'Fail',
  ERROR: 'Error',

  TEXTFEILD_LABLE_HEIGHT: 12,
  BUTTON_HEIGHT: 46,
  HEADER_VIEW_HEIGHT: 60,

  //Prefrence Keys
  IS_USER_LOGIN: 'user_login',
  LOGIN_TYPE: 'login_type',
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  USER_ID: 'user_id',
  CURRENT_SCREEN: 'current_screen',
  IN_APP_SUBCRIPTION: 'in_app_subcription',

  //Date And Time
  HH_MM_A_12: 'hh:mm a',
  DD_MM_YYYY_HH_MM_A_12: 'DD-MM-YYYY hh:mm a',
  MM_DD_YYYY: 'MM-DD-YYYY',

  //User Type
  OK: 1,
  NO_DATA: 0,
  EXIST: 422,
  ACTIVE: 1,
  PADDING: 2,
  DEACTIVE: 0,

  //Screens Id
  SPLASH_ID: 111,
  LOGIN_ID: 112,
  HOME_ID: 113,

  //Router Key
  SPLASH: 'Splash',
  LOGIN: 'Login',
  MAIN: 'Main',
  HOME: 'Home',
  BUY: 'Buy',
  SELL: 'Sell',
  FAV: 'Favourite',
  PROFILE: 'Profile',
  SELLSTEP2: 'SellStep2',
  SELLSTEP3: 'SellStep3',

  //Profile Menu ID
  ABOUT_US_ID: 111,
  MEMBERSHIP_ID: 112,
  CHANGE_PASSWORD_ID: 113,
  PRIVACY_SETTINGS_ID: 114,
  TERMS_OF_USE_ID: 115,
  PRIVACY_POLICY_ID: 116,
  CONTACT_US_ID: 117,
  BLOCKED_ID: 118,

  //FCM Token
  FCM_TOKEN: '',

  //Gender
  MAN: 'Man',
  WOMAN: 'Women',
  OTHER: 'Other',
  BOTH: 'Both',
  GUYS: 'Guys',
  GIRLS: 'Girls',
  MALE: 'Male',
  FEMALE: 'Female',
  WOMAN_Dd: 'Woman',
  MAN_Dd: 'Men',

  //Action
  ACTION_ONE_GENDER: 'Gender',
  ACTION_TWO_PROFILE: 'Profile',
  ACTION_THREE_USET_INFO: 'UserInfo',
  ACTION_FOUR_OTHER_INFO: 'OtherInfo',

  //Menu Items Title and Id
  MENU_FILTER: 'Filter',
  MENU_NOTIFICATION: 'Notification',
  MENU_DONE: 'Done',

  MENU_FILTER_ID: 1111,
  MENU_NOTIFICATION_ID: 1112,
  MENU_DONE_ID: 1113,

  //Friends Tabs
  REQUESTS: 'Requests',
  ALL_FRIENDS: 'All Friends',
  FAVORITES: 'Favorites',

  //Login Type
  LOGIN_TYPE_GOOGLE: 'Google',
  LOGIN_TYPE_APPLE: 'Apple',

  //Menu Item Type
  MENU_TYPE_REPORT: 'Report',
  MENU_TYPE_BLOCK: 'Block',

  //User Block Unblock Type
  USER_UNBLOCK: 'Unblock',
  USER_BLOCK: 'Block',

  OUT_SIDE: 'outSide',
  REDIRECT: 'Redirect',
  CLEAR_CHAT: 'Clear Group Messages',
  CLEAR_PERSONAL_CHAT: 'Clear Message',

  //hide field
  USER_EMAIL: 'USEREMAIL',
  EMAIL_EXTENSION: '@nvd.ie',
  // EMAIL_EXTENSION:'@auctionsoftware.com'

  //appname
  TRADEBID: 'Tradebid',
  LOGINAGAIN: 'Login Again',
  LOGINSESSIONEXPIRE: 'Login session expire',
  USER_PASSWORD: 'USERPASSWORD',
  IS_USER_REMEMBER: 'user_remember',
};
