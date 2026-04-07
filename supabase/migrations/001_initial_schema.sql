-- ChatNova Database Schema
-- Run this in Supabase SQL Editor

-- =============================================
-- PROFILES (extends auth.users)
-- =============================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  business_name text,
  business_phone text,
  business_address text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================
-- AI CONFIGS
-- =============================================
create table if not exists public.ai_configs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  model_provider text check (model_provider in ('openai', 'anthropic', 'google')) default 'openai',
  model_name text default 'gpt-4.1-mini',
  welcome_message text default 'Сайн байна уу!',
  tone text check (tone in ('friendly', 'professional', 'casual')) default 'friendly',
  language text check (language in ('mongolian', 'english')) default 'mongolian',
  ai_enabled boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.ai_configs enable row level security;

create policy "Users can manage their own AI config"
  on public.ai_configs for all
  using (auth.uid() = user_id);

-- =============================================
-- KNOWLEDGE BASE
-- =============================================
create table if not exists public.knowledge_base (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  question text not null,
  answer text,
  category text default 'FAQ',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.knowledge_base enable row level security;

create policy "Users can manage their own knowledge base"
  on public.knowledge_base for all
  using (auth.uid() = user_id);

-- =============================================
-- PRODUCTS
-- =============================================
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  name text not null,
  price text,
  description text,
  category text,
  emoji text,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.products enable row level security;

create policy "Users can manage their own products"
  on public.products for all
  using (auth.uid() = user_id);

-- =============================================
-- CONVERSATIONS
-- =============================================
create table if not exists public.conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  customer_name text,
  customer_id text,
  platform text check (platform in ('messenger', 'instagram', 'whatsapp')) default 'messenger',
  last_message text,
  last_message_at timestamptz,
  unread_count int default 0,
  status text check (status in ('active', 'archived')) default 'active',
  created_at timestamptz default now()
);

alter table public.conversations enable row level security;

create policy "Users can view their own conversations"
  on public.conversations for all
  using (auth.uid() = user_id);

-- =============================================
-- MESSAGES
-- =============================================
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations on delete cascade not null,
  sender_type text check (sender_type in ('customer', 'bot', 'admin')) not null,
  content text not null,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

create policy "Users can manage messages from their conversations"
  on public.messages for all
  using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id and c.user_id = auth.uid()
    )
  );

-- =============================================
-- ORDERS
-- =============================================
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations on delete set null,
  user_id uuid references public.profiles on delete cascade not null,
  customer_name text,
  items jsonb not null default '[]',
  total_amount text,
  status text check (status in ('pending', 'paid', 'cancelled', 'completed')) default 'pending',
  qpay_invoice_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Users can manage their own orders"
  on public.orders for all
  using (auth.uid() = user_id);

-- =============================================
-- ACTIVITY LOG
-- =============================================
create table if not exists public.activity_log (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  action_type text,
  description text,
  metadata jsonb,
  created_at timestamptz default now()
);

alter table public.activity_log enable row level security;

create policy "Users can view their own activity log"
  on public.activity_log for select
  using (auth.uid() = user_id);

create policy "System can insert activity log"
  on public.activity_log for insert
  with check (true);

-- =============================================
-- BROADCASTS
-- =============================================
create table if not exists public.broadcasts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  message text not null,
  sent_count int default 0,
  delivered_count int default 0,
  failed_count int default 0,
  status text check (status in ('draft', 'sending', 'sent', 'failed')) default 'draft',
  created_at timestamptz default now(),
  sent_at timestamptz
);

alter table public.broadcasts enable row level security;

create policy "Users can manage their own broadcasts"
  on public.broadcasts for all
  using (auth.uid() = user_id);

-- =============================================
-- INDEXES
-- =============================================
create index if not exists idx_conversations_user_id on public.conversations(user_id);
create index if not exists idx_conversations_last_message_at on public.conversations(last_message_at desc);
create index if not exists idx_messages_conversation_id on public.messages(conversation_id);
create index if not exists idx_messages_created_at on public.messages(created_at desc);
create index if not exists idx_activity_log_user_id on public.activity_log(user_id);
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_products_user_id on public.products(user_id);
