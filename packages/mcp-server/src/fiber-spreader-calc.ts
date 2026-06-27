export type FiberSpreaderType =
  | "air_jet_spread"
  | "roller_bar_spread"
  | "ultrasonic_spread"
  | "electrostatic_spread"
  | "mechanical_comb";

interface FiberSpreaderData {
  spreadUniformity: number;
  throughput: number;
  towDamage: number;
  spreadRatio: number;
  fsCost: number;
  contactFree: boolean;
  forThinPly: boolean;
  spreaderConfig: string;
  bestUse: string;
}

const DATA: Record<FiberSpreaderType, FiberSpreaderData> = {
  air_jet_spread: {
    spreadUniformity: 8, throughput: 8, towDamage: 9, spreadRatio: 8, fsCost: 6,
    contactFree: true, forThinPly: true,
    spreaderConfig: "air_jet_fiber_spreader_nozzle_array_pneumatic_tow_open_gentle",
    bestUse: "thin_ply_prepreg_air_jet_fiber_spreader_gentle_open_no_damage",
  },
  roller_bar_spread: {
    spreadUniformity: 7, throughput: 9, towDamage: 6, spreadRatio: 7, fsCost: 4,
    contactFree: false, forThinPly: false,
    spreaderConfig: "roller_bar_fiber_spreader_convex_bar_tension_wrap_angle_spread",
    bestUse: "standard_tape_roller_bar_fiber_spreader_convex_bar_production",
  },
  ultrasonic_spread: {
    spreadUniformity: 9, throughput: 7, towDamage: 8, spreadRatio: 9, fsCost: 8,
    contactFree: false, forThinPly: true,
    spreaderConfig: "ultrasonic_fiber_spreader_vibrating_horn_resonance_filament_open",
    bestUse: "ultra_thin_ply_ultrasonic_fiber_spreader_resonance_wide_spread",
  },
  electrostatic_spread: {
    spreadUniformity: 8, throughput: 6, towDamage: 9, spreadRatio: 8, fsCost: 7,
    contactFree: true, forThinPly: true,
    spreaderConfig: "electrostatic_fiber_spreader_charge_repel_filament_open_field",
    bestUse: "carbon_tow_electrostatic_fiber_spreader_charge_repel_no_touch",
  },
  mechanical_comb: {
    spreadUniformity: 6, throughput: 8, towDamage: 5, spreadRatio: 6, fsCost: 3,
    contactFree: false, forThinPly: false,
    spreaderConfig: "mechanical_comb_fiber_spreader_pin_array_separate_filament_row",
    bestUse: "glass_roving_mechanical_comb_fiber_spreader_pin_array_separate",
  },
};

function get(t: FiberSpreaderType): FiberSpreaderData {
  return DATA[t];
}

export const spreadUniformity = (t: FiberSpreaderType) => get(t).spreadUniformity;
export const throughput = (t: FiberSpreaderType) => get(t).throughput;
export const towDamage = (t: FiberSpreaderType) => get(t).towDamage;
export const spreadRatio = (t: FiberSpreaderType) => get(t).spreadRatio;
export const fsCost = (t: FiberSpreaderType) => get(t).fsCost;
export const contactFree = (t: FiberSpreaderType) => get(t).contactFree;
export const forThinPly = (t: FiberSpreaderType) => get(t).forThinPly;
export const spreaderConfig = (t: FiberSpreaderType) => get(t).spreaderConfig;
export const bestUse = (t: FiberSpreaderType) => get(t).bestUse;
export const fiberSpreaderTypes = (): FiberSpreaderType[] =>
  Object.keys(DATA) as FiberSpreaderType[];
