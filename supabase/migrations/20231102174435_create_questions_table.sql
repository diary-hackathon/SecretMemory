create table
questions (
  id uuid primary key not null default uuid_generate_v4(),
  content text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
)