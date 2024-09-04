import {
  Alert,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import storage from '@react-native-firebase/storage';
import {AppColors} from '../styles/colors';
import Header from '../components/header';
import AppButton from '../components/appButton';
import AppIcon, {IconProvider} from '../components/appIcon';
import TextInputField from '../components/textInputField';
import {HP, mobileHeight, mobileWidth, WP} from '../components/responsive';
import {CalloutColor800, CalloutColor800Bold} from '../components/text';
import {amenitiesList, grassType, timeList} from '../utils/data';
import {AmenitiesData, FormDataType, GroundDetailsType, Root, TimeListType} from '../utils/types';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../utils/routes';
import useLocation from '../hooks/useLocation';
import {DB_KEYS, setFirestoreData} from '../utils/fireStoreHelpers';
import {getItem, STORAGE_KEYS} from '../utils/storageHelper';
import {collection, doc} from 'firebase/firestore';
import {db} from '../utils/firebaseService';
import * as ImagePicker from 'react-native-image-picker';
import ActionModal from '../components/actionModal';
import GroundCard from '../components/groundCard';
import {useGroundData} from '../../groundContext';

const FormScreen = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [count, setCount] = useState<number>(2);
  const {addGround, groundData} = useGroundData();
  const [groundCount, setGroundCount] = useState<GroundDetailsType[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<AmenitiesData[]>(
    [],
  );
  const [selectedTimeList, setSelectedTimeList] = useState<TimeListType[]>(
    [],
  );
  const [description, setDescription] = useState<string>();
  const [response, setResponse] = useState<any>(null);
  const navigation = useNavigation<Root>();
  const {location, getLocation} = useLocation();
  const [photoUri, setPhotoUri] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[] | void[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [address, setAddress] = useState<string>();
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [expanded, setExpanded] = useState([]);
  const urlarray: string[] = []

  const addItem = (item: AmenitiesData) => {
    const filterItem = selectedAmenities.filter(i => i !== item);
    if (selectedAmenities.find(i => i === item)) {
      setSelectedAmenities(filterItem);
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  const addTimeListItem = (item: TimeListType) => {
    const filterItem = selectedTimeList.filter(i => i !== item);
    const data = {
      time: item,
      
    }
    if (selectedTimeList.find(i => i === item)) {
      setSelectedTimeList(filterItem);
    } else {
      setSelectedTimeList([...selectedTimeList, item]);
    }
  };

  const aspectRatio = mobileWidth / mobileHeight;
  const lat = location ? location.latitude : 22.3039;
  const lon = location ? location.longitude : 70.8022;
  const latDelta = 0.09;
  const lonDelta = latDelta * aspectRatio;

  const region = {
    latitude: lat,
    longitude: lon,
    latitudeDelta: latDelta,
    longitudeDelta: lonDelta,
  };

  const mapRef = useRef<MapView>(null);

  const setFormData = async () => {
    const uid = await getItem(STORAGE_KEYS.TOKEN);
    const dataRef = doc(collection(db, 'cartData'));
    
    if (response) {
      setPhotos([]);
       await Promise.all(
        photoUri.map(async item => {
          setUploadLoading(true)
         const reference = storage().ref(item);
         await reference.putFile(item.replace('file://', ''));
          const url = await reference.getDownloadURL();
          urlarray.push(url)
          return url;
        })
      )}
      setPhotos(urlarray);

    if (uid && urlarray.length === photoUri.length) {
      const formData: FormDataType = {
        id: dataRef.id,
        uid: uid,
        name: name!,
        emailId: email!,
        contactNumber: number!,
        numberOfGrounds: groundData.length,
        grounds: groundData,
        amenities: selectedAmenities,
        location: location,
        address: address!,
        photos: urlarray,
        description: description!,
      };
      if (
        (name !== undefined &&
          email !== undefined &&
          number !== undefined &&
          groundCount.length !== 0,
          grassType !== undefined &&
          amenitiesList.length !== 0 &&
          location !== undefined &&
          address !== undefined &&
          description !== undefined)
      ) {
        await setFirestoreData({
          collectionName: DB_KEYS.BOXDATA,
          id: dataRef.id,
          payload: formData,
        }).catch(error => {
          console.log("Error:", error);
          
        });
      } else {
        Alert.alert('Please Enter All the Details');
      }
      setUploadLoading(false);
      navigation.navigate(routes.BOTTOM);
    }
  };

  const onButtonPress = async (
    type: string,
    options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions,
  ) => {
    let uriArray: string[] = [];
    if (type === 'capture') {
      const result = await ImagePicker.launchCamera(options, setResponse);

      if (result) {
        result.assets?.map(i => {
          uriArray.push(i.uri!);
        });
      }
    } else {
      const result = await ImagePicker.launchImageLibrary(options, setResponse);
      if (result) {
        result.assets?.map(i => {
          uriArray.push(i.uri!);
        });
      }
    }
    setPhotoUri([...photoUri, ...uriArray]);
  };

  const removeImage = (item: string) => {
    const remove = photoUri.filter(i => i !== item);
    setPhotoUri(remove);
  };
  

  const handleAddGround = () => {
    const newGround: GroundDetailsType = {
      ground: `Ground ${count}`,
      groundSize: '',
      groundCategory: '',
      price: 0,
      grassType: '',
      width: '',
      height: '',
      availableTime: []
    };
    addGround(newGround);
  };
  
  
  return (
    <SafeAreaView style={styles.safeView}>
      <Header title="Ground Details" icon={true} padding={WP(4)} />
      <KeyboardAvoidingView style={styles.flex}>
        <ScrollView
          style={styles.view}
          contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerView}>
            <TextInputField
              title="You Business Name:"
              placeholder="Enter Your Business Name"
              value={name}
              placeholderTextColor={AppColors.grey}
              onChangeText={text => setName(text)}
            />
            <TextInputField
              title="Email ID:"
              placeholder="Enter Your Email ID"
              placeholderTextColor={AppColors.grey}
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInputField
              title="Contact Number:"
              placeholder="Enter Your Contact Number"
              value={number}
              placeholderTextColor={AppColors.grey}
              onChangeText={text => setNumber(text)}
              keyboardType="phone-pad"
              inputMode="numeric"
              maxLength={10}
            />
            {groundData.map((item, index) => {
              return (
                <GroundCard
                  key={index}
                  index={index}
                  onGroundCount={() =>
                    setGroundCount(groundCount.filter(i => i !== item))
                  }
                />
              );
            })}
            <View style={styles.rowView}>
              <CalloutColor800Bold text="Add Ground" color={AppColors.black} />
              <TouchableOpacity
                onPress={() => {
                  setCount(count + 1);
                  handleAddGround();
                }}
                style={styles.icon}>
                <AppIcon
                  icon="plus"
                  iconProvider={IconProvider.fontAwesome6}
                  size={18}
                  color={AppColors.black}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.gap}>
              <CalloutColor800Bold text="Amenities" color={AppColors.black} />
              <View style={styles.view3}>
                {amenitiesList.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={[styles.rowIconView, {width: mobileWidth / 3}]}>
                      <TouchableOpacity onPress={() => addItem(item)}>
                        <AppIcon
                          icon={
                            selectedAmenities.find(i => i === item)
                              ? 'check-square'
                              : 'square-o'
                          }
                          iconProvider={IconProvider.fontAwesome}
                          size={
                            selectedAmenities.find(i => i === item) ? 20 : 22
                          }
                          color={AppColors.black}
                        />
                      </TouchableOpacity>
                      <CalloutColor800
                        text={item.name}
                        color={AppColors.black}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={styles.gap}>
              <View style={styles.rowView}>
                <CalloutColor800Bold text="Location" color={AppColors.black} />
                <TouchableOpacity onPress={getLocation}>
                  <CalloutColor800Bold
                    text="Set Current Location"
                    color={AppColors.blue}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.view1}>
                <MapView
                  ref={mapRef}
                  showsUserLocation={true}
                  followsUserLocation={true}
                  mapType="standard"
                  region={region}
                  style={styles.map}>
                  {location ? (
                    <Marker
                      pinColor={AppColors.green}
                      title={name}
                      coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                      }}
                    />
                  ) : null}
                </MapView>
              </View>
            </View>
            <TextInputField
              title="Address"
              placeholder="Enter your address"
              numberOfLines={6}
              value={address}
              onChangeText={text => setAddress(text)}
              placeholderTextColor={AppColors.grey}
            />
            <View style={styles.gap}>
              <View style={styles.rowView}>
                <CalloutColor800Bold
                  text="Upload Photos"
                  color={AppColors.black}
                />
                <TouchableOpacity
                  onPress={() => setVisible(true)}
                  style={styles.icon}>
                  <AppIcon
                    icon="plus"
                    iconProvider={IconProvider.fontAwesome6}
                    size={18}
                    color={AppColors.black}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.imageView}>
                {photoUri ? (
                  <>
                    {photoUri.map((item, index) => {
                      return (
                        <View key={index}>
                          <Image src={item} style={styles.image} />
                          <TouchableOpacity
                            onPress={() => removeImage(item)}
                            style={styles.iconView}>
                            <AppIcon
                              icon="cross"
                              iconProvider={IconProvider.entypo}
                              size={20}
                              color={AppColors.black}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </>
                ) : null}
              </View>
            </View>
            <TextInputField
              title="Description"
              placeholder="description"
              numberOfLines={6}
              value={description}
              onChangeText={text => setDescription(text)}
              placeholderTextColor={AppColors.grey}
            />
            <AppButton
              text="Done"
              textColor={AppColors.white}
              style={styles.btn}
              onPress={setFormData}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <ActionModal
        showOptions={visible}
        onClose={() => setVisible(false)}
        onButtonPress={(type, options) => onButtonPress(type, options)}
      />
    </SafeAreaView>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: AppColors.bgColor,
  },
  flex: {flex: 1},
  view: {
    paddingHorizontal: WP(6),
    paddingVertical: HP(2),
    flex: 1,
  },
  scrollContainer: {
    gap: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: HP(6),
  },
  innerView: {
    flex: 1,
    gap: HP(2),
    width: '100%',
  },
  btn: {
    marginTop: HP(2),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  icon: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: AppColors.black,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    alignSelf: 'flex-end',
  },
  icon1: {
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  container: {
    fontSize: 14,
    color: AppColors.black,
    width: '100%',
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
  dropdown: {
    borderColor: AppColors.primaryColor,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: WP(1),
    paddingVertical: HP(1.5),
    backgroundColor: AppColors.white,
  },
  placeholderStyle: {
    fontSize: 14,
    fontWeight: '400',
  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: '400',
  },
  itemContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 10,
    borderColor: AppColors.primaryColor,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  view3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: AppColors.primaryColor,
    borderRadius: 10,
    padding: WP(3),
    gap: HP(1),
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
  map: {
    width: '100%',
    height: HP(20),
    borderRadius: 10,
  },
  imageView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: WP(6),
    alignItems: 'center',
  },
  image: {
    height: WP(20),
    width: WP(20),
    borderRadius: 10,
  },
  iconView: {
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.lightgrey,
    position: 'absolute',
    zIndex: 10,
    top: -HP(0.8),
    right: -WP(2),
  },
  btnView: {
    width: '100%',
    paddingVertical: HP(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardView: {
    width: '100%',
    borderWidth: 0,
    borderColor: AppColors.primaryColor,
    borderRadius: 10,
    padding: WP(3),
    gap: HP(2),
    marginTop: HP(1),
    backgroundColor: AppColors.primaryColorOpacity,
  },
});
