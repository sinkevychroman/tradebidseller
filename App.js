import React, {Component} from 'react';
import {View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Router from './src/router';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import appReducer from './src/redux/reducers/index';
import * as globals from './src/utils/globals';
import {
  FunctionUtils,
  NetworkUtils,
  PreferenceKey,
  ConstantUtils,
} from './src/utils';
import PreferenceManager from './src/utils/PreferenceManager';
import * as Sentry from '@sentry/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebService from './src/utils/WebService';

Sentry.init({
  dsn: 'https://90478d7b10244b948c11e7ad3ecb29da@o1210681.ingest.sentry.io/6549198',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 5000,
});

//Bellow shows you logs in console in  the development mode
const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});
//bellow is the code for redux configurations
function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
  return createStore(appReducer, initialState, enhancer);
}
const store = configureStore({}); //passing the store of the redux using provider to entire app

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkLoginVal: false,
    };
  }

  componentDidMount() {
    NetInfo.addEventListener(state => {
      globals.isInternetConnected = state.isInternetReachable;
    });
    this.checkUserLoginStatus();
    this.updateUserActive();
  }

  async checkUserLoginStatus() {
    var user_token = await PreferenceManager.getPreferenceValue(
      PreferenceKey.USER_TOKEN,
    );

    if (user_token == null || user_token == '' || user_token == undefined) {
      globals.isLoggedIn = false;
      this.setState({checkLoginVal: true});
    } else {
      globals.isLoggedIn = true;
      globals.tokenValue = user_token;
      this.setState({checkLoginVal: true});
    }
  }

  async updateUserActive() {
    console.log('UPDATE_USER_ACTIVE_START');
    var user_id = await PreferenceManager.getPreferenceValue(
      ConstantUtils.USER_ID,
    );
    const token = await AsyncStorage.getItem(ConstantUtils.USER_TOKEN);

    const host = WebService.BASE_URL;
    const url = `${host}${WebService.UPDATE_USER_ACTIVE}`;

    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: `Bearer ${token}`,
      },
      body: {user_id: user_id},
    };

    return fetch(url, options).then(response => {
      console.log('USER_UPDATE_RESPONSE', response);
    });
  }

  componentWillUnmount() {
    // NetInfo.addEventListener(state => {
    //   globals.isInternetConnected = state.isInternetReachable;
    // });
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <Router />
        </View>
      </Provider>
    );
  }
}

export default Sentry.wrap(App);
