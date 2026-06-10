export type DivingSuit = "wetsuit" | "drysuit" | "semi_dry" | "dive_skin" | "atmospheric";

export function thermalProtection(d: DivingSuit): number {
  const m: Record<DivingSuit, number> = {
    wetsuit: 6, drysuit: 10, semi_dry: 7, dive_skin: 2, atmospheric: 8,
  };
  return m[d];
}

export function flexibility(d: DivingSuit): number {
  const m: Record<DivingSuit, number> = {
    wetsuit: 8, drysuit: 5, semi_dry: 7, dive_skin: 10, atmospheric: 2,
  };
  return m[d];
}

export function depthRange(d: DivingSuit): number {
  const m: Record<DivingSuit, number> = {
    wetsuit: 4, drysuit: 7, semi_dry: 5, dive_skin: 2, atmospheric: 10,
  };
  return m[d];
}

export function buoyancyControl(d: DivingSuit): number {
  const m: Record<DivingSuit, number> = {
    wetsuit: 5, drysuit: 9, semi_dry: 6, dive_skin: 3, atmospheric: 10,
  };
  return m[d];
}

export function purchasePrice(d: DivingSuit): number {
  const m: Record<DivingSuit, number> = {
    wetsuit: 3, drysuit: 7, semi_dry: 5, dive_skin: 2, atmospheric: 10,
  };
  return m[d];
}

export function requiresUndergarment(d: DivingSuit): boolean {
  const m: Record<DivingSuit, boolean> = {
    wetsuit: false, drysuit: true, semi_dry: false, dive_skin: false, atmospheric: false,
  };
  return m[d];
}

export function allowsSurfaceSwimming(d: DivingSuit): boolean {
  const m: Record<DivingSuit, boolean> = {
    wetsuit: true, drysuit: true, semi_dry: true, dive_skin: true, atmospheric: false,
  };
  return m[d];
}

export function sealMethod(d: DivingSuit): string {
  const m: Record<DivingSuit, string> = {
    wetsuit: "neoprene_skin_contact", drysuit: "watertight_zipper_gasket",
    semi_dry: "improved_wrist_ankle_seal", dive_skin: "lycra_spandex_stretch",
    atmospheric: "rigid_shell_pressure_rated",
  };
  return m[d];
}

export function bestCondition(d: DivingSuit): string {
  const m: Record<DivingSuit, string> = {
    wetsuit: "warm_temperate_recreational", drysuit: "cold_water_technical",
    semi_dry: "cool_water_extended_dive", dive_skin: "tropical_jellyfish_protection",
    atmospheric: "extreme_depth_commercial",
  };
  return m[d];
}

export function divingSuits(): DivingSuit[] {
  return ["wetsuit", "drysuit", "semi_dry", "dive_skin", "atmospheric"];
}
