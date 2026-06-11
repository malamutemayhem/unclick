export type ProgressiveCavityType =
  | "single_stage_standard"
  | "multi_stage_high_press"
  | "open_hopper_feed"
  | "close_coupled_compact"
  | "dosing_metering_prec";

interface ProgressiveCavityData {
  flowSteadiness: number;
  viscosityRange: number;
  solidsHandling: number;
  selfPriming: number;
  pcCost: number;
  highPressure: boolean;
  forSludge: boolean;
  rotor: string;
  bestUse: string;
}

const DATA: Record<ProgressiveCavityType, ProgressiveCavityData> = {
  single_stage_standard: {
    flowSteadiness: 8, viscosityRange: 9, solidsHandling: 8, selfPriming: 9, pcCost: 5,
    highPressure: false, forSludge: true,
    rotor: "single_helix_chrome_plated_steel_rotor_stator",
    bestUse: "wastewater_sludge_transfer_thickened_biosolids",
  },
  multi_stage_high_press: {
    flowSteadiness: 9, viscosityRange: 8, solidsHandling: 7, selfPriming: 8, pcCost: 7,
    highPressure: true, forSludge: false,
    rotor: "multi_lobe_rotor_stacked_stator_high_pressure",
    bestUse: "oil_well_downhole_artificial_lift_production",
  },
  open_hopper_feed: {
    flowSteadiness: 7, viscosityRange: 10, solidsHandling: 10, selfPriming: 7, pcCost: 6,
    highPressure: false, forSludge: true,
    rotor: "wide_throat_hopper_auger_feed_assist_rotor",
    bestUse: "dewatered_cake_paste_high_solids_pump_feed",
  },
  close_coupled_compact: {
    flowSteadiness: 8, viscosityRange: 7, solidsHandling: 6, selfPriming: 8, pcCost: 4,
    highPressure: false, forSludge: false,
    rotor: "close_coupled_motor_compact_footprint_rotor",
    bestUse: "chemical_dosing_food_transfer_compact_install",
  },
  dosing_metering_prec: {
    flowSteadiness: 10, viscosityRange: 8, solidsHandling: 5, selfPriming: 7, pcCost: 6,
    highPressure: false, forSludge: false,
    rotor: "precision_machined_rotor_vfd_controlled_dose",
    bestUse: "polymer_dosing_flocculant_injection_precise",
  },
};

function get(t: ProgressiveCavityType): ProgressiveCavityData {
  return DATA[t];
}

export const flowSteadiness = (t: ProgressiveCavityType) => get(t).flowSteadiness;
export const viscosityRange = (t: ProgressiveCavityType) => get(t).viscosityRange;
export const solidsHandling = (t: ProgressiveCavityType) => get(t).solidsHandling;
export const selfPriming = (t: ProgressiveCavityType) => get(t).selfPriming;
export const pcCost = (t: ProgressiveCavityType) => get(t).pcCost;
export const highPressure = (t: ProgressiveCavityType) => get(t).highPressure;
export const forSludge = (t: ProgressiveCavityType) => get(t).forSludge;
export const rotor = (t: ProgressiveCavityType) => get(t).rotor;
export const bestUse = (t: ProgressiveCavityType) => get(t).bestUse;
export const progressiveCavityTypes = (): ProgressiveCavityType[] =>
  Object.keys(DATA) as ProgressiveCavityType[];
