import AsyncStorage from '@react-native-async-storage/async-storage';

const PENDING_KEY = 'pending_recordings';

export async function addPendingRecording(recording: any) {
  const list = await getPendingRecordings();
  list.push(recording);
  await AsyncStorage.setItem(PENDING_KEY, JSON.stringify(list));
}

export async function getPendingRecordings() {
  const data = await AsyncStorage.getItem(PENDING_KEY);
  return data ? JSON.parse(data) : [];
}

export async function removePendingRecording(id: string) {
  const list = await getPendingRecordings();
  const filtered = list.filter((r: any) => r.id !== id);
  await AsyncStorage.setItem(PENDING_KEY, JSON.stringify(filtered));
}
