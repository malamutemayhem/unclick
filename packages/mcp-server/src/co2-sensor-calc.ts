export type Co2SensorType =
  | "ndir_wall_mount"
  | "ndir_duct_probe"
  | "photoacoustic_multi_gas"
  | "electrochemical_portable"
  | "ndir_wireless_iot";

interface Co2SensorData {
  accuracy: number;
  range: number;
  stability: number;
  response: number;
  csCost: number;
  selfCalibrating: boolean;
  forDcv: boolean;
  principle: string;
  bestUse: string;
}

const DATA: Record<Co2SensorType, Co2SensorData> = {
  ndir_wall_mount: {
    accuracy: 8, range: 7, stability: 8, response: 7, csCost: 4,
    selfCalibrating: true, forDcv: true,
    principle: "ndir_dual_beam_wall_display",
    bestUse: "classroom_office_iaq_display",
  },
  ndir_duct_probe: {
    accuracy: 9, range: 7, stability: 9, response: 8, csCost: 5,
    selfCalibrating: true, forDcv: true,
    principle: "ndir_probe_duct_insert_bas",
    bestUse: "ahu_return_air_dcv_control",
  },
  photoacoustic_multi_gas: {
    accuracy: 10, range: 10, stability: 10, response: 6, csCost: 9,
    selfCalibrating: false, forDcv: false,
    principle: "photoacoustic_ir_multi_channel",
    bestUse: "laboratory_greenhouse_research",
  },
  electrochemical_portable: {
    accuracy: 6, range: 6, stability: 5, response: 9, csCost: 3,
    selfCalibrating: false, forDcv: false,
    principle: "electrochemical_cell_handheld",
    bestUse: "safety_spot_check_confined_space",
  },
  ndir_wireless_iot: {
    accuracy: 7, range: 7, stability: 7, response: 7, csCost: 6,
    selfCalibrating: true, forDcv: true,
    principle: "ndir_battery_lora_mesh_cloud",
    bestUse: "smart_building_multi_zone_iot",
  },
};

function get(t: Co2SensorType): Co2SensorData {
  return DATA[t];
}

export const accuracy = (t: Co2SensorType) => get(t).accuracy;
export const range = (t: Co2SensorType) => get(t).range;
export const stability = (t: Co2SensorType) => get(t).stability;
export const response = (t: Co2SensorType) => get(t).response;
export const csCost = (t: Co2SensorType) => get(t).csCost;
export const selfCalibrating = (t: Co2SensorType) => get(t).selfCalibrating;
export const forDcv = (t: Co2SensorType) => get(t).forDcv;
export const principle = (t: Co2SensorType) => get(t).principle;
export const bestUse = (t: Co2SensorType) => get(t).bestUse;
export const co2SensorTypes = (): Co2SensorType[] =>
  Object.keys(DATA) as Co2SensorType[];
