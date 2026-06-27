export type ElectronBeamWelderType =
  | "high_vacuum"
  | "medium_vacuum"
  | "non_vacuum"
  | "multi_beam"
  | "portable_local";

interface ElectronBeamWelderData {
  penetrationDepth: number;
  weldPrecision: number;
  weldSpeed: number;
  heatInput: number;
  ebCost: number;
  vacuum: boolean;
  forAerospace: boolean;
  welderConfig: string;
  bestUse: string;
}

const DATA: Record<ElectronBeamWelderType, ElectronBeamWelderData> = {
  high_vacuum: {
    penetrationDepth: 10, weldPrecision: 10, weldSpeed: 7, heatInput: 10, ebCost: 10,
    vacuum: true, forAerospace: true,
    welderConfig: "high_vacuum_chamber_electron_beam_deep_penetration_precision",
    bestUse: "aerospace_turbine_nuclear_reactor_high_vacuum_electron_beam_weld",
  },
  medium_vacuum: {
    penetrationDepth: 8, weldPrecision: 8, weldSpeed: 8, heatInput: 8, ebCost: 8,
    vacuum: true, forAerospace: true,
    welderConfig: "medium_vacuum_partial_pressure_electron_beam_production_weld",
    bestUse: "automotive_gear_medical_implant_medium_vacuum_electron_beam_weld",
  },
  non_vacuum: {
    penetrationDepth: 6, weldPrecision: 6, weldSpeed: 9, heatInput: 6, ebCost: 6,
    vacuum: false, forAerospace: false,
    welderConfig: "non_vacuum_atmosphere_electron_beam_large_part_in_place_weld",
    bestUse: "large_structural_weld_in_place_non_vacuum_electron_beam_field",
  },
  multi_beam: {
    penetrationDepth: 9, weldPrecision: 9, weldSpeed: 10, heatInput: 9, ebCost: 10,
    vacuum: true, forAerospace: true,
    welderConfig: "multi_beam_simultaneous_weld_multiple_joint_high_production_eb",
    bestUse: "high_production_multi_joint_simultaneous_electron_beam_weld_auto",
  },
  portable_local: {
    penetrationDepth: 5, weldPrecision: 5, weldSpeed: 6, heatInput: 5, ebCost: 5,
    vacuum: false, forAerospace: false,
    welderConfig: "portable_local_vacuum_seal_electron_beam_field_repair_on_site",
    bestUse: "field_repair_on_site_weld_portable_local_vacuum_electron_beam",
  },
};

function get(t: ElectronBeamWelderType): ElectronBeamWelderData {
  return DATA[t];
}

export const penetrationDepth = (t: ElectronBeamWelderType) => get(t).penetrationDepth;
export const weldPrecision = (t: ElectronBeamWelderType) => get(t).weldPrecision;
export const weldSpeed = (t: ElectronBeamWelderType) => get(t).weldSpeed;
export const heatInput = (t: ElectronBeamWelderType) => get(t).heatInput;
export const ebCost = (t: ElectronBeamWelderType) => get(t).ebCost;
export const vacuum = (t: ElectronBeamWelderType) => get(t).vacuum;
export const forAerospace = (t: ElectronBeamWelderType) => get(t).forAerospace;
export const welderConfig = (t: ElectronBeamWelderType) => get(t).welderConfig;
export const bestUse = (t: ElectronBeamWelderType) => get(t).bestUse;
export const electronBeamWelderTypes = (): ElectronBeamWelderType[] =>
  Object.keys(DATA) as ElectronBeamWelderType[];
