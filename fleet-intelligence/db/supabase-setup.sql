-- ============================================================
-- LAFA Fleet Intelligence — CONSOLIDATED SUPABASE SETUP
-- ============================================================
--
-- Single file to set up the entire database. Run in Supabase SQL Editor.
--
-- Order:
--   Step 1: DDL (tables + indexes)
--   Step 2: RLS + Helper Functions
--   Step 3: Auth Users (into auth.users + auth.identities)
--   Step 4: Seed Data (centers, profiles, drivers, vehicles, payroll, shifts)
--
-- ============================================================


-- ============================================================
-- STEP 1: DDL — CREATE TABLE + Indexes
-- ============================================================

CREATE TABLE centers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL UNIQUE,
  address    TEXT,
  lat        NUMERIC(9,6),
  lng        NUMERIC(9,6),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  role       TEXT NOT NULL CHECK (role IN ('admin', 'supervisor')),
  center_id  UUID REFERENCES centers(id),
  status     TEXT NOT NULL DEFAULT 'activo' CHECK (status IN ('activo', 'inactivo', 'invitado')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE drivers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT NOT NULL,
  didi_driver_id  INTEGER NOT NULL UNIQUE,
  center_id       UUID NOT NULL REFERENCES centers(id),
  default_shift   TEXT NOT NULL CHECK (default_shift IN ('diurno', 'nocturno')),
  start_date      DATE NOT NULL,
  status          TEXT NOT NULL DEFAULT 'activo' CHECK (status IN ('activo', 'inactivo')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE vehicles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plate      TEXT NOT NULL UNIQUE,
  model      TEXT NOT NULL,
  oem        TEXT NOT NULL CHECK (oem IN ('Geely', 'JAC', 'GAC')),
  center_id  UUID NOT NULL REFERENCES centers(id),
  status     TEXT NOT NULL DEFAULT 'disponible'
             CHECK (status IN ('disponible', 'en_turno', 'cargando', 'mantenimiento', 'fuera_de_servicio')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE shifts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id    UUID NOT NULL REFERENCES drivers(id),
  vehicle_id   UUID NOT NULL REFERENCES vehicles(id),
  check_in     TIMESTAMPTZ NOT NULL DEFAULT now(),
  check_out    TIMESTAMPTZ,
  hours_worked NUMERIC(5,2),
  status       TEXT NOT NULL DEFAULT 'en_turno'
               CHECK (status IN ('en_turno', 'completado', 'pendiente_revision')),
  created_by   UUID REFERENCES profiles(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_shifts_driver_checkin ON shifts(driver_id, check_in);

CREATE TABLE csv_uploads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename      TEXT NOT NULL,
  uploaded_by   UUID NOT NULL REFERENCES profiles(id),
  uploaded_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  record_count  INTEGER NOT NULL DEFAULT 0,
  valid_count   INTEGER NOT NULL DEFAULT 0,
  warning_count INTEGER NOT NULL DEFAULT 0,
  error_count   INTEGER NOT NULL DEFAULT 0,
  status        TEXT NOT NULL DEFAULT 'procesado'
                CHECK (status IN ('procesado', 'error')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE trips (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id     UUID NOT NULL REFERENCES drivers(id),
  didi_trip_id  TEXT NOT NULL UNIQUE,
  date          DATE NOT NULL,
  initial_time  TIME NOT NULL,
  final_time    TIME NOT NULL,
  cost          NUMERIC(10,2) NOT NULL,
  tip           NUMERIC(10,2) NOT NULL DEFAULT 0,
  initial_lat   NUMERIC(9,6),
  initial_lng   NUMERIC(9,6),
  final_lat     NUMERIC(9,6),
  final_lng     NUMERIC(9,6),
  upload_id     UUID REFERENCES csv_uploads(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_trips_driver_date ON trips(driver_id, date);

CREATE TABLE weekly_payroll (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id           UUID NOT NULL REFERENCES drivers(id),
  week_start          DATE NOT NULL,
  week_end            DATE NOT NULL,
  hours_worked        NUMERIC(5,2)  NOT NULL DEFAULT 0,
  total_billed        NUMERIC(10,2) NOT NULL DEFAULT 0,
  tips_total          NUMERIC(10,2) NOT NULL DEFAULT 0,
  hours_threshold     NUMERIC(5,2)  NOT NULL DEFAULT 40,
  revenue_threshold   NUMERIC(10,2) NOT NULL DEFAULT 6000,
  goal_met            BOOLEAN NOT NULL DEFAULT false,
  base_salary         NUMERIC(10,2) NOT NULL DEFAULT 0,
  productivity_bonus  NUMERIC(10,2) NOT NULL DEFAULT 0,
  overtime_pay        NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_pay           NUMERIC(10,2) NOT NULL DEFAULT 0,
  status              TEXT NOT NULL DEFAULT 'borrador'
                      CHECK (status IN ('borrador', 'cerrado', 'superseded')),
  version             INTEGER NOT NULL DEFAULT 1,
  ai_explanation      TEXT,
  closed_by           UUID REFERENCES profiles(id),
  closed_at           TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(driver_id, week_start, version)
);

CREATE INDEX idx_payroll_driver_week ON weekly_payroll(driver_id, week_start);

-- M3: Prevent duplicate active shifts for same driver or vehicle
CREATE UNIQUE INDEX idx_one_active_shift_per_driver ON shifts(driver_id) WHERE status = 'en_turno';
CREATE UNIQUE INDEX idx_one_active_shift_per_vehicle ON shifts(vehicle_id) WHERE status = 'en_turno';


-- ============================================================
-- STEP 2: RLS + Helper Functions
-- ============================================================

ALTER TABLE centers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE csv_uploads    ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips          ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_payroll ENABLE ROW LEVEL SECURITY;

-- Helper functions
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION get_user_center_id()
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT center_id FROM profiles WHERE id = auth.uid();
$$;

-- Centers policies
CREATE POLICY "centers: anyone can read" ON centers FOR SELECT TO authenticated USING (true);
CREATE POLICY "centers: admin full access (insert)" ON centers FOR INSERT TO authenticated WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "centers: admin full access (update)" ON centers FOR UPDATE TO authenticated USING (get_user_role() = 'admin') WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "centers: admin full access (delete)" ON centers FOR DELETE TO authenticated USING (get_user_role() = 'admin');

-- Profiles policies
CREATE POLICY "profiles: users read own" ON profiles FOR SELECT TO authenticated USING (id = auth.uid() OR get_user_role() = 'admin');
CREATE POLICY "profiles: admin insert" ON profiles FOR INSERT TO authenticated WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "profiles: admin update" ON profiles FOR UPDATE TO authenticated USING (get_user_role() = 'admin') WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "profiles: self-activate on invite" ON profiles FOR UPDATE TO authenticated
  USING (id = auth.uid() AND status = 'invitado')
  WITH CHECK (id = auth.uid() AND status = 'activo');
CREATE POLICY "profiles: admin delete" ON profiles FOR DELETE TO authenticated USING (get_user_role() = 'admin');

-- Drivers policies
CREATE POLICY "drivers: admin full access (select)" ON drivers FOR SELECT TO authenticated USING (get_user_role() = 'admin' OR center_id = get_user_center_id());
CREATE POLICY "drivers: admin insert" ON drivers FOR INSERT TO authenticated WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "drivers: admin update" ON drivers FOR UPDATE TO authenticated USING (get_user_role() = 'admin') WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "drivers: admin delete" ON drivers FOR DELETE TO authenticated USING (get_user_role() = 'admin');

-- Vehicles policies
CREATE POLICY "vehicles: read by role" ON vehicles FOR SELECT TO authenticated USING (get_user_role() = 'admin' OR center_id = get_user_center_id());
CREATE POLICY "vehicles: admin insert" ON vehicles FOR INSERT TO authenticated WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "vehicles: admin or supervisor update" ON vehicles FOR UPDATE TO authenticated USING (get_user_role() = 'admin' OR center_id = get_user_center_id()) WITH CHECK (get_user_role() = 'admin' OR center_id = get_user_center_id());
CREATE POLICY "vehicles: admin delete" ON vehicles FOR DELETE TO authenticated USING (get_user_role() = 'admin');

-- Shifts policies
CREATE POLICY "shifts: read by role" ON shifts FOR SELECT TO authenticated USING (get_user_role() = 'admin' OR EXISTS (SELECT 1 FROM drivers d WHERE d.id = shifts.driver_id AND d.center_id = get_user_center_id()));
CREATE POLICY "shifts: admin insert" ON shifts FOR INSERT TO authenticated WITH CHECK (get_user_role() = 'admin' OR EXISTS (SELECT 1 FROM drivers d WHERE d.id = driver_id AND d.center_id = get_user_center_id()));
CREATE POLICY "shifts: admin update" ON shifts FOR UPDATE TO authenticated USING (get_user_role() = 'admin' OR EXISTS (SELECT 1 FROM drivers d WHERE d.id = shifts.driver_id AND d.center_id = get_user_center_id())) WITH CHECK (get_user_role() = 'admin' OR EXISTS (SELECT 1 FROM drivers d WHERE d.id = shifts.driver_id AND d.center_id = get_user_center_id()));
CREATE POLICY "shifts: admin delete" ON shifts FOR DELETE TO authenticated USING (get_user_role() = 'admin');

-- CSV uploads policies (admin only)
CREATE POLICY "csv_uploads: admin read" ON csv_uploads FOR SELECT TO authenticated USING (get_user_role() = 'admin');
CREATE POLICY "csv_uploads: admin insert" ON csv_uploads FOR INSERT TO authenticated WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "csv_uploads: admin update" ON csv_uploads FOR UPDATE TO authenticated USING (get_user_role() = 'admin') WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "csv_uploads: admin delete" ON csv_uploads FOR DELETE TO authenticated USING (get_user_role() = 'admin');

-- Trips policies
CREATE POLICY "trips: read by role" ON trips FOR SELECT TO authenticated USING (get_user_role() = 'admin' OR EXISTS (SELECT 1 FROM drivers d WHERE d.id = trips.driver_id AND d.center_id = get_user_center_id()));
CREATE POLICY "trips: admin insert" ON trips FOR INSERT TO authenticated WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "trips: admin update" ON trips FOR UPDATE TO authenticated USING (get_user_role() = 'admin') WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "trips: admin delete" ON trips FOR DELETE TO authenticated USING (get_user_role() = 'admin');

-- Weekly payroll policies
CREATE POLICY "payroll: read by role" ON weekly_payroll FOR SELECT TO authenticated USING (get_user_role() = 'admin' OR EXISTS (SELECT 1 FROM drivers d WHERE d.id = weekly_payroll.driver_id AND d.center_id = get_user_center_id()));
CREATE POLICY "payroll: admin insert" ON weekly_payroll FOR INSERT TO authenticated WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "payroll: admin update" ON weekly_payroll FOR UPDATE TO authenticated USING (get_user_role() = 'admin') WITH CHECK (get_user_role() = 'admin');
CREATE POLICY "payroll: admin delete" ON weekly_payroll FOR DELETE TO authenticated USING (get_user_role() = 'admin');


-- ============================================================
-- STEP 3: Auth Users
-- ============================================================
-- Creates 4 auth users with deterministic UUIDs matching seed profiles.
-- Passwords: admin@lafa-mx.com = admin123, all others = super123

INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-00000000a001', 'authenticated', 'authenticated', 'admin@lafa-mx.com',  crypt('admin123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-00000000a002', 'authenticated', 'authenticated', 'maria@lafa-mx.com',  crypt('super123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-00000000a003', 'authenticated', 'authenticated', 'carlos@lafa-mx.com', crypt('super123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-00000000a004', 'authenticated', 'authenticated', 'ana@lafa-mx.com',    crypt('super123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now());

INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
  (gen_random_uuid(), '00000000-0000-0000-0000-00000000a001', '00000000-0000-0000-0000-00000000a001', jsonb_build_object('sub', '00000000-0000-0000-0000-00000000a001', 'email', 'admin@lafa-mx.com'),  'email', now(), now(), now()),
  (gen_random_uuid(), '00000000-0000-0000-0000-00000000a002', '00000000-0000-0000-0000-00000000a002', jsonb_build_object('sub', '00000000-0000-0000-0000-00000000a002', 'email', 'maria@lafa-mx.com'),  'email', now(), now(), now()),
  (gen_random_uuid(), '00000000-0000-0000-0000-00000000a003', '00000000-0000-0000-0000-00000000a003', jsonb_build_object('sub', '00000000-0000-0000-0000-00000000a003', 'email', 'carlos@lafa-mx.com'), 'email', now(), now(), now()),
  (gen_random_uuid(), '00000000-0000-0000-0000-00000000a004', '00000000-0000-0000-0000-00000000a004', jsonb_build_object('sub', '00000000-0000-0000-0000-00000000a004', 'email', 'ana@lafa-mx.com'),    'email', now(), now(), now());


-- ============================================================
-- STEP 4: Seed Data
-- ============================================================

-- 4.1 Centers
INSERT INTO centers (id, name, address, lat, lng) VALUES
  ('00000000-0000-0000-0000-00000000c001', 'Vallejo',  'Calz. Vallejo 1020, Gustavo A. Madero, CDMX',  19.4890, -99.1480),
  ('00000000-0000-0000-0000-00000000c002', 'Granada',  'Av. Ejército Nacional 453, Granada, CDMX',      19.4400, -99.1870),
  ('00000000-0000-0000-0000-00000000c003', 'Roma',     'Av. Insurgentes Sur 364, Roma Norte, CDMX',     19.4170, -99.1620);

-- 4.2 Profiles
INSERT INTO profiles (id, name, email, role, center_id, status) VALUES
  ('00000000-0000-0000-0000-00000000a001', 'Admin LAFA',        'admin@lafa-mx.com',   'admin',      NULL,                                          'activo'),
  ('00000000-0000-0000-0000-00000000a002', 'María Supervisor',  'maria@lafa-mx.com',   'supervisor', '00000000-0000-0000-0000-00000000c001',        'activo'),
  ('00000000-0000-0000-0000-00000000a003', 'Carlos Supervisor', 'carlos@lafa-mx.com',  'supervisor', '00000000-0000-0000-0000-00000000c002',        'activo'),
  ('00000000-0000-0000-0000-00000000a004', 'Ana Supervisor',    'ana@lafa-mx.com',     'supervisor', '00000000-0000-0000-0000-00000000c003',        'activo');

-- 4.3 Drivers (30 total: 10 per center)
-- Vallejo (c1)
INSERT INTO drivers (id, full_name, didi_driver_id, center_id, default_shift, start_date, status) VALUES
  ('00000000-0000-0000-0000-0000000d0001', 'Carlos Mendoza',   114958, '00000000-0000-0000-0000-00000000c001', 'diurno',   '2025-10-15', 'activo'),
  ('00000000-0000-0000-0000-0000000d0002', 'Luis Hernández',   114959, '00000000-0000-0000-0000-00000000c001', 'diurno',   '2025-10-20', 'activo'),
  ('00000000-0000-0000-0000-0000000d0003', 'Miguel Torres',    114960, '00000000-0000-0000-0000-00000000c001', 'nocturno', '2025-11-01', 'activo'),
  ('00000000-0000-0000-0000-0000000d0009', 'Andrés Morales',   114966, '00000000-0000-0000-0000-00000000c001', 'diurno',   '2026-01-05', 'activo'),
  ('00000000-0000-0000-0000-0000000d0011', 'Jorge Castillo',   114968, '00000000-0000-0000-0000-00000000c001', 'nocturno', '2025-10-25', 'inactivo'),
  ('00000000-0000-0000-0000-0000000d0013', 'Héctor Juárez',    114970, '00000000-0000-0000-0000-00000000c001', 'diurno',   '2025-11-05', 'activo'),
  ('00000000-0000-0000-0000-0000000d0014', 'Óscar Navarro',    114971, '00000000-0000-0000-0000-00000000c001', 'nocturno', '2025-11-20', 'activo'),
  ('00000000-0000-0000-0000-0000000d0015', 'Eduardo Ríos',     114972, '00000000-0000-0000-0000-00000000c001', 'diurno',   '2025-12-15', 'activo'),
  ('00000000-0000-0000-0000-0000000d0016', 'Daniel Ortiz',     114973, '00000000-0000-0000-0000-00000000c001', 'nocturno', '2026-01-15', 'activo'),
  ('00000000-0000-0000-0000-0000000d0017', 'Sergio Guzmán',    114974, '00000000-0000-0000-0000-00000000c001', 'diurno',   '2026-02-18', 'activo');

-- Granada (c2)
INSERT INTO drivers (id, full_name, didi_driver_id, center_id, default_shift, start_date, status) VALUES
  ('00000000-0000-0000-0000-0000000d0004', 'Roberto Díaz',      114961, '00000000-0000-0000-0000-00000000c002', 'diurno',   '2025-11-10', 'activo'),
  ('00000000-0000-0000-0000-0000000d0005', 'Fernando López',    114962, '00000000-0000-0000-0000-00000000c002', 'nocturno', '2025-11-15', 'activo'),
  ('00000000-0000-0000-0000-0000000d0006', 'Alejandro Ramírez', 114963, '00000000-0000-0000-0000-00000000c002', 'diurno',   '2025-12-01', 'activo'),
  ('00000000-0000-0000-0000-0000000d0012', 'Raúl Vargas',       114969, '00000000-0000-0000-0000-00000000c002', 'diurno',   '2026-01-20', 'activo'),
  ('00000000-0000-0000-0000-0000000d0018', 'Manuel Peña',       114975, '00000000-0000-0000-0000-00000000c002', 'nocturno', '2025-10-18', 'activo'),
  ('00000000-0000-0000-0000-0000000d0019', 'Arturo Delgado',    114976, '00000000-0000-0000-0000-00000000c002', 'diurno',   '2025-11-25', 'activo'),
  ('00000000-0000-0000-0000-0000000d0020', 'Iván Contreras',    114977, '00000000-0000-0000-0000-00000000c002', 'nocturno', '2025-12-08', 'activo'),
  ('00000000-0000-0000-0000-0000000d0021', 'Pablo Herrera',     114978, '00000000-0000-0000-0000-00000000c002', 'diurno',   '2026-01-12', 'activo'),
  ('00000000-0000-0000-0000-0000000d0022', 'Gustavo Salazar',   114979, '00000000-0000-0000-0000-00000000c002', 'nocturno', '2026-01-28', 'activo'),
  ('00000000-0000-0000-0000-0000000d0023', 'Enrique Medina',    114980, '00000000-0000-0000-0000-00000000c002', 'diurno',   '2026-02-12', 'activo');

-- Roma (c3)
INSERT INTO drivers (id, full_name, didi_driver_id, center_id, default_shift, start_date, status) VALUES
  ('00000000-0000-0000-0000-0000000d0007', 'Juan García',       114964, '00000000-0000-0000-0000-00000000c003', 'diurno',   '2025-12-05', 'activo'),
  ('00000000-0000-0000-0000-0000000d0008', 'Pedro Sánchez',     114965, '00000000-0000-0000-0000-00000000c003', 'nocturno', '2025-12-10', 'activo'),
  ('00000000-0000-0000-0000-0000000d0010', 'Ricardo Flores',    114967, '00000000-0000-0000-0000-00000000c003', 'diurno',   '2026-01-10', 'activo'),
  ('00000000-0000-0000-0000-0000000d0024', 'Francisco Mora',    114981, '00000000-0000-0000-0000-00000000c003', 'nocturno', '2025-10-22', 'activo'),
  ('00000000-0000-0000-0000-0000000d0025', 'Alberto Cruz',      114982, '00000000-0000-0000-0000-00000000c003', 'diurno',   '2025-11-12', 'activo'),
  ('00000000-0000-0000-0000-0000000d0026', 'Javier Reyes',      114983, '00000000-0000-0000-0000-00000000c003', 'nocturno', '2025-12-03', 'activo'),
  ('00000000-0000-0000-0000-0000000d0027', 'Diego Luna',        114984, '00000000-0000-0000-0000-00000000c003', 'diurno',   '2025-12-20', 'activo'),
  ('00000000-0000-0000-0000-0000000d0028', 'Ramón Aguilar',     114985, '00000000-0000-0000-0000-00000000c003', 'nocturno', '2026-01-08', 'activo'),
  ('00000000-0000-0000-0000-0000000d0029', 'Tomás Vega',        114986, '00000000-0000-0000-0000-00000000c003', 'diurno',   '2026-02-01', 'activo'),
  ('00000000-0000-0000-0000-0000000d0030', 'Gabriel Estrada',   114987, '00000000-0000-0000-0000-00000000c003', 'nocturno', '2026-02-12', 'activo');

-- 4.4 Vehicles (12)
INSERT INTO vehicles (id, plate, model, oem, center_id, status) VALUES
  ('00000000-0000-0000-0000-0000000b0001', 'ABC-1234', 'Geometry C', 'Geely', '00000000-0000-0000-0000-00000000c001', 'disponible'),
  ('00000000-0000-0000-0000-0000000b0002', 'DEF-5678', 'Geometry C', 'Geely', '00000000-0000-0000-0000-00000000c001', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0003', 'GHI-9012', 'E10X',       'JAC',   '00000000-0000-0000-0000-00000000c001', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0004', 'JKL-3456', 'Aion S',     'GAC',   '00000000-0000-0000-0000-00000000c002', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0005', 'MNO-7890', 'Geometry C', 'Geely', '00000000-0000-0000-0000-00000000c002', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0006', 'PQR-1235', 'E10X',       'JAC',   '00000000-0000-0000-0000-00000000c002', 'cargando'),
  ('00000000-0000-0000-0000-0000000b0007', 'STU-4567', 'Aion S',     'GAC',   '00000000-0000-0000-0000-00000000c003', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0008', 'VWX-8901', 'Geometry C', 'Geely', '00000000-0000-0000-0000-00000000c003', 'disponible'),
  ('00000000-0000-0000-0000-0000000b0009', 'YZA-2345', 'E10X',       'JAC',   '00000000-0000-0000-0000-00000000c001', 'mantenimiento'),
  ('00000000-0000-0000-0000-0000000b0010', 'BCD-6789', 'Aion S',     'GAC',   '00000000-0000-0000-0000-00000000c003', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0011', 'EFG-0123', 'Geometry C', 'Geely', '00000000-0000-0000-0000-00000000c001', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0012', 'HIJ-4560', 'E10X',       'JAC',   '00000000-0000-0000-0000-00000000c002', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0013', 'KLM-5670', 'Aion S',     'GAC',   '00000000-0000-0000-0000-00000000c001', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0014', 'NOP-8901', 'E10X',       'JAC',   '00000000-0000-0000-0000-00000000c001', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0015', 'QRS-2340', 'Geometry C', 'Geely', '00000000-0000-0000-0000-00000000c002', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0016', 'TUV-5671', 'Aion S',     'GAC',   '00000000-0000-0000-0000-00000000c002', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0017', 'WXY-8902', 'E10X',       'JAC',   '00000000-0000-0000-0000-00000000c003', 'en_turno'),
  ('00000000-0000-0000-0000-0000000b0018', 'ZAB-1230', 'Geometry C', 'Geely', '00000000-0000-0000-0000-00000000c003', 'en_turno');


-- 4.5 Demo Seed Data (replaces old trips/payroll — see db/seed-demo.sql for standalone version)

-- ============================================================
-- 3. WEEK 1 PAYROLL (Feb 2-8, 2026) — Closed, no overtime
-- ============================================================
-- 26 drivers (excludes d11 inactivo, d17 start Feb 18, d23 start Feb 12, d30 start Feb 12)
-- No overtime possible (no previous week data).
-- Establishes baseline hours for Week 2 overtime eligibility.

-- Goal met (18 drivers)
INSERT INTO weekly_payroll (driver_id, week_start, week_end, hours_worked, total_billed, tips_total, hours_threshold, revenue_threshold, goal_met, base_salary, productivity_bonus, overtime_pay, total_pay, status, version, closed_by, closed_at) VALUES
  ('00000000-0000-0000-0000-0000000d0001', '2026-02-02', '2026-02-08', 44.00, 8800.00, 0, 40, 6000, true,  2500, 500, 0, 3000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0002', '2026-02-02', '2026-02-08', 41.00, 6500.00, 0, 40, 6000, true,  2500, 100, 0, 2600.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0004', '2026-02-02', '2026-02-08', 43.00, 8200.00, 0, 40, 6000, true,  2500, 400, 0, 2900.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0005', '2026-02-02', '2026-02-08', 40.00, 6100.00, 0, 40, 6000, true,  2500,   0, 0, 2500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0006', '2026-02-02', '2026-02-08', 42.00, 7500.00, 0, 40, 6000, true,  2500, 300, 0, 2800.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0007', '2026-02-02', '2026-02-08', 45.00, 9100.00, 0, 40, 6000, true,  2500, 600, 0, 3100.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0008', '2026-02-02', '2026-02-08', 40.00, 6000.00, 0, 40, 6000, true,  2500,   0, 0, 2500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0012', '2026-02-02', '2026-02-08', 40.00, 6200.00, 0, 40, 6000, true,  2500,   0, 0, 2500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0013', '2026-02-02', '2026-02-08', 43.00, 8000.00, 0, 40, 6000, true,  2500, 400, 0, 2900.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0014', '2026-02-02', '2026-02-08', 40.00, 6300.00, 0, 40, 6000, true,  2500,   0, 0, 2500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0018', '2026-02-02', '2026-02-08', 47.00, 9800.00, 0, 40, 6000, true,  2500, 700, 0, 3200.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0019', '2026-02-02', '2026-02-08', 41.00, 6100.00, 0, 40, 6000, true,  2500,   0, 0, 2500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0021', '2026-02-02', '2026-02-08', 42.00, 6800.00, 0, 40, 6000, true,  2500, 100, 0, 2600.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0024', '2026-02-02', '2026-02-08', 41.00, 7000.00, 0, 40, 6000, true,  2500, 200, 0, 2700.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0025', '2026-02-02', '2026-02-08', 44.00, 8500.00, 0, 40, 6000, true,  2500, 500, 0, 3000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0026', '2026-02-02', '2026-02-08', 40.00, 6050.00, 0, 40, 6000, true,  2500,   0, 0, 2500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0027', '2026-02-02', '2026-02-08', 42.00, 6700.00, 0, 40, 6000, true,  2500, 100, 0, 2600.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0028', '2026-02-02', '2026-02-08', 41.00, 6200.00, 0, 40, 6000, true,  2500,   0, 0, 2500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00');

-- Goal not met (8 drivers — excludes d11, d17, d23, d30)
INSERT INTO weekly_payroll (driver_id, week_start, week_end, hours_worked, total_billed, tips_total, hours_threshold, revenue_threshold, goal_met, base_salary, productivity_bonus, overtime_pay, total_pay, status, version, closed_by, closed_at) VALUES
  ('00000000-0000-0000-0000-0000000d0003', '2026-02-02', '2026-02-08', 36.00, 6800.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0009', '2026-02-02', '2026-02-08', 41.00, 5500.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0010', '2026-02-02', '2026-02-08', 39.00, 5800.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0015', '2026-02-02', '2026-02-08', 34.00, 5200.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0016', '2026-02-02', '2026-02-08', 30.00, 3000.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0020', '2026-02-02', '2026-02-08', 38.00, 6500.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0022', '2026-02-02', '2026-02-08', 39.00, 5000.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0029', '2026-02-02', '2026-02-08', 33.00, 4500.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-08T20:00:00+00:00');


-- ============================================================
-- 4. WEEK 2 PAYROLL (Feb 9-15, 2026) — Closed, with overtime
-- ============================================================
-- 28 drivers (excludes d11 inactivo, d17 start Feb 18)
-- Overtime based on Week 1 hours (>=40h in W1 → eligible)
-- d23 and d30 prorated: start Feb 12 → 2 weekdays (Thu,Fri)
--   prorateFactor = 2/5 = 0.4 → thresholds: 16h / $2,400

-- Goal met, high earners (6 drivers) — overtime eligible
INSERT INTO weekly_payroll (driver_id, week_start, week_end, hours_worked, total_billed, tips_total, hours_threshold, revenue_threshold, goal_met, base_salary, productivity_bonus, overtime_pay, total_pay, status, version, closed_by, closed_at) VALUES
  ('00000000-0000-0000-0000-0000000d0001', '2026-02-09', '2026-02-15', 45.00, 9200.00,   0, 40, 6000, true, 2500, 600, 250, 3350.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0004', '2026-02-09', '2026-02-15', 44.00, 8500.00,   0, 40, 6000, true, 2500, 500, 200, 3200.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0007', '2026-02-09', '2026-02-15', 46.00, 9500.00,   0, 40, 6000, true, 2500, 700, 300, 3500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0013', '2026-02-09', '2026-02-15', 44.00, 8400.00,   0, 40, 6000, true, 2500, 400, 200, 3100.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0018', '2026-02-09', '2026-02-15', 48.00, 10200.00,  0, 40, 6000, true, 2500, 800, 400, 3700.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0025', '2026-02-09', '2026-02-15', 45.00, 8800.00,   0, 40, 6000, true, 2500, 500, 250, 3250.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00');

-- Goal met, medium earners (12 drivers)
INSERT INTO weekly_payroll (driver_id, week_start, week_end, hours_worked, total_billed, tips_total, hours_threshold, revenue_threshold, goal_met, base_salary, productivity_bonus, overtime_pay, total_pay, status, version, closed_by, closed_at) VALUES
  ('00000000-0000-0000-0000-0000000d0002', '2026-02-09', '2026-02-15', 42.00, 6800.00, 0, 40, 6000, true, 2500, 100, 100, 2700.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0005', '2026-02-09', '2026-02-15', 41.00, 6100.00, 0, 40, 6000, true, 2500,   0,  50, 2550.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0006', '2026-02-09', '2026-02-15', 43.00, 7800.00, 0, 40, 6000, true, 2500, 300, 150, 2950.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0008', '2026-02-09', '2026-02-15', 40.00, 6000.00, 0, 40, 6000, true, 2500,   0,   0, 2500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0012', '2026-02-09', '2026-02-15', 41.00, 6300.00, 0, 40, 6000, true, 2500,   0,  50, 2550.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0014', '2026-02-09', '2026-02-15', 41.00, 6500.00, 0, 40, 6000, true, 2500, 100,  50, 2650.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0019', '2026-02-09', '2026-02-15', 41.00, 6200.00, 0, 40, 6000, true, 2500,   0,  50, 2550.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0021', '2026-02-09', '2026-02-15', 43.00, 7100.00, 0, 40, 6000, true, 2500, 200, 150, 2850.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0024', '2026-02-09', '2026-02-15', 42.00, 7400.00, 0, 40, 6000, true, 2500, 200, 100, 2800.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0026', '2026-02-09', '2026-02-15', 40.00, 6050.00, 0, 40, 6000, true, 2500,   0,   0, 2500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0027', '2026-02-09', '2026-02-15', 43.00, 6900.00, 0, 40, 6000, true, 2500, 100, 150, 2750.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0028', '2026-02-09', '2026-02-15', 41.00, 6400.00, 0, 40, 6000, true, 2500,   0,  50, 2550.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00');

-- Goal not met (8 drivers)
INSERT INTO weekly_payroll (driver_id, week_start, week_end, hours_worked, total_billed, tips_total, hours_threshold, revenue_threshold, goal_met, base_salary, productivity_bonus, overtime_pay, total_pay, status, version, closed_by, closed_at) VALUES
  ('00000000-0000-0000-0000-0000000d0003', '2026-02-09', '2026-02-15', 38.00, 7200.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0009', '2026-02-09', '2026-02-15', 42.00, 5800.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0010', '2026-02-09', '2026-02-15', 40.00, 5999.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0015', '2026-02-09', '2026-02-15', 36.00, 5500.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0016', '2026-02-09', '2026-02-15', 32.00, 3200.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0020', '2026-02-09', '2026-02-15', 39.00, 6800.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0022', '2026-02-09', '2026-02-15', 40.00, 5200.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0029', '2026-02-09', '2026-02-15', 35.00, 4800.00, 0, 40, 6000, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00');

-- Prorated: d23 (start Feb 12, Thu-Fri = 2 days, factor=0.4, thresh: 16h/$2,400) — goal MET
INSERT INTO weekly_payroll (driver_id, week_start, week_end, hours_worked, total_billed, tips_total, hours_threshold, revenue_threshold, goal_met, base_salary, productivity_bonus, overtime_pay, total_pay, status, version, closed_by, closed_at) VALUES
  ('00000000-0000-0000-0000-0000000d0023', '2026-02-09', '2026-02-15', 18.00, 3000.00, 0, 16, 2400, true, 2500, 100, 0, 2600.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00');

-- Prorated: d30 (start Feb 12, Thu-Fri = 2 days, factor=0.4, thresh: 16h/$2,400) — goal NOT met
INSERT INTO weekly_payroll (driver_id, week_start, week_end, hours_worked, total_billed, tips_total, hours_threshold, revenue_threshold, goal_met, base_salary, productivity_bonus, overtime_pay, total_pay, status, version, closed_by, closed_at) VALUES
  ('00000000-0000-0000-0000-0000000d0030', '2026-02-09', '2026-02-15', 17.00, 2300.00, 0, 16, 2400, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000a001', '2026-02-15T20:00:00+00:00');


-- ============================================================
-- 5. SHIFTS — Week 3 (Feb 16-22, current week)
-- ============================================================
-- 29 active drivers × 3-4 completed shifts each = 115 shifts
-- All completed (Mon-Thu/Fri). No trips — those come from CSV upload.
--
-- Vehicle assignments share by shift type (diurno day / nocturno night).
-- Supervisor created_by matches center.

-- ─── VALLEJO (c1) ─────────────────────────────────────────────
-- d1 Carlos Mendoza (diurno) — 46h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1001', '00000000-0000-0000-0000-0000000d0001', '00000000-0000-0000-0000-0000000b0002', '2026-02-16T05:30:00-06:00', '2026-02-16T17:00:00-06:00', 11.50, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1002', '00000000-0000-0000-0000-0000000d0001', '00000000-0000-0000-0000-0000000b0002', '2026-02-17T05:30:00-06:00', '2026-02-17T17:30:00-06:00', 12.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1003', '00000000-0000-0000-0000-0000000d0001', '00000000-0000-0000-0000-0000000b0002', '2026-02-18T05:30:00-06:00', '2026-02-18T17:00:00-06:00', 11.50, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1004', '00000000-0000-0000-0000-0000000d0001', '00000000-0000-0000-0000-0000000b0002', '2026-02-19T05:30:00-06:00', '2026-02-19T16:30:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a002');

-- d2 Luis Hernandez (diurno) — 42h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1005', '00000000-0000-0000-0000-0000000d0002', '00000000-0000-0000-0000-0000000b0001', '2026-02-16T05:30:00-06:00', '2026-02-16T16:30:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1006', '00000000-0000-0000-0000-0000000d0002', '00000000-0000-0000-0000-0000000b0001', '2026-02-17T05:30:00-06:00', '2026-02-17T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1007', '00000000-0000-0000-0000-0000000d0002', '00000000-0000-0000-0000-0000000b0001', '2026-02-18T05:30:00-06:00', '2026-02-18T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1008', '00000000-0000-0000-0000-0000000d0002', '00000000-0000-0000-0000-0000000b0001', '2026-02-19T05:30:00-06:00', '2026-02-19T15:30:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a002');

-- d3 Miguel Torres (nocturno) — 36h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1009', '00000000-0000-0000-0000-0000000d0003', '00000000-0000-0000-0000-0000000b0003', '2026-02-16T19:00:00-06:00', '2026-02-17T04:00:00-06:00', 9.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1010', '00000000-0000-0000-0000-0000000d0003', '00000000-0000-0000-0000-0000000b0003', '2026-02-17T19:00:00-06:00', '2026-02-18T04:30:00-06:00', 9.50, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1011', '00000000-0000-0000-0000-0000000d0003', '00000000-0000-0000-0000-0000000b0003', '2026-02-18T19:00:00-06:00', '2026-02-19T04:00:00-06:00', 9.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1012', '00000000-0000-0000-0000-0000000d0003', '00000000-0000-0000-0000-0000000b0003', '2026-02-19T19:00:00-06:00', '2026-02-20T03:30:00-06:00', 8.50, 'completado', '00000000-0000-0000-0000-00000000a002');

-- d9 Andres Morales (diurno) — 36h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1013', '00000000-0000-0000-0000-0000000d0009', '00000000-0000-0000-0000-0000000b0011', '2026-02-16T06:00:00-06:00', '2026-02-16T15:00:00-06:00', 9.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1014', '00000000-0000-0000-0000-0000000d0009', '00000000-0000-0000-0000-0000000b0011', '2026-02-17T06:00:00-06:00', '2026-02-17T15:30:00-06:00', 9.50, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1015', '00000000-0000-0000-0000-0000000d0009', '00000000-0000-0000-0000-0000000b0011', '2026-02-18T06:00:00-06:00', '2026-02-18T15:00:00-06:00', 9.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1016', '00000000-0000-0000-0000-0000000d0009', '00000000-0000-0000-0000-0000000b0011', '2026-02-19T06:00:00-06:00', '2026-02-19T14:30:00-06:00', 8.50, 'completado', '00000000-0000-0000-0000-00000000a002');

-- d13 Hector Juarez (diurno) — 44h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1017', '00000000-0000-0000-0000-0000000d0013', '00000000-0000-0000-0000-0000000b0003', '2026-02-16T05:30:00-06:00', '2026-02-16T16:30:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1018', '00000000-0000-0000-0000-0000000d0013', '00000000-0000-0000-0000-0000000b0003', '2026-02-17T05:30:00-06:00', '2026-02-17T16:30:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1019', '00000000-0000-0000-0000-0000000d0013', '00000000-0000-0000-0000-0000000b0003', '2026-02-18T05:30:00-06:00', '2026-02-18T16:30:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1020', '00000000-0000-0000-0000-0000000d0013', '00000000-0000-0000-0000-0000000b0003', '2026-02-19T05:30:00-06:00', '2026-02-19T16:30:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a002');

-- d14 Oscar Navarro (nocturno) — 41h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1021', '00000000-0000-0000-0000-0000000d0014', '00000000-0000-0000-0000-0000000b0011', '2026-02-16T19:00:00-06:00', '2026-02-17T05:30:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1022', '00000000-0000-0000-0000-0000000d0014', '00000000-0000-0000-0000-0000000b0011', '2026-02-17T19:00:00-06:00', '2026-02-18T05:30:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1023', '00000000-0000-0000-0000-0000000d0014', '00000000-0000-0000-0000-0000000b0011', '2026-02-18T19:00:00-06:00', '2026-02-19T05:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1024', '00000000-0000-0000-0000-0000000d0014', '00000000-0000-0000-0000-0000000b0011', '2026-02-19T19:00:00-06:00', '2026-02-20T05:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a002');

-- d15 Eduardo Rios (diurno) — 41h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1025', '00000000-0000-0000-0000-0000000d0015', '00000000-0000-0000-0000-0000000b0013', '2026-02-16T05:30:00-06:00', '2026-02-16T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1026', '00000000-0000-0000-0000-0000000d0015', '00000000-0000-0000-0000-0000000b0013', '2026-02-17T05:30:00-06:00', '2026-02-17T16:30:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1027', '00000000-0000-0000-0000-0000000d0015', '00000000-0000-0000-0000-0000000b0013', '2026-02-18T06:00:00-06:00', '2026-02-18T16:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1028', '00000000-0000-0000-0000-0000000d0015', '00000000-0000-0000-0000-0000000b0013', '2026-02-19T05:30:00-06:00', '2026-02-19T15:00:00-06:00', 9.50, 'completado', '00000000-0000-0000-0000-00000000a002');

-- d16 Daniel Ortiz (nocturno) — 32.5h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1029', '00000000-0000-0000-0000-0000000d0016', '00000000-0000-0000-0000-0000000b0002', '2026-02-16T19:00:00-06:00', '2026-02-17T03:00:00-06:00', 8.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1030', '00000000-0000-0000-0000-0000000d0016', '00000000-0000-0000-0000-0000000b0002', '2026-02-17T19:00:00-06:00', '2026-02-18T03:00:00-06:00', 8.00, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1031', '00000000-0000-0000-0000-0000000d0016', '00000000-0000-0000-0000-0000000b0002', '2026-02-18T19:00:00-06:00', '2026-02-19T03:30:00-06:00', 8.50, 'completado', '00000000-0000-0000-0000-00000000a002'),
  ('00000000-0000-0000-0000-0000005f1032', '00000000-0000-0000-0000-0000000d0016', '00000000-0000-0000-0000-0000000b0002', '2026-02-19T19:00:00-06:00', '2026-02-20T03:00:00-06:00', 8.00, 'completado', '00000000-0000-0000-0000-00000000a002');

-- d17 Sergio Guzman (diurno, starts Feb 18) — 25.5h, 3 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1033', '00000000-0000-0000-0000-0000000d0017', '00000000-0000-0000-0000-0000000b0014', '2026-02-18T05:30:00-06:00', '2026-02-18T14:30:00-06:00', 9.00, 'completado', '00000000-0000-0000-0000-00000000a001'),
  ('00000000-0000-0000-0000-0000005f1034', '00000000-0000-0000-0000-0000000d0017', '00000000-0000-0000-0000-0000000b0014', '2026-02-19T05:30:00-06:00', '2026-02-19T14:00:00-06:00', 8.50, 'completado', '00000000-0000-0000-0000-00000000a001'),
  ('00000000-0000-0000-0000-0000005f1035', '00000000-0000-0000-0000-0000000d0017', '00000000-0000-0000-0000-0000000b0014', '2026-02-20T05:15:00-06:00', '2026-02-20T13:15:00-06:00', 8.00, 'completado', '00000000-0000-0000-0000-00000000a001');

-- ─── GRANADA (c2) ─────────────────────────────────────────────
-- d4 Roberto Diaz (diurno) — 45h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1036', '00000000-0000-0000-0000-0000000d0004', '00000000-0000-0000-0000-0000000b0004', '2026-02-16T05:30:00-06:00', '2026-02-16T17:30:00-06:00', 12.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1037', '00000000-0000-0000-0000-0000000d0004', '00000000-0000-0000-0000-0000000b0004', '2026-02-17T05:15:00-06:00', '2026-02-17T17:15:00-06:00', 12.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1038', '00000000-0000-0000-0000-0000000d0004', '00000000-0000-0000-0000-0000000b0004', '2026-02-18T05:30:00-06:00', '2026-02-18T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1039', '00000000-0000-0000-0000-0000000d0004', '00000000-0000-0000-0000-0000000b0004', '2026-02-19T05:30:00-06:00', '2026-02-19T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003');

-- d5 Fernando Lopez (nocturno) — 41h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1040', '00000000-0000-0000-0000-0000000d0005', '00000000-0000-0000-0000-0000000b0006', '2026-02-16T19:00:00-06:00', '2026-02-17T05:30:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1041', '00000000-0000-0000-0000-0000000d0005', '00000000-0000-0000-0000-0000000b0006', '2026-02-17T19:00:00-06:00', '2026-02-18T05:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1042', '00000000-0000-0000-0000-0000000d0005', '00000000-0000-0000-0000-0000000b0006', '2026-02-18T19:00:00-06:00', '2026-02-19T05:30:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1043', '00000000-0000-0000-0000-0000000d0005', '00000000-0000-0000-0000-0000000b0006', '2026-02-19T19:00:00-06:00', '2026-02-20T05:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a003');

-- d6 Alejandro Ramirez (diurno) — 43h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1044', '00000000-0000-0000-0000-0000000d0006', '00000000-0000-0000-0000-0000000b0006', '2026-02-16T05:30:00-06:00', '2026-02-16T17:00:00-06:00', 11.50, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1045', '00000000-0000-0000-0000-0000000d0006', '00000000-0000-0000-0000-0000000b0006', '2026-02-17T05:15:00-06:00', '2026-02-17T16:15:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1046', '00000000-0000-0000-0000-0000000d0006', '00000000-0000-0000-0000-0000000b0006', '2026-02-18T05:30:00-06:00', '2026-02-18T15:30:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1047', '00000000-0000-0000-0000-0000000d0006', '00000000-0000-0000-0000-0000000b0006', '2026-02-19T05:30:00-06:00', '2026-02-19T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003');

-- d12 Raul Vargas (diurno) — 42h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1048', '00000000-0000-0000-0000-0000000d0012', '00000000-0000-0000-0000-0000000b0005', '2026-02-16T05:30:00-06:00', '2026-02-16T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1049', '00000000-0000-0000-0000-0000000d0012', '00000000-0000-0000-0000-0000000b0005', '2026-02-17T05:15:00-06:00', '2026-02-17T16:15:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1050', '00000000-0000-0000-0000-0000000d0012', '00000000-0000-0000-0000-0000000b0005', '2026-02-18T05:45:00-06:00', '2026-02-18T15:45:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1051', '00000000-0000-0000-0000-0000000d0012', '00000000-0000-0000-0000-0000000b0005', '2026-02-19T05:30:00-06:00', '2026-02-19T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003');

-- d18 Manuel Pena (nocturno) — 48h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1052', '00000000-0000-0000-0000-0000000d0018', '00000000-0000-0000-0000-0000000b0004', '2026-02-16T19:00:00-06:00', '2026-02-17T07:00:00-06:00', 12.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1053', '00000000-0000-0000-0000-0000000d0018', '00000000-0000-0000-0000-0000000b0004', '2026-02-17T19:00:00-06:00', '2026-02-18T07:00:00-06:00', 12.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1054', '00000000-0000-0000-0000-0000000d0018', '00000000-0000-0000-0000-0000000b0004', '2026-02-18T19:00:00-06:00', '2026-02-19T07:00:00-06:00', 12.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1055', '00000000-0000-0000-0000-0000000d0018', '00000000-0000-0000-0000-0000000b0004', '2026-02-19T19:00:00-06:00', '2026-02-20T07:00:00-06:00', 12.00, 'completado', '00000000-0000-0000-0000-00000000a003');

-- d19 Arturo Delgado (diurno) — 41h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1056', '00000000-0000-0000-0000-0000000d0019', '00000000-0000-0000-0000-0000000b0015', '2026-02-16T05:30:00-06:00', '2026-02-16T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1057', '00000000-0000-0000-0000-0000000d0019', '00000000-0000-0000-0000-0000000b0015', '2026-02-17T06:00:00-06:00', '2026-02-17T16:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1058', '00000000-0000-0000-0000-0000000d0019', '00000000-0000-0000-0000-0000000b0015', '2026-02-18T05:30:00-06:00', '2026-02-18T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1059', '00000000-0000-0000-0000-0000000d0019', '00000000-0000-0000-0000-0000000b0015', '2026-02-19T06:00:00-06:00', '2026-02-19T16:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a003');

-- d20 Ivan Contreras (nocturno) — 39h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1060', '00000000-0000-0000-0000-0000000d0020', '00000000-0000-0000-0000-0000000b0012', '2026-02-16T19:00:00-06:00', '2026-02-17T05:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1061', '00000000-0000-0000-0000-0000000d0020', '00000000-0000-0000-0000-0000000b0012', '2026-02-17T19:00:00-06:00', '2026-02-18T04:30:00-06:00', 9.50, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1062', '00000000-0000-0000-0000-0000000d0020', '00000000-0000-0000-0000-0000000b0012', '2026-02-18T19:00:00-06:00', '2026-02-19T05:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1063', '00000000-0000-0000-0000-0000000d0020', '00000000-0000-0000-0000-0000000b0012', '2026-02-19T19:00:00-06:00', '2026-02-20T04:30:00-06:00', 9.50, 'completado', '00000000-0000-0000-0000-00000000a003');

-- d21 Pablo Herrera (diurno) — 42h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1064', '00000000-0000-0000-0000-0000000d0021', '00000000-0000-0000-0000-0000000b0012', '2026-02-16T05:30:00-06:00', '2026-02-16T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1065', '00000000-0000-0000-0000-0000000d0021', '00000000-0000-0000-0000-0000000b0012', '2026-02-17T05:30:00-06:00', '2026-02-17T16:30:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1066', '00000000-0000-0000-0000-0000000d0021', '00000000-0000-0000-0000-0000000b0012', '2026-02-18T06:00:00-06:00', '2026-02-18T16:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1067', '00000000-0000-0000-0000-0000000d0021', '00000000-0000-0000-0000-0000000b0012', '2026-02-19T05:30:00-06:00', '2026-02-19T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003');

-- d22 Gustavo Salazar (nocturno) — 32.5h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1068', '00000000-0000-0000-0000-0000000d0022', '00000000-0000-0000-0000-0000000b0005', '2026-02-16T19:00:00-06:00', '2026-02-17T03:00:00-06:00', 8.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1069', '00000000-0000-0000-0000-0000000d0022', '00000000-0000-0000-0000-0000000b0005', '2026-02-17T19:00:00-06:00', '2026-02-18T03:30:00-06:00', 8.50, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1070', '00000000-0000-0000-0000-0000000d0022', '00000000-0000-0000-0000-0000000b0005', '2026-02-18T19:00:00-06:00', '2026-02-19T03:00:00-06:00', 8.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1071', '00000000-0000-0000-0000-0000000d0022', '00000000-0000-0000-0000-0000000b0005', '2026-02-19T19:00:00-06:00', '2026-02-20T03:00:00-06:00', 8.00, 'completado', '00000000-0000-0000-0000-00000000a003');

-- d23 Enrique Medina (diurno, started Feb 12) — 41h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1072', '00000000-0000-0000-0000-0000000d0023', '00000000-0000-0000-0000-0000000b0016', '2026-02-16T05:30:00-06:00', '2026-02-16T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1073', '00000000-0000-0000-0000-0000000d0023', '00000000-0000-0000-0000-0000000b0016', '2026-02-17T05:30:00-06:00', '2026-02-17T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1074', '00000000-0000-0000-0000-0000000d0023', '00000000-0000-0000-0000-0000000b0016', '2026-02-18T06:00:00-06:00', '2026-02-18T16:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a003'),
  ('00000000-0000-0000-0000-0000005f1075', '00000000-0000-0000-0000-0000000d0023', '00000000-0000-0000-0000-0000000b0016', '2026-02-19T05:30:00-06:00', '2026-02-19T15:30:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a003');

-- ─── ROMA (c3) ────────────────────────────────────────────────
-- d7 Juan Garcia (diurno) — 45h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1076', '00000000-0000-0000-0000-0000000d0007', '00000000-0000-0000-0000-0000000b0007', '2026-02-16T05:30:00-06:00', '2026-02-16T16:30:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1077', '00000000-0000-0000-0000-0000000d0007', '00000000-0000-0000-0000-0000000b0007', '2026-02-17T05:30:00-06:00', '2026-02-17T17:00:00-06:00', 11.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1078', '00000000-0000-0000-0000-0000000d0007', '00000000-0000-0000-0000-0000000b0007', '2026-02-18T05:30:00-06:00', '2026-02-18T16:30:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1079', '00000000-0000-0000-0000-0000000d0007', '00000000-0000-0000-0000-0000000b0007', '2026-02-19T05:30:00-06:00', '2026-02-19T17:00:00-06:00', 11.50, 'completado', '00000000-0000-0000-0000-00000000a004');

-- d8 Pedro Sanchez (nocturno) — 41h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1080', '00000000-0000-0000-0000-0000000d0008', '00000000-0000-0000-0000-0000000b0007', '2026-02-16T19:00:00-06:00', '2026-02-17T05:30:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1081', '00000000-0000-0000-0000-0000000d0008', '00000000-0000-0000-0000-0000000b0007', '2026-02-17T19:00:00-06:00', '2026-02-18T05:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1082', '00000000-0000-0000-0000-0000000d0008', '00000000-0000-0000-0000-0000000b0007', '2026-02-18T19:00:00-06:00', '2026-02-19T05:30:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1083', '00000000-0000-0000-0000-0000000d0008', '00000000-0000-0000-0000-0000000b0007', '2026-02-19T19:00:00-06:00', '2026-02-20T05:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a004');

-- d10 Ricardo Flores (diurno) — 40h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1084', '00000000-0000-0000-0000-0000000d0010', '00000000-0000-0000-0000-0000000b0008', '2026-02-16T06:00:00-06:00', '2026-02-16T16:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1085', '00000000-0000-0000-0000-0000000d0010', '00000000-0000-0000-0000-0000000b0008', '2026-02-17T06:00:00-06:00', '2026-02-17T16:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1086', '00000000-0000-0000-0000-0000000d0010', '00000000-0000-0000-0000-0000000b0008', '2026-02-18T06:00:00-06:00', '2026-02-18T16:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1087', '00000000-0000-0000-0000-0000000d0010', '00000000-0000-0000-0000-0000000b0008', '2026-02-19T06:00:00-06:00', '2026-02-19T16:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a004');

-- d24 Francisco Mora (nocturno) — 43h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1088', '00000000-0000-0000-0000-0000000d0024', '00000000-0000-0000-0000-0000000b0010', '2026-02-16T19:00:00-06:00', '2026-02-17T06:00:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1089', '00000000-0000-0000-0000-0000000d0024', '00000000-0000-0000-0000-0000000b0010', '2026-02-17T19:00:00-06:00', '2026-02-18T05:30:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1090', '00000000-0000-0000-0000-0000000d0024', '00000000-0000-0000-0000-0000000b0010', '2026-02-18T19:00:00-06:00', '2026-02-19T06:00:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1091', '00000000-0000-0000-0000-0000000d0024', '00000000-0000-0000-0000-0000000b0010', '2026-02-19T19:00:00-06:00', '2026-02-20T05:30:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a004');

-- d25 Alberto Cruz (diurno) — 45h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1092', '00000000-0000-0000-0000-0000000d0025', '00000000-0000-0000-0000-0000000b0010', '2026-02-16T05:30:00-06:00', '2026-02-16T17:00:00-06:00', 11.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1093', '00000000-0000-0000-0000-0000000d0025', '00000000-0000-0000-0000-0000000b0010', '2026-02-17T05:30:00-06:00', '2026-02-17T17:30:00-06:00', 12.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1094', '00000000-0000-0000-0000-0000000d0025', '00000000-0000-0000-0000-0000000b0010', '2026-02-18T05:30:00-06:00', '2026-02-18T16:30:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1095', '00000000-0000-0000-0000-0000000d0025', '00000000-0000-0000-0000-0000000b0010', '2026-02-19T05:30:00-06:00', '2026-02-19T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a004');

-- d26 Javier Reyes (nocturno) — 41h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1096', '00000000-0000-0000-0000-0000000d0026', '00000000-0000-0000-0000-0000000b0008', '2026-02-16T19:00:00-06:00', '2026-02-17T05:30:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1097', '00000000-0000-0000-0000-0000000d0026', '00000000-0000-0000-0000-0000000b0008', '2026-02-17T19:00:00-06:00', '2026-02-18T05:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1098', '00000000-0000-0000-0000-0000000d0026', '00000000-0000-0000-0000-0000000b0008', '2026-02-18T19:00:00-06:00', '2026-02-19T05:30:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1099', '00000000-0000-0000-0000-0000000d0026', '00000000-0000-0000-0000-0000000b0008', '2026-02-19T19:00:00-06:00', '2026-02-20T05:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a004');

-- d27 Diego Luna (diurno) — 42h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1100', '00000000-0000-0000-0000-0000000d0027', '00000000-0000-0000-0000-0000000b0017', '2026-02-16T05:30:00-06:00', '2026-02-16T16:30:00-06:00', 11.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1101', '00000000-0000-0000-0000-0000000d0027', '00000000-0000-0000-0000-0000000b0017', '2026-02-17T05:30:00-06:00', '2026-02-17T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1102', '00000000-0000-0000-0000-0000000d0027', '00000000-0000-0000-0000-0000000b0017', '2026-02-18T06:00:00-06:00', '2026-02-18T16:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1103', '00000000-0000-0000-0000-0000000d0027', '00000000-0000-0000-0000-0000000b0017', '2026-02-19T05:30:00-06:00', '2026-02-19T16:00:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a004');

-- d28 Ramon Aguilar (nocturno) — 41h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1104', '00000000-0000-0000-0000-0000000d0028', '00000000-0000-0000-0000-0000000b0017', '2026-02-16T19:00:00-06:00', '2026-02-17T05:30:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1105', '00000000-0000-0000-0000-0000000d0028', '00000000-0000-0000-0000-0000000b0017', '2026-02-17T19:00:00-06:00', '2026-02-18T05:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1106', '00000000-0000-0000-0000-0000000d0028', '00000000-0000-0000-0000-0000000b0017', '2026-02-18T19:00:00-06:00', '2026-02-19T05:30:00-06:00', 10.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1107', '00000000-0000-0000-0000-0000000d0028', '00000000-0000-0000-0000-0000000b0017', '2026-02-19T19:00:00-06:00', '2026-02-20T05:00:00-06:00', 10.00, 'completado', '00000000-0000-0000-0000-00000000a004');

-- d29 Tomas Vega (diurno) — 37h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1108', '00000000-0000-0000-0000-0000000d0029', '00000000-0000-0000-0000-0000000b0018', '2026-02-16T06:00:00-06:00', '2026-02-16T15:30:00-06:00', 9.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1109', '00000000-0000-0000-0000-0000000d0029', '00000000-0000-0000-0000-0000000b0018', '2026-02-17T06:00:00-06:00', '2026-02-17T15:00:00-06:00', 9.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1110', '00000000-0000-0000-0000-0000000d0029', '00000000-0000-0000-0000-0000000b0018', '2026-02-18T06:00:00-06:00', '2026-02-18T15:30:00-06:00', 9.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1111', '00000000-0000-0000-0000-0000000d0029', '00000000-0000-0000-0000-0000000b0018', '2026-02-19T06:00:00-06:00', '2026-02-19T15:00:00-06:00', 9.00, 'completado', '00000000-0000-0000-0000-00000000a004');

-- d30 Gabriel Estrada (nocturno, started Feb 12) — 36.5h, 4 shifts
INSERT INTO shifts (id, driver_id, vehicle_id, check_in, check_out, hours_worked, status, created_by) VALUES
  ('00000000-0000-0000-0000-0000005f1112', '00000000-0000-0000-0000-0000000d0030', '00000000-0000-0000-0000-0000000b0018', '2026-02-16T19:00:00-06:00', '2026-02-17T04:00:00-06:00', 9.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1113', '00000000-0000-0000-0000-0000000d0030', '00000000-0000-0000-0000-0000000b0018', '2026-02-17T19:00:00-06:00', '2026-02-18T04:30:00-06:00', 9.50, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1114', '00000000-0000-0000-0000-0000000d0030', '00000000-0000-0000-0000-0000000b0018', '2026-02-18T19:00:00-06:00', '2026-02-19T04:00:00-06:00', 9.00, 'completado', '00000000-0000-0000-0000-00000000a004'),
  ('00000000-0000-0000-0000-0000005f1115', '00000000-0000-0000-0000-0000000d0030', '00000000-0000-0000-0000-0000000b0018', '2026-02-19T19:00:00-06:00', '2026-02-20T04:00:00-06:00', 9.00, 'completado', '00000000-0000-0000-0000-00000000a004');


-- ============================================================
-- VERIFICATION
-- ============================================================
-- Run these queries to confirm:
--
-- SELECT 'weekly_payroll' AS t, count(*) FROM weekly_payroll
-- UNION ALL SELECT 'shifts', count(*) FROM shifts
-- UNION ALL SELECT 'trips', count(*) FROM trips;
--
-- Expected: weekly_payroll=54 (26 W1 + 28 W2, includes 2 prorated),
--           shifts=115, trips=0
--
-- SELECT week_start, count(*) FROM weekly_payroll GROUP BY week_start ORDER BY week_start;
-- Expected: Feb 2 = 26, Feb 9 = 28
--
-- SELECT driver_id, sum(hours_worked) FROM shifts GROUP BY driver_id ORDER BY sum DESC;
-- Expected: d18=48h (top), d1=46h, d4/d7/d25=45h, d13=44h, ...
-- ============================================================
