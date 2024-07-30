import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../styles/colors';

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.view}>
        <Text>SIGN UP SCREEN</Text>
      </View>
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
    flex: 1,
  },
});
