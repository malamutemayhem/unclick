export type LeatherRivetType = "single_cap_rapid" | "double_cap_decorative" | "tubular_hollow_light" | "copper_burr_permanent" | "chicago_screw_remove";

export function holdStrength(t: LeatherRivetType): number {
  const m: Record<LeatherRivetType, number> = {
    single_cap_rapid: 7, double_cap_decorative: 8, tubular_hollow_light: 5, copper_burr_permanent: 10, chicago_screw_remove: 6,
  };
  return m[t];
}

export function setEase(t: LeatherRivetType): number {
  const m: Record<LeatherRivetType, number> = {
    single_cap_rapid: 9, double_cap_decorative: 7, tubular_hollow_light: 8, copper_burr_permanent: 4, chicago_screw_remove: 10,
  };
  return m[t];
}

export function appearance(t: LeatherRivetType): number {
  const m: Record<LeatherRivetType, number> = {
    single_cap_rapid: 6, double_cap_decorative: 10, tubular_hollow_light: 5, copper_burr_permanent: 8, chicago_screw_remove: 9,
  };
  return m[t];
}

export function versatility(t: LeatherRivetType): number {
  const m: Record<LeatherRivetType, number> = {
    single_cap_rapid: 8, double_cap_decorative: 7, tubular_hollow_light: 6, copper_burr_permanent: 5, chicago_screw_remove: 9,
  };
  return m[t];
}

export function rivetCost(t: LeatherRivetType): number {
  const m: Record<LeatherRivetType, number> = {
    single_cap_rapid: 1, double_cap_decorative: 2, tubular_hollow_light: 1, copper_burr_permanent: 2, chicago_screw_remove: 3,
  };
  return m[t];
}

export function removable(t: LeatherRivetType): boolean {
  const m: Record<LeatherRivetType, boolean> = {
    single_cap_rapid: false, double_cap_decorative: false, tubular_hollow_light: false, copper_burr_permanent: false, chicago_screw_remove: true,
  };
  return m[t];
}

export function bothSidesFinish(t: LeatherRivetType): boolean {
  const m: Record<LeatherRivetType, boolean> = {
    single_cap_rapid: false, double_cap_decorative: true, tubular_hollow_light: false, copper_burr_permanent: false, chicago_screw_remove: true,
  };
  return m[t];
}

export function setMethod(t: LeatherRivetType): string {
  const m: Record<LeatherRivetType, string> = {
    single_cap_rapid: "anvil_setter_hammer",
    double_cap_decorative: "snap_setter_press",
    tubular_hollow_light: "flare_tube_hammer",
    copper_burr_permanent: "burr_setter_peen",
    chicago_screw_remove: "screw_hand_tighten",
  };
  return m[t];
}

export function bestProject(t: LeatherRivetType): string {
  const m: Record<LeatherRivetType, string> = {
    single_cap_rapid: "belt_strap_quick",
    double_cap_decorative: "bag_flap_accent",
    tubular_hollow_light: "thin_wallet_fold",
    copper_burr_permanent: "saddle_harness_heavy",
    chicago_screw_remove: "portfolio_swap_page",
  };
  return m[t];
}

export function leatherRivets(): LeatherRivetType[] {
  return ["single_cap_rapid", "double_cap_decorative", "tubular_hollow_light", "copper_burr_permanent", "chicago_screw_remove"];
}
