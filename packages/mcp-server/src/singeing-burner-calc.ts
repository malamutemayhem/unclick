export type SingeingBurnerType =
  | "gas_flame_direct"
  | "plate_contact"
  | "rotary_cylinder"
  | "infrared_radiant"
  | "dual_face";

interface SingeingBurnerData {
  flameIntensity: number;
  fabricSpeed: number;
  fiberRemoval: number;
  heatUniformity: number;
  sbCost: number;
  adjustable: boolean;
  forKnit: boolean;
  burnerConfig: string;
  bestUse: string;
}

const DATA: Record<SingeingBurnerType, SingeingBurnerData> = {
  gas_flame_direct: {
    flameIntensity: 9, fabricSpeed: 9, fiberRemoval: 8, heatUniformity: 7, sbCost: 5,
    adjustable: true, forKnit: false,
    burnerConfig: "open_gas_flame_row_burner_direct_contact_protruding_fiber",
    bestUse: "woven_cotton_polyester_blend_high_speed_singeing_clean_face",
  },
  plate_contact: {
    flameIntensity: 7, fabricSpeed: 7, fiberRemoval: 7, heatUniformity: 9, sbCost: 4,
    adjustable: false, forKnit: true,
    burnerConfig: "heated_copper_plate_fabric_passes_over_contact_surface_singe",
    bestUse: "delicate_knit_lightweight_woven_gentle_singeing_low_tension",
  },
  rotary_cylinder: {
    flameIntensity: 8, fabricSpeed: 8, fiberRemoval: 9, heatUniformity: 8, sbCost: 6,
    adjustable: true, forKnit: false,
    burnerConfig: "rotating_heated_cylinder_wrap_fabric_around_drum_even_singe",
    bestUse: "heavy_denim_twill_canvas_uniform_singeing_both_sides_wrap",
  },
  infrared_radiant: {
    flameIntensity: 6, fabricSpeed: 6, fiberRemoval: 6, heatUniformity: 10, sbCost: 8,
    adjustable: true, forKnit: true,
    burnerConfig: "ceramic_infrared_emitter_radiant_heat_no_flame_contact_fiber",
    bestUse: "synthetic_microfiber_technical_textile_precision_heat_control",
  },
  dual_face: {
    flameIntensity: 10, fabricSpeed: 10, fiberRemoval: 10, heatUniformity: 8, sbCost: 9,
    adjustable: true, forKnit: false,
    burnerConfig: "twin_burner_bank_singe_both_fabric_faces_single_pass_line",
    bestUse: "high_volume_mill_sheeting_shirting_dual_side_production_line",
  },
};

function get(t: SingeingBurnerType): SingeingBurnerData {
  return DATA[t];
}

export const flameIntensity = (t: SingeingBurnerType) => get(t).flameIntensity;
export const fabricSpeed = (t: SingeingBurnerType) => get(t).fabricSpeed;
export const fiberRemoval = (t: SingeingBurnerType) => get(t).fiberRemoval;
export const heatUniformity = (t: SingeingBurnerType) => get(t).heatUniformity;
export const sbCost = (t: SingeingBurnerType) => get(t).sbCost;
export const adjustable = (t: SingeingBurnerType) => get(t).adjustable;
export const forKnit = (t: SingeingBurnerType) => get(t).forKnit;
export const burnerConfig = (t: SingeingBurnerType) => get(t).burnerConfig;
export const bestUse = (t: SingeingBurnerType) => get(t).bestUse;
export const singeingBurnerTypes = (): SingeingBurnerType[] =>
  Object.keys(DATA) as SingeingBurnerType[];
