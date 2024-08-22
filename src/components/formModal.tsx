import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FormModalType} from '../utils/types';
import {AppColors} from '../styles/colors';
import {HP, WP} from './responsive';
import {CalloutColor800, CalloutColor800Bold} from './text';
import TextInputField from './textInputField';
import Spacer from './spacer';
import {availableData} from '../utils/data';
import AppIcon, {IconProvider} from './appIcon';
import AppButton from './appButton';

const FormModal = ({visible, onClose, data}: FormModalType) => {
  const [selected, setSelected] = useState<number>(availableData[0].id);
  const [value, setValue] = useState<string>();
  
  useEffect(() => {
    let available = data.available === true ? availableData[0].id : availableData[1].id;
    setSelected(available)
    let price = data.price ? data.price.toString() : value;
    setValue(price)
  }, [data])
  
  
  
  return (
    <Modal
      transparent
      animationType="slide"
      onRequestClose={onClose}
      visible={visible}>
      <TouchableOpacity style={styles.bg} onPress={onClose} />
      <ScrollView
        style={styles.view}
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.flex1}>
          {data ? (
            <>
              <TextInputField
                title="Price"
                placeholder="000"
                value={value}
                onChangeText={value => setValue(value)}
              />
            </>
          ) : null}
          <Spacer height={HP(3)} />
          <View style={styles.view1}>
            <View>
              {availableData.map((item, index) => {
                return (
                  <View key={index} style={styles.iconView}>
                    <TouchableOpacity onPress={() => setSelected(item.id)}>
                      <AppIcon
                        icon={
                          selected === item.id
                            ? 'circle-slice-8'
                            : 'circle-outline'
                        }
                        iconProvider={IconProvider.materialCommunityIcons}
                        size={18}
                        color={AppColors.black}
                      />
                    </TouchableOpacity>
                    <CalloutColor800
                      text={item.title}
                      color={AppColors.black}
                    />
                  </View>
                );
              })}
            </View>
          </View>
          <AppButton
            text="Done"
            textColor={AppColors.black}
            style={styles.btn}
            onPress={onClose}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FormModal;

const styles = StyleSheet.create({
  view: {
    width: '90%',
    height: '35%',
    borderRadius: 20,
    backgroundColor: AppColors.white,
    position: 'absolute',
    zIndex: 10,
    alignSelf: 'center',
    bottom: HP(25),
    flex: 1,
  },
  flex1: {flex: 1, width: '100%'},
  scrollContainer: {
    padding: 20,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bg: {
    backgroundColor: AppColors.black,
    opacity: 0.65,
    flex: 1,
  },
  gap: {gap: HP(1)},
  view1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: WP(4),
  },
  iconView: {
    flexDirection: 'row',
    gap: WP(2),
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  btn: {
    width: '90%',
    alignSelf: 'center',
    marginTop: HP(4),
  }
});
