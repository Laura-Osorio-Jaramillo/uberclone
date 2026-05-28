import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function TrackingScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Tracking</Text>
        <Text style={styles.subtitle}>Driver real-time tracking screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#111827',
    },
    subtitle: {
        marginTop: 8,
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
});