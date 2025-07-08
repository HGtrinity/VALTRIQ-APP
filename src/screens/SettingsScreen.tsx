
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { uploadAvatar, updateProfile } from '@api/supabase';
import * as ImagePicker from 'expo-image-picker';

export default function SettingsScreen({ navigation }: any) {
  const { user, profile, logout } = useAuth();
  const [name, setName] = useState(profile?.name || '');
  const [avatar, setAvatar] = useState(profile?.avatar_url || '');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 0.7 });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setLoading(true);
      const uri = result.assets[0].uri;
      const file = await fetch(uri).then(r => r.blob());
      const { url } = await uploadAvatar(user.id, file);
      setAvatar(url);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const { error } = await updateProfile(user.id, { name, avatar_url: avatar });
    setLoading(false);
    if (!error) Alert.alert('Sucesso', 'Perfil atualizado!');
    else Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <TouchableOpacity onPress={pickImage} style={styles.avatarBox}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}><Text>Foto</Text></View>
        )}
        {loading && <ActivityIndicator style={{ position: 'absolute', alignSelf: 'center', top: 30 }} />}
      </TouchableOpacity>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nome" />
      <Text style={styles.label}>E-mail: {user?.email}</Text>
      <Button title="Salvar" onPress={handleSave} color="#498ECD" disabled={loading} />
      <Button title="Sair da Conta" onPress={logout} color="#B287C4" />
      <Button title="Suporte" onPress={() => Alert.alert('Suporte', 'Envie um email para suporte@valtriq.com')} color="#498ECD" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, fontFamily: 'Poppins', color: '#498ECD' },
  avatarBox: { alignSelf: 'center', marginBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#EBF4FA', alignItems: 'center', justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16, fontFamily: 'PT Sans' },
  label: { fontSize: 16, marginBottom: 24, fontFamily: 'PT Sans' },
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, fontFamily: 'Poppins', color: '#498ECD' },
  label: { fontSize: 16, marginBottom: 24, fontFamily: 'PT Sans' },
});
