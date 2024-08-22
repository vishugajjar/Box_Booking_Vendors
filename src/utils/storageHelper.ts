import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
    DEVICE_TOKEN: 'deviceToken',
    TOKEN: 'token',
    USER_DATA: 'UserData',
  };

  export const setItem = async (
    key: string,
    value: string,
  ) => {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (error) {
      return false;
    }
  };

  export const getItem = async (
    key: string,
  ): Promise<string | false> => {
    try {
      const value = await AsyncStorage.getItem(key);
  
      if (value !== null) {
        return value;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };