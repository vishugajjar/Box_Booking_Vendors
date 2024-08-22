import { Alert, Platform } from 'react-native';
import {
  checkNotifications,
  PERMISSIONS,
  requestMultiple,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { useState } from 'react';

export const checkLocationPermissions = async () => {
    
  const isIos = Platform.OS === 'ios';
  const permissions = isIos
    ? [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
    : [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];

  return await requestMultiple(permissions).then(
    async statuses => {
      const location =
        statuses[
          isIos
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        ];

      if (location === RESULTS.GRANTED) {
      const hasLocationPermission = true
        return hasLocationPermission;
      } else {
        Alert.alert(
          'PLEASE_ALLOW_LOCATION',
        );
        return false;
      }
    },
  );
};

export const checkNotificationPermission = async () => {
  await checkNotifications().then(({ status }) => {
    if (status === 'denied') {
      requestNotifications(['alert', 'sound']);
    }
  });
};