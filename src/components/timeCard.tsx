import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TimeCardType} from '../utils/types';
import {HP, mobileHeight, WP} from './responsive';
import {GreyPitch, Pitch, RedPitch} from '../assets/images';
import {AppColors} from '../styles/colors';
import FormModal from './formModal';

const TimeCard = ({onPress, dataItem, selectedTime}: TimeCardType) => {
  const cardWidth = Dimensions.get('window').width / 3;
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <View style={styles.card}>
      {dataItem.map((data, index) => {
        const containerImage = data.booked ? GreyPitch : data.available ? Pitch : RedPitch;
        const textColor = data.booked ? 'white' : 'black';
        return (
          <TouchableOpacity
            key={index}
            disabled={data.booked || !data.available ? true : false}
            style={{width: cardWidth, height: mobileHeight / 13}}
            onPress={() => {
              onPress(data.id);
              setVisible(true);
            }}>
            <ImageBackground
              source={containerImage}
              imageStyle={styles.imageStyle}
              style={styles.flex1}>
              <View style={[styles.timeContainer]}>
                <Text style={[styles.timetext, {color: textColor}]}>
                  {data.available === true ? data.time : 'Not Available'}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
      {dataItem.find(i => i.id === selectedTime) ? (
        <FormModal
          data={dataItem.find(i => i.id === selectedTime)!}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      ) : null}
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
