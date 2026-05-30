import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {ProfileScreen} from '../screens/ProfileScreen';
import {RideRequestScreen} from '../screens/RideRequestScreen';
import {TrackingScreen} from '../screens/TrackingScreen';
import {PaymentScreen} from '../screens/PaymentScreen';
import {TripHistoryScreen} from '../screens/TripHistoryScreen';

export type RootTabParamList = {
  Profile: undefined;
  RideRequest: undefined;
  Tracking: undefined;
  Payment: undefined;
  TripHistory: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="RideRequest"
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: '#111827',
          tabBarInactiveTintColor: '#6B7280',
        }}>
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'Perfil'}}
        />

        <Tab.Screen
          name="RideRequest"
          component={RideRequestScreen}
          options={{title: 'Solicitar'}}
        />

        <Tab.Screen
          name="Tracking"
          component={TrackingScreen}
          options={{title: 'Tiempo Real'}}
        />

        <Tab.Screen
          name="Payment"
          component={PaymentScreen}
          options={{title: 'Pago'}}
        />

        <Tab.Screen
          name="TripHistory"
          component={TripHistoryScreen}
          options={{title: 'Historial'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}