import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HP, WP} from './responsive';
import {CalloutColor800} from './text';
import { GroundDetailsType, groundListType } from '../utils/types';
import { AppColors } from '../styles/colors';

export type BookingCardType = {
  bgColor: string;
  id: number;
  textColor: string;
  data: GroundDetailsType;
  onPress: (id: number) => void;
};

const BookingCard = ({
  bgColor,
  id,
  textColor,
  data,
  onPress,
}: BookingCardType) => {
  return (
    <TouchableOpacity style={[styles.flex1]} onPress={() => onPress(id)}>
      <View
        style={[styles.flex1, {backgroundColor: bgColor}]}>
        <View style={[styles.timeContainer]}>
          <CalloutColor800 text={data.ground} color={textColor} />
          {/* <Caption2Color text={data.time} color={textColor} /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    shadowColor: AppColors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    borderRadius: WP(2),
  },
  timeContainer: {
    height: HP(5),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
