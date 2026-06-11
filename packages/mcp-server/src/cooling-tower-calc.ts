export type CoolingTowerType =
  | "induced_draft_counterflow"
  | "forced_draft_crossflow"
  | "natural_draft_hyperbolic"
  | "hybrid_plume_abatement"
  | "closed_circuit_fluid";

interface CoolingTowerData {
  efficiency: number;
  capacity: number;
  footprint: number;
  driftLoss: number;
  ctCost: number;
  evaporative: boolean;
  forLargeScale: boolean;
  fill: string;
  bestUse: string;
}

const DATA: Record<CoolingTowerType, CoolingTowerData> = {
  induced_draft_counterflow: {
    efficiency: 9, capacity: 8, footprint: 6, driftLoss: 4, ctCost: 5,
    evaporative: true, forLargeScale: true,
    fill: "film_fill_pvc_counterflow_vertical",
    bestUse: "hvac_process_cooling_medium_large_plant",
  },
  forced_draft_crossflow: {
    efficiency: 7, capacity: 7, footprint: 7, driftLoss: 5, ctCost: 4,
    evaporative: true, forLargeScale: false,
    fill: "splash_fill_bar_crossflow_horizontal",
    bestUse: "small_industrial_easy_maintenance_access",
  },
  natural_draft_hyperbolic: {
    efficiency: 10, capacity: 10, footprint: 3, driftLoss: 3, ctCost: 10,
    evaporative: true, forLargeScale: true,
    fill: "concrete_shell_natural_stack_effect",
    bestUse: "power_station_large_continuous_base_load",
  },
  hybrid_plume_abatement: {
    efficiency: 8, capacity: 7, footprint: 5, driftLoss: 2, ctCost: 7,
    evaporative: true, forLargeScale: true,
    fill: "combined_wet_dry_section_plume_free",
    bestUse: "urban_site_visible_plume_restricted",
  },
  closed_circuit_fluid: {
    efficiency: 6, capacity: 5, footprint: 8, driftLoss: 1, ctCost: 6,
    evaporative: false, forLargeScale: false,
    fill: "coil_tube_closed_loop_no_contact",
    bestUse: "clean_fluid_loop_no_contamination_risk",
  },
};

function get(t: CoolingTowerType): CoolingTowerData {
  return DATA[t];
}

export const efficiency = (t: CoolingTowerType) => get(t).efficiency;
export const capacity = (t: CoolingTowerType) => get(t).capacity;
export const footprint = (t: CoolingTowerType) => get(t).footprint;
export const driftLoss = (t: CoolingTowerType) => get(t).driftLoss;
export const ctCost = (t: CoolingTowerType) => get(t).ctCost;
export const evaporative = (t: CoolingTowerType) => get(t).evaporative;
export const forLargeScale = (t: CoolingTowerType) => get(t).forLargeScale;
export const fill = (t: CoolingTowerType) => get(t).fill;
export const bestUse = (t: CoolingTowerType) => get(t).bestUse;
export const coolingTowerTypes = (): CoolingTowerType[] =>
  Object.keys(DATA) as CoolingTowerType[];
