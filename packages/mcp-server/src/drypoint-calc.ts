// drypoint-calc - drypoint printmaking needle types

export type Drypoint =
  | "steel_needle_standard"
  | "diamond_point_hard"
  | "carbide_scribe_durable"
  | "roulette_wheel_texture"
  | "sapphire_tip_fine";

const DATA: Record<Drypoint, {
  lineQuality: number; burrControl: number; durability: number; plateRange: number;
  cost: number; forMetal: boolean; powered: boolean; tipMaterial: string; bestUse: string;
}> = {
  steel_needle_standard: { lineQuality: 7, burrControl: 7, durability: 5, plateRange: 7, cost: 3, forMetal: false, powered: false, tipMaterial: "hardened_steel_tip", bestUse: "general_drypoint_line" },
  diamond_point_hard: { lineQuality: 10, burrControl: 9, durability: 10, plateRange: 9, cost: 10, forMetal: true, powered: false, tipMaterial: "industrial_diamond_tip", bestUse: "fine_metal_plate_work" },
  carbide_scribe_durable: { lineQuality: 8, burrControl: 8, durability: 9, plateRange: 8, cost: 7, forMetal: true, powered: false, tipMaterial: "tungsten_carbide_tip", bestUse: "durable_plate_scribe" },
  roulette_wheel_texture: { lineQuality: 5, burrControl: 5, durability: 8, plateRange: 6, cost: 6, forMetal: false, powered: false, tipMaterial: "toothed_steel_wheel", bestUse: "texture_tone_area" },
  sapphire_tip_fine: { lineQuality: 9, burrControl: 10, durability: 8, plateRange: 7, cost: 9, forMetal: false, powered: false, tipMaterial: "synthetic_sapphire_tip", bestUse: "ultra_fine_detail_line" },
};

const get = (d: Drypoint) => DATA[d];
export const lineQuality = (d: Drypoint) => get(d).lineQuality;
export const burrControl = (d: Drypoint) => get(d).burrControl;
export const durability = (d: Drypoint) => get(d).durability;
export const plateRange = (d: Drypoint) => get(d).plateRange;
export const drypointCost = (d: Drypoint) => get(d).cost;
export const forMetal = (d: Drypoint) => get(d).forMetal;
export const powered = (d: Drypoint) => get(d).powered;
export const tipMaterial = (d: Drypoint) => get(d).tipMaterial;
export const bestUse = (d: Drypoint) => get(d).bestUse;
export const drypoints = (): Drypoint[] => Object.keys(DATA) as Drypoint[];
