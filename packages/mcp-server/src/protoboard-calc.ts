// protoboard-calc - protoboard types for permanent prototyping

export type Protoboard =
  | "perfboard_single_side"
  | "stripboard_copper_strip"
  | "dot_matrix_plated"
  | "bus_board_power_rail"
  | "smd_adapter_proto";

const DATA: Record<Protoboard, {
  solderEase: number; traceQuality: number; durability: number; layoutFlex: number;
  cost: number; platedThrough: boolean; forSmd: boolean; copperPattern: string; bestUse: string;
}> = {
  perfboard_single_side:    { solderEase: 8, traceQuality: 6, durability: 7, layoutFlex: 9, cost: 2, platedThrough: false, forSmd: false, copperPattern: "individual_pad_array", bestUse: "general_through_hole" },
  stripboard_copper_strip:  { solderEase: 7, traceQuality: 8, durability: 8, layoutFlex: 6, cost: 3, platedThrough: false, forSmd: false, copperPattern: "parallel_copper_strip", bestUse: "linear_bus_circuit" },
  dot_matrix_plated:        { solderEase: 9, traceQuality: 9, durability: 9, layoutFlex: 8, cost: 5, platedThrough: true, forSmd: false, copperPattern: "plated_through_dot", bestUse: "reliable_proto_build" },
  bus_board_power_rail:     { solderEase: 7, traceQuality: 7, durability: 8, layoutFlex: 5, cost: 4, platedThrough: false, forSmd: false, copperPattern: "bus_rail_with_pads", bestUse: "power_distribution" },
  smd_adapter_proto:        { solderEase: 5, traceQuality: 8, durability: 7, layoutFlex: 7, cost: 6, platedThrough: true, forSmd: true, copperPattern: "smd_pitch_pad_array", bestUse: "smd_component_adapt" },
};

const get = (p: Protoboard) => DATA[p];
export const solderEase = (p: Protoboard) => get(p).solderEase;
export const traceQuality = (p: Protoboard) => get(p).traceQuality;
export const durability = (p: Protoboard) => get(p).durability;
export const layoutFlex = (p: Protoboard) => get(p).layoutFlex;
export const boardCost = (p: Protoboard) => get(p).cost;
export const platedThrough = (p: Protoboard) => get(p).platedThrough;
export const forSmd = (p: Protoboard) => get(p).forSmd;
export const copperPattern = (p: Protoboard) => get(p).copperPattern;
export const bestUse = (p: Protoboard) => get(p).bestUse;
export const protoboards = (): Protoboard[] => Object.keys(DATA) as Protoboard[];
