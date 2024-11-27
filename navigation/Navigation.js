// import { View, Text } from 'react-native'
// import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Signup' component={SignupScreen}/>
            <Stack.Screen name='Home' component={HomeScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
};