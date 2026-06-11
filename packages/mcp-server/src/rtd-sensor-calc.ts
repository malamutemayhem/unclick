export type RtdSensorType =
  | "pt100_wire_wound"
  | "pt1000_thin_film"
  | "nickel_120_fast"
  | "copper_10_motor"
  | "pt100_sanitary_tri_clamp";

interface RtdSensorData {
  accuracy: number;
  response: number;
  stability: number;
  range: number;
  rsCost: number;
  threeWire: boolean;
  forSanitary: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<RtdSensorType, RtdSensorData> = {
  pt100_wire_wound: {
    accuracy: 10, response: 6, stability: 10, range: 8, rsCost: 7,
    threeWire: true, forSanitary: false,
    element: "platinum_100_ohm_wire_wound_ceramic",
    bestUse: "lab_calibration_reference_primary",
  },
  pt1000_thin_film: {
    accuracy: 9, response: 8, stability: 9, range: 7, rsCost: 5,
    threeWire: false, forSanitary: false,
    element: "platinum_1000_ohm_thin_film_chip",
    bestUse: "hvac_process_general_two_wire",
  },
  nickel_120_fast: {
    accuracy: 7, response: 10, stability: 7, range: 5, rsCost: 4,
    threeWire: false, forSanitary: false,
    element: "nickel_120_ohm_fast_response",
    bestUse: "bearing_motor_winding_fast_temp",
  },
  copper_10_motor: {
    accuracy: 6, response: 7, stability: 6, range: 4, rsCost: 3,
    threeWire: false, forSanitary: false,
    element: "copper_10_ohm_motor_embedded",
    bestUse: "transformer_motor_winding_embed",
  },
  pt100_sanitary_tri_clamp: {
    accuracy: 9, response: 7, stability: 9, range: 7, rsCost: 8,
    threeWire: true, forSanitary: true,
    element: "platinum_100_ohm_sanitary_sheath",
    bestUse: "pharma_food_cip_sip_tri_clamp",
  },
};

function get(t: RtdSensorType): RtdSensorData {
  return DATA[t];
}

export const accuracy = (t: RtdSensorType) => get(t).accuracy;
export const response = (t: RtdSensorType) => get(t).response;
export const stability = (t: RtdSensorType) => get(t).stability;
export const range = (t: RtdSensorType) => get(t).range;
export const rsCost = (t: RtdSensorType) => get(t).rsCost;
export const threeWire = (t: RtdSensorType) => get(t).threeWire;
export const forSanitary = (t: RtdSensorType) => get(t).forSanitary;
export const element = (t: RtdSensorType) => get(t).element;
export const bestUse = (t: RtdSensorType) => get(t).bestUse;
export const rtdSensorTypes = (): RtdSensorType[] =>
  Object.keys(DATA) as RtdSensorType[];
