import { useState, useEffect } from 'react';
import { supabase } from '@api/supabase';

export function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener?.unsubscribe();
  }, []);

  return session;
}
