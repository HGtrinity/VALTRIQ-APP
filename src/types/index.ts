export interface Consultation {
  id: string;
  user_id: string;
  patient_name: string;
  started_at: string;
  status: 'draft' | 'processing' | 'review' | 'done';
}

export interface Report {
  id: string;
  consultation_id: string;
  soap: Record<string, any>;
  created_at: string;
}