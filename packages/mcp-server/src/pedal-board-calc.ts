export type PedalBoardType = "flat_aluminum_basic" | "tilted_tiered_rack" | "soft_case_integrated" | "powered_built_in_supply" | "mini_nano_compact";

export function pedalCapacity(t: PedalBoardType): number {
  const m: Record<PedalBoardType, number> = {
    flat_aluminum_basic: 7, tilted_tiered_rack: 10, soft_case_integrated: 6, powered_built_in_supply: 8, mini_nano_compact: 3,
  };
  return m[t];
}

export function portability(t: PedalBoardType): number {
  const m: Record<PedalBoardType, number> = {
    flat_aluminum_basic: 6, tilted_tiered_rack: 3, soft_case_integrated: 8, powered_built_in_supply: 5, mini_nano_compact: 10,
  };
  return m[t];
}

export function cableManage(t: PedalBoardType): number {
  const m: Record<PedalBoardType, number> = {
    flat_aluminum_basic: 5, tilted_tiered_rack: 9, soft_case_integrated: 7, powered_built_in_supply: 10, mini_nano_compact: 3,
  };
  return m[t];
}

export function buildQuality(t: PedalBoardType): number {
  const m: Record<PedalBoardType, number> = {
    flat_aluminum_basic: 7, tilted_tiered_rack: 9, soft_case_integrated: 5, powered_built_in_supply: 8, mini_nano_compact: 6,
  };
  return m[t];
}

export function boardCost(t: PedalBoardType): number {
  const m: Record<PedalBoardType, number> = {
    flat_aluminum_basic: 3, tilted_tiered_rack: 7, soft_case_integrated: 5, powered_built_in_supply: 9, mini_nano_compact: 2,
  };
  return m[t];
}

export function hasPowerSupply(t: PedalBoardType): boolean {
  const m: Record<PedalBoardType, boolean> = {
    flat_aluminum_basic: false, tilted_tiered_rack: false, soft_case_integrated: false, powered_built_in_supply: true, mini_nano_compact: false,
  };
  return m[t];
}

export function includesCase(t: PedalBoardType): boolean {
  const m: Record<PedalBoardType, boolean> = {
    flat_aluminum_basic: false, tilted_tiered_rack: false, soft_case_integrated: true, powered_built_in_supply: false, mini_nano_compact: false,
  };
  return m[t];
}

export function frameMaterial(t: PedalBoardType): string {
  const m: Record<PedalBoardType, string> = {
    flat_aluminum_basic: "anodized_aluminum_rail",
    tilted_tiered_rack: "steel_tube_welded_tier",
    soft_case_integrated: "plywood_velcro_case",
    powered_built_in_supply: "aluminum_iso_power_mount",
    mini_nano_compact: "lightweight_alloy_strip",
  };
  return m[t];
}

export function bestPlayer(t: PedalBoardType): string {
  const m: Record<PedalBoardType, string> = {
    flat_aluminum_basic: "home_practice_setup",
    tilted_tiered_rack: "touring_pro_large_rig",
    soft_case_integrated: "gigging_musician_mobile",
    powered_built_in_supply: "studio_session_clean",
    mini_nano_compact: "acoustic_minimal_effects",
  };
  return m[t];
}

export function pedalBoards(): PedalBoardType[] {
  return ["flat_aluminum_basic", "tilted_tiered_rack", "soft_case_integrated", "powered_built_in_supply", "mini_nano_compact"];
}
