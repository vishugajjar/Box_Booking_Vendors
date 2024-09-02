import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {HP, mobileWidth, WP} from './responsive';
import {CalloutColor800, CalloutColor800Bold} from './text';
import {AppColors} from '../styles/colors';
import AppIcon, {IconProvider} from './appIcon';
import {Dropdown} from 'react-native-element-dropdown';
import TextInputField from './textInputField';
import {categoryList, grassType, timeList} from '../utils/data';
import {GroundCardType, TimeListType} from '../utils/types';
import {useGroundData} from '../../groundContext';

const GroundCard = ({onGroundCount, index}: GroundCardType) => {
  const [groundSizeWidth, setGroundSizeWidth] = useState<string>();
  const [groundSizeHeight, setGroundSizeHeight] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [grass, setGrass] = useState<string>();
  const [isFocus, setIsFocus] = useState(false);
  const [price, setPrice] = useState<number>();
  const [selectedTimeList, setSelectedTimeList] = useState<TimeListType[]>([]);
  const {groundData, updateGround, removeGround} = useGroundData();

  const addTimeListItem = (item: TimeListType) => {
    const filterItem = selectedTimeList.filter(i => i !== item);
    const data = {
      time: item,
    };
    if (selectedTimeList.find(i => i === item)) {
      setSelectedTimeList(filterItem);
      updateGround(index, {...groundData[index], availableTime: filterItem});
    } else {
      setSelectedTimeList([...selectedTimeList, item]);
      updateGround(index, {...groundData[index], availableTime: [...selectedTimeList, item]});
    }
    updateGround(index, {...groundData[index], availableTime: [...selectedTimeList, item]});
  };

  return (
    <View style={styles.view1}>
      <View style={styles.rowView}>
        <CalloutColor800Bold
          text={groundData[index].ground}
          color={AppColors.black}
        />
        {index <= 0 ? null : (
          <TouchableOpacity
            onPress={() => removeGround(index)}
            style={styles.icon1}>
            <AppIcon
              icon="minus"
              iconProvider={IconProvider.fontAwesome6}
              size={18}
              color={AppColors.black}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.gap}>
        <CalloutColor800Bold text="Ground Size:" color={AppColors.black} />
        <View style={styles.rowView1}>
          <View style={styles.view2}>
            <TextInput
              style={styles.container}
              placeholderTextColor={AppColors.grey}
              placeholder="Width(ft)"
              value={groundSizeWidth}
              onChangeText={text => {
                setGroundSizeWidth(text);

                updateGround(index, {...groundData[index], width: text});
              }}
            />
          </View>
          <CalloutColor800Bold text="X" color={AppColors.black} />
          <View style={styles.view2}>
            <TextInput
              style={styles.container}
              placeholder="Height(ft)"
              placeholderTextColor={AppColors.grey}
              value={groundSizeHeight}
              onChangeText={text => {
                setGroundSizeHeight(text);
                updateGround(index, {...groundData[index], height: text});
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.gap}>
        <CalloutColor800Bold text="Ground Category:" color={AppColors.black} />
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && {borderColor: AppColors.primaryColor},
          ]}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={styles.itemContainer}
          itemTextStyle={styles.itemText}
          data={categoryList}
          autoScroll
          maxHeight={HP(30)}
          minHeight={HP(10)}
          activeColor={AppColors.primaryColor}
          labelField="name"
          valueField="id"
          placeholder="Category List"
          onChange={item => {
            setCategory(item.name);
            setIsFocus(false);
            updateGround(index, {
              ...groundData[index],
              groundCategory: item.name,
            });
          }}
        />
      </View>
      <TextInputField
        title="Price:"
        placeholder="Price"
        value={price?.toString()}
        placeholderTextColor={AppColors.grey}
        onChangeText={text => {
          setPrice(Number(text));
          updateGround(index, {...groundData[index], price: Number(text)});
        }}
      />
      <View style={styles.gap}>
        <CalloutColor800Bold text="Grass Type:" color={AppColors.black} />
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && {borderColor: AppColors.primaryColor},
          ]}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={styles.itemContainer}
          itemTextStyle={styles.itemText}
          data={grassType}
          maxHeight={HP(20)}
          minHeight={HP(10)}
          autoScroll
          activeColor={AppColors.primaryColor}
          labelField="name"
          valueField="id"
          placeholder="Grass Type List"
          onChange={item => {
            setGrass(item.name);
            setIsFocus(false);
            updateGround(index, {...groundData[index], grassType: item.name});
          }}
        />
      </View>
      <View style={styles.gap}>
        <CalloutColor800Bold text="Schedule" color={AppColors.black} />
        <View style={styles.view4}>
          {timeList.map((item, index) => {
            return (
              <View key={index}>
                <View style={[styles.rowIconView, {width: mobileWidth}]}>
                  <TouchableOpacity
                    onPress={() => {
                      addTimeListItem(item);
                      
                    }}>
                    <AppIcon
                      icon={
                        selectedTimeList.find(i => i === item)
                          ? 'check-square'
                          : 'square-o'
                      }
                      iconProvider={IconProvider.fontAwesome}
                      size={selectedTimeList.find(i => i === item) ? 20 : 22}
                      color={AppColors.black}
                    />
                  </TouchableOpacity>
                  <CalloutColor800
                    text={`${item.time}  ${item.duration}`}
                    color={AppColors.black}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default GroundCard;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    fontSize: 14,
    color: AppColors.black,
    width: '100%',
  },
  view1: {
    width: '100%',
    borderWidth: 0,
    borderColor: AppColors.primaryColor,
    borderRadius: 10,
    padding: WP(3),
    gap: HP(2),
    marginTop: HP(1),
    backgroundColor: AppColors.primaryColorOpacity,
  },
  icon1: {
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  view2: {
    width: '40%',
    backgroundColor: AppColors.bgColor,
    borderRadius: 10,
    paddingHorizontal: WP(1),
    borderWidth: 2,
    borderColor: AppColors.primaryColor,
  },
  rowView1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gap: {gap: HP(1)},
  placeholderStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: AppColors.grey,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: AppColors.black,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '400',
    color: AppColors.black,
  },
  itemContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 10,
    borderColor: AppColors.primaryColor,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    color: AppColors.black,
  },
  dropdown: {
    borderColor: AppColors.primaryColor,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: WP(1),
    paddingVertical: HP(1.5),
    backgroundColor: AppColors.white,
    color: AppColors.black,
  },
  view4: {
    alignItems: 'flex-start',
    borderWidth: 0,
    padding: WP(3),
    gap: HP(1),
  },
  rowIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WP(2),
  },
});
