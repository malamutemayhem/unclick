export type AvalancheBeaconType = "single_antenna" | "dual_antenna" | "triple_antenna" | "recco_passive" | "digital_advanced";

export function searchRange(t: AvalancheBeaconType): number {
  const m: Record<AvalancheBeaconType, number> = {
    single_antenna: 4, dual_antenna: 7, triple_antenna: 10, recco_passive: 3, digital_advanced: 9,
  };
  return m[t];
}

export function pinpointSpeed(t: AvalancheBeaconType): number {
  const m: Record<AvalancheBeaconType, number> = {
    single_antenna: 3, dual_antenna: 6, triple_antenna: 10, recco_passive: 2, digital_advanced: 9,
  };
  return m[t];
}

export function multipleVictim(t: AvalancheBeaconType): number {
  const m: Record<AvalancheBeaconType, number> = {
    single_antenna: 1, dual_antenna: 5, triple_antenna: 10, recco_passive: 1, digital_advanced: 9,
  };
  return m[t];
}

export function batteryLife(t: AvalancheBeaconType): number {
  const m: Record<AvalancheBeaconType, number> = {
    single_antenna: 8, dual_antenna: 6, triple_antenna: 5, recco_passive: 10, digital_advanced: 4,
  };
  return m[t];
}

export function beaconCost(t: AvalancheBeaconType): number {
  const m: Record<AvalancheBeaconType, number> = {
    single_antenna: 2, dual_antenna: 5, triple_antenna: 8, recco_passive: 1, digital_advanced: 10,
  };
  return m[t];
}

export function autoRevert(t: AvalancheBeaconType): boolean {
  const m: Record<AvalancheBeaconType, boolean> = {
    single_antenna: false, dual_antenna: false, triple_antenna: true, recco_passive: false, digital_advanced: true,
  };
  return m[t];
}

export function needsBattery(t: AvalancheBeaconType): boolean {
  const m: Record<AvalancheBeaconType, boolean> = {
    single_antenna: true, dual_antenna: true, triple_antenna: true, recco_passive: false, digital_advanced: true,
  };
  return m[t];
}

export function signalType(t: AvalancheBeaconType): string {
  const m: Record<AvalancheBeaconType, string> = {
    single_antenna: "analog_457khz_single",
    dual_antenna: "digital_457khz_dual",
    triple_antenna: "digital_457khz_triple",
    recco_passive: "harmonic_radar_reflector",
    digital_advanced: "digital_bluetooth_gps",
  };
  return m[t];
}

export function bestUser(t: AvalancheBeaconType): string {
  const m: Record<AvalancheBeaconType, string> = {
    single_antenna: "budget_resort_skier",
    dual_antenna: "intermediate_sidecountry",
    triple_antenna: "backcountry_guide_pro",
    recco_passive: "passive_resort_backup",
    digital_advanced: "expedition_team_leader",
  };
  return m[t];
}

export function avalancheBeacons(): AvalancheBeaconType[] {
  return ["single_antenna", "dual_antenna", "triple_antenna", "recco_passive", "digital_advanced"];
}
