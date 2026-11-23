-- ============================================================================
-- SOVEREIGN BIS HALLMARKING MANAGEMENT SOFTWARE
-- Comprehensive Supabase PostgreSQL Schema, Security Policies & Storage Setup
-- ============================================================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================================
-- 2. UTILITY FUNCTIONS & TRIGGERS
-- ============================================================================
create or replace function update_modified_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

-- ============================================================================
-- 3. TABLE DEFINITIONS
-- ============================================================================

-- A. CUSTOMERS TABLE
create table if not exists public.customers (
    id text primary key,
    name text not null,
    code text,
    address text,
    area text,
    region text,
    mobile text,
    bis text,
    gst text,
    state_code text,
    active_jobs integer default 0,
    since text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- B. INTAKE BATCHES TABLE
create table if not exists public.intake_batches (
    job_docket text primary key,
    receipt_no text,
    customer text not null,
    customer_address text,
    bis text,
    customer_gst text,
    customer_state_code text,
    req_no text,
    metal text default 'Gold',
    article_type text,
    product_breakdown text,
    pcs integer default 1,
    purity text default '22K 916',
    rate numeric(10,2) default 75.00,
    stream text,
    tray text,
    net_wt numeric(12,3) default 0.000,
    gross_wt numeric(12,3) default 0.000,
    depositor text,
    receiver text,
    date text,
    time text,
    status text default 'RECEIVED',
    bill_no text,
    stage1_status text default 'PENDING',
    stage2_status text default 'PENDING',
    stage3_status text default 'PENDING',
    stage4_status text default 'PENDING',
    delivery_photos jsonb default '[]'::jsonb,
    visual_custody jsonb default '[]'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- C. PIECE CUSTODY RECORDS TABLE (Individual piece audit trail)
create table if not exists public.piece_custody_records (
    id text primary key default gen_random_uuid()::text,
    job_docket text not null references public.intake_batches(job_docket) on delete cascade,
    piece_index integer not null,
    hsn_article text,
    gross_wt numeric(12,3),
    net_wt numeric(12,3),
    tag_code text,
    stage_a jsonb default '{}'::jsonb,
    stage_b jsonb default '{}'::jsonb,
    stage_c jsonb default '{}'::jsonb,
    stage_d jsonb default '{}'::jsonb,
    status text default 'PENDING',
    supervisor_override jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint unq_piece_custody unique (job_docket, piece_index)
);

-- D. BILLS & INVOICES TABLE
create table if not exists public.bills (
    id text primary key,
    bill_no text not null unique,
    job_docket text,
    customer_name text not null,
    customer_bis text,
    customer_gst text,
    metal text,
    pcs integer default 0,
    gross_weight numeric(12,3) default 0.000,
    net_weight numeric(12,3) default 0.000,
    rate_per_piece numeric(10,2) default 0.00,
    subtotal numeric(12,2) default 0.00,
    cgst numeric(12,2) default 0.00,
    sgst numeric(12,2) default 0.00,
    total_amount numeric(12,2) default 0.00,
    status text default 'PAID',
    payment_mode text default 'CASH',
    date text,
    time text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- E. DELIVERY RECORDS TABLE
create table if not exists public.delivery_records (
    id text primary key default gen_random_uuid()::text,
    job_docket text not null references public.intake_batches(job_docket) on delete cascade,
    customer_name text not null,
    verified_pieces integer default 0,
    total_pieces integer default 0,
    recipient_name text,
    recipient_phone text,
    gatepass_number text,
    dispatch_time text,
    status text default 'COMPLETED',
    dossier_url text,
    stage_d_verified boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- F. LAB SETTINGS TABLE
create table if not exists public.lab_settings (
    id text primary key default 'primary_config',
    legal_name text default 'SSR BULLION HALLMARK & ASSAY CENTER PRIVATE LIMITED',
    recognition_no text default 'AHC/WZ/2019/88492',
    gstin text default '27AAACS1482E1Z8',
    address text default 'Unit 401-404, Sovereign Bullion Tower, Bullion Hub, Zaveri Bazaar, Mumbai 400002',
    phone text default '+91 22 2849 1000',
    email text default 'compliance@ssrhallmark.com',
    parameters jsonb default '{}'::jsonb,
    auto_cloud_sync boolean default true,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- G. USER PROFILES TABLE (Supabase Auth link & Role-based Access)
create table if not exists public.user_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text unique not null,
    full_name text,
    role text not null default 'Quality Auditor' check (role in ('Admin', 'Assay Master', 'Quality Auditor', 'Delivery Agent')),
    phone text,
    badge_number text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================================
-- 4. PERFORMANCE INDEXES
-- ============================================================================
create index if not exists idx_customers_name on public.customers (name);
create index if not exists idx_customers_bis on public.customers (bis);
create index if not exists idx_intake_batches_customer on public.intake_batches (customer);
create index if not exists idx_intake_batches_status on public.intake_batches (status);
create index if not exists idx_intake_batches_date on public.intake_batches (date);
create index if not exists idx_piece_custody_job on public.piece_custody_records (job_docket);
create index if not exists idx_bills_job_docket on public.bills (job_docket);
create index if not exists idx_delivery_records_job on public.delivery_records (job_docket);
create index if not exists idx_user_profiles_role on public.user_profiles (role);

-- ============================================================================
-- 5. AUTOMATIC TIMESTAMP TRIGGERS
-- ============================================================================
drop trigger if exists update_customers_modtime on public.customers;
create trigger update_customers_modtime before update on public.customers for each row execute function update_modified_column();

drop trigger if exists update_intake_batches_modtime on public.intake_batches;
create trigger update_intake_batches_modtime before update on public.intake_batches for each row execute function update_modified_column();

drop trigger if exists update_piece_custody_modtime on public.piece_custody_records;
create trigger update_piece_custody_modtime before update on public.piece_custody_records for each row execute function update_modified_column();

drop trigger if exists update_bills_modtime on public.bills;
create trigger update_bills_modtime before update on public.bills for each row execute function update_modified_column();

drop trigger if exists update_delivery_records_modtime on public.delivery_records;
create trigger update_delivery_records_modtime before update on public.delivery_records for each row execute function update_modified_column();

drop trigger if exists update_user_profiles_modtime on public.user_profiles;
create trigger update_user_profiles_modtime before update on public.user_profiles for each row execute function update_modified_column();

-- Trigger to auto-create user_profile on auth.users insert
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.user_profiles (id, email, full_name, role)
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        coalesce(new.raw_user_meta_data->>'role', 'Quality Auditor')
    )
    on conflict (id) do update set
        email = excluded.email,
        full_name = coalesce(excluded.full_name, public.user_profiles.full_name),
        role = coalesce(excluded.role, public.user_profiles.role),
        updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
alter table public.customers enable row level security;
alter table public.intake_batches enable row level security;
alter table public.piece_custody_records enable row level security;
alter table public.bills enable row level security;
alter table public.delivery_records enable row level security;
alter table public.lab_settings enable row level security;
alter table public.user_profiles enable row level security;

-- Permissive policies for laboratory terminal operations (Anon & Authenticated)
-- Allows full reading and synchronization across workstations
create policy "Allow all read on customers" on public.customers for select using (true);
create policy "Allow all insert on customers" on public.customers for insert with check (true);
create policy "Allow all update on customers" on public.customers for update using (true);
create policy "Allow all delete on customers" on public.customers for delete using (true);

create policy "Allow all read on intake_batches" on public.intake_batches for select using (true);
create policy "Allow all insert on intake_batches" on public.intake_batches for insert with check (true);
create policy "Allow all update on intake_batches" on public.intake_batches for update using (true);
create policy "Allow all delete on intake_batches" on public.intake_batches for delete using (true);

create policy "Allow all read on piece_custody_records" on public.piece_custody_records for select using (true);
create policy "Allow all insert on piece_custody_records" on public.piece_custody_records for insert with check (true);
create policy "Allow all update on piece_custody_records" on public.piece_custody_records for update using (true);
create policy "Allow all delete on piece_custody_records" on public.piece_custody_records for delete using (true);

create policy "Allow all read on bills" on public.bills for select using (true);
create policy "Allow all insert on bills" on public.bills for insert with check (true);
create policy "Allow all update on bills" on public.bills for update using (true);
create policy "Allow all delete on bills" on public.bills for delete using (true);

create policy "Allow all read on delivery_records" on public.delivery_records for select using (true);
create policy "Allow all insert on delivery_records" on public.delivery_records for insert with check (true);
create policy "Allow all update on delivery_records" on public.delivery_records for update using (true);
create policy "Allow all delete on delivery_records" on public.delivery_records for delete using (true);

create policy "Allow all read on lab_settings" on public.lab_settings for select using (true);
create policy "Allow all insert on lab_settings" on public.lab_settings for insert with check (true);
create policy "Allow all update on lab_settings" on public.lab_settings for update using (true);

create policy "Allow all read on user_profiles" on public.user_profiles for select using (true);
create policy "Allow self update on user_profiles" on public.user_profiles for update using (true);
create policy "Allow insert on user_profiles" on public.user_profiles for insert with check (true);

-- ============================================================================
-- 7. SUPABASE STORAGE BUCKETS & POLICIES
-- ============================================================================
insert into storage.buckets (id, name, public)
values 
  ('article-photos', 'article-photos', true),
  ('custody-photos', 'custody-photos', true),
  ('dossiers', 'dossiers', true)
on conflict (id) do update set public = true;

-- Public read access policies for storage
create policy "Allow public read access on article-photos" on storage.objects for select using (bucket_id = 'article-photos');
create policy "Allow public read access on custody-photos" on storage.objects for select using (bucket_id = 'custody-photos');
create policy "Allow public read access on dossiers" on storage.objects for select using (bucket_id = 'dossiers');

-- Public & Authenticated upload policies for laboratory capture
create policy "Allow uploads to article-photos" on storage.objects for insert with check (bucket_id = 'article-photos');
create policy "Allow uploads to custody-photos" on storage.objects for insert with check (bucket_id = 'custody-photos');
create policy "Allow uploads to dossiers" on storage.objects for insert with check (bucket_id = 'dossiers');
create policy "Allow updates on custody-photos" on storage.objects for update using (bucket_id = 'custody-photos');
create policy "Allow updates on article-photos" on storage.objects for update using (bucket_id = 'article-photos');
create policy "Allow updates on dossiers" on storage.objects for update using (bucket_id = 'dossiers');
