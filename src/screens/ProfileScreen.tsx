
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HP, WP, mobileHeight, mobileWidth} from '../components/responsive';
import Header from '../components/header';
import {CalloutColor800, Title3ColorBold} from '../components/text';
import AppIcon, {IconProvider} from '../components/appIcon';
import AppButton from '../components/appButton';
import { Bg } from '../assets/images';
import { AppColors } from '../styles/colors';

const ProfileScreen = () => {
  const data = [
    'Personal Details',
    'My Property',
    'Help & Support',
    'Terms & Conditions',
  ];
  return (
    <View style={styles.view}>
      <Image source={Bg} style={styles.img} />
      <View style={styles.bgView}>
        <Header
          title="Profile"
          textColor={AppColors.black}
          padding={WP(6)}
          icon={false}
        />
        <View style={styles.topView}>
          <Image source={Bg} style={styles.imgStyle} />
          <Title3ColorBold text="Ishan" color={AppColors.black} />
        </View>
        <View style={styles.bottomView}>
          {data.map((item, index) => {
            return (
              <View key={index} style={styles.gap}>
                <View style={styles.cardView}>
                  <CalloutColor800 text={item} color={AppColors.black} />
                  <TouchableOpacity>
                    <AppIcon
                      icon="angle-right"
                      iconProvider={IconProvider.fontAwesome5}
                      size={18}
                      color={AppColors.black}
                    />
                  </TouchableOpacity>
                </View>
                {index !== 3 ? <View style={styles.borderView} /> : null}
              </View>
            );
          })}
          <AppButton
            text="Log Out"
            style={styles.btnstyle}
            textColor={AppColors.primaryColor}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  view: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  img: {
    width: mobileWidth,
    height: mobileHeight,
  },
  bgView: {
    backgroundColor: AppColors.whiteOpacity,
    flex: 1,
    width: mobileWidth,
    height: mobileHeight,
    position: 'absolute',
    zIndex: 10,
    paddingTop: HP(7),
  },
  topView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: HP(1),
  },
  bottomView: {
    flex: 2,
    backgroundColor: AppColors.white,
    marginHorizontal: WP(6),
    borderRadius: 20,
    marginBottom: HP(13),
    marginTop: HP(2),
    paddingHorizontal: WP(6),
    paddingVertical: HP(4),
    gap: HP(3),
  },
  gap: {gap: HP(3)},
  imgStyle: {
    width: WP(35),
    height: WP(35),
    borderRadius: WP(35),
    borderWidth: 5,
    borderColor: AppColors.white,
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  borderView: {
    borderWidth: 1,
    borderColor: AppColors.lightgrey,
    borderRadius: 6,
    width: '100%',
    backgroundColor: AppColors.lightgrey,
  },
  btnstyle: {
    backgroundColor: AppColors.white,
    width: '90%',
    alignSelf: 'center',
    marginTop: HP(3),
    borderWidth: 2,
    borderColor: AppColors.primaryColor,
  },
});
