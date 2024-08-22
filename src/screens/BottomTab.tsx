import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { routes } from '../utils/routes';
import { AppColors } from '../styles/colors';
import BookedScreen from './BookedScreen';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const getTabIcon = (focused: boolean, tab: string) => {
    const iconColor = focused ? AppColors.primaryColor : AppColors.grey;
    switch (tab) {
      case routes.HOME:
        return <FeatherIcons name="home" color={iconColor} size={24} />;
      case routes.BOOKED:
        return <AntDesignIcons name="profile" color={iconColor} size={24} />;
      case routes.PROFILE:
        return <IonIcons name="person-outline" color={iconColor} size={24} />;
      default:
        break;
    }
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name={routes.HOME}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return getTabIcon(focused, routes.HOME);
          },
        }}
      />
      <Tab.Screen
        name={routes.BOOKED}
        component={BookedScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return getTabIcon(focused, routes.BOOKED);
          },
        }}
      />
      <Tab.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return getTabIcon(focused, routes.PROFILE);
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;