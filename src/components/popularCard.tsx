import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HP, WP} from './responsive';
import {CalloutColor800, Caption1Color, HeadlineBoldColor} from './text';
import AppIcon, {IconProvider} from './appIcon';
import {AppColors} from '../styles/colors';
import {FormDataType} from '../utils/types';

type PopularCardType = {
  onpress: () => void;
  data: FormDataType;
  onPressRemove: () => void;
};

const PopularCard = ({onpress, data, onPressRemove}: PopularCardType) => {
  return (
    <TouchableOpacity onPress={onpress} style={styles.conatiner}>
      <View style={styles.innerView}>
        <View style={styles.imgTextView}>
          <Image source={{uri: data.photos[0]}} style={styles.img} />
          <View style={styles.textView}>
            <HeadlineBoldColor text={data.name} color={AppColors.black} />
            <Caption1Color
              text="New 150ft Ring Road"
              color={AppColors.darkgrey}
            />
            <Caption1Color
              text="4.9 (55 reviews)"
              color={AppColors.darkerGrey}
            />
            <CalloutColor800
              text={`${'\u20b9'}${data.grounds[0].price}/hr`}
              color={AppColors.black}
            />
          </View>
        </View>
        <View style={styles.iconView}>
          <TouchableOpacity onPress={onPressRemove}>
            <AppIcon
              icon="trash"
              iconProvider={IconProvider.fontAwesome5}
              size={18}
              color={AppColors.primaryColor}
            />
          </TouchableOpacity>
          <View style={styles.starview}>
            {Array.from({length: 5}, (_, i) => (
              <AppIcon
                icon={i < 4 ? 'star' : 'star-outline'}
                iconProvider={IconProvider.ionIcons}
                size={14}
                color={i < 4 ? AppColors.yellow : 'black'}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularCard;

const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
    padding: WP(2),
    backgroundColor: AppColors.white,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    borderRadius: 20,
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
  },
  img: {
    width: WP(30),
    height: HP(10),
    borderRadius: 10,
  },
  imgTextView: {
    flexDirection: 'row',
    gap: WP(3),
    alignItems: 'center',
  },
  textView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    gap: HP(0.4),
  },
  starview: {
    flexDirection: 'row',
    gap: HP(0.1),
    marginLeft: -WP(6),
    marginBottom: HP(1),
  },
  iconView: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
});
