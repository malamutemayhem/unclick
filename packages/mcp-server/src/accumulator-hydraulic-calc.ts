export type AccumulatorHydraulicType =
  | "bladder"
  | "piston_gas"
  | "diaphragm"
  | "spring_loaded"
  | "weight_loaded";

interface AccumulatorHydraulicData {
  energyStorage: number;
  responseSpeed: number;
  flowDelivery: number;
  cycleLife: number;
  ahCost: number;
  gasCharged: boolean;
  forEmergency: boolean;
  design: string;
  bestUse: string;
}

const DATA: Record<AccumulatorHydraulicType, AccumulatorHydraulicData> = {
  bladder: {
    energyStorage: 8, responseSpeed: 10, flowDelivery: 9, cycleLife: 7, ahCost: 6,
    gasCharged: true, forEmergency: true,
    design: "rubber_bladder_inside_steel_shell_nitrogen_precharge_fast",
    bestUse: "shock_absorber_pulsation_damper_emergency_energy_store",
  },
  piston_gas: {
    energyStorage: 10, responseSpeed: 7, flowDelivery: 10, cycleLife: 9, ahCost: 8,
    gasCharged: true, forEmergency: true,
    design: "free_floating_piston_cylinder_nitrogen_gas_oil_separate",
    bestUse: "press_circuit_large_volume_store_high_flow_clamp_hold",
  },
  diaphragm: {
    energyStorage: 5, responseSpeed: 10, flowDelivery: 6, cycleLife: 8, ahCost: 4,
    gasCharged: true, forEmergency: false,
    design: "welded_diaphragm_small_volume_compact_no_piston_seal_leak",
    bestUse: "pulsation_damper_small_circuit_brake_assist_compact_mount",
  },
  spring_loaded: {
    energyStorage: 4, responseSpeed: 6, flowDelivery: 5, cycleLife: 10, ahCost: 3,
    gasCharged: false, forEmergency: false,
    design: "coil_spring_push_piston_constant_pressure_no_gas_charge",
    bestUse: "lubrication_circuit_low_pressure_constant_force_simple",
  },
  weight_loaded: {
    energyStorage: 9, responseSpeed: 3, flowDelivery: 8, cycleLife: 10, ahCost: 7,
    gasCharged: false, forEmergency: false,
    design: "dead_weight_on_piston_gravity_constant_pressure_any_volume",
    bestUse: "hydraulic_test_bench_constant_pressure_source_laboratory",
  },
};

function get(t: AccumulatorHydraulicType): AccumulatorHydraulicData {
  return DATA[t];
}

export const energyStorage = (t: AccumulatorHydraulicType) => get(t).energyStorage;
export const responseSpeed = (t: AccumulatorHydraulicType) => get(t).responseSpeed;
export const flowDelivery = (t: AccumulatorHydraulicType) => get(t).flowDelivery;
export const cycleLife = (t: AccumulatorHydraulicType) => get(t).cycleLife;
export const ahCost = (t: AccumulatorHydraulicType) => get(t).ahCost;
export const gasCharged = (t: AccumulatorHydraulicType) => get(t).gasCharged;
export const forEmergency = (t: AccumulatorHydraulicType) => get(t).forEmergency;
export const design = (t: AccumulatorHydraulicType) => get(t).design;
export const bestUse = (t: AccumulatorHydraulicType) => get(t).bestUse;
export const accumulatorHydraulicTypes = (): AccumulatorHydraulicType[] =>
  Object.keys(DATA) as AccumulatorHydraulicType[];
