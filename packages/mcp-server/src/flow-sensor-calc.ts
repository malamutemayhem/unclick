export type FlowSensor =
  | "coriolis_mass"
  | "ultrasonic_transit"
  | "electromagnetic_mag"
  | "vortex_shedding"
  | "thermal_dispersion";

const DATA: Record<FlowSensor, {
  accuracy: number; rangeability: number; pressureDrop: number;
  reliability: number; flowCost: number; noMovingParts: boolean;
  forGas: boolean; measurement: string; bestUse: string;
}> = {
  coriolis_mass: {
    accuracy: 10, rangeability: 9, pressureDrop: 4,
    reliability: 8, flowCost: 9, noMovingParts: true,
    forGas: true, measurement: "tube_oscillation_freq",
    bestUse: "custody_transfer_oil",
  },
  ultrasonic_transit: {
    accuracy: 8, rangeability: 10, pressureDrop: 10,
    reliability: 9, flowCost: 7, noMovingParts: true,
    forGas: true, measurement: "transit_time_delta",
    bestUse: "large_pipe_water_meter",
  },
  electromagnetic_mag: {
    accuracy: 7, rangeability: 8, pressureDrop: 9,
    reliability: 9, flowCost: 5, noMovingParts: true,
    forGas: false, measurement: "faraday_emf_voltage",
    bestUse: "wastewater_treatment_flow",
  },
  vortex_shedding: {
    accuracy: 6, rangeability: 6, pressureDrop: 5,
    reliability: 8, flowCost: 4, noMovingParts: true,
    forGas: true, measurement: "karman_vortex_freq",
    bestUse: "steam_flow_measurement",
  },
  thermal_dispersion: {
    accuracy: 5, rangeability: 7, pressureDrop: 8,
    reliability: 7, flowCost: 3, noMovingParts: true,
    forGas: true, measurement: "heat_transfer_delta_t",
    bestUse: "compressed_air_audit",
  },
};

const get = (t: FlowSensor) => DATA[t];

export const accuracy = (t: FlowSensor) => get(t).accuracy;
export const rangeability = (t: FlowSensor) => get(t).rangeability;
export const pressureDrop = (t: FlowSensor) => get(t).pressureDrop;
export const reliability = (t: FlowSensor) => get(t).reliability;
export const flowCost = (t: FlowSensor) => get(t).flowCost;
export const noMovingParts = (t: FlowSensor) => get(t).noMovingParts;
export const forGas = (t: FlowSensor) => get(t).forGas;
export const measurement = (t: FlowSensor) => get(t).measurement;
export const bestUse = (t: FlowSensor) => get(t).bestUse;
export const flowSensors = (): FlowSensor[] => Object.keys(DATA) as FlowSensor[];
