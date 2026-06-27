export type SludgePressType =
  | "belt_filter_press"
  | "screw_press_dewater"
  | "plate_frame_filter"
  | "centrifuge_decanter"
  | "rotary_drum_thickener";

interface SludgePressData {
  dryness: number;
  throughput: number;
  energy: number;
  maintenance: number;
  spCost: number;
  continuous: boolean;
  forMunicipal: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<SludgePressType, SludgePressData> = {
  belt_filter_press: {
    dryness: 7, throughput: 9, energy: 8, maintenance: 6, spCost: 7,
    continuous: true, forMunicipal: true,
    mechanism: "gravity_pressure_belt_squeeze",
    bestUse: "large_municipal_wwtp_biosolids",
  },
  screw_press_dewater: {
    dryness: 6, throughput: 7, energy: 9, maintenance: 9, spCost: 6,
    continuous: true, forMunicipal: true,
    mechanism: "slow_rotation_screw_screen_drum",
    bestUse: "small_wwtp_low_maintenance",
  },
  plate_frame_filter: {
    dryness: 10, throughput: 5, energy: 7, maintenance: 5, spCost: 8,
    continuous: false, forMunicipal: false,
    mechanism: "hydraulic_plate_pressure_batch",
    bestUse: "industrial_sludge_hazardous_cake",
  },
  centrifuge_decanter: {
    dryness: 8, throughput: 10, energy: 5, maintenance: 6, spCost: 9,
    continuous: true, forMunicipal: true,
    mechanism: "high_speed_scroll_bowl_decanter",
    bestUse: "high_volume_wwtp_digested_sludge",
  },
  rotary_drum_thickener: {
    dryness: 4, throughput: 8, energy: 9, maintenance: 8, spCost: 5,
    continuous: true, forMunicipal: true,
    mechanism: "rotating_screen_drum_gravity",
    bestUse: "was_thickening_pre_dewatering",
  },
};

function get(t: SludgePressType): SludgePressData {
  return DATA[t];
}

export const dryness = (t: SludgePressType) => get(t).dryness;
export const throughput = (t: SludgePressType) => get(t).throughput;
export const energy = (t: SludgePressType) => get(t).energy;
export const maintenance = (t: SludgePressType) => get(t).maintenance;
export const spCost = (t: SludgePressType) => get(t).spCost;
export const continuous = (t: SludgePressType) => get(t).continuous;
export const forMunicipal = (t: SludgePressType) => get(t).forMunicipal;
export const mechanism = (t: SludgePressType) => get(t).mechanism;
export const bestUse = (t: SludgePressType) => get(t).bestUse;
export const sludgePressTypes = (): SludgePressType[] =>
  Object.keys(DATA) as SludgePressType[];
