export type PressureVesselType =
  | "cylindrical_horizontal"
  | "cylindrical_vertical"
  | "spherical_storage"
  | "jacketed_reactor"
  | "multilayer_wrap";

interface PressureVesselData {
  pressure: number;
  volume: number;
  efficiency: number;
  inspection: number;
  pvCost: number;
  codeStamped: boolean;
  forHighPress: boolean;
  head: string;
  bestUse: string;
}

const DATA: Record<PressureVesselType, PressureVesselData> = {
  cylindrical_horizontal: {
    pressure: 8, volume: 8, efficiency: 7, inspection: 9, pvCost: 6,
    codeStamped: true, forHighPress: false,
    head: "ellipsoidal_2_1_flanged_dished",
    bestUse: "process_separator_heat_exchanger",
  },
  cylindrical_vertical: {
    pressure: 8, volume: 7, efficiency: 7, inspection: 8, pvCost: 6,
    codeStamped: true, forHighPress: false,
    head: "torispherical_asme_flanged_dished",
    bestUse: "distillation_column_reactor_tower",
  },
  spherical_storage: {
    pressure: 9, volume: 10, efficiency: 10, inspection: 6, pvCost: 9,
    codeStamped: true, forHighPress: true,
    head: "full_sphere_no_seam_optimal_stress",
    bestUse: "lpg_butane_large_volume_gas_store",
  },
  jacketed_reactor: {
    pressure: 7, volume: 6, efficiency: 6, inspection: 7, pvCost: 8,
    codeStamped: true, forHighPress: false,
    head: "dished_agitator_nozzle_jacket_coil",
    bestUse: "chemical_reactor_pharma_temp_control",
  },
  multilayer_wrap: {
    pressure: 10, volume: 7, efficiency: 8, inspection: 5, pvCost: 10,
    codeStamped: true, forHighPress: true,
    head: "forged_monobloc_wire_wrap_shrink",
    bestUse: "ammonia_urea_ultra_high_pressure",
  },
};

function get(t: PressureVesselType): PressureVesselData {
  return DATA[t];
}

export const pressure = (t: PressureVesselType) => get(t).pressure;
export const volume = (t: PressureVesselType) => get(t).volume;
export const efficiency = (t: PressureVesselType) => get(t).efficiency;
export const inspection = (t: PressureVesselType) => get(t).inspection;
export const pvCost = (t: PressureVesselType) => get(t).pvCost;
export const codeStamped = (t: PressureVesselType) => get(t).codeStamped;
export const forHighPress = (t: PressureVesselType) => get(t).forHighPress;
export const head = (t: PressureVesselType) => get(t).head;
export const bestUse = (t: PressureVesselType) => get(t).bestUse;
export const pressureVesselTypes = (): PressureVesselType[] =>
  Object.keys(DATA) as PressureVesselType[];
