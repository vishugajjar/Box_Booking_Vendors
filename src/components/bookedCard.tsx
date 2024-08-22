import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HP, WP} from './responsive';
import AppIcon, {IconProvider} from './appIcon';
import {CalloutColor800Bold, SubHeadingColor} from './text';
import { AppColors } from '../styles/colors';

const BookedCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.view}>
      <Image source={{uri: 'https://images.pexels.com/photos/253905/pexels-photo-253905.jpeg?cs=srgb&dl=pexels-squaredesign-253905.jpg&fm=jpg'}} style={styles.img} />
      <View style={styles.textView}>
        <View style={styles.text}>
          <AppIcon
            icon="calendar"
            iconProvider={IconProvider.octicons}
            color={AppColors.darkerGrey}
            size={14}
          />
          <SubHeadingColor text="27-07-2024" color={AppColors.darkerGrey} />
        </View>
        <View style={styles.text}>
          <AppIcon
            icon="clock"
            iconProvider={IconProvider.octicons}
            color={AppColors.darkerGrey}
            size={14}
          />
          <SubHeadingColor
            text="10:00am-11:00am"
            color={AppColors.darkerGrey}
          />
        </View>
        <View style={styles.text}>
          <AppIcon
            icon="location"
            iconProvider={IconProvider.octicons}
            color={AppColors.darkerGrey}
            size={14}
          />
          <SubHeadingColor text="Ground 1" color={AppColors.darkerGrey} />
        </View>
      </View>
      </View>
      <View style={styles.border} />
      <View style={styles.view1}>
        <View style={styles.rowView}>
          <Image style={styles.image} source={{uri: 'https://images.pexels.com/photos/253905/pexels-photo-253905.jpeg?cs=srgb&dl=pexels-squaredesign-253905.jpg&fm=jpg'}} />
          <SubHeadingColor text="Test Test" color={AppColors.darkerGrey} />
        </View>
        <View style={styles.box}>
        <SubHeadingColor text="Paid" color={AppColors.white} />
        </View>
      </View>
    <TouchableOpacity style={styles.callButton}>
      <AppIcon icon='call-outline' iconProvider={IconProvider.ionIcons} size={18} color={AppColors.sky} />
      <CalloutColor800Bold text='90000 80000' color={AppColors.sky}  />
    </TouchableOpacity>
    </View>
  );
};

export default BookedCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 'auto',
    borderRadius: 20,
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  view: {
    flexDirection: 'row',
    gap: WP(3),
    alignItems: 'center',
    paddingHorizontal: WP(4),
    paddingVertical: HP(2),
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: WP(4),
    paddingVertical: HP(2),
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  textView: {
    gap: 8,
  },
  text: {
    flexDirection: 'row',
    gap: WP(2),
    alignItems: 'center',
  },
  border: {
    width: '90%',
    borderWidth: 1,
    borderColor: AppColors.lightgrey,
    borderRadius: 10,
    marginHorizontal: WP(4),
    alignSelf: 'center',
    backgroundColor: AppColors.lightgrey,
  },
  image: {
    height: WP(7),
    width: WP(7),
    borderRadius: WP(7),
  },
  rowView: {
    flexDirection: 'row',
    gap: WP(2),
    alignItems: 'center',
  },
  box: {
    paddingHorizontal: WP(3),
    paddingVertical: HP(0.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: AppColors.green
  },
  callButton: {
    width: '100%',
    backgroundColor: AppColors.white,
    borderTopColor: AppColors.lightgrey,
    borderTopWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: HP(2),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    gap: WP(1.5)
  }
});