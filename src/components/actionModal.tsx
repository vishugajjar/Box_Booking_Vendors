import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { actions } from '../utils/data';
import AppIcon, { IconProvider } from './appIcon';
import { AppColors } from '../styles/colors';
import { ActionModalType } from '../utils/types';

const ActionModal = ({showOptions, onButtonPress, onClose}: ActionModalType) => {
  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={showOptions}
    onRequestClose={onClose}>
    <View style={styles.modalBack} />
    <View style={styles.modalView}>
      <TouchableOpacity
        style={styles.close}
        onPress={onClose}>
            <AppIcon icon="close" iconProvider={IconProvider.antDesign} size={20} color={AppColors.black} />
      </TouchableOpacity>
      {actions.map(({type, title, options, iconName}) => {
        return (
          <TouchableOpacity
            onPress={() => {
              onButtonPress(type, options);
              onClose();
            }}
            style={styles.actionView}>
                <AppIcon icon={iconName} iconProvider={IconProvider.materialIcons} size={20} color={AppColors.black} />
            <Text style={styles.actionText}>{title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </Modal>
  )
}

export default ActionModal

const styles = StyleSheet.create({
     modalBack: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.7,
  },
  modalView: {
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  close: {
    alignSelf: 'flex-end',
  },
  actionView: {
    padding: 10,
    gap: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
})