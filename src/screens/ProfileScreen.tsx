import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>User registration and profile data</Text>
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