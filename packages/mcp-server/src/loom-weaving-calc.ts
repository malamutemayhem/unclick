export type LoomWeavingType =
  | "air_jet"
  | "rapier"
  | "projectile"
  | "water_jet"
  | "jacquard_dobby";

interface LoomWeavingData {
  insertionRate: number;
  fabricWidth: number;
  yarnRange: number;
  patternComplexity: number;
  lwCost: number;
  shuttleless: boolean;
  forHeavyFabric: boolean;
  weftInsertion: string;
  bestUse: string;
}

const DATA: Record<LoomWeavingType, LoomWeavingData> = {
  air_jet: {
    insertionRate: 10, fabricWidth: 8, yarnRange: 6, patternComplexity: 6, lwCost: 7,
    shuttleless: true, forHeavyFabric: false,
    weftInsertion: "compressed_air_nozzle_relay_propel_weft_across_shed_fast",
    bestUse: "high_speed_cotton_polyester_shirting_sheeting_mass_production",
  },
  rapier: {
    insertionRate: 7, fabricWidth: 9, yarnRange: 10, patternComplexity: 8, lwCost: 6,
    shuttleless: true, forHeavyFabric: true,
    weftInsertion: "flexible_rigid_rapier_arm_carry_weft_tip_transfer_center",
    bestUse: "upholstery_denim_technical_textile_varied_yarn_versatile",
  },
  projectile: {
    insertionRate: 8, fabricWidth: 10, yarnRange: 9, patternComplexity: 7, lwCost: 8,
    shuttleless: true, forHeavyFabric: true,
    weftInsertion: "small_gripper_projectile_fly_across_wide_shed_heavy_yarn",
    bestUse: "wide_width_heavy_canvas_denim_industrial_fabric_multi_color",
  },
  water_jet: {
    insertionRate: 9, fabricWidth: 7, yarnRange: 4, patternComplexity: 5, lwCost: 5,
    shuttleless: true, forHeavyFabric: false,
    weftInsertion: "fine_water_jet_stream_carry_hydrophobic_yarn_across_shed",
    bestUse: "synthetic_filament_nylon_polyester_taffeta_lining_fabric",
  },
  jacquard_dobby: {
    insertionRate: 5, fabricWidth: 7, yarnRange: 8, patternComplexity: 10, lwCost: 9,
    shuttleless: true, forHeavyFabric: false,
    weftInsertion: "individual_warp_control_jacquard_head_electronic_pattern",
    bestUse: "brocade_damask_tapestry_complex_pattern_decorative_label",
  },
};

function get(t: LoomWeavingType): LoomWeavingData {
  return DATA[t];
}

export const insertionRate = (t: LoomWeavingType) => get(t).insertionRate;
export const fabricWidth = (t: LoomWeavingType) => get(t).fabricWidth;
export const yarnRange = (t: LoomWeavingType) => get(t).yarnRange;
export const patternComplexity = (t: LoomWeavingType) => get(t).patternComplexity;
export const lwCost = (t: LoomWeavingType) => get(t).lwCost;
export const shuttleless = (t: LoomWeavingType) => get(t).shuttleless;
export const forHeavyFabric = (t: LoomWeavingType) => get(t).forHeavyFabric;
export const weftInsertion = (t: LoomWeavingType) => get(t).weftInsertion;
export const bestUse = (t: LoomWeavingType) => get(t).bestUse;
export const loomWeavingTypes = (): LoomWeavingType[] =>
  Object.keys(DATA) as LoomWeavingType[];
