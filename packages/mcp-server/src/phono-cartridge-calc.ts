export type PhonoCartridgeType = "moving_magnet" | "moving_coil_low" | "moving_coil_high" | "ceramic_crystal" | "moving_iron";

export function trackingAbility(t: PhonoCartridgeType): number {
  const m: Record<PhonoCartridgeType, number> = {
    moving_magnet: 7, moving_coil_low: 10, moving_coil_high: 9, ceramic_crystal: 3, moving_iron: 8,
  };
  return m[t];
}

export function outputLevel(t: PhonoCartridgeType): number {
  const m: Record<PhonoCartridgeType, number> = {
    moving_magnet: 8, moving_coil_low: 2, moving_coil_high: 7, ceramic_crystal: 10, moving_iron: 7,
  };
  return m[t];
}

export function detailResolution(t: PhonoCartridgeType): number {
  const m: Record<PhonoCartridgeType, number> = {
    moving_magnet: 6, moving_coil_low: 10, moving_coil_high: 9, ceramic_crystal: 3, moving_iron: 7,
  };
  return m[t];
}

export function complianceFlex(t: PhonoCartridgeType): number {
  const m: Record<PhonoCartridgeType, number> = {
    moving_magnet: 8, moving_coil_low: 4, moving_coil_high: 5, ceramic_crystal: 9, moving_iron: 7,
  };
  return m[t];
}

export function cartridgeCost(t: PhonoCartridgeType): number {
  const m: Record<PhonoCartridgeType, number> = {
    moving_magnet: 3, moving_coil_low: 10, moving_coil_high: 8, ceramic_crystal: 1, moving_iron: 5,
  };
  return m[t];
}

export function userReplaceable(t: PhonoCartridgeType): boolean {
  const m: Record<PhonoCartridgeType, boolean> = {
    moving_magnet: true, moving_coil_low: false, moving_coil_high: false, ceramic_crystal: true, moving_iron: true,
  };
  return m[t];
}

export function needsPreamp(t: PhonoCartridgeType): boolean {
  const m: Record<PhonoCartridgeType, boolean> = {
    moving_magnet: true, moving_coil_low: true, moving_coil_high: true, ceramic_crystal: false, moving_iron: true,
  };
  return m[t];
}

export function stylusType(t: PhonoCartridgeType): string {
  const m: Record<PhonoCartridgeType, string> = {
    moving_magnet: "elliptical_bonded_tip",
    moving_coil_low: "micro_ridge_nude_diamond",
    moving_coil_high: "shibata_line_contact",
    ceramic_crystal: "conical_sapphire_point",
    moving_iron: "hyper_elliptical_nude",
  };
  return m[t];
}

export function bestSetup(t: PhonoCartridgeType): string {
  const m: Record<PhonoCartridgeType, string> = {
    moving_magnet: "entry_hifi_upgrade",
    moving_coil_low: "audiophile_reference",
    moving_coil_high: "high_end_no_step_up",
    ceramic_crystal: "vintage_portable_player",
    moving_iron: "balanced_mid_range",
  };
  return m[t];
}

export function phonoCartridges(): PhonoCartridgeType[] {
  return ["moving_magnet", "moving_coil_low", "moving_coil_high", "ceramic_crystal", "moving_iron"];
}
