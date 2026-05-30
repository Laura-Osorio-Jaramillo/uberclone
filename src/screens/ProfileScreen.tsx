import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {db, firebaseAuth} from '../services/firebase';

type GenderOption = 'Femenino' | 'Masculino';
type LanguageOption = 'Español' | 'Inglés';

export function ProfileScreen() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState<GenderOption>('Femenino');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState<LanguageOption>('Español');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handlePhoneChange = (value: string) => {
    const onlyNumbers = value.replace(/[^0-9]/g, '');
    setPhoneNumber(onlyNumbers);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'El nombre completo es obligatorio.';
    }

    if (fullName.trim().length > 50) {
      newErrors.fullName = 'El nombre no puede superar 50 caracteres.';
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'El número de celular es obligatorio.';
    }

    if (phoneNumber && !/^\d+$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'El celular solo debe contener números.';
    }

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    }

    if (email.trim() && !validateEmail(email.trim())) {
      newErrors.email = 'Ingresa un correo electrónico válido.';
    }

    if (!gender) {
      newErrors.gender = 'Selecciona un género.';
    }

    if (!language) {
      newErrors.language = 'Selecciona un idioma.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loadProfile = async () => {
    try {
      const currentUser = firebaseAuth.currentUser;
      const profileId = currentUser?.uid || 'main-profile';

      const profileSnapshot = await db.collection('users').doc(profileId).get();

      if (profileSnapshot.exists()) {
        const profileData = profileSnapshot.data();

        setFullName(profileData?.fullName || '');
        setPhoneNumber(profileData?.phoneNumber || '');
        setGender(profileData?.gender || 'Femenino');
        setEmail(profileData?.email || currentUser?.email || '');
        setLanguage(profileData?.language || 'Español');
      } else if (currentUser?.email) {
        setEmail(currentUser.email);
      }
    } catch (error) {
      console.log('Error loading profile:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const currentUser = firebaseAuth.currentUser;
      const profileId = currentUser?.uid || 'main-profile';

      console.log('Saving profile in Firestore:', profileId);

      await db.collection('users').doc(profileId).set(
        {
          fullName: fullName.trim(),
          phoneNumber: phoneNumber.trim(),
          gender,
          email: email.trim().toLowerCase(),
          language,
          photoUrl: '',
          updatedAt: firestore.FieldValue.serverTimestamp(),
        },
        {merge: true},
      );

      Alert.alert(
        'Perfil guardado',
        'La información fue guardada correctamente en Firebase.',
      );
    } catch (error) {
      console.log('Error saving profile:', error);

      Alert.alert(
        'Error',
        'No fue posible guardar el perfil. Intenta nuevamente.',
      );
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

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
          maxLength={10}
        />
        <Text style={styles.counter}>{phoneNumber.length}/10 caracteres</Text>
        {errors.phoneNumber ? (
          <Text style={styles.error}>{errors.phoneNumber}</Text>
        ) : null}

        <Text style={styles.label}>Género</Text>
        <View style={styles.optionRow}>
          {(['Femenino', 'Masculino'] as GenderOption[]).map(item => (
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
        {errors.gender ? (
          <Text style={styles.error}>{errors.gender}</Text>
        ) : null}

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="ejemplo@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? (
          <Text style={styles.error}>{errors.email}</Text>
        ) : null}

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
        {errors.language ? (
          <Text style={styles.error}>{errors.language}</Text>
        ) : null}

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
    backgroundColor: '#F4F6F8',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
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
    marginTop: 12,
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
  counter: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 4,
  },
  error: {
    fontSize: 12,
    color: '#DC2626',
    marginTop: 4,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
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
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});