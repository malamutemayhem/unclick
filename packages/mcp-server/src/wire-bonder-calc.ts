export type WireBonderType =
  | "ball_bond_gold"
  | "ball_bond_copper"
  | "wedge_bond_aluminum"
  | "ribbon_bond"
  | "heavy_wire";

interface WireBonderData {
  bondSpeed: number;
  bondReliability: number;
  wirePitch: number;
  loopControl: number;
  wbCost: number;
  thermosonic: boolean;
  forFine: boolean;
  bonderConfig: string;
  bestUse: string;
}

const DATA: Record<WireBonderType, WireBonderData> = {
  ball_bond_gold: {
    bondSpeed: 10, bondReliability: 9, wirePitch: 9, loopControl: 9, wbCost: 8,
    thermosonic: true, forFine: true,
    bonderConfig: "ball_bond_gold_wire_capillary_thermosonic_fine_pitch_ic_package",
    bestUse: "fine_pitch_ic_package_qfp_bga_gold_ball_bond_thermosonic_wire",
  },
  ball_bond_copper: {
    bondSpeed: 9, bondReliability: 8, wirePitch: 9, loopControl: 9, wbCost: 6,
    thermosonic: true, forFine: true,
    bonderConfig: "ball_bond_copper_wire_capillary_forming_gas_shield_fine_pitch",
    bestUse: "cost_effective_ic_package_copper_ball_bond_fine_pitch_high_vol",
  },
  wedge_bond_aluminum: {
    bondSpeed: 7, bondReliability: 8, wirePitch: 7, loopControl: 7, wbCost: 5,
    thermosonic: false, forFine: false,
    bonderConfig: "wedge_bond_aluminum_wire_ultrasonic_room_temp_power_device",
    bestUse: "power_device_module_igbt_mosfet_aluminum_wedge_bond_thick_wire",
  },
  ribbon_bond: {
    bondSpeed: 6, bondReliability: 9, wirePitch: 6, loopControl: 8, wbCost: 7,
    thermosonic: false, forFine: false,
    bonderConfig: "ribbon_bond_flat_conductor_low_inductance_rf_power_module",
    bestUse: "rf_power_amplifier_module_ribbon_bond_low_inductance_flat_wire",
  },
  heavy_wire: {
    bondSpeed: 5, bondReliability: 10, wirePitch: 4, loopControl: 6, wbCost: 6,
    thermosonic: false, forFine: false,
    bonderConfig: "heavy_wire_bond_thick_aluminum_copper_power_module_high_current",
    bestUse: "high_current_power_module_ev_inverter_heavy_wire_thick_bond",
  },
};

function get(t: WireBonderType): WireBonderData {
  return DATA[t];
}

export const bondSpeed = (t: WireBonderType) => get(t).bondSpeed;
export const bondReliability = (t: WireBonderType) => get(t).bondReliability;
export const wirePitch = (t: WireBonderType) => get(t).wirePitch;
export const loopControl = (t: WireBonderType) => get(t).loopControl;
export const wbCost = (t: WireBonderType) => get(t).wbCost;
export const thermosonic = (t: WireBonderType) => get(t).thermosonic;
export const forFine = (t: WireBonderType) => get(t).forFine;
export const bonderConfig = (t: WireBonderType) => get(t).bonderConfig;
export const bestUse = (t: WireBonderType) => get(t).bestUse;
export const wireBonderTypes = (): WireBonderType[] =>
  Object.keys(DATA) as WireBonderType[];
