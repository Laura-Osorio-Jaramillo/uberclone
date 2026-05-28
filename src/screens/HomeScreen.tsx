import React from 'react';
import {View, StatusBar, StyleSheet, Text,} from 'react-native';

export function HomeScreen() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.content}>
                <Text style={styles.title}>UberClone</Text>
                <Text style={styles.subtitle}>Mobile transportation app</Text>
                <Text style={styles.description}>
                    Project started successfully.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 36,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#374151',
        marginBottom: 16,
    },
    description: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
    },
});