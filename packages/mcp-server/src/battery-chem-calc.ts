export type BatteryChem =
  | "nmc_811"
  | "lfp_olivine"
  | "nca_cylindrical"
  | "solid_state_sulfide"
  | "sodium_ion_layered";

const DATA: Record<BatteryChem, {
  energyDensity: number; cyclLife: number; safety: number;
  chargRate: number; chemCost: number; cobaltFree: boolean;
  forEv: boolean; cathode: string; bestUse: string;
}> = {
  nmc_811: {
    energyDensity: 9, cyclLife: 6, safety: 5,
    chargRate: 7, chemCost: 7, cobaltFree: false,
    forEv: true, cathode: "nickel_manganese_cobalt",
    bestUse: "long_range_ev_pack",
  },
  lfp_olivine: {
    energyDensity: 5, cyclLife: 9, safety: 10,
    chargRate: 8, chemCost: 3, cobaltFree: true,
    forEv: true, cathode: "lithium_iron_phosphate",
    bestUse: "grid_storage_bus_fleet",
  },
  nca_cylindrical: {
    energyDensity: 10, cyclLife: 5, safety: 4,
    chargRate: 6, chemCost: 8, cobaltFree: false,
    forEv: true, cathode: "nickel_cobalt_aluminum",
    bestUse: "premium_ev_max_range",
  },
  solid_state_sulfide: {
    energyDensity: 8, cyclLife: 7, safety: 9,
    chargRate: 9, chemCost: 10, cobaltFree: true,
    forEv: true, cathode: "lithium_metal_solid_electrolyte",
    bestUse: "next_gen_fast_charge_ev",
  },
  sodium_ion_layered: {
    energyDensity: 4, cyclLife: 8, safety: 8,
    chargRate: 7, chemCost: 1, cobaltFree: true,
    forEv: false, cathode: "prussian_blue_analog_na",
    bestUse: "low_cost_stationary_storage",
  },
};

const get = (t: BatteryChem) => DATA[t];

export const energyDensity = (t: BatteryChem) => get(t).energyDensity;
export const cyclLife = (t: BatteryChem) => get(t).cyclLife;
export const safety = (t: BatteryChem) => get(t).safety;
export const chargRate = (t: BatteryChem) => get(t).chargRate;
export const chemCost = (t: BatteryChem) => get(t).chemCost;
export const cobaltFree = (t: BatteryChem) => get(t).cobaltFree;
export const forEv = (t: BatteryChem) => get(t).forEv;
export const cathode = (t: BatteryChem) => get(t).cathode;
export const bestUse = (t: BatteryChem) => get(t).bestUse;
export const batteryChems = (): BatteryChem[] => Object.keys(DATA) as BatteryChem[];
