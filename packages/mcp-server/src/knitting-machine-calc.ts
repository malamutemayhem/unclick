export type KnittingMachineType =
  | "circular_single_jersey"
  | "circular_double_jersey"
  | "flat_v_bed"
  | "warp_tricot"
  | "warp_raschel";

interface KnittingMachineData {
  speed: number;
  fabricComplexity: number;
  gaugeRange: number;
  patterning: number;
  kmCost: number;
  seamless: boolean;
  forGarment: boolean;
  formation: string;
  bestUse: string;
}

const DATA: Record<KnittingMachineType, KnittingMachineData> = {
  circular_single_jersey: {
    speed: 10, fabricComplexity: 5, gaugeRange: 7, patterning: 6, kmCost: 6,
    seamless: true, forGarment: true,
    formation: "single_needle_bed_cylinder_rotation_continuous_tube",
    bestUse: "t_shirt_underwear_jersey_knit_single_face_basic_fabric",
  },
  circular_double_jersey: {
    speed: 8, fabricComplexity: 8, gaugeRange: 7, patterning: 8, kmCost: 8,
    seamless: true, forGarment: true,
    formation: "cylinder_and_dial_double_needle_bed_interlock_rib",
    bestUse: "polo_shirt_sportswear_interlock_rib_double_knit_fabric",
  },
  flat_v_bed: {
    speed: 4, fabricComplexity: 10, gaugeRange: 10, patterning: 10, kmCost: 7,
    seamless: false, forGarment: true,
    formation: "two_flat_needle_beds_v_angle_carriage_traverse_shaping",
    bestUse: "sweater_knitwear_fully_fashioned_3d_shaped_panel_collar",
  },
  warp_tricot: {
    speed: 9, fabricComplexity: 6, gaugeRange: 5, patterning: 5, kmCost: 9,
    seamless: false, forGarment: false,
    formation: "warp_beam_guide_bar_tricot_stitch_high_speed_beam_fed",
    bestUse: "lingerie_lining_automotive_interior_tricot_smooth_face",
  },
  warp_raschel: {
    speed: 7, fabricComplexity: 9, gaugeRange: 8, patterning: 9, kmCost: 10,
    seamless: false, forGarment: false,
    formation: "warp_beam_latch_needle_open_structure_net_lace_spacer",
    bestUse: "lace_net_curtain_geotextile_spacer_fabric_technical_mesh",
  },
};

function get(t: KnittingMachineType): KnittingMachineData {
  return DATA[t];
}

export const speed = (t: KnittingMachineType) => get(t).speed;
export const fabricComplexity = (t: KnittingMachineType) => get(t).fabricComplexity;
export const gaugeRange = (t: KnittingMachineType) => get(t).gaugeRange;
export const patterning = (t: KnittingMachineType) => get(t).patterning;
export const kmCost = (t: KnittingMachineType) => get(t).kmCost;
export const seamless = (t: KnittingMachineType) => get(t).seamless;
export const forGarment = (t: KnittingMachineType) => get(t).forGarment;
export const formation = (t: KnittingMachineType) => get(t).formation;
export const bestUse = (t: KnittingMachineType) => get(t).bestUse;
export const knittingMachineTypes = (): KnittingMachineType[] =>
  Object.keys(DATA) as KnittingMachineType[];
