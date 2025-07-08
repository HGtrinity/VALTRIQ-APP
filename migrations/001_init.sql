create table consultations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  patient_name text,
  started_at timestamptz default now(),
  status text default 'draft'  -- draft | processing | review | done
);

create table reports (
  id uuid primary key default uuid_generate_v4(),
  consultation_id uuid references consultations on delete cascade,
  soap jsonb,
  created_at timestamptz default now()
);