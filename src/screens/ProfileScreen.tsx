import React, {useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

type GenderOption = 'Femenino' | 'Masculino' ;
type LanguageOption = 'Español' | 'Inglés';

export function ProfileScreen() {
    const [fullName, setFullName] = useState('Paula Andrea Muñoz');
    const [phoneNumber, setPhoneNumber] = useState('3001234567');
    const [gender, setGender] = useState<GenderOption>('Femenino');
    const [email, setEmail] = useState('pmunozco@gmail.com');
    const [language, setLanguage] = useState<LanguageOption>('Español');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
    };

    const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
        newErrors.fullName = 'El nombre completo es obligatorio.';
        }

    if (fullName.length > 50) {
        newErrors.fullName = 'El nombre no puede superar 50 caracteres.';
        }

    if (!phoneNumber.trim()) {
        newErrors.phoneNumber = 'El número de celular es obligatorio.';
        }

    if (!/^\d+$/.test(phoneNumber)) {
        newErrors.phoneNumber = 'El celular solo debe contener números.';
        }

    if (!email.trim()) {
        newErrors.email = 'El correo electrónico es obligatorio.';
        }

    if (email && !validateEmail(email)) {
        newErrors.email = 'Ingresa un correo válido.';
        }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
    };

    const handleSaveProfile = async () => {
        if (!validateForm()) {
        return;
        }

        try {
            await firestore()
            .collection('users')
            .doc('main-profile')
            .set({
                fullName,
                phoneNumber,
                gender,
                email,
                language,
                updatedAt: firestore.FieldValue.serverTimestamp(),
            })

    Alert.alert(
        'Perfil guardado',
        'La información fue guardada correctamente en Firebase.',
        );
    } catch (error) {
            Alert.alert(
            'Error',
            'No fue posible guardar el perfil. Intenta nuevamente.',
            );
    }
};

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>

        <Image
            source={require('../assets/images/foto.png')}
            style={styles.profileImage}
        />

        <Text style={styles.title}>Perfil de Usuario</Text>
        <Text style={styles.subtitle}>
            Registro y actualización de datos personales
        </Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Ingresa tu nombre completo"
                maxLength={50}
            />
            <Text style={styles.counter}>{fullName.length}/50 caracteres</Text>
            {errors.fullName ? (
            <Text style={styles.error}>{errors.fullName}</Text>
            ) : null}

            <Text style={styles.label}>Número de celular</Text>
            <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                placeholder="Ejemplo: 3001234567"
                keyboardType="numeric"
            />
            <Text style={styles.counter}>{phoneNumber.length}/10 caracteres</Text>
            {errors.phoneNumber ? (
                <Text style={styles.error}>{errors.phoneNumber}</Text>
            ) : null}

            <Text style={styles.label}>Género</Text>
        <View style={styles.optionRow}>
            {(['Femenino', 'Masculino', 'Otro'] as GenderOption[]).map(item => (
            <TouchableOpacity
                key={item}
                style={[
                    styles.optionButton,
                    gender === item && styles.optionButtonSelected,
                ]}
                onPress={() => setGender(item)}>
                <Text
                    style={[
                    styles.optionText,
                    gender === item && styles.optionTextSelected,
                    ]}>
                    {item}
                </Text>
            </TouchableOpacity>
            ))}
        </View>

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="ejemplo@correo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <Text style={styles.label}>Idioma</Text>
        <View style={styles.optionRow}>
            {(['Español', 'Inglés'] as LanguageOption[]).map(item => (
            <TouchableOpacity
                key={item}
                style={[
                styles.optionButton,
                language === item && styles.optionButtonSelected,
                ]}
                onPress={() => setLanguage(item)}>
                <Text
                style={[
                    styles.optionText,
                    language === item && styles.optionTextSelected,
                    ]}>
                {item}
                </Text>
            </TouchableOpacity>
            ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
            <Text style={styles.saveButtonText}>Guardar perfil</Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 14,
        backgroundColor: '#E5E7EB',
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
        textAlign: 'center',
    },
    subtitle: {
        marginTop: 6,
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 18,
        elevation: 3,
    },
    label: {
        marginTop: 14,
        marginBottom: 6,
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        paddingHorizontal: 14,
        fontSize: 15,
        color: '#111827',
        backgroundColor: '#FFFFFF',
    },
    counter: {
        marginTop: 4,
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'right',
    },
    error: {
        marginTop: 4,
        fontSize: 12,
        color: '#DC2626',
    },
    optionRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 4,
    },
    optionButton: {
        flex: 1,
        paddingVertical: 11,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    optionButtonSelected: {
        backgroundColor: '#111827',
        borderColor: '#111827',
    },
    optionText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
    },
    optionTextSelected: {
        color: '#FFFFFF',
    },
    saveButton: {
        marginTop: 24,
        height: 52,
        borderRadius: 14,
        backgroundColor: '#111827',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
});