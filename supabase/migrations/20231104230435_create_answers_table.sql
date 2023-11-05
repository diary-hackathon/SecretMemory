create table
answers (
  id uuid primary key not null default uuid_generate_v4(),
  user_id uuid not null references auth.users (id),
  question_id uuid not null references public.questions (id),
  answer text not null,
  written_date date not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
)