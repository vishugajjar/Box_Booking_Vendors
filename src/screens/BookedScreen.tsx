import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {AppColors} from '../styles/colors';
import Header from '../components/header';
import {HP, WP} from '../components/responsive';
import BookedCard from '../components/bookedCard';
import { useNavigation } from '@react-navigation/native';
import { Root } from '../utils/types';

const BookedScreen = () => {
  const navigation = useNavigation<Root>();
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Booked" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.containerScroll}>
          <BookedCard />
          <BookedCard />
        </ScrollView>
    </SafeAreaView>
  );
};

export default BookedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.bgColor,
  },
  scroll: {
    flex: 1,
    marginTop: HP(3),
  },
  containerScroll: {
    gap: 16,
    paddingHorizontal: WP(6),
  },
});
