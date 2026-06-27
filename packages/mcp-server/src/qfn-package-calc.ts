export type QfnPackage =
  | "qfn_standard_exposed"
  | "dfn_dual_flat"
  | "wettable_flank_qfn"
  | "routable_qfn_multi_row"
  | "power_qfn_clip_bond";

const DATA: Record<QfnPackage, {
  thermal: number; density: number; inspectability: number;
  leadCount: number; qfCost: number; wettable: boolean;
  forPower: boolean; dieAttach: string; bestUse: string;
}> = {
  qfn_standard_exposed: {
    thermal: 7, density: 7, inspectability: 4,
    leadCount: 6, qfCost: 2, wettable: false,
    forPower: false, dieAttach: "epoxy_die_bond_pad",
    bestUse: "general_ic_compact_footprint",
  },
  dfn_dual_flat: {
    thermal: 6, density: 8, inspectability: 5,
    leadCount: 3, qfCost: 1, wettable: false,
    forPower: false, dieAttach: "epoxy_small_die_bond",
    bestUse: "discrete_mosfet_sot_replace",
  },
  wettable_flank_qfn: {
    thermal: 7, density: 7, inspectability: 9,
    leadCount: 6, qfCost: 3, wettable: true,
    forPower: false, dieAttach: "epoxy_side_plated_lead",
    bestUse: "automotive_aoi_solder_inspect",
  },
  routable_qfn_multi_row: {
    thermal: 8, density: 10, inspectability: 4,
    leadCount: 10, qfCost: 5, wettable: false,
    forPower: false, dieAttach: "multi_row_routing_rdl",
    bestUse: "high_pin_count_mcu_compact",
  },
  power_qfn_clip_bond: {
    thermal: 10, density: 6, inspectability: 6,
    leadCount: 5, qfCost: 4, wettable: true,
    forPower: true, dieAttach: "copper_clip_solder_top",
    bestUse: "half_bridge_gate_driver_module",
  },
};

const get = (t: QfnPackage) => DATA[t];

export const thermal = (t: QfnPackage) => get(t).thermal;
export const density = (t: QfnPackage) => get(t).density;
export const inspectability = (t: QfnPackage) => get(t).inspectability;
export const leadCount = (t: QfnPackage) => get(t).leadCount;
export const qfCost = (t: QfnPackage) => get(t).qfCost;
export const wettable = (t: QfnPackage) => get(t).wettable;
export const forPower = (t: QfnPackage) => get(t).forPower;
export const dieAttach = (t: QfnPackage) => get(t).dieAttach;
export const bestUse = (t: QfnPackage) => get(t).bestUse;
export const qfnPackages = (): QfnPackage[] => Object.keys(DATA) as QfnPackage[];
