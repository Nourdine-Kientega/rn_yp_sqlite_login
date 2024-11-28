import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { validateSignup } from '../utils/formValidation';
import { hashPassword } from '../utils/bcrypt';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [emailExist, setEmailExist] = useState(false);

  const db = useSQLiteContext();

  const handleSignup = async () => {
    const data = { username, email, password, confirmPassword };
    const newErrors = validateSignup(data);

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const user = await db.getFirstSync(`SELECT * FROM users WHERE email = ?`, [email]);
        if(user) {
          setEmailExist(true);
          return;
        }

        const hashedPassword = await hashPassword(password);

        await db.runAsync(`INSERT INTO users(username, email, password) VALUES(?, ?, ?)`, [username, email, hashedPassword]);
        Alert.alert('Succès', 'Inscription réussie !');
        navigation.navigate('Login');
      } catch (error) {
        console.log('Error lors de l\'inscription: ', error);
        
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={[styles.input, errors.username && styles.inputError]}
        placeholder="Username"
        autoCorrect={false}
        autoCapitalize='none'
        value={username}
        onChangeText={setUsername}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        autoCorrect={false}
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      {emailExist && <Text style={styles.errorText}>Cette addresse email existe déjà !</Text>}
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        autoCorrect={false}
        autoCapitalize='none'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        placeholder="Confirm your password"
        autoCorrect={false}
        autoCapitalize='none'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f5f9',
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#4a4e69',
    },
    input: {
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      fontSize: 16,
      elevation: 3,
    },
    button: {
      backgroundColor: '#22223b',
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    link: {
      marginTop: 20,
    },
    linkText: {
      color: '#4a4e69',
      fontSize: 16,
    },
    inputError: {
      borderWidth: .8,
      borderColor: 'red',
    },
    errorText: {
      alignSelf: 'flex-start',
      fontSize: 12,
      color: 'red',
      marginBottom: 10,
      marginLeft: 5,
    },
  });
  