import NetInfo from '@react-native-community/netinfo';
import {Platform} from 'react-native';

export default class NetworkUtils {
  static async isNetworkAvailable() {
    const response = await NetInfo.fetch();

    if (Platform.OS === 'ios') {
      return response.isConnected && response.isInternetReachable;
    } else {
      return true;
    }
  }
}
