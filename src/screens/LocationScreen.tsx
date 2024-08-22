import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { AppColors } from '../styles/colors'
import Header from '../components/header'
import { HP, mobileHeight, mobileWidth, WP } from '../components/responsive'
import MapView from 'react-native-maps'
import useLocation from '../hooks/useLocation'
import { CalloutColor800Bold } from '../components/text'
import { useNavigation } from '@react-navigation/native'
import { Root } from '../utils/types'

const LocationScreen = () => {
    const {getLocation} = useLocation();
    const navigation = useNavigation<Root>();

    const aspectRatio = mobileWidth / mobileHeight;
    const lat = 22.3039;
    const lon = 70.8022;
    const latDelta = 0.09;
    const lonDelta = latDelta * aspectRatio;
  
    const region = {
      latitude: lat,
      longitude: lon,
      latitudeDelta: latDelta,
      longitudeDelta: lonDelta,
    };
  
    const mapRef = useRef<MapView>(null);
  return (
    <SafeAreaView style={styles.safeView}>
        <Header title='Set Location' icon={true} />
        <View style={styles.view}>
            <MapView
            ref={mapRef}
            showsUserLocation={true}
            followsUserLocation={true}
            mapType="standard"
            region={region}
            style={styles.map}
            />
            <TouchableOpacity onPress={async () => {
                await getLocation();
                navigation.goBack();
            }} style={styles.btn}>
                <CalloutColor800Bold text='Set Current Location' color={AppColors.primaryColor} />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default LocationScreen

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: AppColors.bgColor
    },
    view: {
        flex: 1,
        padding: WP(6),
    },
    map: {
        width: '100%',
        height: HP(40),
        borderRadius: 10,
      },
    btn: {
        borderWidth: 2,
        borderColor: AppColors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: HP(1),
        marginTop: HP(2),
        borderRadius: 10
    }
})