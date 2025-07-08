import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { supabase } from '@api/supabase';
import { useConsultStore } from '@state/consultationStore';

export default function ReviewScreen({ navigation }: any) {
  const { current } = useConsultStore();
  const [soap, setSoap] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('soap')
        .eq('consultation_id', current.id)
        .single();
      if (data) setSoap(JSON.stringify(data.soap, null, 2));
      setLoading(false);
    };
    fetchReport();
  }, [current]);

  const handleApprove = async () => {
    await supabase.from('consultations').update({ status: 'done' }).eq('id', current.id);
    navigation.replace('Home');
  };

  if (loading) return <Text>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Revisão do Relatório</Text>
      <TextInput style={styles.textarea} multiline value={soap} onChangeText={setSoap} />
      <Button title="Aprovar e Finalizar" onPress={handleApprove} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  textarea: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, minHeight: 200, padding: 12, marginBottom: 24, fontFamily: 'monospace' },
});
