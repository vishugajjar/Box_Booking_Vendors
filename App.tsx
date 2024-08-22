import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/utils/types';
import { GroundDataProvider } from './groundContext';
import Mediator from './src/stacks/mediator';
import AuthStack from './src/stacks/authStack';
import AppStack from './src/stacks/appStack';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <GroundDataProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Mediator" component={Mediator} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="App" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
    </GroundDataProvider>
  );
};

export default App;
