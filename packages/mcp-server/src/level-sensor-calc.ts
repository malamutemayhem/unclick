export type LevelSensorType =
  | "float_switch_magnetic_reed"
  | "ultrasonic_non_contact"
  | "radar_guided_wave"
  | "capacitance_probe_rf"
  | "hydrostatic_pressure_submersible";

interface LevelSensorData {
  accuracy: number;
  range: number;
  reliability: number;
  versatility: number;
  lsCost: number;
  nonContact: boolean;
  forTank: boolean;
  principle: string;
  bestUse: string;
}

const DATA: Record<LevelSensorType, LevelSensorData> = {
  float_switch_magnetic_reed: {
    accuracy: 4, range: 4, reliability: 7, versatility: 4, lsCost: 1,
    nonContact: false, forTank: true,
    principle: "buoyant_float_magnet_reed_contact",
    bestUse: "sump_tank_high_low_alarm_simple",
  },
  ultrasonic_non_contact: {
    accuracy: 7, range: 7, reliability: 7, versatility: 7, lsCost: 5,
    nonContact: true, forTank: true,
    principle: "acoustic_pulse_time_of_flight",
    bestUse: "open_tank_water_chemical_bulk_solid",
  },
  radar_guided_wave: {
    accuracy: 9, range: 9, reliability: 9, versatility: 8, lsCost: 8,
    nonContact: false, forTank: true,
    principle: "microwave_tdr_pulse_guided_probe",
    bestUse: "process_vessel_interface_foam_agitate",
  },
  capacitance_probe_rf: {
    accuracy: 6, range: 6, reliability: 8, versatility: 7, lsCost: 4,
    nonContact: false, forTank: true,
    principle: "rf_capacitance_dielectric_change",
    bestUse: "granular_solid_adhesive_liquid_point",
  },
  hydrostatic_pressure_submersible: {
    accuracy: 7, range: 8, reliability: 8, versatility: 5, lsCost: 4,
    nonContact: false, forTank: true,
    principle: "submersed_diaphragm_hydrostatic_head",
    bestUse: "well_reservoir_open_channel_depth",
  },
};

function get(t: LevelSensorType): LevelSensorData {
  return DATA[t];
}

export const accuracy = (t: LevelSensorType) => get(t).accuracy;
export const range = (t: LevelSensorType) => get(t).range;
export const reliability = (t: LevelSensorType) => get(t).reliability;
export const versatility = (t: LevelSensorType) => get(t).versatility;
export const lsCost = (t: LevelSensorType) => get(t).lsCost;
export const nonContact = (t: LevelSensorType) => get(t).nonContact;
export const forTank = (t: LevelSensorType) => get(t).forTank;
export const principle = (t: LevelSensorType) => get(t).principle;
export const bestUse = (t: LevelSensorType) => get(t).bestUse;
export const levelSensorTypes = (): LevelSensorType[] =>
  Object.keys(DATA) as LevelSensorType[];
