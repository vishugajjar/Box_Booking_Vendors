import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../styles/colors';
import Header from '../components/header';
import {HP, WP} from '../components/responsive';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {GroundDetailsType, ScheduleScreenType} from '../utils/types';
import BookingCard from '../components/bookingCard';
import Spacer from '../components/spacer';
import TimeCard from '../components/timeCard';
import {afternoonTimeList, eveningTimeList, morningTimeList} from '../utils/data';
import { CalloutColor800, CalloutColor800Bold, Title3ColorBold } from '../components/text';

const ScheduleScreen = ({route}: ScheduleScreenType) => {
  const {item} = route.params ?? {};
  const [selectedTimeContainer, setSelectedTimeContainer] = useState<GroundDetailsType>();
  const [date, setDate] = useState<moment.Moment | Date>(moment(Date.now()));
  const [selectedTime, setSelectedTime] = useState<number>();
  const datesBlacklistFunc = (todaydate: moment.Moment) => {
    var another_date = moment(todaydate).utcOffset('+05:30');
    return moment(another_date).isBefore(moment(), 'date');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        icon={true}
        title="Schedule"
        textColor={AppColors.primaryColor}
        padding={HP(2)}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.containerScroll}>
          <View style={styles.scroll}>
          <CalendarStrip
            style={styles.calender}
            onDateSelected={day => {
              setDate(day);
            }}
            selectedDate={date}
            highlightDateContainerStyle={{
              width: Platform.OS === 'ios' ? 40 : 45,
              height: Platform.OS === 'ios' ? 40 : 45,
              borderRadius: Platform.OS === 'ios' ? 40 : 45,
              backgroundColor: AppColors.primaryColor,
            }}
            highlightDateNameStyle={{color: 'white'}}
            highlightDateNumberStyle={{color: 'white'}}
            minDate={moment(Date.now())}
            disabledDateOpacity={0.5}
            disabledDateNumberStyle={{color: AppColors.grey}}
            disabledDateNameStyle={{color: AppColors.grey}}
            datesBlacklist={datesBlacklistFunc}
          />
          </View>
        <Spacer height={HP(3)} />
        <View style={styles.timeRow}>
          {item.grounds.map((item, index) => {
            const containerColor =
              selectedTimeContainer === item
                ? AppColors.primaryColor
                : 'white';
            const textColor =
              selectedTimeContainer === item
                ? 'white'
                : AppColors.primaryColor;
            return (
              <BookingCard
                key={index}
                onPress={() => setSelectedTimeContainer(item)}
                data={item}
                bgColor={containerColor}
                textColor={textColor}
                id={index}
              />
            );
          })}
        </View>
        <Spacer height={HP(5)} />
        {selectedTimeContainer !== undefined ? (
          <View style={styles.cardView}>
            <View style={styles.gap}>
            <Title3ColorBold text='Details :' color={AppColors.black} />
            <View style={styles.card}>
              <View style={styles.cardText}>
                <CalloutColor800Bold text='Size :' color={AppColors.black} />
                <CalloutColor800 text={selectedTimeContainer.groundSize} color={AppColors.black} />
              </View>
              <View style={styles.cardText}>
                <CalloutColor800Bold text='Grass :' color={AppColors.black} />
                <CalloutColor800 text={selectedTimeContainer.grassType} color={AppColors.black} />
              </View>
            </View>
            </View>
          <View style={styles.gap}>
          <Title3ColorBold text='Morning :' color={AppColors.black} />
            <TimeCard
              selectedTime={selectedTime!}
              onPress={value => setSelectedTime(value)}
              dataItem={morningTimeList}
            />
            </View>
            <View style={styles.gap}>
            <Title3ColorBold text='Afternoon :' color={AppColors.black} />
            <TimeCard
              selectedTime={selectedTime!}
              onPress={value => setSelectedTime(value)}
              dataItem={afternoonTimeList}
            />
            </View>
            <View style={styles.gap}>
            <Title3ColorBold text='Evening :' color={AppColors.black} />
            <TimeCard
              selectedTime={selectedTime!}
              onPress={value => setSelectedTime(value)}
              dataItem={eveningTimeList}
            />
            </View>
        </View>
        ) : (null)}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.bgColor,
  },
  scroll: {
    flex: 1,
  },
  containerScroll: {
    padding: 20,
  },
  timeRow: {flexDirection: 'row', flex: 1, gap: 10},
  calender: {flex: 1, paddingVertical: HP(1.5)},
  cardView: {gap: HP(3)},
  gap: {gap: HP(1)},
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    paddingHorizontal: WP(6),
    justifyContent: 'space-between',
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
  cardText: {
    flexDirection: 'row',
    gap: WP(2),
    alignItems: 'center',
  }
});
