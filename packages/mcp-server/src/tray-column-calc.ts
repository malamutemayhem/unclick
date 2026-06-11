export type TrayColumnType =
  | "sieve_tray_perforated"
  | "valve_tray_float"
  | "bubble_cap_tray"
  | "dual_flow_no_downcomer"
  | "baffle_tray_shower";

interface TrayColumnData {
  efficiency: number;
  turndown: number;
  capacity: number;
  foulingTol: number;
  tcCost: number;
  downcomer: boolean;
  forVacuum: boolean;
  tray: string;
  bestUse: string;
}

const DATA: Record<TrayColumnType, TrayColumnData> = {
  sieve_tray_perforated: {
    efficiency: 7, turndown: 4, capacity: 8, foulingTol: 5, tcCost: 3,
    downcomer: true, forVacuum: false,
    tray: "perforated_plate_liquid_weir_downcomer",
    bestUse: "general_distill_clean_service_low_cost",
  },
  valve_tray_float: {
    efficiency: 8, turndown: 8, capacity: 8, foulingTol: 6, tcCost: 5,
    downcomer: true, forVacuum: false,
    tray: "movable_valve_cap_variable_open_area",
    bestUse: "refinery_petrochem_variable_load_flex",
  },
  bubble_cap_tray: {
    efficiency: 8, turndown: 10, capacity: 6, foulingTol: 7, tcCost: 8,
    downcomer: true, forVacuum: false,
    tray: "riser_cap_slot_seal_liquid_contact",
    bestUse: "low_liquid_rate_positive_seal_critical",
  },
  dual_flow_no_downcomer: {
    efficiency: 5, turndown: 3, capacity: 10, foulingTol: 10, tcCost: 2,
    downcomer: false, forVacuum: false,
    tray: "large_hole_sieve_no_downcomer_flood",
    bestUse: "fouling_slurry_coking_severe_service",
  },
  baffle_tray_shower: {
    efficiency: 4, turndown: 5, capacity: 9, foulingTol: 9, tcCost: 2,
    downcomer: true, forVacuum: false,
    tray: "segmental_baffle_shower_deck_cascade",
    bestUse: "heat_transfer_quench_direct_contact",
  },
};

function get(t: TrayColumnType): TrayColumnData {
  return DATA[t];
}

export const efficiency = (t: TrayColumnType) => get(t).efficiency;
export const turndown = (t: TrayColumnType) => get(t).turndown;
export const capacity = (t: TrayColumnType) => get(t).capacity;
export const foulingTol = (t: TrayColumnType) => get(t).foulingTol;
export const tcCost = (t: TrayColumnType) => get(t).tcCost;
export const downcomer = (t: TrayColumnType) => get(t).downcomer;
export const forVacuum = (t: TrayColumnType) => get(t).forVacuum;
export const tray = (t: TrayColumnType) => get(t).tray;
export const bestUse = (t: TrayColumnType) => get(t).bestUse;
export const trayColumnTypes = (): TrayColumnType[] =>
  Object.keys(DATA) as TrayColumnType[];
