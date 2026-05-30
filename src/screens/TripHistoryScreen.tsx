import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {db, firebaseAuth} from '../services/firebase';

type Trip = {
    id: string;
    origin: string;
    destination: string;
    vehicleCategory: string;
    estimatedFare: number;
    status: string;
};

export function TripHistoryScreen() {
    const [trips, setTrips] = useState<Trip[]>([]);

    const loadTripHistory = async () => {
    try {
        const currentUser = firebaseAuth.currentUser;
        const userId = currentUser?.uid || 'main-profile';

        const snapshot = await db
            .collection('rides')
            .where('userId', '==', userId)
            .get();

        const tripList = snapshot.docs.map(document => ({
            id: document.id,
            ...document.data(),
        })) as Trip[];

        setTrips(tripList);
        } catch (error) {
        console.log('Error loading trip history:', error);
        }
    };

    useEffect(() => {
    loadTripHistory();
    }, []);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Historial de Viajes</Text>
        <Text style={styles.subtitle}>
            Consulta los trayectos realizados con costo y estado.
        </Text>

        <FlatList
            data={trips}
            keyExtractor={item => item.id}
            ListEmptyComponent={
            <Text style={styles.emptyText}>Aún no hay viajes registrados.</Text>
            }
            renderItem={({item}) => (
            <View style={styles.card}>
                <Text style={styles.route}>
                    {item.origin} → {item.destination}
                </Text>
                <Text style={styles.info}>Vehículo: {item.vehicleCategory}</Text>
                <Text style={styles.info}>
                    Costo: ${item.estimatedFare?.toLocaleString()}
                </Text>
                <Text style={styles.info}>Estado: {item.status}</Text>
            </View>
            )}
        />
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
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    route: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    info: {
        fontSize: 14,
        color: '#374151',
        marginTop: 4,
    },
    emptyText: {
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 30,
    },
});