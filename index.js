import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PAVESDK from 'react-native-pave-module';
import AppLogger, {
  EnvironmentType,
} from 'react-native-pave-module/utils/AppLogger';
import codePush from 'react-native-code-push';
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
