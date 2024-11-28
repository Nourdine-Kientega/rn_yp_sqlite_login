import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { validateLogin } from '../utils/formValidation';
import { useSQLiteContext } from 'expo-sqlite';
import { verifyPassword } from '../utils/bcrypt';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const db = useSQLiteContext();

  const handleLogin = async () => {
      const data = { email, password };
      const newErrors = validateLogin(data);
      
  
      setErrors(newErrors);
  
      if (Object.keys(newErrors).length === 0) {

        try {

          const user = await db.getFirstSync(`SELECT * FROM users WHERE email = ?`, [email]);

          if (!user) {
            Alert.alert("Erreur", "Utilisateur non trouvé.");
            return;
          }

          const isPasswordValid = await verifyPassword(password, user.password);

          if (isPasswordValid) {
            Alert.alert("Succès", "Connexion réussie !");
            navigation.navigate('Home', { username: user.username, email: user.email });
          } else {
            Alert.alert("Erreur", "Mot de passe incorrect.");
          }
        } catch (error) {
          console.log('Erreur lors de l\'inscription: ', error);
        }
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
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
