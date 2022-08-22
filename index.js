import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PAVESDK from 'react-native-pave-module';
import AppLogger, {
  EnvironmentType,
} from 'react-native-pave-module/utils/AppLogger';
import codePush from 'react-native-code-push';
import NetInfo from '@react-native-community/netinfo';

NetInfo.configure({
  reachabilityUrl: 'https://clients3.google.com/generate_204',
  reachabilityTest: async response => response.status === 204,
  reachabilityLongTimeout: 60 * 1000, // 60s
  reachabilityShortTimeout: 5 * 1000, // 5s
  reachabilityRequestTimeout: 15 * 1000, // 15s
  reachabilityShouldRun: () => true,
  //shouldFetchWiFiSSID: true, // met iOS requirements to get SSID. Will leak memory if set to true without meeting requirements.
  useNativeReachability: false,
});

let codePushOptions = { 
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: true,
};

let MyApp = codePush(codePushOptions)(App);
AppRegistry.registerComponent(appName, () => MyApp);
PAVESDK.initializeWithKey('799c70fd-9be0-465d-89e3-7230de7ec9d3');
// LogBox.ignoreAllLogs(true);
AppLogger.getInstance().setEnvironment(EnvironmentType.PROD);
