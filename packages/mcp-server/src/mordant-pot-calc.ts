// Mordant pot calculator - textile dyeing mordant vessel tools

export type MordantPotType =
  | "copper_kettle_reactive"
  | "stainless_steel_inert"
  | "enamel_coat_safe"
  | "aluminum_light_alum"
  | "iron_cast_sadden";

const MORDANT_DATA: Record<
  MordantPotType,
  {
    heatEven: number;
    chemSafe: number;
    capacity: number;
    durability: number;
    cost: number;
    reactive: boolean;
    forIron: boolean;
    potMaterial: string;
    bestUse: string;
  }
> = {
  copper_kettle_reactive: {
    heatEven: 9,
    chemSafe: 5,
    capacity: 7,
    durability: 8,
    cost: 8,
    reactive: true,
    forIron: false,
    potMaterial: "hammered_copper",
    bestUse: "copper_mordant_shift",
  },
  stainless_steel_inert: {
    heatEven: 8,
    chemSafe: 10,
    capacity: 8,
    durability: 10,
    cost: 6,
    reactive: false,
    forIron: false,
    potMaterial: "stainless_304",
    bestUse: "general_mordant_bath",
  },
  enamel_coat_safe: {
    heatEven: 7,
    chemSafe: 9,
    capacity: 6,
    durability: 6,
    cost: 4,
    reactive: false,
    forIron: false,
    potMaterial: "enamel_steel_coat",
    bestUse: "small_batch_mordant",
  },
  aluminum_light_alum: {
    heatEven: 7,
    chemSafe: 6,
    capacity: 7,
    durability: 7,
    cost: 3,
    reactive: true,
    forIron: false,
    potMaterial: "cast_aluminum",
    bestUse: "alum_mordant_boost",
  },
  iron_cast_sadden: {
    heatEven: 9,
    chemSafe: 4,
    capacity: 9,
    durability: 9,
    cost: 5,
    reactive: true,
    forIron: true,
    potMaterial: "cast_iron_heavy",
    bestUse: "iron_sadden_darken",
  },
};

export function heatEven(type: MordantPotType): number {
  return MORDANT_DATA[type].heatEven;
}
export function chemSafe(type: MordantPotType): number {
  return MORDANT_DATA[type].chemSafe;
}
export function capacity(type: MordantPotType): number {
  return MORDANT_DATA[type].capacity;
}
export function durability(type: MordantPotType): number {
  return MORDANT_DATA[type].durability;
}
export function mordantCost(type: MordantPotType): number {
  return MORDANT_DATA[type].cost;
}
export function reactive(type: MordantPotType): boolean {
  return MORDANT_DATA[type].reactive;
}
export function forIron(type: MordantPotType): boolean {
  return MORDANT_DATA[type].forIron;
}
export function potMaterial(type: MordantPotType): string {
  return MORDANT_DATA[type].potMaterial;
}
export function bestUse(type: MordantPotType): string {
  return MORDANT_DATA[type].bestUse;
}
export function mordantPots(): MordantPotType[] {
  return Object.keys(MORDANT_DATA) as MordantPotType[];
}
