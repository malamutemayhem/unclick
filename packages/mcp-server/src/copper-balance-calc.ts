export type CopperBalanceType =
  | "thieving_pattern_fill"
  | "ground_pour_flood"
  | "crosshatch_partial"
  | "dummy_trace_balance"
  | "solid_plane_mirror";

const DATA: Record<CopperBalanceType, {
  balanceQuality: number; etchUniformity: number; thermalRelief: number;
  routingImpact: number; balanceCost: number; automated: boolean;
  forMultilayer: boolean; fillPattern: string; bestUse: string;
}> = {
  thieving_pattern_fill: { balanceQuality: 9, etchUniformity: 9, thermalRelief: 5, routingImpact: 8, balanceCost: 3, automated: true, forMultilayer: true, fillPattern: "dot_array_non_functional", bestUse: "outer_layer_etch_balance" },
  ground_pour_flood: { balanceQuality: 7, etchUniformity: 7, thermalRelief: 7, routingImpact: 5, balanceCost: 1, automated: true, forMultilayer: true, fillPattern: "solid_copper_fill", bestUse: "emc_shield_ground_fill" },
  crosshatch_partial: { balanceQuality: 6, etchUniformity: 6, thermalRelief: 8, routingImpact: 7, balanceCost: 2, automated: true, forMultilayer: false, fillPattern: "diagonal_grid_mesh", bestUse: "flex_board_bend_area" },
  dummy_trace_balance: { balanceQuality: 5, etchUniformity: 5, thermalRelief: 4, routingImpact: 9, balanceCost: 2, automated: false, forMultilayer: false, fillPattern: "non_connect_trace_route", bestUse: "sparse_board_edge_balance" },
  solid_plane_mirror: { balanceQuality: 10, etchUniformity: 10, thermalRelief: 3, routingImpact: 3, balanceCost: 4, automated: true, forMultilayer: true, fillPattern: "full_plane_symmetric", bestUse: "symmetric_stackup_warp_ctrl" },
};

const get = (t: CopperBalanceType) => DATA[t];

export const balanceQuality = (t: CopperBalanceType) => get(t).balanceQuality;
export const etchUniformity = (t: CopperBalanceType) => get(t).etchUniformity;
export const thermalRelief = (t: CopperBalanceType) => get(t).thermalRelief;
export const routingImpact = (t: CopperBalanceType) => get(t).routingImpact;
export const balanceCost = (t: CopperBalanceType) => get(t).balanceCost;
export const automated = (t: CopperBalanceType) => get(t).automated;
export const forMultilayer = (t: CopperBalanceType) => get(t).forMultilayer;
export const fillPattern = (t: CopperBalanceType) => get(t).fillPattern;
export const bestUse = (t: CopperBalanceType) => get(t).bestUse;
export const copperBalances = (): CopperBalanceType[] => Object.keys(DATA) as CopperBalanceType[];
