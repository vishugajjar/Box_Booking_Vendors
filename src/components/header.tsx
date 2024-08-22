import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppIcon, {IconProvider} from './appIcon';
import {Title2BoldColor} from './text';
import {useNavigation} from '@react-navigation/native';
import {HP, WP} from './responsive';
import { Root } from '../utils/types';
import { AppColors } from '../styles/colors';

type HeaderType = {
  title: string;
  textColor?: string;
  padding?: number;
  icon?: boolean;
};

const Header = ({title, textColor, padding, icon}: HeaderType) => {
  const navigation = useNavigation<Root>();
  return (
    <View style={[styles.headerContainer, {paddingHorizontal: padding}]}>
      {icon ? (
        <TouchableOpacity
          style={styles.backcontainer}
          onPress={() => navigation.goBack()}>
          <AppIcon
            icon="arrow-left"
            iconProvider={IconProvider.fontAwesome5}
            color={AppColors.primaryColor}
            size={22}
          />
        </TouchableOpacity>
      ) : null}
      <View style={[styles.headingStyle, {marginLeft: icon ? -WP(7) : WP(0)}]}>
        <Title2BoldColor
          text={title}
          color={textColor ? textColor : AppColors.primaryColor}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: Platform.OS === 'ios' ? HP(0) : HP(1),
  },
  backcontainer: {borderRadius: 40, padding: 10},
  headingStyle: {alignSelf: 'center', width: '100%'},
});