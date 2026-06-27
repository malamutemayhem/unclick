export type GateValveKnifeType =
  | "knife_gate_wafer"
  | "knife_gate_lug_round"
  | "slurry_knife_heavy"
  | "bi_directional_sealed"
  | "pneumatic_knife_auto";

interface GateValveKnifeData {
  slurryHandling: number;
  tightShutoff: number;
  abrasionResist: number;
  cycleLife: number;
  gkCost: number;
  bidirectional: boolean;
  forPulp: boolean;
  gate: string;
  bestUse: string;
}

const DATA: Record<GateValveKnifeType, GateValveKnifeData> = {
  knife_gate_wafer: {
    slurryHandling: 8, tightShutoff: 7, abrasionResist: 7, cycleLife: 7, gkCost: 3,
    bidirectional: false, forPulp: true,
    gate: "beveled_knife_edge_wafer_body_compact_light",
    bestUse: "pulp_stock_wastewater_general_slurry_isolation",
  },
  knife_gate_lug_round: {
    slurryHandling: 8, tightShutoff: 8, abrasionResist: 7, cycleLife: 8, gkCost: 4,
    bidirectional: false, forPulp: true,
    gate: "round_port_lug_body_end_of_line_capable",
    bestUse: "mining_tailings_end_of_line_hopper_discharge",
  },
  slurry_knife_heavy: {
    slurryHandling: 10, tightShutoff: 8, abrasionResist: 10, cycleLife: 8, gkCost: 7,
    bidirectional: false, forPulp: false,
    gate: "thick_blade_hardened_insert_replaceable_seat",
    bestUse: "heavy_mining_slurry_ash_abrasive_solids",
  },
  bi_directional_sealed: {
    slurryHandling: 7, tightShutoff: 10, abrasionResist: 7, cycleLife: 9, gkCost: 6,
    bidirectional: true, forPulp: false,
    gate: "full_perimeter_seal_bi_directional_zero_leak",
    bestUse: "chemical_process_tank_isolation_bi_direction",
  },
  pneumatic_knife_auto: {
    slurryHandling: 8, tightShutoff: 8, abrasionResist: 7, cycleLife: 9, gkCost: 5,
    bidirectional: false, forPulp: true,
    gate: "pneumatic_cylinder_actuated_spring_return_fail",
    bestUse: "automated_batch_process_hopper_bin_gate_control",
  },
};

function get(t: GateValveKnifeType): GateValveKnifeData {
  return DATA[t];
}

export const slurryHandling = (t: GateValveKnifeType) => get(t).slurryHandling;
export const tightShutoff = (t: GateValveKnifeType) => get(t).tightShutoff;
export const abrasionResist = (t: GateValveKnifeType) => get(t).abrasionResist;
export const cycleLife = (t: GateValveKnifeType) => get(t).cycleLife;
export const gkCost = (t: GateValveKnifeType) => get(t).gkCost;
export const bidirectional = (t: GateValveKnifeType) => get(t).bidirectional;
export const forPulp = (t: GateValveKnifeType) => get(t).forPulp;
export const gate = (t: GateValveKnifeType) => get(t).gate;
export const bestUse = (t: GateValveKnifeType) => get(t).bestUse;
export const gateValveKnifeTypes = (): GateValveKnifeType[] =>
  Object.keys(DATA) as GateValveKnifeType[];
