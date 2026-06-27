export type HydraulicTurbineType =
  | "pelton_wheel_impulse"
  | "francis_mixed_flow"
  | "kaplan_axial_prop"
  | "turgo_impulse_angled"
  | "crossflow_banki_michell";

interface HydraulicTurbineData {
  efficiency: number;
  headRange: number;
  flowRange: number;
  partLoadEff: number;
  htCost: number;
  impulse: boolean;
  forHighHead: boolean;
  runner: string;
  bestUse: string;
}

const DATA: Record<HydraulicTurbineType, HydraulicTurbineData> = {
  pelton_wheel_impulse: {
    efficiency: 9, headRange: 10, flowRange: 4, partLoadEff: 9, htCost: 6,
    impulse: true, forHighHead: true,
    runner: "bucket_shaped_cups_single_or_multi_jet",
    bestUse: "high_head_mountain_hydro_200m_plus_alpine",
  },
  francis_mixed_flow: {
    efficiency: 10, headRange: 8, flowRange: 8, partLoadEff: 7, htCost: 7,
    impulse: false, forHighHead: false,
    runner: "curved_vane_runner_radial_to_axial_flow",
    bestUse: "medium_head_large_dam_pumped_storage_hydro",
  },
  kaplan_axial_prop: {
    efficiency: 9, headRange: 4, flowRange: 10, partLoadEff: 9, htCost: 8,
    impulse: false, forHighHead: false,
    runner: "adjustable_blade_propeller_axial_flow",
    bestUse: "low_head_high_flow_run_of_river_tidal",
  },
  turgo_impulse_angled: {
    efficiency: 8, headRange: 7, flowRange: 6, partLoadEff: 8, htCost: 5,
    impulse: true, forHighHead: true,
    runner: "angled_cup_runner_side_entry_jet_compact",
    bestUse: "medium_high_head_small_hydro_micro_hydro",
  },
  crossflow_banki_michell: {
    efficiency: 7, headRange: 6, flowRange: 7, partLoadEff: 10, htCost: 3,
    impulse: true, forHighHead: false,
    runner: "drum_shaped_runner_water_passes_twice_simple",
    bestUse: "micro_hydro_developing_region_simple_robust",
  },
};

function get(t: HydraulicTurbineType): HydraulicTurbineData {
  return DATA[t];
}

export const efficiency = (t: HydraulicTurbineType) => get(t).efficiency;
export const headRange = (t: HydraulicTurbineType) => get(t).headRange;
export const flowRange = (t: HydraulicTurbineType) => get(t).flowRange;
export const partLoadEff = (t: HydraulicTurbineType) => get(t).partLoadEff;
export const htCost = (t: HydraulicTurbineType) => get(t).htCost;
export const impulse = (t: HydraulicTurbineType) => get(t).impulse;
export const forHighHead = (t: HydraulicTurbineType) => get(t).forHighHead;
export const runner = (t: HydraulicTurbineType) => get(t).runner;
export const bestUse = (t: HydraulicTurbineType) => get(t).bestUse;
export const hydraulicTurbineTypes = (): HydraulicTurbineType[] =>
  Object.keys(DATA) as HydraulicTurbineType[];
