export type ConcreteMixerType =
  | "drum_truck_transit"
  | "pan_mixer_vertical"
  | "twin_shaft_horizontal"
  | "planetary_counter_current"
  | "continuous_pugmill_flow";

interface ConcreteMixerData {
  capacity: number;
  homogeneity: number;
  speed: number;
  flexibility: number;
  cmCost: number;
  mobile: boolean;
  forPrecast: boolean;
  action: string;
  bestUse: string;
}

const DATA: Record<ConcreteMixerType, ConcreteMixerData> = {
  drum_truck_transit: {
    capacity: 9, homogeneity: 6, speed: 7, flexibility: 8, cmCost: 6,
    mobile: true, forPrecast: false,
    action: "rotating_drum_spiral_fin",
    bestUse: "ready_mix_delivery_job_site",
  },
  pan_mixer_vertical: {
    capacity: 5, homogeneity: 8, speed: 7, flexibility: 7, cmCost: 5,
    mobile: false, forPrecast: true,
    action: "rotating_pan_fixed_blade_scraper",
    bestUse: "small_batch_precast_lab_mortar",
  },
  twin_shaft_horizontal: {
    capacity: 10, homogeneity: 10, speed: 10, flexibility: 6, cmCost: 9,
    mobile: false, forPrecast: true,
    action: "counter_rotate_twin_shaft_arm",
    bestUse: "high_volume_batch_plant_rmc",
  },
  planetary_counter_current: {
    capacity: 7, homogeneity: 10, speed: 8, flexibility: 9, cmCost: 8,
    mobile: false, forPrecast: true,
    action: "planetary_star_counter_revolve",
    bestUse: "scc_uhpc_specialty_high_quality",
  },
  continuous_pugmill_flow: {
    capacity: 8, homogeneity: 7, speed: 9, flexibility: 4, cmCost: 7,
    mobile: true, forPrecast: false,
    action: "twin_paddle_continuous_feed",
    bestUse: "roller_compact_concrete_soil_stab",
  },
};

function get(t: ConcreteMixerType): ConcreteMixerData {
  return DATA[t];
}

export const capacity = (t: ConcreteMixerType) => get(t).capacity;
export const homogeneity = (t: ConcreteMixerType) => get(t).homogeneity;
export const speed = (t: ConcreteMixerType) => get(t).speed;
export const flexibility = (t: ConcreteMixerType) => get(t).flexibility;
export const cmCost = (t: ConcreteMixerType) => get(t).cmCost;
export const mobile = (t: ConcreteMixerType) => get(t).mobile;
export const forPrecast = (t: ConcreteMixerType) => get(t).forPrecast;
export const action = (t: ConcreteMixerType) => get(t).action;
export const bestUse = (t: ConcreteMixerType) => get(t).bestUse;
export const concreteMixerTypes = (): ConcreteMixerType[] =>
  Object.keys(DATA) as ConcreteMixerType[];
