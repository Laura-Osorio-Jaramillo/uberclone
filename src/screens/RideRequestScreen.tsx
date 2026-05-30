import React, {useState} from 'react';
import {Alert,ScrollView,StyleSheet,Text,TextInput,TouchableOpacity,View,} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {db, firebaseAuth} from '../services/firebase';

type VehicleCategory = 'Económico' | 'XL' | 'Premium';

export function RideRequestScreen() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [vehicleCategory, setVehicleCategory] =
        useState<VehicleCategory>('Económico');
    const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
    const [estimatedDistance, setEstimatedDistance] = useState<number | null>(
        null,
    );
    const [estimatedTime, setEstimatedTime] = useState<number | null>(null);

    const calculateFare = () => {
    if (!origin.trim()) {
        Alert.alert('Validación', 'Debes ingresar el origen.');
    return;
        }

    if (!destination.trim()) {
        Alert.alert('Validación', 'Debes ingresar el destino.');
    return;
    }

    const simulatedDistance = 8;
    const simulatedTime = 18;

    let baseFare = 5000;
    let pricePerKm = 1200;

    if (vehicleCategory === 'XL') {
        baseFare = 8000;
        pricePerKm = 1800;
    }

    if (vehicleCategory === 'Premium') {
        baseFare = 12000;
        pricePerKm = 2500;
    }

    const totalFare = baseFare + simulatedDistance * pricePerKm;

    setEstimatedDistance(simulatedDistance);
    setEstimatedTime(simulatedTime);
    setEstimatedFare(totalFare);
    };

    const requestRide = async () => {
    if (!origin.trim() || !destination.trim()) {
        Alert.alert('Validación', 'Debes ingresar origen y destino.');
        return;
    }

    if (!estimatedFare) {
        Alert.alert('Validación', 'Primero calcula la tarifa estimada.');
        return;
    }

    try {
        const currentUser = firebaseAuth.currentUser;
        const userId = currentUser?.uid || 'main-profile';

        await db.collection('rides').add({
            userId,
            origin: origin.trim(),
            destination: destination.trim(),
            vehicleCategory,
            estimatedDistance,
            estimatedTime,
            estimatedFare,
            status: 'requested',
            createdAt: firestore.FieldValue.serverTimestamp(),
        });

        Alert.alert('Viaje solicitado', 'Tu viaje fue registrado correctamente.');

        setOrigin('');
        setDestination('');
        setVehicleCategory('Económico');
        setEstimatedFare(null);
        setEstimatedDistance(null);
        setEstimatedTime(null);
        } catch (error) {
        console.log('Error requesting ride:', error);
        Alert.alert('Error', 'No fue posible solicitar el viaje.');
    }
};

    return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Solicitud de Viaje</Text>
        <Text style={styles.subtitle}>
            Busca tu destino, selecciona el tipo de vehículo y calcula la tarifa
            estimada.
        </Text>

    <View style={styles.card}>
        <Text style={styles.label}>Origen</Text>
            <TextInput
                style={styles.input}
                value={origin}
                onChangeText={setOrigin}
                placeholder="Ejemplo: Centro Comercial"
            />

        <Text style={styles.label}>Destino</Text>
        <TextInput
            style={styles.input}
            value={destination}
            onChangeText={setDestination}
            placeholder="Ejemplo: Universidad"
        />

        <Text style={styles.label}>Categoría de vehículo</Text>
        <View style={styles.optionRow}>
            {(['Económico', 'XL', 'Premium'] as VehicleCategory[]).map(item => (
                <TouchableOpacity
                key={item}
                style={[
                    styles.optionButton,
                    vehicleCategory === item && styles.optionButtonSelected,
                ]}
                onPress={() => setVehicleCategory(item)}>
                <Text
                    style={[
                    styles.optionText,
                    vehicleCategory === item && styles.optionTextSelected,
                ]}>
                {item}
                </Text>
                </TouchableOpacity>
            ))}
        </View>

        <View style={styles.mapSimulation}>
            <View style={styles.pointUser} />
            <View style={styles.routeLine} />
            <View style={styles.pointDestination} />

            <Text style={styles.mapText}>Ruta estimada simulada</Text>
        </View>

        <TouchableOpacity style={styles.secondaryButton} onPress={calculateFare}>
            <Text style={styles.secondaryButtonText}>Calcular tarifa</Text>
        </TouchableOpacity>

        {estimatedFare !== null ? (
        <View style={styles.fareBox}>
            <Text style={styles.fareLabel}>Distancia estimada</Text>
            <Text style={styles.fareValue}>{estimatedDistance} km</Text>

            <Text style={styles.fareLabel}>Tiempo estimado</Text>
            <Text style={styles.fareValue}>{estimatedTime} minutos</Text>

            <Text style={styles.fareLabel}>Tarifa estimada</Text>
            <Text style={styles.priceValue}>
                ${estimatedFare.toLocaleString()}
            </Text>
        </View>
        ) : null}

        <TouchableOpacity style={styles.primaryButton} onPress={requestRide}>
            <Text style={styles.primaryButtonText}>Solicitar viaje</Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6F8',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
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
        borderRadius: 18,
        padding: 18,
        elevation: 3,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
        marginTop: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: '#111827',
        backgroundColor: '#FFFFFF',
    },
    optionRow: {
        flexDirection: 'row',
        gap: 8,
    },
    optionButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    optionButtonSelected: {
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
    },
    optionText: {
        color: '#374151',
        fontWeight: '600',
        fontSize: 12,
    },
        optionTextSelected: {
        color: '#FFFFFF',
    },
    mapSimulation: {
        height: 180,
        backgroundColor: '#E5E7EB',
        borderRadius: 18,
        marginTop: 22,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    pointUser: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#2563EB',
        position: 'absolute',
        left: 45,
        top: 60,
    },
    pointDestination: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#DC2626',
        position: 'absolute',
        right: 45,
        bottom: 55,
    },
        routeLine: {
        width: 180,
        height: 4,
        backgroundColor: '#111827',
        transform: [{rotate: '25deg'}],
    },
    mapText: {
        position: 'absolute',
        bottom: 18,
        fontSize: 13,
        fontWeight: '700',
        color: '#374151',
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: '#111827',
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 22,
    },
    secondaryButtonText: {
        color: '#111827',
        fontWeight: '700',
    },
    fareBox: {
        backgroundColor: '#F9FAFB',
        borderRadius: 14,
        padding: 16,
        marginTop: 18,
    },
    fareLabel: {
        color: '#6B7280',
        fontSize: 13,
        marginTop: 8,
    },
    fareValue: {
        color: '#111827',
        fontSize: 17,
        fontWeight: '700',
        marginTop: 2,
    },
    priceValue: {
        color: '#111827',
        fontSize: 24,
        fontWeight: '700',
        marginTop: 2,
    },
    primaryButton: {
        backgroundColor: '#111827',
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 18,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
});