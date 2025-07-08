import { useState } from 'react';
import { Audio } from 'expo-av';
import { supabase } from '../api/supabase';
import { checkConnection } from '../utils/netinfo';

export const useRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [localAudio, setLocalAudio] = useState<string | null>(null);

  const start = async (consultationId: string) => {
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    setRecording(recording);
  };

  const stop = async (consultationId: string) => {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI()!;
    const file = await fetch(uri).then(r => r.blob());

    const online = await checkConnection();
    if (online) {
      const { error } = await supabase.storage.from('audio')
        .upload(`${consultationId}.m4a`, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'audio/m4a',
          metadata: { consultation_id: consultationId }
        });
      if (error) {
        // fallback: salva local
        setLocalAudio(uri);
        alert('Falha no upload. Áudio salvo localmente. Tente enviar novamente quando estiver online.');
      }
    } else {
      setLocalAudio(uri);
      alert('Sem conexão. Áudio salvo localmente. Tente enviar novamente quando estiver online.');
    }
    setRecording(null);
  };

  // Função para tentar enviar o áudio salvo localmente
  const tryUploadLocal = async (consultationId: string) => {
    if (!localAudio) return;
    const file = await fetch(localAudio).then(r => r.blob());
    const { error } = await supabase.storage.from('audio')
      .upload(`${consultationId}.m4a`, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: 'audio/m4a',
        metadata: { consultation_id: consultationId }
      });
    if (!error) setLocalAudio(null);
    return { error };
  };

  return { start, stop, tryUploadLocal, localAudio };
};