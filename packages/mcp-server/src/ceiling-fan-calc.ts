export type CeilingFanType = "standard_three_blade" | "hugger_low_profile" | "dual_motor_gyro" | "industrial_large" | "bladeless_tower";

export function airflow(t: CeilingFanType): number {
  const m: Record<CeilingFanType, number> = {
    standard_three_blade: 7, hugger_low_profile: 5, dual_motor_gyro: 9, industrial_large: 10, bladeless_tower: 4,
  };
  return m[t];
}

export function energyEfficiency(t: CeilingFanType): number {
  const m: Record<CeilingFanType, number> = {
    standard_three_blade: 7, hugger_low_profile: 6, dual_motor_gyro: 5, industrial_large: 4, bladeless_tower: 9,
  };
  return m[t];
}

export function noiseLevel(t: CeilingFanType): number {
  const m: Record<CeilingFanType, number> = {
    standard_three_blade: 5, hugger_low_profile: 6, dual_motor_gyro: 7, industrial_large: 9, bladeless_tower: 2,
  };
  return m[t];
}

export function styleAppeal(t: CeilingFanType): number {
  const m: Record<CeilingFanType, number> = {
    standard_three_blade: 6, hugger_low_profile: 5, dual_motor_gyro: 9, industrial_large: 4, bladeless_tower: 10,
  };
  return m[t];
}

export function fanCost(t: CeilingFanType): number {
  const m: Record<CeilingFanType, number> = {
    standard_three_blade: 4, hugger_low_profile: 3, dual_motor_gyro: 9, industrial_large: 7, bladeless_tower: 8,
  };
  return m[t];
}

export function hasLight(t: CeilingFanType): boolean {
  const m: Record<CeilingFanType, boolean> = {
    standard_three_blade: true, hugger_low_profile: true, dual_motor_gyro: true, industrial_large: false, bladeless_tower: false,
  };
  return m[t];
}

export function remoteIncluded(t: CeilingFanType): boolean {
  const m: Record<CeilingFanType, boolean> = {
    standard_three_blade: false, hugger_low_profile: false, dual_motor_gyro: true, industrial_large: true, bladeless_tower: true,
  };
  return m[t];
}

export function motorType(t: CeilingFanType): string {
  const m: Record<CeilingFanType, string> = {
    standard_three_blade: "ac_reversible_single",
    hugger_low_profile: "ac_compact_flush",
    dual_motor_gyro: "dc_dual_independent",
    industrial_large: "ac_high_torque_direct",
    bladeless_tower: "dc_brushless_impeller",
  };
  return m[t];
}

export function bestRoom(t: CeilingFanType): string {
  const m: Record<CeilingFanType, string> = {
    standard_three_blade: "bedroom_living_general",
    hugger_low_profile: "low_ceiling_apartment",
    dual_motor_gyro: "large_open_loft",
    industrial_large: "warehouse_gym_barn",
    bladeless_tower: "modern_nursery_quiet",
  };
  return m[t];
}

export function ceilingFans(): CeilingFanType[] {
  return ["standard_three_blade", "hugger_low_profile", "dual_motor_gyro", "industrial_large", "bladeless_tower"];
}
