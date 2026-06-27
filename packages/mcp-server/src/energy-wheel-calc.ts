export type EnergyWheelType =
  | "total_enthalpy_desiccant"
  | "sensible_only_aluminum"
  | "polymer_membrane_enthalpy"
  | "heat_pipe_passive"
  | "runaround_glycol_coil";

interface EnergyWheelData {
  recovery: number;
  latent: number;
  pressure: number;
  maintenance: number;
  ewCost: number;
  moistureTransfer: boolean;
  forHumid: boolean;
  medium: string;
  bestUse: string;
}

const DATA: Record<EnergyWheelType, EnergyWheelData> = {
  total_enthalpy_desiccant: {
    recovery: 10, latent: 10, pressure: 6, maintenance: 6, ewCost: 7,
    moistureTransfer: true, forHumid: true,
    medium: "aluminum_honeycomb_desiccant_coat",
    bestUse: "humid_climate_office_school",
  },
  sensible_only_aluminum: {
    recovery: 8, latent: 3, pressure: 7, maintenance: 7, ewCost: 5,
    moistureTransfer: false, forHumid: false,
    medium: "aluminum_foil_corrugated_wheel",
    bestUse: "dry_climate_industrial_exhaust",
  },
  polymer_membrane_enthalpy: {
    recovery: 9, latent: 8, pressure: 7, maintenance: 8, ewCost: 8,
    moistureTransfer: true, forHumid: true,
    medium: "polymer_membrane_plate_counter",
    bestUse: "hospital_lab_cross_contam_free",
  },
  heat_pipe_passive: {
    recovery: 6, latent: 2, pressure: 9, maintenance: 10, ewCost: 6,
    moistureTransfer: false, forHumid: false,
    medium: "sealed_refrigerant_heat_pipe",
    bestUse: "exhaust_recovery_no_cross_leak",
  },
  runaround_glycol_coil: {
    recovery: 7, latent: 2, pressure: 8, maintenance: 7, ewCost: 7,
    moistureTransfer: false, forHumid: false,
    medium: "glycol_coil_pump_loop_remote",
    bestUse: "remote_ahu_separated_streams",
  },
};

function get(t: EnergyWheelType): EnergyWheelData {
  return DATA[t];
}

export const recovery = (t: EnergyWheelType) => get(t).recovery;
export const latent = (t: EnergyWheelType) => get(t).latent;
export const pressure = (t: EnergyWheelType) => get(t).pressure;
export const maintenance = (t: EnergyWheelType) => get(t).maintenance;
export const ewCost = (t: EnergyWheelType) => get(t).ewCost;
export const moistureTransfer = (t: EnergyWheelType) => get(t).moistureTransfer;
export const forHumid = (t: EnergyWheelType) => get(t).forHumid;
export const medium = (t: EnergyWheelType) => get(t).medium;
export const bestUse = (t: EnergyWheelType) => get(t).bestUse;
export const energyWheelTypes = (): EnergyWheelType[] =>
  Object.keys(DATA) as EnergyWheelType[];
