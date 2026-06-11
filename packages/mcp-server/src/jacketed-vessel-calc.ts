export type JacketedVesselType =
  | "conventional_jacket"
  | "half_pipe_coil"
  | "dimple_jacket"
  | "limpet_coil"
  | "plate_coil_clamp";

interface JacketedVesselData {
  heatTransfer: number;
  pressureRating: number;
  uniformity: number;
  cleanability: number;
  jvCost: number;
  highPressure: boolean;
  forPharma: boolean;
  jacket: string;
  bestUse: string;
}

const DATA: Record<JacketedVesselType, JacketedVesselData> = {
  conventional_jacket: {
    heatTransfer: 6, pressureRating: 7, uniformity: 6, cleanability: 8, jvCost: 5,
    highPressure: false, forPharma: true,
    jacket: "full_annular_jacket_welded_shell_baffled",
    bestUse: "pharma_batch_reactor_moderate_heat_duty",
  },
  half_pipe_coil: {
    heatTransfer: 9, pressureRating: 10, uniformity: 8, cleanability: 6, jvCost: 8,
    highPressure: true, forPharma: false,
    jacket: "half_pipe_coil_welded_spiral_high_pressure",
    bestUse: "high_pressure_reactor_exothermic_polymer",
  },
  dimple_jacket: {
    heatTransfer: 7, pressureRating: 5, uniformity: 7, cleanability: 9, jvCost: 4,
    highPressure: false, forPharma: true,
    jacket: "laser_welded_dimple_plate_lightweight_jacket",
    bestUse: "brewery_fermentation_dairy_process_vessel",
  },
  limpet_coil: {
    heatTransfer: 8, pressureRating: 8, uniformity: 7, cleanability: 5, jvCost: 6,
    highPressure: true, forPharma: false,
    jacket: "external_limpet_coil_retrofit_existing_vessel",
    bestUse: "retrofit_heat_transfer_existing_storage_tank",
  },
  plate_coil_clamp: {
    heatTransfer: 7, pressureRating: 6, uniformity: 9, cleanability: 7, jvCost: 5,
    highPressure: false, forPharma: false,
    jacket: "clamp_on_plate_coil_modular_removable",
    bestUse: "modular_heating_cooling_flexible_process_duty",
  },
};

function get(t: JacketedVesselType): JacketedVesselData {
  return DATA[t];
}

export const heatTransfer = (t: JacketedVesselType) => get(t).heatTransfer;
export const pressureRating = (t: JacketedVesselType) => get(t).pressureRating;
export const uniformity = (t: JacketedVesselType) => get(t).uniformity;
export const cleanability = (t: JacketedVesselType) => get(t).cleanability;
export const jvCost = (t: JacketedVesselType) => get(t).jvCost;
export const highPressure = (t: JacketedVesselType) => get(t).highPressure;
export const forPharma = (t: JacketedVesselType) => get(t).forPharma;
export const jacket = (t: JacketedVesselType) => get(t).jacket;
export const bestUse = (t: JacketedVesselType) => get(t).bestUse;
export const jacketedVesselTypes = (): JacketedVesselType[] =>
  Object.keys(DATA) as JacketedVesselType[];
