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
import {HP, WP} from '../components/responsive';
import AppIcon, {IconProvider} from '../components/appIcon';
import AppButton from '../components/appButton';
import Header from '../components/header';
import { CalloutColor800, HeadlineBoldColor } from '../components/text';
import { useNavigation } from '@react-navigation/native';
import { Root } from '../utils/types';
import { routes } from '../utils/routes';
import { auth } from '../utils/firebaseService';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { DB_KEYS, setFirestoreData } from '../utils/fireStoreHelpers';

const data = [{id: 1, name: 'Owner'}, {id: 2, name: 'User'}]

const SignUpScreen = () => {
  const navigation = useNavigation<Root>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [rePassword, setRePassword] = useState<string>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [rePasswordVisible, setRePasswordVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(data[0].name);

  const handleSignUp = async () => {
    if (
      password === rePassword
    ) {
      await createUserWithEmailAndPassword(
        auth,
        email!,
        password!,
      ).then(userCred => {
        const data = {
          _id: userCred.user.uid,
          displayName: name,
          email: userCred.user.providerData[0].email,
          loginAs: selected,
          uid: userCred.user.providerData[0].uid,
        };
        setFirestoreData({
          collectionName: DB_KEYS.USER,
          id: userCred.user.uid,
          payload: data,
        }).then(() => {
          navigation.navigate(routes.LOGIN);
        });
      });
      
    } else {
      Alert.alert('Invalid Email or Password!');
    }
  };
  
  return (
    <SafeAreaView style={styles.safeView}>
      <KeyboardAvoidingView style={styles.flex}>
        <ScrollView style={styles.flex} contentContainerStyle={styles.view}>
          <View>
          <Header title='Sign Up' />
          </View>
          <View style={styles.middleView}>
          <UserTextInput
              iconName="person-outline"
              iconProvider={IconProvider.ionIcons}
              placeholder="Enter Your Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
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
              icon={<AppIcon icon={passwordVisible ? 'eye-outline' : 'eye-off-outline'} iconProvider={IconProvider.ionIcons} size={20} color={AppColors.black} />}
              value={password}
              onChangeText={(text) => setPassword(text)}
              onVisible={() => setPasswordVisible(!passwordVisible)} 
            />
            <UserTextInput
              iconName="lock-outline"
              iconProvider={IconProvider.materialCommunityIcons}
              placeholder="Re-Enter Your Password"
              secureTextEntry={rePasswordVisible ? false : true}
              icon={<AppIcon icon={rePasswordVisible ? 'eye-outline' : 'eye-off-outline'} iconProvider={IconProvider.ionIcons} size={20} color={AppColors.black} />}
              value={rePassword}
              onChangeText={(text) => setRePassword(text)}
              onVisible={() => setRePasswordVisible(!rePasswordVisible)}
            />
            <View style={styles.view1}>
            <HeadlineBoldColor text='Login As:' color={AppColors.black} />
            <View style={styles.gap}>
              {data.map((item, index) => {
                return (
                  <View style={styles.icon} key={index}>
                    <TouchableOpacity onPress={() => setSelected(item.name)}>
                    <AppIcon icon={selected === item.name ? 'circle-slice-8' : 'circle-outline'} iconProvider={IconProvider.materialCommunityIcons} size={24} color={AppColors.black} />
                    </TouchableOpacity>
                    <HeadlineBoldColor text={item.name} color={AppColors.black} />
                  </View>
                )
              })}
            </View>
            </View>
          </View>
            <AppButton text='Sign Up' style={styles.btn} onPress={handleSignUp} />
              <View style={[styles.icon, styles.add]}>
            <CalloutColor800 text='Already have an account?' color={AppColors.darkgrey} />
            <TouchableOpacity onPress={() => navigation.navigate(routes.LOGIN)}>
              <CalloutColor800 text='Sign In' color={AppColors.blue} />
            </TouchableOpacity>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
    marginTop: HP(10),
    width: '100%',
    gap: 20,
  },
  btn: {
    width: '100%',
    alignSelf: 'center',
    marginTop: HP(10),
  },
  text: {
    color: AppColors.blue,
  },
  touchableText : {justifyContent: 'flex-end', alignItems: "flex-end"},
  view1: {
    width: '100%',
    shadowColor: AppColors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    elevation: 10,
    marginBottom: 10,
    shadowRadius: 6,
    paddingHorizontal: WP(4),
    paddingVertical: HP(2.5),
    backgroundColor: AppColors.white, 
    flexDirection: 'row',
    gap: WP(10),
    alignItems: 'flex-start',
    borderRadius: 10,
  },
  gap: {gap: HP(2), flexDirection: 'row', alignItems: 'center',},
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  add: {
    marginTop: HP(6),
    alignSelf: 'center'
  }
});
