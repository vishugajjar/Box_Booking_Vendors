/* eslint-disable react-native/no-inline-styles */
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {AppColors} from '../styles/colors';
import {Title3ColorBold} from './text';
import {HP} from '../utils/responsive';

interface Props {
  text: string;
  onPress?: () => void;
  textColor?: string;
  radius?: number;
  icon?: any;
  disable?: boolean;
  style: StyleProp<ViewStyle>;
}

const AppButton = ({
  text,
  style,
  onPress,
  textColor,
  radius,
  icon,
  disable,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disable ? disable : false}
      onPress={onPress}
      style={[styles.container, style, {borderRadius: radius ? radius : 15}]}>
      <Title3ColorBold text={text} color={textColor ? textColor : 'white'} />
      {icon ? icon : null}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primaryColor,
    paddingVertical: HP(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
});
