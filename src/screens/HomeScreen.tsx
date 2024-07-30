import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColors} from '../styles/colors';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.flex}>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: AppColors.bgColor,
  },
  flex: {flex: 1},
});
