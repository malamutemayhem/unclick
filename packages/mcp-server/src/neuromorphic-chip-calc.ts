export type NeuromorphicChip =
  | "spiking_digital"
  | "spiking_mixed_signal"
  | "memristor_crossbar"
  | "photonic_neural"
  | "reservoir_compute";

const DATA: Record<NeuromorphicChip, {
  powerEff: number; eventRate: number; neuronCount: number;
  learningCapable: number; neuroCost: number; onlineLearning: boolean;
  forRobotics: boolean; substrate: string; bestUse: string;
}> = {
  spiking_digital: {
    powerEff: 8, eventRate: 7, neuronCount: 9,
    learningCapable: 7, neuroCost: 7, onlineLearning: true,
    forRobotics: true, substrate: "cmos_asic_neuron_core",
    bestUse: "event_camera_processing",
  },
  spiking_mixed_signal: {
    powerEff: 9, eventRate: 6, neuronCount: 6,
    learningCapable: 8, neuroCost: 8, onlineLearning: true,
    forRobotics: true, substrate: "analog_neuron_digital_spike",
    bestUse: "always_on_sensor_fusion",
  },
  memristor_crossbar: {
    powerEff: 10, eventRate: 8, neuronCount: 7,
    learningCapable: 9, neuroCost: 9, onlineLearning: true,
    forRobotics: false, substrate: "reram_analog_synapse",
    bestUse: "in_situ_weight_update",
  },
  photonic_neural: {
    powerEff: 7, eventRate: 10, neuronCount: 4,
    learningCapable: 5, neuroCost: 10, onlineLearning: false,
    forRobotics: false, substrate: "mzi_mesh_coherent",
    bestUse: "matrix_multiply_speed",
  },
  reservoir_compute: {
    powerEff: 8, eventRate: 7, neuronCount: 5,
    learningCapable: 6, neuroCost: 5, onlineLearning: false,
    forRobotics: false, substrate: "nonlinear_fixed_network",
    bestUse: "time_series_anomaly",
  },
};

const get = (t: NeuromorphicChip) => DATA[t];

export const powerEff = (t: NeuromorphicChip) => get(t).powerEff;
export const eventRate = (t: NeuromorphicChip) => get(t).eventRate;
export const neuronCount = (t: NeuromorphicChip) => get(t).neuronCount;
export const learningCapable = (t: NeuromorphicChip) => get(t).learningCapable;
export const neuroCost = (t: NeuromorphicChip) => get(t).neuroCost;
export const onlineLearning = (t: NeuromorphicChip) => get(t).onlineLearning;
export const forRobotics = (t: NeuromorphicChip) => get(t).forRobotics;
export const substrate = (t: NeuromorphicChip) => get(t).substrate;
export const bestUse = (t: NeuromorphicChip) => get(t).bestUse;
export const neuromorphicChips = (): NeuromorphicChip[] => Object.keys(DATA) as NeuromorphicChip[];
