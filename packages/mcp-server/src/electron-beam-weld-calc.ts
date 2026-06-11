export type ElectronBeamWeldType =
  | "high_vacuum"
  | "medium_vacuum"
  | "non_vacuum"
  | "multi_pass"
  | "micro_eb";

interface ElectronBeamWeldData {
  penetration: number;
  precision: number;
  speed: number;
  heatAffectedZone: number;
  ewCost: number;
  vacuum: boolean;
  forReactive: boolean;
  beam: string;
  bestUse: string;
}

const DATA: Record<ElectronBeamWeldType, ElectronBeamWeldData> = {
  high_vacuum: {
    penetration: 10, precision: 10, speed: 7, heatAffectedZone: 10, ewCost: 10,
    vacuum: true, forReactive: true,
    beam: "high_voltage_electron_gun_magnetic_focus_deflect_deep_weld",
    bestUse: "aerospace_turbine_blade_titanium_zirconium_deep_single_pass",
  },
  medium_vacuum: {
    penetration: 8, precision: 8, speed: 8, heatAffectedZone: 8, ewCost: 7,
    vacuum: true, forReactive: true,
    beam: "partial_vacuum_chamber_moderate_depth_reduced_pump_time",
    bestUse: "automotive_transmission_gear_moderate_depth_production_weld",
  },
  non_vacuum: {
    penetration: 5, precision: 6, speed: 9, heatAffectedZone: 6, ewCost: 5,
    vacuum: false, forReactive: false,
    beam: "atmospheric_electron_beam_helium_shield_shallow_penetration",
    bestUse: "surface_treatment_cladding_shallow_weld_large_component",
  },
  multi_pass: {
    penetration: 9, precision: 9, speed: 5, heatAffectedZone: 7, ewCost: 9,
    vacuum: true, forReactive: true,
    beam: "multiple_pass_oscillation_pattern_thick_section_fill_weld",
    bestUse: "thick_section_pressure_vessel_nuclear_component_multi_pass",
  },
  micro_eb: {
    penetration: 3, precision: 10, speed: 6, heatAffectedZone: 10, ewCost: 8,
    vacuum: true, forReactive: true,
    beam: "low_power_fine_focus_micro_weld_hermetic_seal_electronic",
    bestUse: "medical_implant_sensor_hermetic_package_micro_electronic",
  },
};

function get(t: ElectronBeamWeldType): ElectronBeamWeldData {
  return DATA[t];
}

export const penetration = (t: ElectronBeamWeldType) => get(t).penetration;
export const precision = (t: ElectronBeamWeldType) => get(t).precision;
export const speed = (t: ElectronBeamWeldType) => get(t).speed;
export const heatAffectedZone = (t: ElectronBeamWeldType) => get(t).heatAffectedZone;
export const ewCost = (t: ElectronBeamWeldType) => get(t).ewCost;
export const vacuum = (t: ElectronBeamWeldType) => get(t).vacuum;
export const forReactive = (t: ElectronBeamWeldType) => get(t).forReactive;
export const beam = (t: ElectronBeamWeldType) => get(t).beam;
export const bestUse = (t: ElectronBeamWeldType) => get(t).bestUse;
export const electronBeamWeldTypes = (): ElectronBeamWeldType[] =>
  Object.keys(DATA) as ElectronBeamWeldType[];
