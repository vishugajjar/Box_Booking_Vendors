import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import AppIcon from './appIcon';
import {AppColors} from '../styles/colors';
import {HP, WP} from '../utils/responsive';
import {UserTextInputType} from '../utils/types';

const UserTextInput = ({
  iconName,
  iconProvider,
  ...textInputProps
}: UserTextInputType & TextInputProps) => {
  console.log('icon:', iconName, iconProvider);
  return (
    <View style={styles.container}>
      <AppIcon
        icon={iconName}
        iconProvider={iconProvider}
        size={20}
        color={AppColors.black}
      />
      <TextInput style={styles.textInput} {...textInputProps} />
    </View>
  );
};

export default UserTextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: AppColors.white,
    alignItems: 'center',
    shadowColor: AppColors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    marginBottom: 10,
    shadowRadius: 6,
    paddingHorizontal: WP(4),
    paddingVertical: HP(1.5),
    borderRadius: 10,
  },
  textInput: {
    width: '90%',
    paddingVertical: HP(1),
  },
});
