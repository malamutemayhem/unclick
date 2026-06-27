export type BmsTopology =
  | "passive_balance_bleed"
  | "active_balance_flyback"
  | "centralized_master"
  | "distributed_daisy_chain"
  | "wireless_bms";

const DATA: Record<BmsTopology, {
  balanceEff: number; accuracy: number; scalability: number;
  reliability: number; bmsCost: number; bidirectional: boolean;
  forLargePack: boolean; method: string; bestUse: string;
}> = {
  passive_balance_bleed: {
    balanceEff: 2, accuracy: 7, scalability: 8,
    reliability: 9, bmsCost: 1, bidirectional: false,
    forLargePack: false, method: "resistor_dissipation_shunt",
    bestUse: "low_cost_power_tool",
  },
  active_balance_flyback: {
    balanceEff: 9, accuracy: 8, scalability: 6,
    reliability: 7, bmsCost: 7, bidirectional: true,
    forLargePack: true, method: "transformer_energy_shuttle",
    bestUse: "ev_pack_range_maximize",
  },
  centralized_master: {
    balanceEff: 5, accuracy: 9, scalability: 5,
    reliability: 6, bmsCost: 4, bidirectional: false,
    forLargePack: false, method: "single_ic_mux_monitor",
    bestUse: "ebike_scooter_pack",
  },
  distributed_daisy_chain: {
    balanceEff: 6, accuracy: 9, scalability: 10,
    reliability: 8, bmsCost: 6, bidirectional: false,
    forLargePack: true, method: "isospi_stacked_monitor",
    bestUse: "grid_mwh_battery_farm",
  },
  wireless_bms: {
    balanceEff: 5, accuracy: 8, scalability: 9,
    reliability: 7, bmsCost: 8, bidirectional: false,
    forLargePack: true, method: "ble_mesh_cell_telemetry",
    bestUse: "ev_module_weight_reduce",
  },
};

const get = (t: BmsTopology) => DATA[t];

export const balanceEff = (t: BmsTopology) => get(t).balanceEff;
export const accuracy = (t: BmsTopology) => get(t).accuracy;
export const scalability = (t: BmsTopology) => get(t).scalability;
export const reliability = (t: BmsTopology) => get(t).reliability;
export const bmsCost = (t: BmsTopology) => get(t).bmsCost;
export const bidirectional = (t: BmsTopology) => get(t).bidirectional;
export const forLargePack = (t: BmsTopology) => get(t).forLargePack;
export const method = (t: BmsTopology) => get(t).method;
export const bestUse = (t: BmsTopology) => get(t).bestUse;
export const bmsTopologies = (): BmsTopology[] => Object.keys(DATA) as BmsTopology[];
