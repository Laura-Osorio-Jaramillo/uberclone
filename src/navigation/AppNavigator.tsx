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
            options={{title: 'Profile'}}
            />
        <Tab.Screen
            name="RideRequest"
            component={RideRequestScreen}
            options={{title: 'Ride'}}
            />
        <Tab.Screen
            name="Tracking"
            component={TrackingScreen}
            options={{title: 'Tracking'}}
            />
        <Tab.Screen
            name="Payment"
            component={PaymentScreen}
            options={{title: 'Payment'}}
            />
        <Tab.Screen
            name="TripHistory"
            component={TripHistoryScreen}
            options={{title: 'History'}}
            />
        </Tab.Navigator>
    </NavigationContainer>
    );
}