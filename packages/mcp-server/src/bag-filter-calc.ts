export type BagFilterType =
  | "pulse_jet_online"
  | "reverse_air_offline"
  | "shaker_mechanical"
  | "pleated_bag_compact"
  | "high_temp_ceramic";

interface BagFilterData {
  filtrationEff: number;
  dustLoad: number;
  airToCloth: number;
  cleaningEase: number;
  bfCost: number;
  continuousClean: boolean;
  forHighTemp: boolean;
  media: string;
  bestUse: string;
}

const DATA: Record<BagFilterType, BagFilterData> = {
  pulse_jet_online: {
    filtrationEff: 9, dustLoad: 9, airToCloth: 9, cleaningEase: 10, bfCost: 5,
    continuousClean: true, forHighTemp: false,
    media: "polyester_polypropylene_needle_felt_pulse",
    bestUse: "cement_steel_grain_high_dust_load_continuous",
  },
  reverse_air_offline: {
    filtrationEff: 8, dustLoad: 7, airToCloth: 6, cleaningEase: 7, bfCost: 4,
    continuousClean: false, forHighTemp: false,
    media: "woven_fiberglass_or_polyester_gentle_clean",
    bestUse: "utility_boiler_large_fabric_filter_gentle",
  },
  shaker_mechanical: {
    filtrationEff: 7, dustLoad: 6, airToCloth: 5, cleaningEase: 6, bfCost: 3,
    continuousClean: false, forHighTemp: false,
    media: "woven_cotton_polyester_mechanical_shake",
    bestUse: "small_batch_woodworking_grain_low_volume",
  },
  pleated_bag_compact: {
    filtrationEff: 9, dustLoad: 8, airToCloth: 10, cleaningEase: 9, bfCost: 6,
    continuousClean: true, forHighTemp: false,
    media: "pleated_cartridge_style_spunbond_high_area",
    bestUse: "pharmaceutical_food_compact_space_fine_dust",
  },
  high_temp_ceramic: {
    filtrationEff: 10, dustLoad: 7, airToCloth: 7, cleaningEase: 8, bfCost: 9,
    continuousClean: true, forHighTemp: true,
    media: "ceramic_fiber_candle_or_silicon_carbide",
    bestUse: "incinerator_smelter_gasifier_above_250c",
  },
};

function get(t: BagFilterType): BagFilterData {
  return DATA[t];
}

export const filtrationEff = (t: BagFilterType) => get(t).filtrationEff;
export const dustLoad = (t: BagFilterType) => get(t).dustLoad;
export const airToCloth = (t: BagFilterType) => get(t).airToCloth;
export const cleaningEase = (t: BagFilterType) => get(t).cleaningEase;
export const bfCost = (t: BagFilterType) => get(t).bfCost;
export const continuousClean = (t: BagFilterType) => get(t).continuousClean;
export const forHighTemp = (t: BagFilterType) => get(t).forHighTemp;
export const media = (t: BagFilterType) => get(t).media;
export const bestUse = (t: BagFilterType) => get(t).bestUse;
export const bagFilterTypes = (): BagFilterType[] =>
  Object.keys(DATA) as BagFilterType[];
