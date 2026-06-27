export type ThickenerType =
  | "conventional_gravity_rake"
  | "high_rate_feedwell_floc"
  | "paste_deep_cone_ultra"
  | "belt_filter_gravity_press"
  | "centrifugal_decanter_scroll";

interface ThickenerData {
  underflow: number;
  overflow: number;
  footprint: number;
  energy: number;
  thCost: number;
  mechanical: boolean;
  forTailings: boolean;
  dewatering: string;
  bestUse: string;
}

const DATA: Record<ThickenerType, ThickenerData> = {
  conventional_gravity_rake: {
    underflow: 5, overflow: 7, footprint: 4, energy: 9, thCost: 5,
    mechanical: false, forTailings: true,
    dewatering: "gravity_settle_rake_discharge",
    bestUse: "mineral_tailings_water_recovery",
  },
  high_rate_feedwell_floc: {
    underflow: 7, overflow: 8, footprint: 7, energy: 8, thCost: 7,
    mechanical: false, forTailings: true,
    dewatering: "flocculant_aided_fast_settle",
    bestUse: "concentrate_thickening_counter_current",
  },
  paste_deep_cone_ultra: {
    underflow: 10, overflow: 9, footprint: 6, energy: 7, thCost: 9,
    mechanical: false, forTailings: true,
    dewatering: "deep_cone_bed_compression",
    bestUse: "paste_tailings_dry_stack_disposal",
  },
  belt_filter_gravity_press: {
    underflow: 8, overflow: 6, footprint: 8, energy: 6, thCost: 6,
    mechanical: true, forTailings: false,
    dewatering: "gravity_drain_roller_press_belt",
    bestUse: "sludge_dewatering_municipal_wwtp",
  },
  centrifugal_decanter_scroll: {
    underflow: 9, overflow: 8, footprint: 9, energy: 4, thCost: 8,
    mechanical: true, forTailings: false,
    dewatering: "high_g_scroll_conveyor_bowl",
    bestUse: "biosolids_chemical_sludge_compact",
  },
};

function get(t: ThickenerType): ThickenerData {
  return DATA[t];
}

export const underflow = (t: ThickenerType) => get(t).underflow;
export const overflow = (t: ThickenerType) => get(t).overflow;
export const footprint = (t: ThickenerType) => get(t).footprint;
export const energy = (t: ThickenerType) => get(t).energy;
export const thCost = (t: ThickenerType) => get(t).thCost;
export const mechanical = (t: ThickenerType) => get(t).mechanical;
export const forTailings = (t: ThickenerType) => get(t).forTailings;
export const dewatering = (t: ThickenerType) => get(t).dewatering;
export const bestUse = (t: ThickenerType) => get(t).bestUse;
export const thickenerTypes = (): ThickenerType[] =>
  Object.keys(DATA) as ThickenerType[];
