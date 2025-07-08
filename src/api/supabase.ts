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

// Function to fetch consultations
export const fetchConsultations = async () => {
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .neq('status', 'done');
  return { data, error };
};

// Function to fetch reports by consultation ID
export const fetchReportsByConsultationId = async (consultationId) => {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('consultation_id', consultationId);
  return { data, error };
};