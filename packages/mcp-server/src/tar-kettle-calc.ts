export type TarKettleType =
  | "cast_iron_standard"
  | "copper_bottom_even"
  | "portable_field_small"
  | "double_wall_safe"
  | "electric_heated_modern";

const specs: Record<TarKettleType, {
  heatEven: number; capacity: number; tempControl: number;
  durability: number; cost: number; powered: boolean; portable: boolean;
  heatSource: string; use: string;
}> = {
  cast_iron_standard: {
    heatEven: 75, capacity: 85, tempControl: 65,
    durability: 90, cost: 120, powered: false, portable: false,
    heatSource: "open_fire_direct", use: "general_tar_heat",
  },
  copper_bottom_even: {
    heatEven: 92, capacity: 78, tempControl: 80,
    durability: 72, cost: 200, powered: false, portable: false,
    heatSource: "fire_copper_base", use: "even_tar_melt",
  },
  portable_field_small: {
    heatEven: 68, capacity: 55, tempControl: 60,
    durability: 65, cost: 60, powered: false, portable: true,
    heatSource: "propane_burner", use: "field_rope_tar",
  },
  double_wall_safe: {
    heatEven: 85, capacity: 80, tempControl: 90,
    durability: 85, cost: 250, powered: false, portable: false,
    heatSource: "water_jacket_fire", use: "safe_temp_tar",
  },
  electric_heated_modern: {
    heatEven: 88, capacity: 75, tempControl: 95,
    durability: 78, cost: 350, powered: true, portable: false,
    heatSource: "electric_element", use: "precision_temp_tar",
  },
};

export function heatEven(t: TarKettleType): number { return specs[t].heatEven; }
export function capacity(t: TarKettleType): number { return specs[t].capacity; }
export function tempControl(t: TarKettleType): number { return specs[t].tempControl; }
export function durability(t: TarKettleType): number { return specs[t].durability; }
export function kettleCost(t: TarKettleType): number { return specs[t].cost; }
export function powered(t: TarKettleType): boolean { return specs[t].powered; }
export function portable(t: TarKettleType): boolean { return specs[t].portable; }
export function heatSource(t: TarKettleType): string { return specs[t].heatSource; }
export function bestUse(t: TarKettleType): string { return specs[t].use; }
export function tarKettles(): TarKettleType[] { return Object.keys(specs) as TarKettleType[]; }
