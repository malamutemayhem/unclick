export type PyrometerIrType =
  | "spot_single_wavelength"
  | "ratio_two_color"
  | "thermal_imaging_area"
  | "fiber_optic_remote"
  | "multi_wavelength_spectral";

interface PyrometerIrData {
  accuracy: number;
  tempRange: number;
  emissivityImmune: number;
  spatialRes: number;
  piCost: number;
  nonContact: boolean;
  forMoving: boolean;
  detector: string;
  bestUse: string;
}

const DATA: Record<PyrometerIrType, PyrometerIrData> = {
  spot_single_wavelength: {
    accuracy: 7, tempRange: 7, emissivityImmune: 4, spatialRes: 6, piCost: 4,
    nonContact: true, forMoving: true,
    detector: "single_element_thermopile_narrow_spot",
    bestUse: "metal_forging_kiln_spot_temperature",
  },
  ratio_two_color: {
    accuracy: 8, tempRange: 8, emissivityImmune: 9, spatialRes: 5, piCost: 6,
    nonContact: true, forMoving: true,
    detector: "dual_wavelength_ratio_emissivity_cancel",
    bestUse: "dirty_window_dust_smoke_partial_view",
  },
  thermal_imaging_area: {
    accuracy: 6, tempRange: 6, emissivityImmune: 5, spatialRes: 10, piCost: 8,
    nonContact: true, forMoving: false,
    detector: "focal_plane_array_microbolometer_image",
    bestUse: "predictive_maintenance_electrical_scan",
  },
  fiber_optic_remote: {
    accuracy: 9, tempRange: 9, emissivityImmune: 6, spatialRes: 7, piCost: 9,
    nonContact: true, forMoving: false,
    detector: "fiber_optic_cable_remote_harsh_location",
    bestUse: "semiconductor_furnace_vacuum_rf_immune",
  },
  multi_wavelength_spectral: {
    accuracy: 10, tempRange: 8, emissivityImmune: 10, spatialRes: 5, piCost: 10,
    nonContact: true, forMoving: true,
    detector: "multi_spectral_algorithm_true_temp_solve",
    bestUse: "research_unknown_emissivity_true_temp",
  },
};

function get(t: PyrometerIrType): PyrometerIrData {
  return DATA[t];
}

export const accuracy = (t: PyrometerIrType) => get(t).accuracy;
export const tempRange = (t: PyrometerIrType) => get(t).tempRange;
export const emissivityImmune = (t: PyrometerIrType) => get(t).emissivityImmune;
export const spatialRes = (t: PyrometerIrType) => get(t).spatialRes;
export const piCost = (t: PyrometerIrType) => get(t).piCost;
export const nonContact = (t: PyrometerIrType) => get(t).nonContact;
export const forMoving = (t: PyrometerIrType) => get(t).forMoving;
export const detector = (t: PyrometerIrType) => get(t).detector;
export const bestUse = (t: PyrometerIrType) => get(t).bestUse;
export const pyrometerIrTypes = (): PyrometerIrType[] =>
  Object.keys(DATA) as PyrometerIrType[];
