-- Migration: Initial schema setup for 10xCards
-- Description: Creates Cards table with appropriate relations and RLS policies
-- Tables affected: Users, Cards
-- Author: GitHub Copilot
-- Date: 2025-04-13

-- Create Cards table
create table cards (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    front text not null,
    back text not null,
    source varchar not null check (source in ('ai-full', 'ai-edited', 'manual')),
    created_at timestamp default current_timestamp not null,
    updated_at timestamp default current_timestamp not null
);

-- Enable RLS on Cards table
alter table cards enable row level security;

-- Create RLS policies for Cards table
create policy "Users can view their own cards" on cards
    for select using (auth.uid() = user_id);

create policy "Users can create their own cards" on cards
    for insert with check (auth.uid() = user_id);

create policy "Users can update their own cards" on cards
    for update using (auth.uid() = user_id);

create policy "Users can delete their own cards" on cards
    for delete using (auth.uid() = user_id);

-- Create indexes
create index cards_user_id_idx on cards (user_id);

-- Create updated_at triggers
create or replace function update_updated_at()
returns trigger as $$
begin
    new.updated_at = current_timestamp;
    return new;
end;
$$ language plpgsql;

create trigger cards_updated_at
    before update on cards
    for each row
    execute function update_updated_at();