export type FlowMeter =
  | "coriolis_mass_tube"
  | "electromagnetic_mag"
  | "ultrasonic_transit_time"
  | "vortex_shedding_bluff"
  | "differential_pressure_orifice";

const DATA: Record<FlowMeter, {
  accuracy: number; rangeability: number; pressure_drop: number;
  maintenance: number; fmCost: number; noMovingParts: boolean;
  forGas: boolean; principle: string; bestUse: string;
}> = {
  coriolis_mass_tube: {
    accuracy: 10, rangeability: 9, pressure_drop: 5,
    maintenance: 9, fmCost: 5, noMovingParts: true,
    forGas: true, principle: "vibrating_tube_coriolis_force",
    bestUse: "custody_transfer_mass_billing",
  },
  electromagnetic_mag: {
    accuracy: 8, rangeability: 10, pressure_drop: 10,
    maintenance: 10, fmCost: 3, noMovingParts: true,
    forGas: false, principle: "faraday_law_conductive_fluid",
    bestUse: "water_wastewater_full_bore",
  },
  ultrasonic_transit_time: {
    accuracy: 7, rangeability: 8, pressure_drop: 10,
    maintenance: 9, fmCost: 4, noMovingParts: true,
    forGas: true, principle: "transit_time_diff_sound_wave",
    bestUse: "clamp_on_retrofit_non_invasive",
  },
  vortex_shedding_bluff: {
    accuracy: 6, rangeability: 7, pressure_drop: 6,
    maintenance: 8, fmCost: 2, noMovingParts: true,
    forGas: true, principle: "karman_vortex_street_freq",
    bestUse: "steam_flow_measurement_plant",
  },
  differential_pressure_orifice: {
    accuracy: 5, rangeability: 4, pressure_drop: 3,
    maintenance: 5, fmCost: 1, noMovingParts: true,
    forGas: true, principle: "bernoulli_orifice_plate_dp",
    bestUse: "legacy_process_simple_cheap",
  },
};

const get = (t: FlowMeter) => DATA[t];

export const accuracy = (t: FlowMeter) => get(t).accuracy;
export const rangeability = (t: FlowMeter) => get(t).rangeability;
export const pressure_drop = (t: FlowMeter) => get(t).pressure_drop;
export const maintenance = (t: FlowMeter) => get(t).maintenance;
export const fmCost = (t: FlowMeter) => get(t).fmCost;
export const noMovingParts = (t: FlowMeter) => get(t).noMovingParts;
export const forGas = (t: FlowMeter) => get(t).forGas;
export const principle = (t: FlowMeter) => get(t).principle;
export const bestUse = (t: FlowMeter) => get(t).bestUse;
export const flowMeters = (): FlowMeter[] => Object.keys(DATA) as FlowMeter[];
