export type PneumaticHammerType =
  | "riveting_hammer"
  | "chipping_hammer"
  | "scaling_hammer"
  | "needle_scaler"
  | "planishing_hammer";

interface PneumaticHammerData {
  impactForce: number;
  throughput: number;
  controlPrecision: number;
  vibrationDamp: number;
  phCost: number;
  lowVibration: boolean;
  forFinish: boolean;
  hammerConfig: string;
  bestUse: string;
}

const DATA: Record<PneumaticHammerType, PneumaticHammerData> = {
  riveting_hammer: {
    impactForce: 7, throughput: 8, controlPrecision: 7, vibrationDamp: 6, phCost: 4,
    lowVibration: false, forFinish: false,
    hammerConfig: "riveting_pneumatic_hammer_piston_set_head_flush_aircraft_sheet",
    bestUse: "aircraft_skin_riveting_pneumatic_hammer_piston_set_flush_head",
  },
  chipping_hammer: {
    impactForce: 9, throughput: 7, controlPrecision: 5, vibrationDamp: 4, phCost: 3,
    lowVibration: false, forFinish: false,
    hammerConfig: "chipping_pneumatic_hammer_heavy_chisel_weld_slag_concrete_break",
    bestUse: "weld_slag_chipping_pneumatic_hammer_heavy_chisel_concrete_demo",
  },
  scaling_hammer: {
    impactForce: 6, throughput: 7, controlPrecision: 6, vibrationDamp: 5, phCost: 3,
    lowVibration: false, forFinish: false,
    hammerConfig: "scaling_pneumatic_hammer_multi_piston_rust_scale_paint_remove",
    bestUse: "ship_hull_scaling_pneumatic_hammer_multi_piston_rust_remove",
  },
  needle_scaler: {
    impactForce: 5, throughput: 6, controlPrecision: 8, vibrationDamp: 7, phCost: 5,
    lowVibration: true, forFinish: false,
    hammerConfig: "needle_scaler_pneumatic_hammer_bundle_rod_vibrate_clean_weld",
    bestUse: "weld_prep_needle_scaler_pneumatic_hammer_bundle_rod_clean",
  },
  planishing_hammer: {
    impactForce: 4, throughput: 5, controlPrecision: 10, vibrationDamp: 8, phCost: 7,
    lowVibration: true, forFinish: true,
    hammerConfig: "planishing_pneumatic_hammer_smooth_die_dolly_panel_shape_finish",
    bestUse: "auto_body_planishing_pneumatic_hammer_smooth_panel_shape_finish",
  },
};

function get(t: PneumaticHammerType): PneumaticHammerData {
  return DATA[t];
}

export const impactForce = (t: PneumaticHammerType) => get(t).impactForce;
export const throughput = (t: PneumaticHammerType) => get(t).throughput;
export const controlPrecision = (t: PneumaticHammerType) => get(t).controlPrecision;
export const vibrationDamp = (t: PneumaticHammerType) => get(t).vibrationDamp;
export const phCost = (t: PneumaticHammerType) => get(t).phCost;
export const lowVibration = (t: PneumaticHammerType) => get(t).lowVibration;
export const forFinish = (t: PneumaticHammerType) => get(t).forFinish;
export const hammerConfig = (t: PneumaticHammerType) => get(t).hammerConfig;
export const bestUse = (t: PneumaticHammerType) => get(t).bestUse;
export const pneumaticHammerTypes = (): PneumaticHammerType[] =>
  Object.keys(DATA) as PneumaticHammerType[];
