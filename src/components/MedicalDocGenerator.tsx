import { useState } from 'react';
import { Audio } from 'expo-av';
import { supabase } from '../api/supabase';

export const useRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

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

    await supabase.storage.from('audio')
      .upload(`${consultationId}.m4a`, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: 'audio/m4a',
        metadata: { consultation_id: consultationId }
      });

    setRecording(null);
  };

  return { start, stop };
};