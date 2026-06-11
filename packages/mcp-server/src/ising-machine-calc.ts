export type IsingMachine =
  | "quantum_annealer"
  | "coherent_ising_opl"
  | "digital_simulated_bifurc"
  | "memristor_hopfield"
  | "fpga_parallel_sa";

const DATA: Record<IsingMachine, {
  problemSize: number; speed: number; solutionQuality: number;
  programmability: number; isingCost: number; continuous: boolean;
  forCombinatorial: boolean; substrate: string; bestUse: string;
}> = {
  quantum_annealer: {
    problemSize: 9, speed: 7, solutionQuality: 8,
    programmability: 5, isingCost: 10, continuous: false,
    forCombinatorial: true, substrate: "superconducting_flux_qubit",
    bestUse: "supply_chain_optimization",
  },
  coherent_ising_opl: {
    problemSize: 8, speed: 9, solutionQuality: 7,
    programmability: 4, isingCost: 8, continuous: true,
    forCombinatorial: true, substrate: "optical_parametric_oscillator",
    bestUse: "dense_graph_max_cut",
  },
  digital_simulated_bifurc: {
    problemSize: 7, speed: 8, solutionQuality: 7,
    programmability: 8, isingCost: 5, continuous: false,
    forCombinatorial: true, substrate: "gpu_fpga_classical",
    bestUse: "portfolio_optimization",
  },
  memristor_hopfield: {
    problemSize: 5, speed: 10, solutionQuality: 6,
    programmability: 3, isingCost: 6, continuous: true,
    forCombinatorial: false, substrate: "crossbar_analog_weight",
    bestUse: "associative_memory_recall",
  },
  fpga_parallel_sa: {
    problemSize: 6, speed: 7, solutionQuality: 8,
    programmability: 9, isingCost: 4, continuous: false,
    forCombinatorial: true, substrate: "reconfigurable_logic_array",
    bestUse: "scheduling_constraint_sat",
  },
};

const get = (t: IsingMachine) => DATA[t];

export const problemSize = (t: IsingMachine) => get(t).problemSize;
export const speed = (t: IsingMachine) => get(t).speed;
export const solutionQuality = (t: IsingMachine) => get(t).solutionQuality;
export const programmability = (t: IsingMachine) => get(t).programmability;
export const isingCost = (t: IsingMachine) => get(t).isingCost;
export const continuous = (t: IsingMachine) => get(t).continuous;
export const forCombinatorial = (t: IsingMachine) => get(t).forCombinatorial;
export const substrate = (t: IsingMachine) => get(t).substrate;
export const bestUse = (t: IsingMachine) => get(t).bestUse;
export const isingMachines = (): IsingMachine[] => Object.keys(DATA) as IsingMachine[];
