import { useEffect } from 'react';
import { supabase, signIn, signUp, getProfile } from '@api/supabase';
import { useAuthStore } from '@state/authStore';

export function useAuth() {
  const { user, setUser, profile, setProfile } = useAuthStore();

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data?.session?.user) setUser(data.session.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription?.unsubscribe();
  }, [setUser]);

  const login = async (email: string, password: string) => {
    const { data, error } = await signIn(email, password);
    if (data?.user) {
      setUser(data.user);
      const { data: profile } = await getProfile(data.user.id);
      setProfile(profile);
    }
    return { data, error };
  };

  const register = async (email: string, password: string, name: string) => {
    const { data, error } = await signUp(email, password, name);
    if (data?.user) {
      setUser(data.user);
      setProfile({ id: data.user.id, email, name });
    }
    return { data, error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return { user, profile, login, register, logout };
}
