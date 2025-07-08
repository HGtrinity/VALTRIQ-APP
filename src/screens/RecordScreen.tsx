
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRecorder } from '@lib/recorder';
import { useConsultStore } from '@state/consultationStore';
import { useConnectionStatus } from '../utils/useConnectionStatus';
import { addPendingRecording } from '../utils/pendingRecordings';


export default function RecordScreen({ navigation }: any) {
  const { current } = useConsultStore();
  const { start, stop } = useRecorder();
  const [recording, setRecording] = useState(false);
  const isConnected = useConnectionStatus();

  const handleStart = async () => {
    await start(current.id);
    setRecording(true);
  };

  const handleStop = async () => {
    const uri = await stop(current.id);
    setRecording(false);
    if (!isConnected) {
      // Salva localmente se offline
      await addPendingRecording({
        id: current.id,
        uri,
        createdAt: new Date().toISOString(),
      });
      Alert.alert('Sem conexão', 'A gravação foi salva localmente e será enviada quando a conexão voltar.');
    } else {
      // Aqui você pode chamar a função de upload normalmente
      // await uploadRecording(current.id, uri);
    }
    navigation.replace('Review');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gravação da Consulta</Text>
      <Text style={styles.timer}>{recording ? 'Gravando...' : 'Pronto'}</Text>
      <Button title={recording ? 'Finalizar' : 'Iniciar Gravação'} onPress={recording ? handleStop : handleStart} />
      {!isConnected && <Text style={{ color: 'red', marginTop: 16 }}>Sem conexão: gravações serão salvas localmente</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  timer: { fontSize: 18, marginBottom: 24 },
});
