export type LappingType =
  | "single_side_flat_plate"
  | "double_side_planetary"
  | "cylindrical_centerless"
  | "hand_lap_valve_seat"
  | "ultrasonic_assisted_slurry";

interface LappingData {
  flatness: number;
  finish_: number;
  throughput: number;
  accuracy: number;
  lpCost: number;
  automated: boolean;
  forOptical: boolean;
  abrasive: string;
  bestUse: string;
}

const DATA: Record<LappingType, LappingData> = {
  single_side_flat_plate: {
    flatness: 9, finish_: 9, throughput: 6, accuracy: 9, lpCost: 6,
    automated: true, forOptical: true,
    abrasive: "alumina_slurry_cast_iron_plate",
    bestUse: "gauge_block_optical_flat_seal",
  },
  double_side_planetary: {
    flatness: 10, finish_: 9, throughput: 9, accuracy: 10, lpCost: 8,
    automated: true, forOptical: true,
    abrasive: "diamond_slurry_ceramic_plate",
    bestUse: "semiconductor_wafer_thin_parallel",
  },
  cylindrical_centerless: {
    flatness: 5, finish_: 8, throughput: 8, accuracy: 8, lpCost: 7,
    automated: true, forOptical: false,
    abrasive: "abrasive_paste_between_rollers",
    bestUse: "roller_bearing_pin_gauge_round",
  },
  hand_lap_valve_seat: {
    flatness: 7, finish_: 7, throughput: 2, accuracy: 6, lpCost: 2,
    automated: false, forOptical: false,
    abrasive: "compound_paste_manual_rotation",
    bestUse: "valve_seat_faucet_repair_fit",
  },
  ultrasonic_assisted_slurry: {
    flatness: 8, finish_: 10, throughput: 5, accuracy: 9, lpCost: 9,
    automated: true, forOptical: true,
    abrasive: "fine_slurry_ultrasonic_vibration",
    bestUse: "brittle_material_sapphire_sic_wafer",
  },
};

function get(t: LappingType): LappingData {
  return DATA[t];
}

export const flatness = (t: LappingType) => get(t).flatness;
export const finish_ = (t: LappingType) => get(t).finish_;
export const throughput = (t: LappingType) => get(t).throughput;
export const accuracy = (t: LappingType) => get(t).accuracy;
export const lpCost = (t: LappingType) => get(t).lpCost;
export const automated = (t: LappingType) => get(t).automated;
export const forOptical = (t: LappingType) => get(t).forOptical;
export const abrasive = (t: LappingType) => get(t).abrasive;
export const bestUse = (t: LappingType) => get(t).bestUse;
export const lappingTypes = (): LappingType[] =>
  Object.keys(DATA) as LappingType[];
