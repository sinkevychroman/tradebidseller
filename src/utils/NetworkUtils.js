import NetInfo from '@react-native-community/netinfo';
import {Platform} from 'react-native';

export default class NetworkUtils {
  static async isNetworkAvailable() {
    const response = await NetInfo.fetch();

    return response.isConnected && response.isInternetReachable;
  }
}
