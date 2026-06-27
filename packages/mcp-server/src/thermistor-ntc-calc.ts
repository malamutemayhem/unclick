export type ThermistorNtcType =
  | "bead_ntc_fast_response"
  | "disc_ntc_power_surge"
  | "chip_ntc_smd_pcb"
  | "probe_ntc_immersion"
  | "ring_lug_ntc_surface";

interface ThermistorNtcData {
  accuracy: number;
  response: number;
  stability: number;
  interchangeability: number;
  tnCost: number;
  linearized: boolean;
  forPrecision: boolean;
  construction: string;
  bestUse: string;
}

const DATA: Record<ThermistorNtcType, ThermistorNtcData> = {
  bead_ntc_fast_response: {
    accuracy: 7, response: 10, stability: 6, interchangeability: 5, tnCost: 3,
    linearized: false, forPrecision: false,
    construction: "glass_bead_encapsulated_tiny_mass",
    bestUse: "air_temperature_fast_change_detect",
  },
  disc_ntc_power_surge: {
    accuracy: 4, response: 5, stability: 7, interchangeability: 4, tnCost: 2,
    linearized: false, forPrecision: false,
    construction: "ceramic_disc_inrush_current_limit",
    bestUse: "power_supply_inrush_current_suppress",
  },
  chip_ntc_smd_pcb: {
    accuracy: 8, response: 8, stability: 8, interchangeability: 9, tnCost: 2,
    linearized: false, forPrecision: true,
    construction: "multilayer_ceramic_chip_smd_reflow",
    bestUse: "pcb_board_battery_pack_thermal_manage",
  },
  probe_ntc_immersion: {
    accuracy: 9, response: 6, stability: 8, interchangeability: 8, tnCost: 4,
    linearized: true, forPrecision: true,
    construction: "epoxy_or_steel_probe_tip_immerse",
    bestUse: "hvac_medical_incubator_precise_control",
  },
  ring_lug_ntc_surface: {
    accuracy: 6, response: 7, stability: 7, interchangeability: 6, tnCost: 3,
    linearized: false, forPrecision: false,
    construction: "ring_terminal_bolt_on_surface_contact",
    bestUse: "motor_winding_bearing_surface_monitor",
  },
};

function get(t: ThermistorNtcType): ThermistorNtcData {
  return DATA[t];
}

export const accuracy = (t: ThermistorNtcType) => get(t).accuracy;
export const response = (t: ThermistorNtcType) => get(t).response;
export const stability = (t: ThermistorNtcType) => get(t).stability;
export const interchangeability = (t: ThermistorNtcType) => get(t).interchangeability;
export const tnCost = (t: ThermistorNtcType) => get(t).tnCost;
export const linearized = (t: ThermistorNtcType) => get(t).linearized;
export const forPrecision = (t: ThermistorNtcType) => get(t).forPrecision;
export const construction = (t: ThermistorNtcType) => get(t).construction;
export const bestUse = (t: ThermistorNtcType) => get(t).bestUse;
export const thermistorNtcTypes = (): ThermistorNtcType[] =>
  Object.keys(DATA) as ThermistorNtcType[];
