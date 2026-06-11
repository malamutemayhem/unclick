export type PlaceRoute =
  | "analytical_global"
  | "simulated_annealing"
  | "partition_driven"
  | "clock_tree_synthesis"
  | "detail_legalization";

const DATA: Record<PlaceRoute, {
  wireLength: number; timing: number; congestion: number;
  runtime: number; prCost: number; incremental: boolean;
  forAdvNode: boolean; algorithm: string; bestUse: string;
}> = {
  analytical_global: {
    wireLength: 9, timing: 7, congestion: 7,
    runtime: 8, prCost: 5, incremental: false,
    forAdvNode: true, algorithm: "quadratic_force_directed",
    bestUse: "million_gate_soc_floorplan",
  },
  simulated_annealing: {
    wireLength: 8, timing: 8, congestion: 6,
    runtime: 3, prCost: 4, incremental: false,
    forAdvNode: false, algorithm: "random_swap_cool_schedule",
    bestUse: "macro_placement_optimize",
  },
  partition_driven: {
    wireLength: 7, timing: 6, congestion: 8,
    runtime: 9, prCost: 3, incremental: true,
    forAdvNode: true, algorithm: "recursive_min_cut_bisect",
    bestUse: "hierarchical_top_level",
  },
  clock_tree_synthesis: {
    wireLength: 6, timing: 10, congestion: 5,
    runtime: 6, prCost: 7, incremental: true,
    forAdvNode: true, algorithm: "balanced_h_tree_buffer",
    bestUse: "low_skew_clock_network",
  },
  detail_legalization: {
    wireLength: 8, timing: 7, congestion: 9,
    runtime: 7, prCost: 4, incremental: true,
    forAdvNode: true, algorithm: "tetris_slide_snap_grid",
    bestUse: "post_place_cell_overlap_fix",
  },
};

const get = (t: PlaceRoute) => DATA[t];

export const wireLength = (t: PlaceRoute) => get(t).wireLength;
export const timing = (t: PlaceRoute) => get(t).timing;
export const congestion = (t: PlaceRoute) => get(t).congestion;
export const runtime = (t: PlaceRoute) => get(t).runtime;
export const prCost = (t: PlaceRoute) => get(t).prCost;
export const incremental = (t: PlaceRoute) => get(t).incremental;
export const forAdvNode = (t: PlaceRoute) => get(t).forAdvNode;
export const algorithm = (t: PlaceRoute) => get(t).algorithm;
export const bestUse = (t: PlaceRoute) => get(t).bestUse;
export const placeRoutes = (): PlaceRoute[] => Object.keys(DATA) as PlaceRoute[];
