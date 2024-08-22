import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HP, WP} from './responsive';
import {AppColors} from '../styles/colors';
import AppIcon, { IconProvider } from './appIcon';
import { CardType } from '../utils/types';
import { CalloutColor800Bold, TitleBoldColor } from './text';

const Card = ({data}: CardType) => {
  return (
    <View style={styles.container}>
      <View style={[styles.cardIcon, {backgroundColor: data.bgColor}]}>
        <AppIcon icon={data.icon} iconProvider={IconProvider.fontAwesome} size={32} color={AppColors.white} />
      </View>
      <View style={styles.gap}>
          <View style={styles.view}>
          <AppIcon icon='arrow-up' iconProvider={IconProvider.fontAwesome} size={18} color={AppColors.darkgrey} />
          <CalloutColor800Bold text={data.desc} color={AppColors.darkgrey} />
          </View>
          <TitleBoldColor text={data.number} color={AppColors.black} />
        </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: AppColors.white,
    shadowColor: AppColors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    elevation: 10,
    shadowRadius: 6,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  cardIcon: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: HP(5),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  gap: {gap: HP(1)},
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WP(2),
  }
});
