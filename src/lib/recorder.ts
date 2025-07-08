import { Audio } from 'expo-av';

export async function startRecording() {
  const { recording } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY
  );
  return recording;
}

export async function stopRecording(recording: Audio.Recording) {
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  return uri;
}
