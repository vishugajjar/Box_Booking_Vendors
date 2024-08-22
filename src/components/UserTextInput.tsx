import {StyleSheet, TextInput, TextInputProps, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppIcon from './appIcon';
import {AppColors} from '../styles/colors';
import {HP, WP} from './responsive';
import {UserTextInputType} from '../utils/types';

const UserTextInput = ({
  iconName,
  iconProvider,
  icon,
  onVisible,
  ...textInputProps
}: UserTextInputType & TextInputProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconInput}>
      <AppIcon
        icon={iconName}
        iconProvider={iconProvider}
        size={20}
        color={AppColors.black}
      />
      <TextInput style={styles.textInput} {...textInputProps} />
      </View>
      {icon ? (
        <TouchableOpacity onPress={onVisible}>
          {icon}
        </TouchableOpacity>
      ) : (null)}
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
    justifyContent: 'space-between',
    shadowColor: AppColors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    elevation: 10,
    marginBottom: 10,
    shadowRadius: 6,
    paddingHorizontal: WP(4),
    paddingVertical: HP(1.5),
    borderRadius: 10,
  },
  iconInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textInput: {
    width: '80%',
    paddingVertical: HP(1),
  },
});
