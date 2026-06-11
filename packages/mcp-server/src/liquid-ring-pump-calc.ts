export type LiquidRingPumpType =
  | "single_stage_lr"
  | "two_stage_lr"
  | "recirculate_lr"
  | "compressor_lr"
  | "hybrid_lr";

interface LiquidRingPumpData {
  vacuumDepth: number;
  throughput: number;
  gasHandling: number;
  sealLiquidUse: number;
  lrCost: number;
  isothermal: boolean;
  forChemical: boolean;
  pumpConfig: string;
  bestUse: string;
}

const DATA: Record<LiquidRingPumpType, LiquidRingPumpData> = {
  single_stage_lr: {
    vacuumDepth: 6, throughput: 8, gasHandling: 8, sealLiquidUse: 6, lrCost: 5,
    isothermal: true, forChemical: true,
    pumpConfig: "single_stage_lr_liquid_ring_pump_one_impeller_water_seal_vacuum",
    bestUse: "process_vacuum_single_stage_lr_liquid_ring_pump_water_seal_gas",
  },
  two_stage_lr: {
    vacuumDepth: 8, throughput: 7, gasHandling: 8, sealLiquidUse: 7, lrCost: 7,
    isothermal: true, forChemical: true,
    pumpConfig: "two_stage_lr_liquid_ring_pump_dual_impeller_deeper_vacuum_series",
    bestUse: "distillation_two_stage_lr_liquid_ring_pump_deep_vacuum_condense",
  },
  recirculate_lr: {
    vacuumDepth: 7, throughput: 8, gasHandling: 7, sealLiquidUse: 8, lrCost: 6,
    isothermal: true, forChemical: false,
    pumpConfig: "recirculate_lr_liquid_ring_pump_closed_loop_seal_water_conserve",
    bestUse: "food_process_recirculate_lr_liquid_ring_pump_conserve_seal_water",
  },
  compressor_lr: {
    vacuumDepth: 4, throughput: 8, gasHandling: 9, sealLiquidUse: 6, lrCost: 6,
    isothermal: true, forChemical: true,
    pumpConfig: "compressor_lr_liquid_ring_pump_boost_gas_pressure_cool_compress",
    bestUse: "flare_gas_compressor_lr_liquid_ring_pump_recover_gas_boost_press",
  },
  hybrid_lr: {
    vacuumDepth: 9, throughput: 6, gasHandling: 7, sealLiquidUse: 5, lrCost: 9,
    isothermal: true, forChemical: true,
    pumpConfig: "hybrid_lr_liquid_ring_pump_roots_booster_front_deep_vacuum_combo",
    bestUse: "pharma_dry_hybrid_lr_liquid_ring_pump_deep_vacuum_solvent_strip",
  },
};

function get(t: LiquidRingPumpType): LiquidRingPumpData {
  return DATA[t];
}

export const vacuumDepth = (t: LiquidRingPumpType) => get(t).vacuumDepth;
export const throughput = (t: LiquidRingPumpType) => get(t).throughput;
export const gasHandling = (t: LiquidRingPumpType) => get(t).gasHandling;
export const sealLiquidUse = (t: LiquidRingPumpType) => get(t).sealLiquidUse;
export const lrCost = (t: LiquidRingPumpType) => get(t).lrCost;
export const isothermal = (t: LiquidRingPumpType) => get(t).isothermal;
export const forChemical = (t: LiquidRingPumpType) => get(t).forChemical;
export const pumpConfig = (t: LiquidRingPumpType) => get(t).pumpConfig;
export const bestUse = (t: LiquidRingPumpType) => get(t).bestUse;
export const liquidRingPumpTypes = (): LiquidRingPumpType[] =>
  Object.keys(DATA) as LiquidRingPumpType[];
