import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function TripHistoryScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Trip History</Text>
        <Text style={styles.subtitle}>Completed trips with date and cost</Text>
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