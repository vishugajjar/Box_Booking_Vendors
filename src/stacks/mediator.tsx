import {CommonActions, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import { getItem, STORAGE_KEYS } from '../utils/storageHelper';
import { AppColors } from '../styles/colors';
import { routes } from '../utils/routes';

const Mediator = () => {
  const navigation = useNavigation();

  const getToken = async () => {
    const token = await getItem(STORAGE_KEYS.TOKEN);
      if (token) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: routes.APP}],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: routes.AUTH}],
          }),
        );
      }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={AppColors.primaryColor} />
      </View>
    </SafeAreaView>
  );
};

export default Mediator;