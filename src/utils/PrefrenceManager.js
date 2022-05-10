// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

class PreferenceManager {

  static async setPreference(key, value) {
    try {
      if (typeof (value) == "string") {
        await AsyncStorage.setItem(key, value)
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(value))
      }
    } catch (e) {
      console.log(e)
    }
  }

  static async getPreference(key) {
    try {
      return await AsyncStorage.getItem(key)
    } catch (e) {
      console.log(e)
    }
  }

  static async clearPreference() {
    var isClear = false
    try {
      await AsyncStorage.clear()
      isClear = true
    } catch (e) {
      console.log(e)
      isClear = false
    }
    return isClear
  }
}

export default PreferenceManager;
