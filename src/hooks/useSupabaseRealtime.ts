import { useEffect } from 'react';
import { supabase } from '@api/supabase';

export function useSupabaseRealtime(table: string, onChange: (payload: any) => void) {
  useEffect(() => {
    const channel = supabase.channel(table).on('postgres_changes', { event: '*', schema: 'public', table }, onChange).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, onChange]);
}
