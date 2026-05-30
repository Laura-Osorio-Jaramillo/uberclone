import React, {useState} from 'react';
import { Alert,StyleSheet,Text,TouchableOpacity, View,} from 'react-native';

type PaymentMethod = 'Tarjeta' | 'Mercado Pago' | 'Efectivo';

export function PaymentScreen() {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Tarjeta');

    const handlePayment = () => {
        Alert.alert(
        'Pago registrado',
        `Método seleccionado: ${paymentMethod}`,
        [{ text: 'OK' }]
        );
    };

    return (
    <View style={styles.container}>
        <Text style={styles.title}>Pasarela de Pagos</Text>
        <Text style={styles.subtitle}>
            Selecciona el método de pago para tu viaje.
        </Text>

        <View style={styles.card}>
            {(['Tarjeta', 'Mercado Pago', 'Efectivo'] as PaymentMethod[]).map(
            item => (
                <TouchableOpacity
                key={item}
                style={[
                    styles.optionButton,
                    paymentMethod === item && styles.optionButtonSelected,
                ]}
                onPress={() => setPaymentMethod(item)}>
                <Text
                    style={[
                    styles.optionText,
                    paymentMethod === item && styles.optionTextSelected,
                    ]}>
                    {item}
                </Text>
                </TouchableOpacity>
            ),
            )}

            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Confirmar pago</Text>
            </TouchableOpacity>
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
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 18,
    },
    optionButton: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    },
    optionButtonSelected: {
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
    },
    optionText: {
        color: '#374151',
        fontWeight: '600',
    },
    optionTextSelected: {
        color: '#FFFFFF',
    },
    payButton: {
        backgroundColor: '#111827',
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 16,
    },
    payButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
});