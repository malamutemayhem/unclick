export type LvsCheck =
  | "flat_exhaustive"
  | "hierarchical_block"
  | "schematic_driven"
  | "layout_parasitic"
  | "incremental_delta";

const DATA: Record<LvsCheck, {
  accuracy: number; speed: number; capacity: number;
  debuggability: number; lvsCost: number; multiThread: boolean;
  forFoundry: boolean; method: string; bestUse: string;
}> = {
  flat_exhaustive: {
    accuracy: 10, speed: 2, capacity: 4,
    debuggability: 6, lvsCost: 6, multiThread: true,
    forFoundry: true, method: "graph_isomorphism_full",
    bestUse: "tapeout_final_signoff",
  },
  hierarchical_block: {
    accuracy: 9, speed: 8, capacity: 9,
    debuggability: 8, lvsCost: 5, multiThread: true,
    forFoundry: true, method: "cell_level_compare_stitch",
    bestUse: "soc_billion_transistor",
  },
  schematic_driven: {
    accuracy: 8, speed: 7, capacity: 7,
    debuggability: 10, lvsCost: 4, multiThread: false,
    forFoundry: false, method: "netlist_guided_trace",
    bestUse: "analog_custom_layout",
  },
  layout_parasitic: {
    accuracy: 9, speed: 4, capacity: 5,
    debuggability: 7, lvsCost: 7, multiThread: true,
    forFoundry: true, method: "rc_extract_compare_combine",
    bestUse: "rf_matching_parasitic_aware",
  },
  incremental_delta: {
    accuracy: 7, speed: 10, capacity: 8,
    debuggability: 9, lvsCost: 3, multiThread: false,
    forFoundry: false, method: "diff_based_local_recheck",
    bestUse: "eco_fix_quick_turnaround",
  },
};

const get = (t: LvsCheck) => DATA[t];

export const accuracy = (t: LvsCheck) => get(t).accuracy;
export const speed = (t: LvsCheck) => get(t).speed;
export const capacity = (t: LvsCheck) => get(t).capacity;
export const debuggability = (t: LvsCheck) => get(t).debuggability;
export const lvsCost = (t: LvsCheck) => get(t).lvsCost;
export const multiThread = (t: LvsCheck) => get(t).multiThread;
export const forFoundry = (t: LvsCheck) => get(t).forFoundry;
export const method = (t: LvsCheck) => get(t).method;
export const bestUse = (t: LvsCheck) => get(t).bestUse;
export const lvsChecks = (): LvsCheck[] => Object.keys(DATA) as LvsCheck[];
