import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColors} from '../styles/colors';
import {CalloutColor800Bold, Title3Color, Title3ColorBold} from '../components/text';
import AppIcon, {IconProvider} from '../components/appIcon';
import {HP, WP} from '../components/responsive';
import Card from '../components/card';
import PopularCard from '../components/popularCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { FormDataType, Root } from '../utils/types';
import { routes } from '../utils/routes';
import { data } from '../utils/data';
import { checkLocationPermissions } from '../utils/permission';
import { DB_KEYS, deleteFirestoreData, getFireStoreData } from '../utils/fireStoreHelpers';
import { getItem, STORAGE_KEYS } from '../utils/storageHelper';
import { DocumentData } from 'firebase/firestore';

const HomeScreen = () => {
  const [searchText, setSearchText] = useState<string>();
  const [groundData, setGroundData] = useState<FormDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<Root>();
  const isFocused = useIsFocused();
 

  const getData = async() => {
    setGroundData([])
    const uid = await getItem(STORAGE_KEYS.TOKEN);
    setIsLoading(true)
    await getFireStoreData({collectionName: DB_KEYS.BOXDATA}).then((data) => {
      data.map((i: DocumentData) => {
          if (i._data.uid === uid) {
              setGroundData(prev => {
                return [...prev, i._data]
              });
          }
      })
    }); 
    setIsLoading(false); 
  };

  const removeDataFromFirestore = async(item: FormDataType) => {
    await deleteFirestoreData({collectionName: DB_KEYS.BOXDATA, id: item.id})
    setGroundData(groundData.filter(i => i !== item));
  }

  useEffect(() => {
    checkLocationPermissions();
    getData();
  }, [isFocused]);
  
  return (
    <SafeAreaView style={styles.safeView}>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={AppColors.primaryColor} />
        </View>
      ) : (
        <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.containerScroll}>
        <View style={styles.introContainer}>
          <Title3Color text="Welcome Ishaan" color={AppColors.black} />
          <TouchableOpacity style={styles.icon}>
            <AppIcon
              icon="bell"
              iconProvider={IconProvider.fontAwesome5}
              size={20}
              color={AppColors.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.middleView}>
          <View style={styles.gap}>
            {data.map((item, index) => {
              return <Card data={item} key={index} />;
            })}
          </View>
          {/** Search View */}
          <View style={styles.searchContainer}>
            <View style={styles.searchContainerCol}>
              <AppIcon
                icon="search-outline"
                iconProvider={IconProvider.ionIcons}
                size={20}
                color={AppColors.primaryColor}
              />
              <TextInput
                placeholder="Search...."
                placeholderTextColor={AppColors.primaryColor}
                value={searchText}
                onChangeText={text => {
                  setSearchText(text);
                }}
              />
            </View>
            <TouchableOpacity>
              <AppIcon
                icon="filter-outline"
                iconProvider={IconProvider.ionIcons}
                size={20}
                color={AppColors.primaryColor}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.cardView}>
            <View style={styles.titleView}>
              <Title3ColorBold text='Business' color={AppColors.black} />
              <TouchableOpacity onPress={() => navigation.navigate(routes.FORM)}>
                <CalloutColor800Bold text='Add New +' color={AppColors.blue}  />
              </TouchableOpacity>
            </View>
            {groundData ? (
              <>
              {groundData.map((item, index) => {
                return (
                  <PopularCard key={index} data={item} onpress={() => navigation.navigate(routes.SCHEDULE, {item: item})} onPressRemove={() => removeDataFromFirestore(item)}  />
                )
              })}
              </>
            ) : (null)}
          </View>
        </View>
      </ScrollView>
      )}
      
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: AppColors.bgColor,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {flex: 1},
  containerScroll: {
    paddingBottom: HP(1),
    gap: 20,
    paddingHorizontal: WP(5),
  },
  introContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    alignItems: 'center',
  },
  gap8: {gap: 2},
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: AppColors.white,
    shadowColor: AppColors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    elevation: 10,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleView: {
    flex: 1,
    paddingVertical: HP(2),
  },
  gap: {gap: HP(2)},
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainerCol: {flexDirection: 'row', gap: 8, alignItems: 'center'},
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: HP(4),
    backgroundColor: AppColors.white,
    shadowColor: AppColors.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    elevation: 10,
    shadowRadius: 6,
    paddingHorizontal: WP(3),
    borderRadius: 10,
  },
  cardView: {
    gap: HP(2),
    marginTop: HP(3),
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
