export type EvaporatorType =
  | "falling_film_vertical"
  | "rising_film_natural_circ"
  | "forced_circulation_pump"
  | "plate_evaporator_compact"
  | "multiple_effect_cascade";

interface EvaporatorData {
  heatTransfer: number;
  capacity: number;
  fouling: number;
  energy: number;
  evCost: number;
  multiEffect: boolean;
  forViscous: boolean;
  film: string;
  bestUse: string;
}

const DATA: Record<EvaporatorType, EvaporatorData> = {
  falling_film_vertical: {
    heatTransfer: 9, capacity: 8, fouling: 7, energy: 7, evCost: 6,
    multiEffect: false, forViscous: false,
    film: "thin_film_gravity_downward",
    bestUse: "juice_milk_heat_sensitive_liquid",
  },
  rising_film_natural_circ: {
    heatTransfer: 7, capacity: 7, fouling: 5, energy: 6, evCost: 4,
    multiEffect: false, forViscous: false,
    film: "bubble_lift_natural_circulation",
    bestUse: "sugar_syrup_simple_evaporation",
  },
  forced_circulation_pump: {
    heatTransfer: 8, capacity: 9, fouling: 9, energy: 5, evCost: 7,
    multiEffect: false, forViscous: true,
    film: "pumped_flow_high_velocity_tube",
    bestUse: "crystallizing_salting_viscous_slurry",
  },
  plate_evaporator_compact: {
    heatTransfer: 10, capacity: 6, fouling: 8, energy: 8, evCost: 8,
    multiEffect: false, forViscous: false,
    film: "thin_film_between_plates_gasket",
    bestUse: "dairy_pharma_compact_cip_clean",
  },
  multiple_effect_cascade: {
    heatTransfer: 7, capacity: 10, fouling: 6, energy: 10, evCost: 9,
    multiEffect: true, forViscous: false,
    film: "cascade_vapor_reuse_multi_stage",
    bestUse: "desalination_pulp_large_scale",
  },
};

function get(t: EvaporatorType): EvaporatorData {
  return DATA[t];
}

export const heatTransfer = (t: EvaporatorType) => get(t).heatTransfer;
export const capacity = (t: EvaporatorType) => get(t).capacity;
export const fouling = (t: EvaporatorType) => get(t).fouling;
export const energy = (t: EvaporatorType) => get(t).energy;
export const evCost = (t: EvaporatorType) => get(t).evCost;
export const multiEffect = (t: EvaporatorType) => get(t).multiEffect;
export const forViscous = (t: EvaporatorType) => get(t).forViscous;
export const film = (t: EvaporatorType) => get(t).film;
export const bestUse = (t: EvaporatorType) => get(t).bestUse;
export const evaporatorTypes = (): EvaporatorType[] =>
  Object.keys(DATA) as EvaporatorType[];
