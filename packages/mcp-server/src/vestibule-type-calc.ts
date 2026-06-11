export type VestibuleType =
  | "single_entry_airlock"
  | "double_entry_throughway"
  | "revolving_integrated"
  | "heated_arctic_entry"
  | "security_screening";

interface VestibuleData {
  energy: number;
  security: number;
  throughput: number;
  comfort: number;
  vtCost: number;
  heated: boolean;
  forSecurity: boolean;
  configuration: string;
  bestUse: string;
}

const DATA: Record<VestibuleType, VestibuleData> = {
  single_entry_airlock: {
    energy: 8, security: 5, throughput: 6, comfort: 7, vtCost: 4,
    heated: false, forSecurity: false,
    configuration: "single_door_pair_air_lock",
    bestUse: "office_retail_energy_code",
  },
  double_entry_throughway: {
    energy: 9, security: 5, throughput: 8, comfort: 8, vtCost: 6,
    heated: false, forSecurity: false,
    configuration: "double_door_pair_through",
    bestUse: "high_traffic_mall_hospital",
  },
  revolving_integrated: {
    energy: 10, security: 6, throughput: 9, comfort: 8, vtCost: 9,
    heated: false, forSecurity: false,
    configuration: "revolving_door_side_swing",
    bestUse: "corporate_tower_lobby_prestige",
  },
  heated_arctic_entry: {
    energy: 7, security: 4, throughput: 5, comfort: 10, vtCost: 7,
    heated: true, forSecurity: false,
    configuration: "heated_radiant_floor_curtain",
    bestUse: "cold_climate_northern_entry",
  },
  security_screening: {
    energy: 6, security: 10, throughput: 4, comfort: 5, vtCost: 10,
    heated: false, forSecurity: true,
    configuration: "mantrap_metal_detect_xray",
    bestUse: "courthouse_embassy_screening",
  },
};

function get(t: VestibuleType): VestibuleData {
  return DATA[t];
}

export const energy = (t: VestibuleType) => get(t).energy;
export const security = (t: VestibuleType) => get(t).security;
export const throughput = (t: VestibuleType) => get(t).throughput;
export const comfort = (t: VestibuleType) => get(t).comfort;
export const vtCost = (t: VestibuleType) => get(t).vtCost;
export const heated = (t: VestibuleType) => get(t).heated;
export const forSecurity = (t: VestibuleType) => get(t).forSecurity;
export const configuration = (t: VestibuleType) => get(t).configuration;
export const bestUse = (t: VestibuleType) => get(t).bestUse;
export const vestibuleTypes = (): VestibuleType[] =>
  Object.keys(DATA) as VestibuleType[];
