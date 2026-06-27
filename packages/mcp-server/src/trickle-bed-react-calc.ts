export type TrickleBedReactType =
  | "downflow_cocurrent"
  | "upflow_flooded_bed"
  | "pulsing_flow_regime"
  | "multi_bed_quench"
  | "monolith_structured";

interface TrickleBedReactData {
  conversion: number;
  liquidDistrib: number;
  heatManage: number;
  catalystLife: number;
  trCost: number;
  cocurrent: boolean;
  forHydrotreat: boolean;
  packing: string;
  bestUse: string;
}

const DATA: Record<TrickleBedReactType, TrickleBedReactData> = {
  downflow_cocurrent: {
    conversion: 8, liquidDistrib: 6, heatManage: 6, catalystLife: 8, trCost: 5,
    cocurrent: true, forHydrotreat: true,
    packing: "random_catalyst_pellet_extrudate_bed",
    bestUse: "hydrotreater_diesel_desulfurize_refine",
  },
  upflow_flooded_bed: {
    conversion: 7, liquidDistrib: 9, heatManage: 7, catalystLife: 7, trCost: 6,
    cocurrent: false, forHydrotreat: false,
    packing: "flooded_bed_complete_wet_catalyst",
    bestUse: "wastewater_catalytic_oxidation_low_gas",
  },
  pulsing_flow_regime: {
    conversion: 9, liquidDistrib: 8, heatManage: 7, catalystLife: 6, trCost: 7,
    cocurrent: true, forHydrotreat: true,
    packing: "high_flow_pulse_regime_enhanced_mass",
    bestUse: "hydrocracking_heavy_oil_deep_conversion",
  },
  multi_bed_quench: {
    conversion: 9, liquidDistrib: 7, heatManage: 10, catalystLife: 9, trCost: 9,
    cocurrent: true, forHydrotreat: true,
    packing: "stacked_bed_quench_box_redistribute",
    bestUse: "hydroprocess_exothermic_temp_control",
  },
  monolith_structured: {
    conversion: 8, liquidDistrib: 10, heatManage: 8, catalystLife: 10, trCost: 10,
    cocurrent: true, forHydrotreat: false,
    packing: "ceramic_metal_monolith_channel_coat",
    bestUse: "auto_exhaust_gas_clean_low_pressure_drop",
  },
};

function get(t: TrickleBedReactType): TrickleBedReactData {
  return DATA[t];
}

export const conversion = (t: TrickleBedReactType) => get(t).conversion;
export const liquidDistrib = (t: TrickleBedReactType) => get(t).liquidDistrib;
export const heatManage = (t: TrickleBedReactType) => get(t).heatManage;
export const catalystLife = (t: TrickleBedReactType) => get(t).catalystLife;
export const trCost = (t: TrickleBedReactType) => get(t).trCost;
export const cocurrent = (t: TrickleBedReactType) => get(t).cocurrent;
export const forHydrotreat = (t: TrickleBedReactType) => get(t).forHydrotreat;
export const packing = (t: TrickleBedReactType) => get(t).packing;
export const bestUse = (t: TrickleBedReactType) => get(t).bestUse;
export const trickleBedReactTypes = (): TrickleBedReactType[] =>
  Object.keys(DATA) as TrickleBedReactType[];
