import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { supabase } from '@api/supabase';
import { useAuthStore } from '@state/authStore';
import { useSupabaseRealtime } from '@hooks/useSupabaseRealtime';
import { StartButton } from '@components/buttons/StartButton';
import { ConsultCard } from '@components/cards/ConsultCard';
import { colors } from '@theme/colors';

const HomeScreen = ({ navigation }) => {
  const { user, profile } = useAuthStore();
  const [consultations, setConsultations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [loading, setLoading] = useState(false);

  // Realtime updates
  useSupabaseRealtime('consultations', () => fetchConsultations());

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .neq('status', 'done')
      .order('started_at', { ascending: false });
    if (!error) setConsultations(data);
  };

  const handleStartConsult = async () => {
    if (!patientName.trim()) {
      Alert.alert('Nome obrigatório', 'Digite o nome do paciente.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('consultations')
      .insert([{ patient_name: patientName, user_id: user?.id }])
      .select()
      .single();
    setLoading(false);
    setModalVisible(false);
    setPatientName('');
    if (data) {
      navigation.navigate('Record', { consultationId: data.id });
    } else {
      Alert.alert('Erro', 'Não foi possível iniciar a consulta.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho do médico */}
      <View style={styles.header}>
        {profile?.avatar_url ? (
          <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}><Text>Foto</Text></View>
        )}
        <Text style={styles.greeting}>Olá, {profile?.name || 'Doutor(a)'}!</Text>
      </View>
const styles = StyleSheet.create({
  // ...existing styles...
  avatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center' },
});
      {/* Botão Nova Consulta */}
      <StartButton onPress={() => setModalVisible(true)} />
      {/* Lista de consultas */}
      <FlatList
        data={consultations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ConsultCard
            patient={item.patient_name}
            date={new Date(item.started_at).toLocaleString()}
            status={item.status}
            onPress={() => navigation.navigate('Review', { consultationId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
      />
      {/* Modal para novo paciente */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Consulta</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do paciente"
              value={patientName}
              onChangeText={setPatientName}
              autoFocus
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={{ color: colors.primary }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.okBtn} onPress={handleStartConsult} disabled={loading}>
                <Text style={{ color: '#fff' }}>{loading ? 'Aguarde...' : 'Iniciar'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  greeting: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: colors.primary,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 16,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    elevation: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'Poppins',
    marginBottom: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontFamily: 'PT Sans',
    backgroundColor: '#fff',
  },
  cancelBtn: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.secondary,
    marginRight: 8,
  },
  okBtn: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,
    minWidth: 80,
    alignItems: 'center',
  },
});
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;