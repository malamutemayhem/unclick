export type ContainerWaxType =
  | "glass_jar_clear"
  | "tin_vessel_metal"
  | "ceramic_pot_opaque"
  | "concrete_vessel_heavy"
  | "coconut_shell_natural";

const specs: Record<ContainerWaxType, {
  heatSafe: number; aesthetic: number; durability: number;
  sizeRange: number; cost: number; transparent: boolean; natural: boolean;
  vesselMaterial: string; use: string;
}> = {
  glass_jar_clear: {
    heatSafe: 85, aesthetic: 90, durability: 78,
    sizeRange: 92, cost: 5, transparent: true, natural: false,
    vesselMaterial: "tempered_glass_jar", use: "clear_display_candle",
  },
  tin_vessel_metal: {
    heatSafe: 92, aesthetic: 78, durability: 90,
    sizeRange: 85, cost: 4, transparent: false, natural: false,
    vesselMaterial: "tin_plated_steel", use: "travel_candle_tin",
  },
  ceramic_pot_opaque: {
    heatSafe: 90, aesthetic: 92, durability: 82,
    sizeRange: 80, cost: 8, transparent: false, natural: false,
    vesselMaterial: "glazed_ceramic_pot", use: "decorative_home_candle",
  },
  concrete_vessel_heavy: {
    heatSafe: 95, aesthetic: 85, durability: 95,
    sizeRange: 78, cost: 7, transparent: false, natural: false,
    vesselMaterial: "cast_concrete_cup", use: "modern_industrial_candle",
  },
  coconut_shell_natural: {
    heatSafe: 80, aesthetic: 88, durability: 72,
    sizeRange: 70, cost: 6, transparent: false, natural: true,
    vesselMaterial: "polished_coconut_half", use: "eco_natural_candle",
  },
};

export function heatSafe(t: ContainerWaxType): number { return specs[t].heatSafe; }
export function aesthetic(t: ContainerWaxType): number { return specs[t].aesthetic; }
export function durability(t: ContainerWaxType): number { return specs[t].durability; }
export function sizeRange(t: ContainerWaxType): number { return specs[t].sizeRange; }
export function containerCost(t: ContainerWaxType): number { return specs[t].cost; }
export function transparent(t: ContainerWaxType): boolean { return specs[t].transparent; }
export function natural(t: ContainerWaxType): boolean { return specs[t].natural; }
export function vesselMaterial(t: ContainerWaxType): string { return specs[t].vesselMaterial; }
export function bestUse(t: ContainerWaxType): string { return specs[t].use; }
export function containerWaxs(): ContainerWaxType[] { return Object.keys(specs) as ContainerWaxType[]; }
