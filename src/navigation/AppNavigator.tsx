import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@react-native-vector-icons/ionicons';

import {HomeScreen} from '../screens/HomeScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {RideRequestScreen} from '../screens/RideRequestScreen';
import {TrackingScreen} from '../screens/TrackingScreen';
import {PaymentScreen} from '../screens/PaymentScreen';
import {TripHistoryScreen} from '../screens/TripHistoryScreen';

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  RideRequest: undefined;
  Tracking: undefined;
  Payment: undefined;
  TripHistory: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type IconName =
  | 'home-outline'
  | 'home'
  | 'person-outline'
  | 'person'
  | 'car-outline'
  | 'car'
  | 'navigate-outline'
  | 'navigate'
  | 'card-outline'
  | 'card'
  | 'time-outline'
  | 'time';

const getTabIcon = (
  routeName: keyof RootTabParamList,
  focused: boolean,
): IconName => {
  if (routeName === 'Home') {
    return focused ? 'home' : 'home-outline';
  }

  if (routeName === 'Profile') {
    return focused ? 'person' : 'person-outline';
  }

  if (routeName === 'RideRequest') {
    return focused ? 'car' : 'car-outline';
  }

  if (routeName === 'Tracking') {
    return focused ? 'navigate' : 'navigate-outline';
  }

  if (routeName === 'Payment') {
    return focused ? 'card' : 'card-outline';
  }

  return focused ? 'time' : 'time-outline';
};

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          headerShown: true,
          tabBarActiveTintColor: '#111827',
          tabBarInactiveTintColor: '#6B7280',
          tabBarStyle: {
            height: 64,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={getTabIcon(route.name, focused)}
              size={size}
              color={color}
            />
          ),
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Inicio'}}
        />

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