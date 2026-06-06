-- XGate per-gate mode overrides.
--
-- The original XGate dial stores one master mode in mc_xgate_settings.mode
-- (off / shadow / block). This additive column stores individual gate posture
-- using the user-facing names (off / watch / block), keyed by gate name.

ALTER TABLE mc_xgate_settings
  ADD COLUMN IF NOT EXISTS gate_modes jsonb NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN mc_xgate_settings.gate_modes IS
  'Per-gate XGate modes keyed by gate name: off, watch, or block.';

NOTIFY pgrst, 'reload schema';
