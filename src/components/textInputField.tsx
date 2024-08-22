import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import {AppColors} from '../styles/colors';
import {HP, WP} from './responsive';
import {CalloutColor800Bold} from './text';
import {TextInputFieldType} from '../utils/types';

const TextInputField = (props: TextInputProps & TextInputFieldType) => {
  return (
    <View style={styles.gap}>
      <CalloutColor800Bold text={props.title} color={AppColors.black} />
      <View style={styles.view}>
        <TextInput
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          placeholderTextColor={props.placeholderTextColor}
          value={props.value}
          style={styles.container}
        />
      </View>
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  container: {
    fontSize: 14,
    color: AppColors.black,
    width: '100%',
    
  },
  view: {
    width: '100%',
    flex: 1,
    backgroundColor: AppColors.bgColor,
    borderRadius: 10,
    paddingHorizontal: WP(1),
    borderWidth: 2,
    borderColor: AppColors.primaryColor,
  },
  gap: {gap: HP(1)},
});
