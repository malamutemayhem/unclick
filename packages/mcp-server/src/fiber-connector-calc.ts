export type FiberConnectorType =
  | "sc_square_push_pull"
  | "lc_small_form_factor"
  | "mpo_mtp_multi_fiber"
  | "fc_threaded_ferrule"
  | "st_bayonet_twist";

const DATA: Record<FiberConnectorType, {
  density: number; insertionLoss: number; durability: number;
  ease: number; fcCost: number; multiFiber: boolean;
  forDataCenter: boolean; ferrule: string; bestUse: string;
}> = {
  sc_square_push_pull: {
    density: 5, insertionLoss: 8, durability: 8,
    ease: 9, fcCost: 2, multiFiber: false,
    forDataCenter: false, ferrule: "2_5mm_zirconia_ceramic",
    bestUse: "ftth_pon_telecom_patch_panel",
  },
  lc_small_form_factor: {
    density: 9, insertionLoss: 9, durability: 7,
    ease: 8, fcCost: 2, multiFiber: false,
    forDataCenter: true, ferrule: "1_25mm_ceramic_duplex",
    bestUse: "data_center_sfp_transceiver_port",
  },
  mpo_mtp_multi_fiber: {
    density: 10, insertionLoss: 6, durability: 6,
    ease: 5, fcCost: 4, multiFiber: true,
    forDataCenter: true, ferrule: "mt_ferrule_12_24_ribbon",
    bestUse: "spine_leaf_parallel_optics_trunk",
  },
  fc_threaded_ferrule: {
    density: 3, insertionLoss: 9, durability: 10,
    ease: 4, fcCost: 3, multiFiber: false,
    forDataCenter: false, ferrule: "2_5mm_threaded_keyed_lock",
    bestUse: "test_instrument_otn_legacy",
  },
  st_bayonet_twist: {
    density: 4, insertionLoss: 7, durability: 7,
    ease: 6, fcCost: 2, multiFiber: false,
    forDataCenter: false, ferrule: "2_5mm_bayonet_spring_load",
    bestUse: "campus_lan_multimode_legacy",
  },
};

const get = (t: FiberConnectorType) => DATA[t];

export const density = (t: FiberConnectorType) => get(t).density;
export const insertionLoss = (t: FiberConnectorType) => get(t).insertionLoss;
export const durability = (t: FiberConnectorType) => get(t).durability;
export const ease = (t: FiberConnectorType) => get(t).ease;
export const fcCost = (t: FiberConnectorType) => get(t).fcCost;
export const multiFiber = (t: FiberConnectorType) => get(t).multiFiber;
export const forDataCenter = (t: FiberConnectorType) => get(t).forDataCenter;
export const ferrule = (t: FiberConnectorType) => get(t).ferrule;
export const bestUse = (t: FiberConnectorType) => get(t).bestUse;
export const fiberConnectorTypes = (): FiberConnectorType[] => Object.keys(DATA) as FiberConnectorType[];
