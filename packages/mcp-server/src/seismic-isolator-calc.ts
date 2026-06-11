export type SeismicIsolatorType =
  | "lead_rubber_bearing_lrb"
  | "high_damping_rubber_hdr"
  | "friction_pendulum_fps"
  | "triple_pendulum_tps"
  | "elastomeric_natural_rubber";

interface SeismicIsolatorData {
  damping: number;
  displacement: number;
  vertical: number;
  durability: number;
  siCost: number;
  selfCentering: boolean;
  forHighRise: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<SeismicIsolatorType, SeismicIsolatorData> = {
  lead_rubber_bearing_lrb: {
    damping: 9, displacement: 7, vertical: 8, durability: 8, siCost: 7,
    selfCentering: true, forHighRise: true,
    mechanism: "lead_core_rubber_layer_shear",
    bestUse: "hospital_bridge_critical_facility",
  },
  high_damping_rubber_hdr: {
    damping: 7, displacement: 6, vertical: 7, durability: 7, siCost: 5,
    selfCentering: true, forHighRise: false,
    mechanism: "filled_rubber_compound_shear",
    bestUse: "mid_rise_moderate_seismic",
  },
  friction_pendulum_fps: {
    damping: 6, displacement: 9, vertical: 9, durability: 9, siCost: 8,
    selfCentering: true, forHighRise: true,
    mechanism: "concave_surface_slider_gravity",
    bestUse: "nuclear_plant_high_load",
  },
  triple_pendulum_tps: {
    damping: 8, displacement: 10, vertical: 10, durability: 9, siCost: 10,
    selfCentering: true, forHighRise: true,
    mechanism: "three_stage_concave_adaptive",
    bestUse: "high_importance_multi_hazard",
  },
  elastomeric_natural_rubber: {
    damping: 4, displacement: 5, vertical: 6, durability: 6, siCost: 3,
    selfCentering: true, forHighRise: false,
    mechanism: "natural_rubber_steel_shim_layer",
    bestUse: "low_rise_simple_isolation",
  },
};

function get(t: SeismicIsolatorType): SeismicIsolatorData {
  return DATA[t];
}

export const damping = (t: SeismicIsolatorType) => get(t).damping;
export const displacement = (t: SeismicIsolatorType) => get(t).displacement;
export const vertical = (t: SeismicIsolatorType) => get(t).vertical;
export const durability = (t: SeismicIsolatorType) => get(t).durability;
export const siCost = (t: SeismicIsolatorType) => get(t).siCost;
export const selfCentering = (t: SeismicIsolatorType) => get(t).selfCentering;
export const forHighRise = (t: SeismicIsolatorType) => get(t).forHighRise;
export const mechanism = (t: SeismicIsolatorType) => get(t).mechanism;
export const bestUse = (t: SeismicIsolatorType) => get(t).bestUse;
export const seismicIsolatorTypes = (): SeismicIsolatorType[] =>
  Object.keys(DATA) as SeismicIsolatorType[];
