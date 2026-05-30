import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function TrackingScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seguimiento en Tiempo Real</Text>
        <Text style={styles.subtitle}>
            Aquí se visualizará el conductor aproximándose en el mapa.
        </Text>

        <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Mapa / Marcador del conductor</Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.driverName}>Conductor asignado</Text>
            <Text style={styles.info}>Estado: Aproximándose</Text>
            <Text style={styles.info}>Tiempo estimado: 5 minutos</Text>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F8',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 6,
        marginBottom: 20,
    },
    mapPlaceholder: {
        height: 300,
        borderRadius: 18,
        backgroundColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        color: '#374151',
        fontWeight: '700',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginTop: 20,
    },
    driverName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    info: {
        fontSize: 14,
        color: '#374151',
        marginTop: 8,
    },
});