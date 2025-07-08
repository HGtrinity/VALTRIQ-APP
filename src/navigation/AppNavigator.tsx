import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/LoginScreen';
import HomeScreen from '@screens/HomeScreen';
import RecordScreen from '@screens/RecordScreen';
import ReviewScreen from '@screens/ReviewScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Record" component={RecordScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}