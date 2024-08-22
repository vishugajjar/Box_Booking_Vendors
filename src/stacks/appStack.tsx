import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../utils/types';
import BottomTab from '../screens/BottomTab';
import ScheduleScreen from '../screens/scheduleScreen';
import FormScreen from '../screens/FormScreen';
import LocationScreen from '../screens/LocationScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Bottom" component={BottomTab} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
    </Stack.Navigator>
  )
}

export default AppStack

const styles = StyleSheet.create({})