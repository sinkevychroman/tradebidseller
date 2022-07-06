// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

class PreferenceManager {
  static async setPreferenceValue(key, value) {
    await AsyncStorage.setItem(key, value);
  }

  static async getPreferenceValue(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log('qqweqwq', e.message);
      return '';
    }
  }

  static async getPreference(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log(e);
    }
  }

  static async clearPreference() {
    await AsyncStorage.clear();
  }
  static async clearPreferenceByKey(key) {
    await AsyncStorage.removeItem(key);
  }
}

export default PreferenceManager;
