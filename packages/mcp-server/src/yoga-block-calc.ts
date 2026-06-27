export type YogaBlockType = "foam_eva_standard" | "cork_natural_eco" | "bamboo_hollow_light" | "recycled_foam_soft" | "wood_solid_hard";

export function firmness(t: YogaBlockType): number {
  const m: Record<YogaBlockType, number> = {
    foam_eva_standard: 6, cork_natural_eco: 8, bamboo_hollow_light: 9, recycled_foam_soft: 4, wood_solid_hard: 10,
  };
  return m[t];
}

export function gripSurface(t: YogaBlockType): number {
  const m: Record<YogaBlockType, number> = {
    foam_eva_standard: 7, cork_natural_eco: 10, bamboo_hollow_light: 6, recycled_foam_soft: 8, wood_solid_hard: 5,
  };
  return m[t];
}

export function lightWeight(t: YogaBlockType): number {
  const m: Record<YogaBlockType, number> = {
    foam_eva_standard: 9, cork_natural_eco: 6, bamboo_hollow_light: 8, recycled_foam_soft: 9, wood_solid_hard: 3,
  };
  return m[t];
}

export function ecoFriendly(t: YogaBlockType): number {
  const m: Record<YogaBlockType, number> = {
    foam_eva_standard: 4, cork_natural_eco: 10, bamboo_hollow_light: 9, recycled_foam_soft: 8, wood_solid_hard: 7,
  };
  return m[t];
}

export function blockCost(t: YogaBlockType): number {
  const m: Record<YogaBlockType, number> = {
    foam_eva_standard: 1, cork_natural_eco: 2, bamboo_hollow_light: 3, recycled_foam_soft: 1, wood_solid_hard: 3,
  };
  return m[t];
}

export function moistureResist(t: YogaBlockType): boolean {
  const m: Record<YogaBlockType, boolean> = {
    foam_eva_standard: true, cork_natural_eco: true, bamboo_hollow_light: false, recycled_foam_soft: false, wood_solid_hard: false,
  };
  return m[t];
}

export function biodegradable(t: YogaBlockType): boolean {
  const m: Record<YogaBlockType, boolean> = {
    foam_eva_standard: false, cork_natural_eco: true, bamboo_hollow_light: true, recycled_foam_soft: false, wood_solid_hard: true,
  };
  return m[t];
}

export function blockMaterial(t: YogaBlockType): string {
  const m: Record<YogaBlockType, string> = {
    foam_eva_standard: "closed_cell_eva_foam",
    cork_natural_eco: "natural_cork_bark",
    bamboo_hollow_light: "laminated_bamboo_shell",
    recycled_foam_soft: "recycled_eva_compound",
    wood_solid_hard: "solid_maple_hardwood",
  };
  return m[t];
}

export function bestPractice(t: YogaBlockType): string {
  const m: Record<YogaBlockType, string> = {
    foam_eva_standard: "beginner_gentle_flow",
    cork_natural_eco: "hot_yoga_sweaty_grip",
    bamboo_hollow_light: "restorative_prop_setup",
    recycled_foam_soft: "yin_yoga_long_hold",
    wood_solid_hard: "iyengar_alignment_precise",
  };
  return m[t];
}

export function yogaBlocks(): YogaBlockType[] {
  return ["foam_eva_standard", "cork_natural_eco", "bamboo_hollow_light", "recycled_foam_soft", "wood_solid_hard"];
}
