export type GreaseTrapType =
  | "passive_gravity_under_sink"
  | "automatic_timer_skim"
  | "gravity_in_ground_large"
  | "hydromechanical_flow_control"
  | "point_of_use_compact";

interface GreaseTrapData {
  capacity: number;
  efficiency: number;
  maintenance: number;
  flow: number;
  gtCost: number;
  automatic: boolean;
  forCommercial: boolean;
  separation: string;
  bestUse: string;
}

const DATA: Record<GreaseTrapType, GreaseTrapData> = {
  passive_gravity_under_sink: {
    capacity: 4, efficiency: 6, maintenance: 5, flow: 4, gtCost: 2,
    automatic: false, forCommercial: false,
    separation: "gravity_baffle_cool_separate",
    bestUse: "small_restaurant_under_sink",
  },
  automatic_timer_skim: {
    capacity: 7, efficiency: 9, maintenance: 9, flow: 7, gtCost: 8,
    automatic: true, forCommercial: true,
    separation: "heated_skim_timer_auto_remove",
    bestUse: "high_volume_kitchen_auto_removal",
  },
  gravity_in_ground_large: {
    capacity: 10, efficiency: 7, maintenance: 4, flow: 10, gtCost: 7,
    automatic: false, forCommercial: true,
    separation: "gravity_baffle_large_retention",
    bestUse: "large_facility_exterior_vault",
  },
  hydromechanical_flow_control: {
    capacity: 6, efficiency: 8, maintenance: 7, flow: 6, gtCost: 5,
    automatic: false, forCommercial: true,
    separation: "flow_control_air_entrainment",
    bestUse: "mid_size_kitchen_code_compliant",
  },
  point_of_use_compact: {
    capacity: 2, efficiency: 5, maintenance: 8, flow: 3, gtCost: 1,
    automatic: false, forCommercial: false,
    separation: "simple_baffle_compact_basket",
    bestUse: "single_fixture_prep_sink",
  },
};

function get(t: GreaseTrapType): GreaseTrapData {
  return DATA[t];
}

export const capacity = (t: GreaseTrapType) => get(t).capacity;
export const efficiency = (t: GreaseTrapType) => get(t).efficiency;
export const maintenance = (t: GreaseTrapType) => get(t).maintenance;
export const flow = (t: GreaseTrapType) => get(t).flow;
export const gtCost = (t: GreaseTrapType) => get(t).gtCost;
export const automatic = (t: GreaseTrapType) => get(t).automatic;
export const forCommercial = (t: GreaseTrapType) => get(t).forCommercial;
export const separation = (t: GreaseTrapType) => get(t).separation;
export const bestUse = (t: GreaseTrapType) => get(t).bestUse;
export const greaseTrapTypes = (): GreaseTrapType[] =>
  Object.keys(DATA) as GreaseTrapType[];
