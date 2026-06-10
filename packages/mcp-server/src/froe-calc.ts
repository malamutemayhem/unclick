export type FroeType = "straight_blade_basic" | "curved_blade_shingle" | "wide_blade_stave" | "short_blade_shim" | "heavy_blade_timber";

export function splitForce(t: FroeType): number {
  const m: Record<FroeType, number> = {
    straight_blade_basic: 7, curved_blade_shingle: 6, wide_blade_stave: 9, short_blade_shim: 5, heavy_blade_timber: 10,
  };
  return m[t];
}

export function grainFollow(t: FroeType): number {
  const m: Record<FroeType, number> = {
    straight_blade_basic: 8, curved_blade_shingle: 10, wide_blade_stave: 7, short_blade_shim: 6, heavy_blade_timber: 5,
  };
  return m[t];
}

export function controlSteer(t: FroeType): number {
  const m: Record<FroeType, number> = {
    straight_blade_basic: 7, curved_blade_shingle: 9, wide_blade_stave: 6, short_blade_shim: 8, heavy_blade_timber: 4,
  };
  return m[t];
}

export function bladeLength(t: FroeType): number {
  const m: Record<FroeType, number> = {
    straight_blade_basic: 7, curved_blade_shingle: 7, wide_blade_stave: 9, short_blade_shim: 4, heavy_blade_timber: 10,
  };
  return m[t];
}

export function froeCost(t: FroeType): number {
  const m: Record<FroeType, number> = {
    straight_blade_basic: 2, curved_blade_shingle: 2, wide_blade_stave: 3, short_blade_shim: 1, heavy_blade_timber: 3,
  };
  return m[t];
}

export function curved(t: FroeType): boolean {
  const m: Record<FroeType, boolean> = {
    straight_blade_basic: false, curved_blade_shingle: true, wide_blade_stave: false, short_blade_shim: false, heavy_blade_timber: false,
  };
  return m[t];
}

export function needsClub(t: FroeType): boolean {
  const m: Record<FroeType, boolean> = {
    straight_blade_basic: true, curved_blade_shingle: true, wide_blade_stave: true, short_blade_shim: false, heavy_blade_timber: true,
  };
  return m[t];
}

export function steelType(t: FroeType): string {
  const m: Record<FroeType, string> = {
    straight_blade_basic: "carbon_steel_forged",
    curved_blade_shingle: "spring_steel_curved",
    wide_blade_stave: "tool_steel_wide",
    short_blade_shim: "carbon_steel_short",
    heavy_blade_timber: "heavy_forge_thick",
  };
  return m[t];
}

export function bestUse(t: FroeType): string {
  const m: Record<FroeType, string> = {
    straight_blade_basic: "general_rive_split",
    curved_blade_shingle: "shingle_shake_split",
    wide_blade_stave: "barrel_stave_rive",
    short_blade_shim: "thin_shim_split",
    heavy_blade_timber: "heavy_log_rive",
  };
  return m[t];
}

export function froes(): FroeType[] {
  return ["straight_blade_basic", "curved_blade_shingle", "wide_blade_stave", "short_blade_shim", "heavy_blade_timber"];
}
