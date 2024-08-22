import React, { useState } from 'react'
import { checkLocationPermissions } from '../utils/permission';
import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';

export const useLocation = () => {
    const [location, setLocation] = useState<GeoCoordinates>();

    const getLocation = async () => {
        const location = await checkLocationPermissions();
        if (location) {
         Geolocation.getCurrentPosition(
            position => {
                setLocation(position.coords);
            },
            error=>{
                console.log('Error', error.message); 
            }
         );
        }
      };
  return {getLocation, location};
}

export default useLocation