
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { supabase } from '@api/supabase';
import { useConsultStore } from '@state/consultationStore';

export default function ReviewScreen({ navigation }: any) {
  const { current } = useConsultStore();
  const [fields, setFields] = useState({
    subjetivo: '',
    objetivo: '',
    avaliacao: '',
    plano: '',
    receita: '',
    exames: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      const { data, error } = await supabase
        .from('reports')
        .select('soap')
        .eq('consultation_id', current.id)
        .single();
      if (data && data.soap) {
        setFields({
          subjetivo: data.soap.subjetivo || '',
          objetivo: data.soap.objetivo || '',
          avaliacao: data.soap.avaliacao || '',
          plano: data.soap.plano || '',
          receita: data.soap.receita || '',
          exames: data.soap.exames || '',
        });
      }
      setLoading(false);
    };
    fetchReport();
  }, [current]);

  const handleChange = (key: string, value: string) => {
    setFields(prev => ({ ...prev, [key]: value }));
  };

  const handleApprove = async () => {
    // Atualiza o relatório editado
    const { error: reportError } = await supabase
      .from('reports')
      .update({ soap: fields })
      .eq('consultation_id', current.id);
    if (reportError) {
      Alert.alert('Erro', 'Não foi possível salvar o relatório.');
      return;
    }
    await supabase.from('consultations').update({ status: 'done' }).eq('id', current.id);
    navigation.replace('Home');
  };

  if (loading) return <Text>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Revisão do Relatório</Text>
      <Text style={styles.label}>Subjetivo</Text>
      <TextInput style={styles.input} multiline value={fields.subjetivo} onChangeText={t => handleChange('subjetivo', t)} />
      <Text style={styles.label}>Objetivo</Text>
      <TextInput style={styles.input} multiline value={fields.objetivo} onChangeText={t => handleChange('objetivo', t)} />
      <Text style={styles.label}>Avaliação</Text>
      <TextInput style={styles.input} multiline value={fields.avaliacao} onChangeText={t => handleChange('avaliacao', t)} />
      <Text style={styles.label}>Plano</Text>
      <TextInput style={styles.input} multiline value={fields.plano} onChangeText={t => handleChange('plano', t)} />
      <Text style={styles.label}>Receita</Text>
      <TextInput style={styles.input} multiline value={fields.receita} onChangeText={t => handleChange('receita', t)} />
      <Text style={styles.label}>Pedidos de Exame</Text>
      <TextInput style={styles.input} multiline value={fields.exames} onChangeText={t => handleChange('exames', t)} />
      <Button title="Aprovar e Finalizar" onPress={handleApprove} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, fontFamily: 'Poppins' },
  label: { fontWeight: 'bold', marginTop: 16, marginBottom: 4, fontFamily: 'Poppins' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, minHeight: 40, padding: 12, marginBottom: 8, fontFamily: 'PT Sans', backgroundColor: '#fff' },
});
