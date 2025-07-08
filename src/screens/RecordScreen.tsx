import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRecorder } from '@lib/recorder';
import { useConsultStore } from '@state/consultationStore';

export default function RecordScreen({ navigation }: any) {
  const { current } = useConsultStore();
  const { start, stop } = useRecorder();
  const [recording, setRecording] = useState(false);

  const handleStart = async () => {
    await start(current.id);
    setRecording(true);
  };
  const handleStop = async () => {
    await stop(current.id);
    setRecording(false);
    navigation.replace('Review');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gravação da Consulta</Text>
      <Text style={styles.timer}>{recording ? 'Gravando...' : 'Pronto'}</Text>
      <Button title={recording ? 'Finalizar' : 'Iniciar Gravação'} onPress={recording ? handleStop : handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  timer: { fontSize: 18, marginBottom: 24 },
});
