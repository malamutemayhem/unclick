export type CompressionMolderType =
  | "hydraulic_upstroke"
  | "hydraulic_downstroke"
  | "vacuum_assisted"
  | "transfer_mold"
  | "cold_press";

interface CompressionMolderData {
  pressForce: number;
  cycleSpeed: number;
  partComplexity: number;
  surfaceQuality: number;
  cmCost: number;
  heated: boolean;
  forComposite: boolean;
  molderConfig: string;
  bestUse: string;
}

const DATA: Record<CompressionMolderType, CompressionMolderData> = {
  hydraulic_upstroke: {
    pressForce: 9, cycleSpeed: 7, partComplexity: 7, surfaceQuality: 8, cmCost: 7,
    heated: true, forComposite: true,
    molderConfig: "hydraulic_upstroke_press_heated_platen_smc_bmc_thermoset_cure",
    bestUse: "automotive_body_panel_smc_bmc_thermoset_compression_large_flat",
  },
  hydraulic_downstroke: {
    pressForce: 10, cycleSpeed: 8, partComplexity: 7, surfaceQuality: 8, cmCost: 8,
    heated: true, forComposite: true,
    molderConfig: "hydraulic_downstroke_top_ram_heavy_press_large_platen_high_ton",
    bestUse: "heavy_industrial_panel_truck_hood_large_tonnage_downstroke_smc",
  },
  vacuum_assisted: {
    pressForce: 6, cycleSpeed: 6, partComplexity: 9, surfaceQuality: 10, cmCost: 9,
    heated: true, forComposite: true,
    molderConfig: "vacuum_bag_autoclave_assist_composite_layup_aerospace_prepreg",
    bestUse: "aerospace_carbon_fiber_prepreg_layup_vacuum_bag_autoclave_cure",
  },
  transfer_mold: {
    pressForce: 8, cycleSpeed: 9, partComplexity: 10, surfaceQuality: 9, cmCost: 8,
    heated: true, forComposite: false,
    molderConfig: "transfer_pot_plunger_push_rubber_thermoset_into_closed_cavity",
    bestUse: "rubber_seal_gasket_insert_mold_transfer_pot_plunger_thermoset",
  },
  cold_press: {
    pressForce: 7, cycleSpeed: 5, partComplexity: 5, surfaceQuality: 6, cmCost: 5,
    heated: false, forComposite: true,
    molderConfig: "cold_press_room_temp_resin_cure_low_pressure_fiberglass_layup",
    bestUse: "fiberglass_boat_hull_panel_cold_press_low_pressure_room_temp",
  },
};

function get(t: CompressionMolderType): CompressionMolderData {
  return DATA[t];
}

export const pressForce = (t: CompressionMolderType) => get(t).pressForce;
export const cycleSpeed = (t: CompressionMolderType) => get(t).cycleSpeed;
export const partComplexity = (t: CompressionMolderType) => get(t).partComplexity;
export const surfaceQuality = (t: CompressionMolderType) => get(t).surfaceQuality;
export const cmCost = (t: CompressionMolderType) => get(t).cmCost;
export const heated = (t: CompressionMolderType) => get(t).heated;
export const forComposite = (t: CompressionMolderType) => get(t).forComposite;
export const molderConfig = (t: CompressionMolderType) => get(t).molderConfig;
export const bestUse = (t: CompressionMolderType) => get(t).bestUse;
export const compressionMolderTypes = (): CompressionMolderType[] =>
  Object.keys(DATA) as CompressionMolderType[];
