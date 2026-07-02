-- BackstagePass vault toggle for tenant_settings.
--
-- On (default true): credential resolution uses the encrypted BackstagePass
--   vault as a source of truth (centralized storage, rotation, audit trail).
-- Off: tools still resolve credentials from inline args, env vars, and the
--   local vault, so they remain functional, but they lose the managed vault's
--   benefits (no central rotation, no audit, no cross-device portability).
--
-- Default is ON so the plumbing is exercised by default; flipping it off is a
-- clean, reversible switch that the rest of the stack already understands.
--
-- Depends on 20260417000000_tenant_settings.sql (creates the base table).

ALTER TABLE tenant_settings
  ADD COLUMN IF NOT EXISTS backstagepass_vault_enabled boolean NOT NULL DEFAULT true;
