create table
media (
  id uuid primary key not null,
  user_id uuid not null references auth.users (id),
  file_name text not null,
  file_type text not null,
  file_size bigint not null,
  file_url text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);