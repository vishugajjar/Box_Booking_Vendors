import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {AppColors} from '../styles/colors';
import UserTextInput from '../components/UserTextInput';
import {CalloutColor800, TitleBoldColor} from '../components/text';
import {HP} from '../components/responsive';
import AppIcon, {IconProvider} from '../components/appIcon';
import AppButton from '../components/appButton';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Root } from '../utils/types';
import { routes } from '../utils/routes';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { currentAuth } from '../utils/firebaseService';
import { DB_KEYS, getFireStoreData } from '../utils/fireStoreHelpers';
import { setItem, STORAGE_KEYS } from '../utils/storageHelper';

const LoginScreen = () => {
  const navigation = useNavigation<Root>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const storeToken = async (token: string) => {
    await setItem(STORAGE_KEYS.TOKEN, token);
  };

  const handleSignIn = async () => {
    
      await signInWithEmailAndPassword(
        currentAuth,
        email!,
        password!,
      ).then(async userCred => {
        const user = await getFireStoreData({
          collectionName: DB_KEYS.USER,
          id: userCred?.user.uid,
        });
        if (user) {
          await setItem(
            STORAGE_KEYS.USER_DATA,
            JSON.stringify(user),
          );
        }
        if (userCred) {
          storeToken(userCred.user.uid);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: routes.APP }],
            }),
          );
        }
      }).catch(() => {
        Alert.alert("Please enter Email Id and Password.")
      });
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <KeyboardAvoidingView style={styles.flex}>
        <ScrollView style={styles.flex} contentContainerStyle={styles.view}>
          <View>
            <TitleBoldColor text="Login" color={AppColors.black} />
          </View>
          <View style={styles.middleView}>
            <UserTextInput
              iconName="mail-outline"
              iconProvider={IconProvider.ionIcons}
              placeholder="Enter Your Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <UserTextInput
              iconName="lock-outline"
              iconProvider={IconProvider.materialCommunityIcons}
              placeholder="Enter Your Password"
              secureTextEntry={passwordVisible ? false : true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              icon={<AppIcon icon={passwordVisible ? 'eye-outline' : 'eye-off-outline'} iconProvider={IconProvider.ionIcons} size={20} color={AppColors.black} />}
              onVisible={() => setPasswordVisible(!passwordVisible)}
            />
            <TouchableOpacity style={styles.touchableText}>
              <Text style={styles.text}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
            <AppButton onPress={handleSignIn} text='Sign In' style={styles.btn} />
            <View style={styles.icon}>
            <CalloutColor800 text={`Don't have an account?`} color={AppColors.darkgrey} />
            <TouchableOpacity onPress={() => navigation.navigate(routes.SIGNUP)}>
              <CalloutColor800 text='Register' color={AppColors.blue} />
            </TouchableOpacity>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: AppColors.bgColor,
  },
  view: {
    padding: 20,
  },
  flex: {flex: 1},
  middleView: {
    alignSelf: 'center',
    marginTop: HP(20),
    width: '100%',
    gap: 20,
  },
  btn: {
    width: '100%',
    alignSelf: 'center',
    marginTop: HP(30),
  },
  text: {
    color: AppColors.blue,
  },
  touchableText : {justifyContent: 'flex-end', alignItems: "flex-end"},
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: HP(4),
    alignSelf: 'center'
  },
});
