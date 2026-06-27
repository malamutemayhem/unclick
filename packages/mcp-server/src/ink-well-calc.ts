export type InkWellType = "glass_crystal_desk" | "ceramic_pot_studio" | "dinky_dip_travel" | "reservoir_auto_feed" | "sumi_stone_grind";

export function inkAccess(t: InkWellType): number {
  const m: Record<InkWellType, number> = {
    glass_crystal_desk: 8, ceramic_pot_studio: 9, dinky_dip_travel: 6, reservoir_auto_feed: 10, sumi_stone_grind: 5,
  };
  return m[t];
}

export function spillResist(t: InkWellType): number {
  const m: Record<InkWellType, number> = {
    glass_crystal_desk: 7, ceramic_pot_studio: 8, dinky_dip_travel: 10, reservoir_auto_feed: 9, sumi_stone_grind: 6,
  };
  return m[t];
}

export function inkCapacity(t: InkWellType): number {
  const m: Record<InkWellType, number> = {
    glass_crystal_desk: 8, ceramic_pot_studio: 10, dinky_dip_travel: 3, reservoir_auto_feed: 7, sumi_stone_grind: 5,
  };
  return m[t];
}

export function aesthetics(t: InkWellType): number {
  const m: Record<InkWellType, number> = {
    glass_crystal_desk: 10, ceramic_pot_studio: 8, dinky_dip_travel: 5, reservoir_auto_feed: 6, sumi_stone_grind: 9,
  };
  return m[t];
}

export function wellCost(t: InkWellType): number {
  const m: Record<InkWellType, number> = {
    glass_crystal_desk: 3, ceramic_pot_studio: 2, dinky_dip_travel: 1, reservoir_auto_feed: 2, sumi_stone_grind: 3,
  };
  return m[t];
}

export function portable(t: InkWellType): boolean {
  const m: Record<InkWellType, boolean> = {
    glass_crystal_desk: false, ceramic_pot_studio: false, dinky_dip_travel: true, reservoir_auto_feed: false, sumi_stone_grind: false,
  };
  return m[t];
}

export function grindsInk(t: InkWellType): boolean {
  const m: Record<InkWellType, boolean> = {
    glass_crystal_desk: false, ceramic_pot_studio: false, dinky_dip_travel: false, reservoir_auto_feed: false, sumi_stone_grind: true,
  };
  return m[t];
}

export function wellMaterial(t: InkWellType): string {
  const m: Record<InkWellType, string> = {
    glass_crystal_desk: "lead_crystal_cut",
    ceramic_pot_studio: "glazed_stoneware_wide",
    dinky_dip_travel: "plastic_clip_cup",
    reservoir_auto_feed: "brass_gravity_feed",
    sumi_stone_grind: "natural_slate_stone",
  };
  return m[t];
}

export function bestSetup(t: InkWellType): string {
  const m: Record<InkWellType, string> = {
    glass_crystal_desk: "formal_desk_display",
    ceramic_pot_studio: "studio_batch_session",
    dinky_dip_travel: "plein_air_sketch",
    reservoir_auto_feed: "continuous_dip_work",
    sumi_stone_grind: "east_asian_brush",
  };
  return m[t];
}

export function inkWells(): InkWellType[] {
  return ["glass_crystal_desk", "ceramic_pot_studio", "dinky_dip_travel", "reservoir_auto_feed", "sumi_stone_grind"];
}
