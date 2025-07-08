
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { useConnectionStatus } from '../utils/useConnectionStatus';


export default function LoginScreen({ navigation }: any) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isConnected = useConnectionStatus();

  const validateEmail = (email: string) => {
    // Regex simples para e-mail válido
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const validatePassword = (password: string) => {
    // Pelo menos 6 caracteres
    return password.length >= 6;
  };

  const handleLogin = async () => {
    setError('');
    if (!isConnected) {
      setError('Sem conexão com a internet.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Digite um e-mail válido.');
      return;
    }
    if (!validatePassword(password)) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    const { error } = await signIn(email, password);
    if (error) setError(error.message);
    else navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valtriq Login</Text>
      {!isConnected && <Text style={styles.error}>Sem conexão com a internet</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCorrect={false}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} disabled={!isConnected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  error: { color: 'red', marginBottom: 8, textAlign: 'center' },
});
