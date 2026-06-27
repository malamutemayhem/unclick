export type CompressionMoldType =
  | "hydraulic_upstroke"
  | "hydraulic_downstroke"
  | "vacuum_compression"
  | "transfer_mold"
  | "isostatic_press";

interface CompressionMoldData {
  clampForce: number;
  cycleTime: number;
  partComplexity: number;
  materialWaste: number;
  cmCost___: number;
  heated: boolean;
  forThermoset: boolean;
  press: string;
  bestUse: string;
}

const DATA: Record<CompressionMoldType, CompressionMoldData> = {
  hydraulic_upstroke: {
    clampForce: 8, cycleTime: 6, partComplexity: 6, materialWaste: 5, cmCost___: 5,
    heated: true, forThermoset: true,
    press: "bottom_ram_upstroke_fixed_top_platen_gravity_load_charge",
    bestUse: "rubber_gasket_brake_pad_electrical_insulator_thermoset",
  },
  hydraulic_downstroke: {
    clampForce: 9, cycleTime: 7, partComplexity: 6, materialWaste: 5, cmCost___: 6,
    heated: true, forThermoset: true,
    press: "top_ram_downstroke_fixed_bottom_platen_operator_ergonomic",
    bestUse: "smc_bmc_composite_panel_automotive_body_panel_fiberglass",
  },
  vacuum_compression: {
    clampForce: 7, cycleTime: 5, partComplexity: 8, materialWaste: 8, cmCost___: 8,
    heated: true, forThermoset: true,
    press: "vacuum_chamber_air_removal_void_free_laminate_composite",
    bestUse: "aerospace_composite_laminate_carbon_fiber_void_free_part",
  },
  transfer_mold: {
    clampForce: 8, cycleTime: 8, partComplexity: 9, materialWaste: 4, cmCost___: 7,
    heated: true, forThermoset: true,
    press: "transfer_pot_plunger_runner_gate_encapsulate_insert_mold",
    bestUse: "electronic_encapsulation_insert_mold_complex_thermoset",
  },
  isostatic_press: {
    clampForce: 10, cycleTime: 4, partComplexity: 7, materialWaste: 9, cmCost___: 10,
    heated: false, forThermoset: false,
    press: "uniform_pressure_fluid_medium_cold_warm_isostatic_compact",
    bestUse: "ceramic_powder_metal_compact_uniform_density_all_direction",
  },
};

function get(t: CompressionMoldType): CompressionMoldData {
  return DATA[t];
}

export const clampForce = (t: CompressionMoldType) => get(t).clampForce;
export const cycleTime = (t: CompressionMoldType) => get(t).cycleTime;
export const partComplexity = (t: CompressionMoldType) => get(t).partComplexity;
export const materialWaste = (t: CompressionMoldType) => get(t).materialWaste;
export const cmCost___ = (t: CompressionMoldType) => get(t).cmCost___;
export const heated = (t: CompressionMoldType) => get(t).heated;
export const forThermoset = (t: CompressionMoldType) => get(t).forThermoset;
export const press = (t: CompressionMoldType) => get(t).press;
export const bestUse = (t: CompressionMoldType) => get(t).bestUse;
export const compressionMoldTypes = (): CompressionMoldType[] =>
  Object.keys(DATA) as CompressionMoldType[];
