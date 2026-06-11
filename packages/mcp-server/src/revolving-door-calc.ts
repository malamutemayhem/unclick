export type RevolvingDoorType =
  | "manual_three_wing"
  | "automatic_three_wing"
  | "four_wing_manual"
  | "security_mantrap_interlocked"
  | "all_glass_crystal";

interface RevolvingDoorData {
  throughput: number;
  energy: number;
  security: number;
  aesthetic: number;
  rdCost: number;
  automatic: boolean;
  forSecurity: boolean;
  wing: string;
  bestUse: string;
}

const DATA: Record<RevolvingDoorType, RevolvingDoorData> = {
  manual_three_wing: {
    throughput: 6, energy: 8, security: 4, aesthetic: 6, rdCost: 5,
    automatic: false, forSecurity: false,
    wing: "three_wing_manual_push_bar",
    bestUse: "office_lobby_standard_entry",
  },
  automatic_three_wing: {
    throughput: 8, energy: 9, security: 5, aesthetic: 8, rdCost: 8,
    automatic: true, forSecurity: false,
    wing: "three_wing_motor_sensor_driven",
    bestUse: "hotel_hospital_ada_compliant",
  },
  four_wing_manual: {
    throughput: 7, energy: 9, security: 5, aesthetic: 7, rdCost: 6,
    automatic: false, forSecurity: false,
    wing: "four_wing_manual_compartment",
    bestUse: "high_traffic_mall_transit",
  },
  security_mantrap_interlocked: {
    throughput: 3, energy: 6, security: 10, aesthetic: 5, rdCost: 10,
    automatic: true, forSecurity: true,
    wing: "interlocked_mantrap_pigtail",
    bestUse: "data_center_embassy_secure",
  },
  all_glass_crystal: {
    throughput: 7, energy: 8, security: 4, aesthetic: 10, rdCost: 9,
    automatic: true, forSecurity: false,
    wing: "frameless_curved_glass_drum",
    bestUse: "luxury_retail_flagship_entry",
  },
};

function get(t: RevolvingDoorType): RevolvingDoorData {
  return DATA[t];
}

export const throughput = (t: RevolvingDoorType) => get(t).throughput;
export const energy = (t: RevolvingDoorType) => get(t).energy;
export const security = (t: RevolvingDoorType) => get(t).security;
export const aesthetic = (t: RevolvingDoorType) => get(t).aesthetic;
export const rdCost = (t: RevolvingDoorType) => get(t).rdCost;
export const automatic = (t: RevolvingDoorType) => get(t).automatic;
export const forSecurity = (t: RevolvingDoorType) => get(t).forSecurity;
export const wing = (t: RevolvingDoorType) => get(t).wing;
export const bestUse = (t: RevolvingDoorType) => get(t).bestUse;
export const revolvingDoorTypes = (): RevolvingDoorType[] =>
  Object.keys(DATA) as RevolvingDoorType[];
