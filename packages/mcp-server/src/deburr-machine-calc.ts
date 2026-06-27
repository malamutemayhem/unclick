export type DeburrMachineType =
  | "brush_deburr"
  | "thermal_energy_deburr"
  | "electrochemical_deburr"
  | "cryogenic_deburr"
  | "waterjet_deburr";

interface DeburrMachineData {
  edgeQuality: number;
  throughput: number;
  accessibility: number;
  repeatability: number;
  dmCost: number;
  contactFree: boolean;
  forInternalEdge: boolean;
  machineConfig: string;
  bestUse: string;
}

const DATA: Record<DeburrMachineType, DeburrMachineData> = {
  brush_deburr: {
    edgeQuality: 6, throughput: 9, accessibility: 5, repeatability: 7, dmCost: 4,
    contactFree: false, forInternalEdge: false,
    machineConfig: "brush_deburr_machine_rotating_abrasive_filament_flat_surface_edge",
    bestUse: "sheet_metal_brush_deburr_machine_flat_surface_edge_round_fast",
  },
  thermal_energy_deburr: {
    edgeQuality: 9, throughput: 8, accessibility: 10, repeatability: 10, dmCost: 9,
    contactFree: true, forInternalEdge: true,
    machineConfig: "thermal_energy_deburr_gas_chamber_ignite_burn_flash_all_burr_once",
    bestUse: "hydraulic_valve_thermal_energy_deburr_all_internal_burr_remove_once",
  },
  electrochemical_deburr: {
    edgeQuality: 10, throughput: 7, accessibility: 9, repeatability: 10, dmCost: 8,
    contactFree: true, forInternalEdge: true,
    machineConfig: "electrochemical_deburr_electrolyte_dissolve_burr_precise_edge_radius",
    bestUse: "gear_tooth_electrochemical_deburr_precise_edge_radius_no_stress",
  },
  cryogenic_deburr: {
    edgeQuality: 7, throughput: 8, accessibility: 7, repeatability: 8, dmCost: 6,
    contactFree: false, forInternalEdge: false,
    machineConfig: "cryogenic_deburr_machine_freeze_embrittle_blast_media_break_flash",
    bestUse: "rubber_molding_cryogenic_deburr_freeze_embrittle_flash_break_clean",
  },
  waterjet_deburr: {
    edgeQuality: 8, throughput: 7, accessibility: 8, repeatability: 9, dmCost: 7,
    contactFree: true, forInternalEdge: true,
    machineConfig: "waterjet_deburr_machine_high_pressure_water_remove_burr_clean_part",
    bestUse: "engine_block_waterjet_deburr_high_pressure_clean_internal_passage",
  },
};

function get(t: DeburrMachineType): DeburrMachineData {
  return DATA[t];
}

export const edgeQuality = (t: DeburrMachineType) => get(t).edgeQuality;
export const throughput = (t: DeburrMachineType) => get(t).throughput;
export const accessibility = (t: DeburrMachineType) => get(t).accessibility;
export const repeatability = (t: DeburrMachineType) => get(t).repeatability;
export const dmCost = (t: DeburrMachineType) => get(t).dmCost;
export const contactFree = (t: DeburrMachineType) => get(t).contactFree;
export const forInternalEdge = (t: DeburrMachineType) => get(t).forInternalEdge;
export const machineConfig = (t: DeburrMachineType) => get(t).machineConfig;
export const bestUse = (t: DeburrMachineType) => get(t).bestUse;
export const deburrMachineTypes = (): DeburrMachineType[] =>
  Object.keys(DATA) as DeburrMachineType[];
