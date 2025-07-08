-- Migration para adicionar consentimento de gravação em consultations
alter table consultations
add column recording_consent boolean default false;

alter table consultations
add column recording_consent_at timestamptz;
