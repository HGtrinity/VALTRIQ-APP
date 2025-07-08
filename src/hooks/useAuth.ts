import { useState } from 'react';
import { supabase } from '@api/supabase';

export function useAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    setUser(user);
    return { user, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, signIn, signOut };
}
