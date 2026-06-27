export type TextileLoomType =
  | "air_jet"
  | "rapier"
  | "projectile"
  | "water_jet"
  | "multiphase";

interface TextileLoomData {
  speed: number;
  fabricRange: number;
  yarnGentle: number;
  noiseLevel: number;
  tlCost: number;
  shuttleless: boolean;
  forHeavyFabric: boolean;
  insertion: string;
  bestUse: string;
}

const DATA: Record<TextileLoomType, TextileLoomData> = {
  air_jet: {
    speed: 10, fabricRange: 6, yarnGentle: 7, noiseLevel: 4, tlCost: 8,
    shuttleless: true, forHeavyFabric: false,
    insertion: "compressed_air_nozzle_relay_weft_across_shed_high_speed",
    bestUse: "cotton_polyester_blended_standard_width_commodity_fabric",
  },
  rapier: {
    speed: 7, fabricRange: 10, yarnGentle: 9, noiseLevel: 7, tlCost: 7,
    shuttleless: true, forHeavyFabric: true,
    insertion: "rigid_or_flexible_rapier_gripper_tip_positive_transfer",
    bestUse: "fancy_yarn_jacquard_upholstery_technical_wide_width_fabric",
  },
  projectile: {
    speed: 8, fabricRange: 8, yarnGentle: 8, noiseLevel: 5, tlCost: 9,
    shuttleless: true, forHeavyFabric: true,
    insertion: "small_metal_projectile_gripper_single_pick_across_wide",
    bestUse: "denim_canvas_heavy_industrial_wide_loom_high_density_fabric",
  },
  water_jet: {
    speed: 9, fabricRange: 4, yarnGentle: 6, noiseLevel: 8, tlCost: 5,
    shuttleless: true, forHeavyFabric: false,
    insertion: "fine_water_jet_stream_weft_carry_hydrophobic_yarn_only",
    bestUse: "synthetic_filament_polyester_nylon_taffeta_lining_fabric",
  },
  multiphase: {
    speed: 10, fabricRange: 3, yarnGentle: 5, noiseLevel: 6, tlCost: 10,
    shuttleless: true, forHeavyFabric: false,
    insertion: "multiple_sheds_simultaneous_weft_insertion_linear_motor",
    bestUse: "ultra_high_volume_staple_commodity_sheeting_plain_weave",
  },
};

function get(t: TextileLoomType): TextileLoomData {
  return DATA[t];
}

export const speed = (t: TextileLoomType) => get(t).speed;
export const fabricRange = (t: TextileLoomType) => get(t).fabricRange;
export const yarnGentle = (t: TextileLoomType) => get(t).yarnGentle;
export const noiseLevel = (t: TextileLoomType) => get(t).noiseLevel;
export const tlCost = (t: TextileLoomType) => get(t).tlCost;
export const shuttleless = (t: TextileLoomType) => get(t).shuttleless;
export const forHeavyFabric = (t: TextileLoomType) => get(t).forHeavyFabric;
export const insertion = (t: TextileLoomType) => get(t).insertion;
export const bestUse = (t: TextileLoomType) => get(t).bestUse;
export const textileLoomTypes = (): TextileLoomType[] =>
  Object.keys(DATA) as TextileLoomType[];
