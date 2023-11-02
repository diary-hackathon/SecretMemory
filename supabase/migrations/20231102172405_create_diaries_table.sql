create table
diaries (
  id uuid primary key not null,
  user_id uuid not null references auth.users (id),
  written_date date not null,
  thumbnail_id uuid references media (id),
  title text not null,
  content text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);