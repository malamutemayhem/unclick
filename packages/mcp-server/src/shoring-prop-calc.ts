export type ShoringPropType =
  | "steel_acrow_adjustable"
  | "aluminum_post_shore_light"
  | "timber_deadshore_needle"
  | "hydraulic_jack_heavy_lift"
  | "flying_table_form_slab";

interface ShoringPropData {
  capacity: number;
  adjustability: number;
  weight: number;
  speed: number;
  shCost: number;
  adjustable: boolean;
  forSlab: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<ShoringPropType, ShoringPropData> = {
  steel_acrow_adjustable: {
    capacity: 7, adjustability: 8, weight: 5, speed: 8, shCost: 4,
    adjustable: true, forSlab: true,
    mechanism: "threaded_collar_pin_lock",
    bestUse: "concrete_slab_soffit_general_shore",
  },
  aluminum_post_shore_light: {
    capacity: 6, adjustability: 9, weight: 8, speed: 9, shCost: 6,
    adjustable: true, forSlab: true,
    mechanism: "trigger_release_rapid_adjust",
    bestUse: "high_rise_slab_rapid_cycle_shore",
  },
  timber_deadshore_needle: {
    capacity: 5, adjustability: 3, weight: 4, speed: 4, shCost: 2,
    adjustable: false, forSlab: false,
    mechanism: "timber_needle_beam_prop_stack",
    bestUse: "wall_opening_underpinning_support",
  },
  hydraulic_jack_heavy_lift: {
    capacity: 10, adjustability: 10, weight: 3, speed: 7, shCost: 9,
    adjustable: true, forSlab: false,
    mechanism: "hydraulic_ram_precision_lift",
    bestUse: "bridge_jack_heavy_structure_lift",
  },
  flying_table_form_slab: {
    capacity: 8, adjustability: 6, weight: 4, speed: 10, shCost: 8,
    adjustable: false, forSlab: true,
    mechanism: "table_form_crane_fly_reposition",
    bestUse: "repetitive_floor_slab_cycle_fast",
  },
};

function get(t: ShoringPropType): ShoringPropData {
  return DATA[t];
}

export const capacity = (t: ShoringPropType) => get(t).capacity;
export const adjustability = (t: ShoringPropType) => get(t).adjustability;
export const weight = (t: ShoringPropType) => get(t).weight;
export const speed = (t: ShoringPropType) => get(t).speed;
export const shCost = (t: ShoringPropType) => get(t).shCost;
export const adjustable = (t: ShoringPropType) => get(t).adjustable;
export const forSlab = (t: ShoringPropType) => get(t).forSlab;
export const mechanism = (t: ShoringPropType) => get(t).mechanism;
export const bestUse = (t: ShoringPropType) => get(t).bestUse;
export const shoringPropTypes = (): ShoringPropType[] =>
  Object.keys(DATA) as ShoringPropType[];
