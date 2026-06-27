export type UvDisinfectionType =
  | "low_pressure_mono"
  | "low_pressure_amalgam"
  | "medium_pressure_poly"
  | "uv_led_compact"
  | "open_channel_gravity";

interface UvDisinfectionData {
  germicidalEff: number;
  energyEff: number;
  lampLife: number;
  uvtTolerance: number;
  uvCost: number;
  closedVessel: boolean;
  forDrinking: boolean;
  lamp: string;
  bestUse: string;
}

const DATA: Record<UvDisinfectionType, UvDisinfectionData> = {
  low_pressure_mono: {
    germicidalEff: 8, energyEff: 9, lampLife: 8, uvtTolerance: 5, uvCost: 4,
    closedVessel: true, forDrinking: true,
    lamp: "monochromatic_254nm_low_pressure_mercury_arc",
    bestUse: "small_drinking_water_system_point_of_entry",
  },
  low_pressure_amalgam: {
    germicidalEff: 9, energyEff: 9, lampLife: 9, uvtTolerance: 6, uvCost: 6,
    closedVessel: true, forDrinking: true,
    lamp: "amalgam_254nm_high_output_low_pressure_tube",
    bestUse: "municipal_drinking_water_medium_flow_rate",
  },
  medium_pressure_poly: {
    germicidalEff: 10, energyEff: 5, lampLife: 5, uvtTolerance: 8, uvCost: 7,
    closedVessel: true, forDrinking: false,
    lamp: "polychromatic_broadband_medium_pressure_arc",
    bestUse: "industrial_wastewater_reuse_advanced_oxidation",
  },
  uv_led_compact: {
    germicidalEff: 7, energyEff: 7, lampLife: 10, uvtTolerance: 4, uvCost: 8,
    closedVessel: true, forDrinking: true,
    lamp: "uvc_led_265nm_solid_state_compact_module",
    bestUse: "point_of_use_faucet_dispenser_emergency_field",
  },
  open_channel_gravity: {
    germicidalEff: 8, energyEff: 8, lampLife: 7, uvtTolerance: 7, uvCost: 5,
    closedVessel: false, forDrinking: false,
    lamp: "low_pressure_lamp_bank_open_channel_gravity",
    bestUse: "wastewater_effluent_open_channel_large_flow",
  },
};

function get(t: UvDisinfectionType): UvDisinfectionData {
  return DATA[t];
}

export const germicidalEff = (t: UvDisinfectionType) => get(t).germicidalEff;
export const energyEff = (t: UvDisinfectionType) => get(t).energyEff;
export const lampLife = (t: UvDisinfectionType) => get(t).lampLife;
export const uvtTolerance = (t: UvDisinfectionType) => get(t).uvtTolerance;
export const uvCost = (t: UvDisinfectionType) => get(t).uvCost;
export const closedVessel = (t: UvDisinfectionType) => get(t).closedVessel;
export const forDrinking = (t: UvDisinfectionType) => get(t).forDrinking;
export const lamp = (t: UvDisinfectionType) => get(t).lamp;
export const bestUse = (t: UvDisinfectionType) => get(t).bestUse;
export const uvDisinfectionTypes = (): UvDisinfectionType[] =>
  Object.keys(DATA) as UvDisinfectionType[];
