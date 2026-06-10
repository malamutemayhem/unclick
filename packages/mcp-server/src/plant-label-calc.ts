export type PlantLabelType = "plastic_t_stake_basic" | "slate_stone_engraved" | "copper_metal_etched" | "bamboo_natural_marker" | "ceramic_painted_decorative";

export function readability(t: PlantLabelType): number {
  const m: Record<PlantLabelType, number> = {
    plastic_t_stake_basic: 7, slate_stone_engraved: 8, copper_metal_etched: 9, bamboo_natural_marker: 6, ceramic_painted_decorative: 8,
  };
  return m[t];
}

export function weatherResist(t: PlantLabelType): number {
  const m: Record<PlantLabelType, number> = {
    plastic_t_stake_basic: 5, slate_stone_engraved: 10, copper_metal_etched: 9, bamboo_natural_marker: 4, ceramic_painted_decorative: 7,
  };
  return m[t];
}

export function aesthetics(t: PlantLabelType): number {
  const m: Record<PlantLabelType, number> = {
    plastic_t_stake_basic: 3, slate_stone_engraved: 9, copper_metal_etched: 10, bamboo_natural_marker: 7, ceramic_painted_decorative: 9,
  };
  return m[t];
}

export function reusability(t: PlantLabelType): number {
  const m: Record<PlantLabelType, number> = {
    plastic_t_stake_basic: 6, slate_stone_engraved: 10, copper_metal_etched: 10, bamboo_natural_marker: 3, ceramic_painted_decorative: 5,
  };
  return m[t];
}

export function labelCost(t: PlantLabelType): number {
  const m: Record<PlantLabelType, number> = {
    plastic_t_stake_basic: 1, slate_stone_engraved: 4, copper_metal_etched: 5, bamboo_natural_marker: 2, ceramic_painted_decorative: 3,
  };
  return m[t];
}

export function biodegradable(t: PlantLabelType): boolean {
  const m: Record<PlantLabelType, boolean> = {
    plastic_t_stake_basic: false, slate_stone_engraved: false, copper_metal_etched: false, bamboo_natural_marker: true, ceramic_painted_decorative: false,
  };
  return m[t];
}

export function rewritable(t: PlantLabelType): boolean {
  const m: Record<PlantLabelType, boolean> = {
    plastic_t_stake_basic: true, slate_stone_engraved: false, copper_metal_etched: false, bamboo_natural_marker: true, ceramic_painted_decorative: false,
  };
  return m[t];
}

export function markMethod(t: PlantLabelType): string {
  const m: Record<PlantLabelType, string> = {
    plastic_t_stake_basic: "pencil_marker_write",
    slate_stone_engraved: "diamond_bit_engrave",
    copper_metal_etched: "acid_etch_stamp",
    bamboo_natural_marker: "burn_brand_pyrography",
    ceramic_painted_decorative: "kiln_fired_glaze",
  };
  return m[t];
}

export function bestGarden(t: PlantLabelType): string {
  const m: Record<PlantLabelType, string> = {
    plastic_t_stake_basic: "seed_starting_indoor",
    slate_stone_engraved: "herb_garden_permanent",
    copper_metal_etched: "formal_rose_bed",
    bamboo_natural_marker: "veggie_patch_seasonal",
    ceramic_painted_decorative: "cottage_flower_border",
  };
  return m[t];
}

export function plantLabels(): PlantLabelType[] {
  return ["plastic_t_stake_basic", "slate_stone_engraved", "copper_metal_etched", "bamboo_natural_marker", "ceramic_painted_decorative"];
}
