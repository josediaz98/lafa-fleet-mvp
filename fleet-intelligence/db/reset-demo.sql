-- ============================================================
-- LAFA Fleet Intelligence — RESET TO SEED STATE
-- ============================================================
--
-- Run this in Supabase SQL Editor to wipe E2E test data
-- and restore a clean slate for re-seeding.
--
-- After running this, re-run seed-demo.sql to re-populate.
--
-- Or: just re-run seed-demo.sql directly (it handles
-- cleanup internally via its own DELETE block).
--
-- ============================================================

-- 1. Delete operational data (respects FK order)
DELETE FROM weekly_payroll;
DELETE FROM trips;
DELETE FROM csv_uploads;
DELETE FROM shifts;

-- 2. Reset vehicle statuses
UPDATE vehicles SET status = 'disponible';

-- 3. Verify clean state (all should be 0)
SELECT 'weekly_payroll' AS tbl, count(*) AS rows FROM weekly_payroll
UNION ALL SELECT 'trips', count(*) FROM trips
UNION ALL SELECT 'csv_uploads', count(*) FROM csv_uploads
UNION ALL SELECT 'shifts', count(*) FROM shifts;
