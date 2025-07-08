// Usuário: registro, login, perfil, upload de avatar
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (data.user) {
    await supabase.from('profiles').insert({ id: data.user.id, email, name });
  }
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  return { data, error };
};

export const updateProfile = async (userId: string, updates: { name?: string; avatar_url?: string }) => {
  const { data, error } = await supabase.from('profiles').update(updates).eq('id', userId).select().single();
  return { data, error };
};

export const uploadAvatar = async (userId: string, file: Blob) => {
  const { data, error } = await supabase.storage.from('avatars').upload(`${userId}.png`, file, { upsert: true, contentType: 'image/png' });
  if (data) {
    const url = supabase.storage.from('avatars').getPublicUrl(`${userId}.png`).data.publicUrl;
    await updateProfile(userId, { avatar_url: url });
    return { url };
  }
  return { error };
};
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
  },
});

// Function to insert a consultation record
export const insertConsultation = async (consultation) => {
  const { data, error } = await supabase
    .from('consultations')
    .insert([consultation]);
  return { data, error };
};

// Function to update a consultation record
export const updateConsultationStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('consultations')
    .update({ status })
    .eq('id', id);
  return { data, error };
};


// Function to update recording consent for a consultation
export const updateConsultationConsent = async (
  id: string,
  consent: boolean,
  consentAt: string | Date
) => {
  const { data, error } = await supabase
    .from('consultations')
    .update({
      recording_consent: consent,
      recording_consent_at: consentAt,
    })
    .eq('id', id);
  return { data, error };
};

// Function to fetch consultations
export const fetchConsultations = async () => {
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .neq('status', 'done');
  return { data, error };
};

// Function to fetch reports by consultation ID
export const fetchReportsByConsultationId = async (consultationId: string) => {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('consultation_id', consultationId);
  return { data, error };
};