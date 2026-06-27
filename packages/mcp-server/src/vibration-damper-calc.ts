export type VibrationDamperType =
  | "viscous_fluid_damper"
  | "tuned_mass_damper"
  | "friction_damper_bolt"
  | "eddy_current_magnetic"
  | "viscoelastic_constrain";

interface VibrationDamperData {
  energyDissipation: number;
  frequencyRange: number;
  temperatureStability: number;
  maintenanceEase: number;
  vdCost: number;
  passive: boolean;
  forStructural: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<VibrationDamperType, VibrationDamperData> = {
  viscous_fluid_damper: {
    energyDissipation: 9, frequencyRange: 9, temperatureStability: 6, maintenanceEase: 6, vdCost: 7,
    passive: true, forStructural: true,
    mechanism: "piston_orifice_silicone_fluid_shear_dissipate",
    bestUse: "seismic_bridge_building_structural_damping",
  },
  tuned_mass_damper: {
    energyDissipation: 8, frequencyRange: 4, temperatureStability: 8, maintenanceEase: 7, vdCost: 9,
    passive: true, forStructural: true,
    mechanism: "mass_spring_dashpot_tuned_to_natural_freq",
    bestUse: "tall_building_sway_wind_induced_resonance",
  },
  friction_damper_bolt: {
    energyDissipation: 7, frequencyRange: 8, temperatureStability: 9, maintenanceEase: 8, vdCost: 4,
    passive: true, forStructural: true,
    mechanism: "slotted_bolt_connection_friction_pad_sliding",
    bestUse: "steel_frame_brace_seismic_friction_dissipate",
  },
  eddy_current_magnetic: {
    energyDissipation: 6, frequencyRange: 10, temperatureStability: 8, maintenanceEase: 10, vdCost: 8,
    passive: true, forStructural: false,
    mechanism: "permanent_magnet_conductor_plate_eddy_brake",
    bestUse: "precision_machine_tool_contactless_vibration",
  },
  viscoelastic_constrain: {
    energyDissipation: 7, frequencyRange: 7, temperatureStability: 5, maintenanceEase: 8, vdCost: 5,
    passive: true, forStructural: false,
    mechanism: "constrained_layer_viscoelastic_polymer_shear",
    bestUse: "panel_plate_duct_wall_resonance_damping",
  },
};

function get(t: VibrationDamperType): VibrationDamperData {
  return DATA[t];
}

export const energyDissipation = (t: VibrationDamperType) => get(t).energyDissipation;
export const frequencyRange = (t: VibrationDamperType) => get(t).frequencyRange;
export const temperatureStability = (t: VibrationDamperType) => get(t).temperatureStability;
export const maintenanceEase = (t: VibrationDamperType) => get(t).maintenanceEase;
export const vdCost = (t: VibrationDamperType) => get(t).vdCost;
export const passive = (t: VibrationDamperType) => get(t).passive;
export const forStructural = (t: VibrationDamperType) => get(t).forStructural;
export const mechanism = (t: VibrationDamperType) => get(t).mechanism;
export const bestUse = (t: VibrationDamperType) => get(t).bestUse;
export const vibrationDamperTypes = (): VibrationDamperType[] =>
  Object.keys(DATA) as VibrationDamperType[];
