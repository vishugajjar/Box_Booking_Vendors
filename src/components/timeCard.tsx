import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {TimeCardType} from '../utils/types';
import {HP, mobileHeight, WP} from './responsive';
import {GreyPitch, Pitch} from '../assets/images';
import {AppColors} from '../styles/colors';

const TimeCard = ({dataItem}: TimeCardType) => {
  const cardWidth = Dimensions.get('window').width / 3;

  return (
    <View style={styles.card}>
      {dataItem.map((data, index) => {
        const containerImage = data.booked ? GreyPitch : Pitch;
        const textColor = data.booked ? 'white' : 'black';
        return (
          <View
            key={index}
            style={{width: cardWidth, height: mobileHeight / 13}}>
            <ImageBackground
              source={containerImage}
              imageStyle={styles.imageStyle}
              style={styles.flex1}>
              <View style={[styles.timeContainer]}>
                <Text style={[styles.timetext, {color: textColor}]}>
                  {data.time}
                </Text>
              </View>
            </ImageBackground>
          </View>
        );
      })}
    </View>
  );
};

export default TimeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    paddingHorizontal: WP(6),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: HP(2),
    shadowColor: AppColors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
    borderColor: AppColors.primaryColor,
    borderWidth: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  imageStyle: {resizeMode: 'cover'},
  timeContainer: {
    height: HP(6),
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  flex1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timetext: {fontSize: 12, fontFamily: 'Work Sans Bold', textAlign: 'center'},
});
