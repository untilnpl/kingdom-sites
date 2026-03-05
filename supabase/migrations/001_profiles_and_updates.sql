-- Create profiles table for onboarding data
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  who_they_are text,
  tech_type text,
  description text,
  onboarding_complete boolean default false,
  created_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Users can read/write their own profile
create policy "Users can manage own profile"
  on profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admin can read all profiles
create policy "Admin reads all profiles"
  on profiles for select
  using ((auth.jwt() ->> 'email') = 'untilnpl@gmail.com');

-- Add drive_link column to projects table if it doesn't exist
alter table projects add column if not exists drive_link text;

-- Admin can read all projects (if policy doesn't already exist)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'projects' and policyname = 'Admin reads all projects'
  ) then
    execute $policy$
      create policy "Admin reads all projects"
        on projects for select
        using ((auth.jwt() ->> 'email') = 'untilnpl@gmail.com')
    $policy$;
  end if;
end
$$;
