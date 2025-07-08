
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, CheckBox, Alert } from 'react-native';
import { updateConsultationConsent } from '../api/supabase';
import { useConsultStore } from '../state/consultationStore';


export default function ConsentScreen({ navigation, route }: any) {
  const [consent, setConsent] = useState(false);
  const { current } = useConsultStore();
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!consent) {
      Alert.alert('Consentimento obrigatório', 'Você deve concordar para continuar.');
      return;
    }
    if (!current || !current.id) {
      Alert.alert('Erro', 'Consulta não encontrada.');
      return;
    }
    setLoading(true);
    const now = new Date().toISOString();
    const { error } = await updateConsultationConsent(current.id, true, now);
    setLoading(false);
    if (error) {
      Alert.alert('Erro ao registrar consentimento', error.message || 'Tente novamente.');
      return;
    }
    navigation.replace('Record', route.params);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consentimento para Gravação</Text>
      <Text style={styles.text}>
        Para proteger a privacidade do paciente e cumprir a legislação (LGPD), é necessário obter o consentimento para gravar a consulta. O áudio será usado apenas para gerar a documentação médica e será armazenado de forma segura.
      </Text>
      <View style={styles.checkboxRow}>
        <CheckBox value={consent} onValueChange={setConsent} />
        <Text style={styles.checkboxLabel}>Concordo com a gravação desta consulta.</Text>
      </View>
      <Button title={loading ? 'Salvando...' : 'Continuar'} onPress={handleContinue} disabled={!consent || loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  text: { fontSize: 16, color: '#333', marginBottom: 24 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  checkboxLabel: { fontSize: 16, marginLeft: 8 },
});
