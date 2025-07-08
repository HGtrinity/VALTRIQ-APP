-- Criação da tabela de perfis de usuário para Valtriq
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  email text unique,
  name text,
  avatar_url text,
  recording_consent boolean default false, -- consentimento de gravação
  recording_consent_at timestamptz,       -- data/hora do consentimento
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger para atualizar updated_at
create or replace function update_profile_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_profile_updated_at on profiles;
create trigger set_profile_updated_at
before update on profiles
for each row execute procedure update_profile_updated_at();
