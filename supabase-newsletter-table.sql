-- Run this in Supabase SQL Editor to create the newsletter_subscribers table
create table if not exists newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  subscribed_at timestamptz default now() not null,
  source text default 'website'
);
