export type CombingMachineType =
  | "rectilinear_cotton"
  | "circular_french"
  | "noble_comb"
  | "high_speed_cotton"
  | "dual_lap_feed";

interface CombingMachineData {
  noilRemoval: number;
  combingSpeed: number;
  fiberAlignment: number;
  shortFiberRemoval: number;
  cbCost: number;
  autoLap: boolean;
  forLongStaple: boolean;
  combConfig: string;
  bestUse: string;
}

const DATA: Record<CombingMachineType, CombingMachineData> = {
  rectilinear_cotton: {
    noilRemoval: 8, combingSpeed: 8, fiberAlignment: 8, shortFiberRemoval: 8, cbCost: 6,
    autoLap: true, forLongStaple: false,
    combConfig: "flat_comb_half_lap_feed_nipper_top_comb_detaching_roller_join",
    bestUse: "cotton_combed_yarn_remove_short_fiber_nep_improve_evenness",
  },
  circular_french: {
    noilRemoval: 7, combingSpeed: 6, fiberAlignment: 9, shortFiberRemoval: 7, cbCost: 5,
    autoLap: false, forLongStaple: true,
    combConfig: "circular_comb_gill_draft_french_system_worsted_fiber_align",
    bestUse: "worsted_wool_mohair_long_staple_fiber_alignment_parallel_comb",
  },
  noble_comb: {
    noilRemoval: 9, combingSpeed: 5, fiberAlignment: 10, shortFiberRemoval: 9, cbCost: 7,
    autoLap: false, forLongStaple: true,
    combConfig: "circle_of_pins_intersecting_double_comb_noble_fine_fiber_sort",
    bestUse: "fine_wool_cashmere_alpaca_luxury_fiber_sorting_premium_top",
  },
  high_speed_cotton: {
    noilRemoval: 9, combingSpeed: 10, fiberAlignment: 8, shortFiberRemoval: 10, cbCost: 10,
    autoLap: true, forLongStaple: false,
    combConfig: "high_nip_speed_piecing_wave_compact_lap_auto_change_fast_comb",
    bestUse: "high_volume_premium_cotton_combed_compact_yarn_fast_production",
  },
  dual_lap_feed: {
    noilRemoval: 7, combingSpeed: 7, fiberAlignment: 7, shortFiberRemoval: 7, cbCost: 4,
    autoLap: false, forLongStaple: false,
    combConfig: "dual_lap_sheet_feed_standard_comb_basic_noil_extraction_join",
    bestUse: "budget_combed_yarn_basic_short_fiber_removal_standard_quality",
  },
};

function get(t: CombingMachineType): CombingMachineData {
  return DATA[t];
}

export const noilRemoval = (t: CombingMachineType) => get(t).noilRemoval;
export const combingSpeed = (t: CombingMachineType) => get(t).combingSpeed;
export const fiberAlignment = (t: CombingMachineType) => get(t).fiberAlignment;
export const shortFiberRemoval = (t: CombingMachineType) => get(t).shortFiberRemoval;
export const cbCost = (t: CombingMachineType) => get(t).cbCost;
export const autoLap = (t: CombingMachineType) => get(t).autoLap;
export const forLongStaple = (t: CombingMachineType) => get(t).forLongStaple;
export const combConfig = (t: CombingMachineType) => get(t).combConfig;
export const bestUse = (t: CombingMachineType) => get(t).bestUse;
export const combingMachineTypes = (): CombingMachineType[] =>
  Object.keys(DATA) as CombingMachineType[];
