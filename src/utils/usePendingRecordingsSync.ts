import { useEffect } from 'react';
import { useConnectionStatus } from './useConnectionStatus';
import { getPendingRecordings, removePendingRecording } from './pendingRecordings';
// import { uploadRecording } from '../api/supabase'; // Implemente conforme seu backend

export function usePendingRecordingsSync() {
  const isConnected = useConnectionStatus();

  useEffect(() => {
    if (!isConnected) return;
    (async () => {
      const pendings = await getPendingRecordings();
      for (const rec of pendings) {
        try {
          // await uploadRecording(rec.id, rec.uri);
          // Simulação de envio:
          await new Promise(res => setTimeout(res, 500));
          await removePendingRecording(rec.id);
        } catch (e) {
          // Se falhar, mantém na fila
        }
      }
    })();
  }, [isConnected]);
}
