-- Run this in Supabase SQL Editor to create the demo_requests table
create table if not exists demo_requests (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  practice_name text,
  role text,
  message text,
  source text default 'website',
  created_at timestamptz default now() not null
);
