export type JigDyeingType =
  | "open_width_standard"
  | "pressurized_closed"
  | "jumbo_high_capacity"
  | "hot_air_jig"
  | "combined_wash_jig";

interface JigDyeingData {
  dyeEvenness: number;
  fabricCapacity: number;
  waterUsage: number;
  cycleTime: number;
  jgCost: number;
  enclosed: boolean;
  forHeavy: boolean;
  jigConfig: string;
  bestUse: string;
}

const DATA: Record<JigDyeingType, JigDyeingData> = {
  open_width_standard: {
    dyeEvenness: 7, fabricCapacity: 7, waterUsage: 6, cycleTime: 6, jgCost: 4,
    enclosed: false, forHeavy: false,
    jigConfig: "two_roller_open_width_fabric_pass_through_dye_trough_batch",
    bestUse: "woven_cotton_open_width_dyeing_batch_process_medium_volume",
  },
  pressurized_closed: {
    dyeEvenness: 9, fabricCapacity: 8, waterUsage: 8, cycleTime: 8, jgCost: 8,
    enclosed: true, forHeavy: false,
    jigConfig: "sealed_pressure_vessel_jig_high_temp_disperse_dye_polyester",
    bestUse: "polyester_blend_woven_high_temp_disperse_dye_pressurized_batch",
  },
  jumbo_high_capacity: {
    dyeEvenness: 7, fabricCapacity: 10, waterUsage: 5, cycleTime: 5, jgCost: 7,
    enclosed: false, forHeavy: true,
    jigConfig: "large_diameter_roller_heavy_duty_frame_high_fabric_load_batch",
    bestUse: "heavy_denim_canvas_twill_high_gsm_fabric_large_batch_dyeing",
  },
  hot_air_jig: {
    dyeEvenness: 8, fabricCapacity: 6, waterUsage: 9, cycleTime: 9, jgCost: 6,
    enclosed: true, forHeavy: false,
    jigConfig: "hot_air_circulation_jig_fast_dry_cure_dye_fixation_combined",
    bestUse: "reactive_dye_fixation_combined_dyeing_drying_energy_saving",
  },
  combined_wash_jig: {
    dyeEvenness: 8, fabricCapacity: 8, waterUsage: 10, cycleTime: 7, jgCost: 9,
    enclosed: true, forHeavy: true,
    jigConfig: "multi_compartment_dye_wash_rinse_combined_single_machine_jig",
    bestUse: "dye_and_wash_combined_process_reduce_handling_water_efficient",
  },
};

function get(t: JigDyeingType): JigDyeingData {
  return DATA[t];
}

export const dyeEvenness = (t: JigDyeingType) => get(t).dyeEvenness;
export const fabricCapacity = (t: JigDyeingType) => get(t).fabricCapacity;
export const waterUsage = (t: JigDyeingType) => get(t).waterUsage;
export const cycleTime = (t: JigDyeingType) => get(t).cycleTime;
export const jgCost = (t: JigDyeingType) => get(t).jgCost;
export const enclosed = (t: JigDyeingType) => get(t).enclosed;
export const forHeavy = (t: JigDyeingType) => get(t).forHeavy;
export const jigConfig = (t: JigDyeingType) => get(t).jigConfig;
export const bestUse = (t: JigDyeingType) => get(t).bestUse;
export const jigDyeingTypes = (): JigDyeingType[] =>
  Object.keys(DATA) as JigDyeingType[];
