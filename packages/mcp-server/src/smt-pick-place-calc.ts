export type SmtPickPlaceType =
  | "chip_shooter"
  | "turret_head"
  | "gantry_multi_head"
  | "modular_flex"
  | "odd_form";

interface SmtPickPlaceData {
  speed: number;
  accuracy: number;
  componentRange: number;
  feederCapacity: number;
  spCost: number;
  visionAligned: boolean;
  forFinePitch: boolean;
  head: string;
  bestUse: string;
}

const DATA: Record<SmtPickPlaceType, SmtPickPlaceData> = {
  chip_shooter: {
    speed: 10, accuracy: 6, componentRange: 4, feederCapacity: 8, spCost: 7,
    visionAligned: true, forFinePitch: false,
    head: "rotary_turret_multi_nozzle_high_speed_passive_chip_place",
    bestUse: "high_volume_passive_component_resistor_capacitor_placement",
  },
  turret_head: {
    speed: 9, accuracy: 7, componentRange: 6, feederCapacity: 9, spCost: 8,
    visionAligned: true, forFinePitch: false,
    head: "rotating_turret_12_nozzle_continuous_motion_flying_vision",
    bestUse: "mainstream_smt_line_mixed_passive_small_ic_balanced_speed",
  },
  gantry_multi_head: {
    speed: 7, accuracy: 10, componentRange: 9, feederCapacity: 7, spCost: 9,
    visionAligned: true, forFinePitch: true,
    head: "gantry_xy_multi_head_independent_z_fine_pitch_bga_csp_qfp",
    bestUse: "fine_pitch_bga_csp_flip_chip_precision_placement_complex",
  },
  modular_flex: {
    speed: 8, accuracy: 8, componentRange: 10, feederCapacity: 10, spCost: 10,
    visionAligned: true, forFinePitch: true,
    head: "modular_beam_interchangeable_head_auto_nozzle_change_flex",
    bestUse: "high_mix_low_volume_prototype_quick_changeover_versatile",
  },
  odd_form: {
    speed: 4, accuracy: 8, componentRange: 10, feederCapacity: 5, spCost: 6,
    visionAligned: true, forFinePitch: false,
    head: "special_gripper_dip_flux_through_hole_connector_odd_shape",
    bestUse: "through_hole_connector_odd_shape_component_auto_insertion",
  },
};

function get(t: SmtPickPlaceType): SmtPickPlaceData {
  return DATA[t];
}

export const speed = (t: SmtPickPlaceType) => get(t).speed;
export const accuracy = (t: SmtPickPlaceType) => get(t).accuracy;
export const componentRange = (t: SmtPickPlaceType) => get(t).componentRange;
export const feederCapacity = (t: SmtPickPlaceType) => get(t).feederCapacity;
export const spCost = (t: SmtPickPlaceType) => get(t).spCost;
export const visionAligned = (t: SmtPickPlaceType) => get(t).visionAligned;
export const forFinePitch = (t: SmtPickPlaceType) => get(t).forFinePitch;
export const head = (t: SmtPickPlaceType) => get(t).head;
export const bestUse = (t: SmtPickPlaceType) => get(t).bestUse;
export const smtPickPlaceTypes = (): SmtPickPlaceType[] =>
  Object.keys(DATA) as SmtPickPlaceType[];
