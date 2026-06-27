export type DuplexerFilter =
  | "saw_surface_acoustic"
  | "baw_fbar"
  | "ceramic_dielectric"
  | "cavity_combline"
  | "ltcc_integrated";

const DATA: Record<DuplexerFilter, {
  insertionLoss: number; isolation: number; selectivity: number;
  powerHandling: number; filterCost: number; temperatureStable: boolean;
  forHandset: boolean; technology: string; bestUse: string;
}> = {
  saw_surface_acoustic: {
    insertionLoss: 7, isolation: 7, selectivity: 7,
    powerHandling: 4, filterCost: 2, temperatureStable: false,
    forHandset: true, technology: "piezo_interdigital",
    bestUse: "4g_lte_phone_fdd",
  },
  baw_fbar: {
    insertionLoss: 9, isolation: 9, selectivity: 9,
    powerHandling: 7, filterCost: 5, temperatureStable: true,
    forHandset: true, technology: "thin_film_bulk_acoustic",
    bestUse: "5g_sub6_n77_n78",
  },
  ceramic_dielectric: {
    insertionLoss: 6, isolation: 6, selectivity: 6,
    powerHandling: 8, filterCost: 4, temperatureStable: true,
    forHandset: false, technology: "high_k_resonator",
    bestUse: "gps_gnss_preselect",
  },
  cavity_combline: {
    insertionLoss: 8, isolation: 10, selectivity: 10,
    powerHandling: 10, filterCost: 8, temperatureStable: true,
    forHandset: false, technology: "machined_metal_cavity",
    bestUse: "base_station_duplexer",
  },
  ltcc_integrated: {
    insertionLoss: 6, isolation: 7, selectivity: 7,
    powerHandling: 5, filterCost: 3, temperatureStable: true,
    forHandset: true, technology: "multilayer_ceramic_emb",
    bestUse: "wifi_bt_coexist_filt",
  },
};

const get = (t: DuplexerFilter) => DATA[t];

export const insertionLoss = (t: DuplexerFilter) => get(t).insertionLoss;
export const isolation = (t: DuplexerFilter) => get(t).isolation;
export const selectivity = (t: DuplexerFilter) => get(t).selectivity;
export const powerHandling = (t: DuplexerFilter) => get(t).powerHandling;
export const filterCost = (t: DuplexerFilter) => get(t).filterCost;
export const temperatureStable = (t: DuplexerFilter) => get(t).temperatureStable;
export const forHandset = (t: DuplexerFilter) => get(t).forHandset;
export const technology = (t: DuplexerFilter) => get(t).technology;
export const bestUse = (t: DuplexerFilter) => get(t).bestUse;
export const duplexerFilters = (): DuplexerFilter[] => Object.keys(DATA) as DuplexerFilter[];
