export type VesselInsulationType =
  | "mineral_wool_blanket"
  | "calcium_silicate_block"
  | "cellular_glass_foam"
  | "aerogel_blanket_thin"
  | "ceramic_fiber_module";

interface VesselInsulationData {
  thermalResist: number;
  tempLimit: number;
  moistureResist: number;
  compressiveStr: number;
  viCost: number;
  hydrophobic: boolean;
  forHighTemp: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<VesselInsulationType, VesselInsulationData> = {
  mineral_wool_blanket: {
    thermalResist: 7, tempLimit: 7, moistureResist: 4, compressiveStr: 3, viCost: 3,
    hydrophobic: false, forHighTemp: false,
    material: "rock_wool_slag_wool_blanket_wired_mat",
    bestUse: "general_vessel_pipe_moderate_temp_insulation",
  },
  calcium_silicate_block: {
    thermalResist: 6, tempLimit: 8, moistureResist: 5, compressiveStr: 9, viCost: 5,
    hydrophobic: false, forHighTemp: true,
    material: "calcium_silicate_preformed_block_pipe_cover",
    bestUse: "high_temp_vessel_steam_pipe_walkable_surface",
  },
  cellular_glass_foam: {
    thermalResist: 8, tempLimit: 6, moistureResist: 10, compressiveStr: 8, viCost: 7,
    hydrophobic: true, forHighTemp: false,
    material: "closed_cell_glass_foam_impermeable_rigid_block",
    bestUse: "cold_service_tank_base_below_ambient_moisture",
  },
  aerogel_blanket_thin: {
    thermalResist: 10, tempLimit: 8, moistureResist: 8, compressiveStr: 4, viCost: 10,
    hydrophobic: true, forHighTemp: true,
    material: "silica_aerogel_fiber_reinforced_flexible_sheet",
    bestUse: "space_limited_subsea_pipeline_thin_insulation",
  },
  ceramic_fiber_module: {
    thermalResist: 8, tempLimit: 10, moistureResist: 6, compressiveStr: 5, viCost: 8,
    hydrophobic: false, forHighTemp: true,
    material: "alumina_silica_ceramic_fiber_folded_module",
    bestUse: "furnace_kiln_boiler_very_high_temp_lining",
  },
};

function get(t: VesselInsulationType): VesselInsulationData {
  return DATA[t];
}

export const thermalResist = (t: VesselInsulationType) => get(t).thermalResist;
export const tempLimit = (t: VesselInsulationType) => get(t).tempLimit;
export const moistureResist = (t: VesselInsulationType) => get(t).moistureResist;
export const compressiveStr = (t: VesselInsulationType) => get(t).compressiveStr;
export const viCost_ = (t: VesselInsulationType) => get(t).viCost;
export const hydrophobic = (t: VesselInsulationType) => get(t).hydrophobic;
export const forHighTemp = (t: VesselInsulationType) => get(t).forHighTemp;
export const material = (t: VesselInsulationType) => get(t).material;
export const bestUse = (t: VesselInsulationType) => get(t).bestUse;
export const vesselInsulationTypes = (): VesselInsulationType[] =>
  Object.keys(DATA) as VesselInsulationType[];
