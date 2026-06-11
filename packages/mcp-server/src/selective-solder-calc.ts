export type SelectiveSolderType =
  | "mini_wave"
  | "dip_solder"
  | "laser_solder"
  | "multi_nozzle"
  | "point_solder";

interface SelectiveSolderData {
  solderQuality: number;
  throughput: number;
  thermalPrecision: number;
  bridgeRisk: number;
  ssCost: number;
  contactFree: boolean;
  forMixed: boolean;
  solderConfig: string;
  bestUse: string;
}

const DATA: Record<SelectiveSolderType, SelectiveSolderData> = {
  mini_wave: {
    solderQuality: 8, throughput: 8, thermalPrecision: 7, bridgeRisk: 5, ssCost: 7,
    contactFree: false, forMixed: true,
    solderConfig: "mini_wave_selective_solder_small_nozzle_pump_wave_contact_joint",
    bestUse: "mixed_tech_pcb_mini_wave_selective_solder_through_hole_pth",
  },
  dip_solder: {
    solderQuality: 7, throughput: 9, thermalPrecision: 5, bridgeRisk: 4, ssCost: 5,
    contactFree: false, forMixed: false,
    solderConfig: "dip_selective_solder_pot_mask_dip_contact_coat_joint_batch",
    bestUse: "simple_pth_dip_selective_solder_masked_batch_solder_pot",
  },
  laser_solder: {
    solderQuality: 10, throughput: 5, thermalPrecision: 10, bridgeRisk: 9, ssCost: 10,
    contactFree: true, forMixed: true,
    solderConfig: "laser_selective_solder_focused_beam_precise_heat_reflow_joint",
    bestUse: "precision_laser_selective_solder_thermal_sensitive_fine_pitch",
  },
  multi_nozzle: {
    solderQuality: 9, throughput: 9, thermalPrecision: 8, bridgeRisk: 7, ssCost: 9,
    contactFree: false, forMixed: true,
    solderConfig: "multi_nozzle_selective_solder_parallel_nozzle_simultaneous_joint",
    bestUse: "high_volume_multi_nozzle_selective_solder_parallel_pth_fast",
  },
  point_solder: {
    solderQuality: 8, throughput: 4, thermalPrecision: 9, bridgeRisk: 8, ssCost: 6,
    contactFree: false, forMixed: true,
    solderConfig: "point_selective_solder_iron_tip_single_joint_precise_rework",
    bestUse: "rework_repair_point_selective_solder_single_joint_iron_tip",
  },
};

function get(t: SelectiveSolderType): SelectiveSolderData {
  return DATA[t];
}

export const solderQuality = (t: SelectiveSolderType) => get(t).solderQuality;
export const throughput = (t: SelectiveSolderType) => get(t).throughput;
export const thermalPrecision = (t: SelectiveSolderType) => get(t).thermalPrecision;
export const bridgeRisk = (t: SelectiveSolderType) => get(t).bridgeRisk;
export const ssCost = (t: SelectiveSolderType) => get(t).ssCost;
export const contactFree = (t: SelectiveSolderType) => get(t).contactFree;
export const forMixed = (t: SelectiveSolderType) => get(t).forMixed;
export const solderConfig = (t: SelectiveSolderType) => get(t).solderConfig;
export const bestUse = (t: SelectiveSolderType) => get(t).bestUse;
export const selectiveSolderTypes = (): SelectiveSolderType[] =>
  Object.keys(DATA) as SelectiveSolderType[];
