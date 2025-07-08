import { listConsultations } from '@api/supabase';

export async function startSession(patient: string) {
  const { data, error } = await listConsultations.insert({ patient_name: patient });
  // cria recorder, devolve IDs etc.
  return { data, error };
}
