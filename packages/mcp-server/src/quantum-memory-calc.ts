export type QuantumMemory =
  | "nitrogen_vacancy_nv"
  | "rare_earth_crystal"
  | "atomic_ensemble_gas"
  | "quantum_dot_spin"
  | "superconducting_cavity";

const DATA: Record<QuantumMemory, {
  coherenceTime: number; readoutFidelity: number; multimode: number;
  operatingTemp: number; qmCost: number; roomTemp: boolean;
  forRepeater: boolean; platform: string; bestUse: string;
}> = {
  nitrogen_vacancy_nv: {
    coherenceTime: 8, readoutFidelity: 7, multimode: 4,
    operatingTemp: 10, qmCost: 5, roomTemp: true,
    forRepeater: true, platform: "diamond_defect_center",
    bestUse: "quantum_network_repeater_node",
  },
  rare_earth_crystal: {
    coherenceTime: 10, readoutFidelity: 6, multimode: 10,
    operatingTemp: 5, qmCost: 7, roomTemp: false,
    forRepeater: true, platform: "praseodymium_yso_crystal",
    bestUse: "multiplexed_photon_storage",
  },
  atomic_ensemble_gas: {
    coherenceTime: 7, readoutFidelity: 8, multimode: 7,
    operatingTemp: 6, qmCost: 6, roomTemp: false,
    forRepeater: true, platform: "rubidium_cold_atom_mot",
    bestUse: "telecom_wavelength_converter",
  },
  quantum_dot_spin: {
    coherenceTime: 5, readoutFidelity: 9, multimode: 3,
    operatingTemp: 3, qmCost: 8, roomTemp: false,
    forRepeater: false, platform: "ingaas_self_assembled_dot",
    bestUse: "single_photon_source_interface",
  },
  superconducting_cavity: {
    coherenceTime: 9, readoutFidelity: 10, multimode: 5,
    operatingTemp: 2, qmCost: 9, roomTemp: false,
    forRepeater: false, platform: "3d_aluminum_cavity_transmon",
    bestUse: "bosonic_cat_qubit_backup",
  },
};

const get = (t: QuantumMemory) => DATA[t];

export const coherenceTime = (t: QuantumMemory) => get(t).coherenceTime;
export const readoutFidelity = (t: QuantumMemory) => get(t).readoutFidelity;
export const multimode = (t: QuantumMemory) => get(t).multimode;
export const operatingTemp = (t: QuantumMemory) => get(t).operatingTemp;
export const qmCost = (t: QuantumMemory) => get(t).qmCost;
export const roomTemp = (t: QuantumMemory) => get(t).roomTemp;
export const forRepeater = (t: QuantumMemory) => get(t).forRepeater;
export const platform = (t: QuantumMemory) => get(t).platform;
export const bestUse = (t: QuantumMemory) => get(t).bestUse;
export const quantumMemories = (): QuantumMemory[] => Object.keys(DATA) as QuantumMemory[];
