import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import {AppColors} from '../styles/colors';
import UserTextInput from '../components/UserTextInput';
import {TitleBoldColor} from '../components/text';
import {HP} from '../utils/responsive';
import {IconProvider} from '../components/appIcon';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <KeyboardAvoidingView style={styles.flex}>
        <ScrollView style={styles.flex} contentContainerStyle={styles.view}>
          <View>
            <TitleBoldColor text="Login" color={AppColors.black} />
          </View>
          <View style={styles.middleView}>
            <UserTextInput
              iconName="email-outline"
              iconProvider={IconProvider.materialCommunityIcons}
              placeholder="Enter Your Email"
            />
            <UserTextInput
              iconName="email-outline"
              iconProvider={IconProvider.materialCommunityIcons}
              placeholder="Enter Your Password"
              secureTextEntry
            />
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
});
