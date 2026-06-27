export type VeneerPeelerType =
  | "rotary_lathe"
  | "slicing_knife"
  | "half_round"
  | "stay_log"
  | "spindleless";

interface VeneerPeelerData {
  veneerQuality: number;
  throughput: number;
  yieldRate: number;
  thicknessRange: number;
  vpCost: number;
  decorative: boolean;
  forPlywood: boolean;
  peelerConfig: string;
  bestUse: string;
}

const DATA: Record<VeneerPeelerType, VeneerPeelerData> = {
  rotary_lathe: {
    veneerQuality: 7, throughput: 10, yieldRate: 9, thicknessRange: 8, vpCost: 8,
    decorative: false, forPlywood: true,
    peelerConfig: "rotary_lathe_veneer_peeler_spindle_rotate_log_knife_peel_sheet",
    bestUse: "plywood_factory_rotary_lathe_veneer_peeler_continuous_sheet",
  },
  slicing_knife: {
    veneerQuality: 10, throughput: 5, yieldRate: 6, thicknessRange: 9, vpCost: 9,
    decorative: true, forPlywood: false,
    peelerConfig: "slicing_knife_veneer_flitch_mount_blade_slice_flat_grain_show",
    bestUse: "decorative_veneer_slicing_knife_fine_furniture_flat_quarter_cut",
  },
  half_round: {
    veneerQuality: 9, throughput: 6, yieldRate: 7, thicknessRange: 8, vpCost: 8,
    decorative: true, forPlywood: false,
    peelerConfig: "half_round_veneer_peeler_offset_center_rotate_cathedral_grain",
    bestUse: "architectural_veneer_half_round_peeler_cathedral_grain_pattern",
  },
  stay_log: {
    veneerQuality: 9, throughput: 4, yieldRate: 5, thicknessRange: 7, vpCost: 7,
    decorative: true, forPlywood: false,
    peelerConfig: "stay_log_veneer_peeler_fixed_log_moving_knife_precise_cut",
    bestUse: "premium_veneer_stay_log_peeler_exotic_wood_precise_thin_slice",
  },
  spindleless: {
    veneerQuality: 7, throughput: 9, yieldRate: 10, thicknessRange: 7, vpCost: 7,
    decorative: false, forPlywood: true,
    peelerConfig: "spindleless_veneer_peeler_roller_drive_small_core_maximum_use",
    bestUse: "plywood_spindleless_veneer_peeler_small_diameter_log_max_yield",
  },
};

function get(t: VeneerPeelerType): VeneerPeelerData {
  return DATA[t];
}

export const veneerQuality = (t: VeneerPeelerType) => get(t).veneerQuality;
export const throughput = (t: VeneerPeelerType) => get(t).throughput;
export const yieldRate = (t: VeneerPeelerType) => get(t).yieldRate;
export const thicknessRange = (t: VeneerPeelerType) => get(t).thicknessRange;
export const vpCost = (t: VeneerPeelerType) => get(t).vpCost;
export const decorative = (t: VeneerPeelerType) => get(t).decorative;
export const forPlywood = (t: VeneerPeelerType) => get(t).forPlywood;
export const peelerConfig = (t: VeneerPeelerType) => get(t).peelerConfig;
export const bestUse = (t: VeneerPeelerType) => get(t).bestUse;
export const veneerPeelerTypes = (): VeneerPeelerType[] =>
  Object.keys(DATA) as VeneerPeelerType[];
