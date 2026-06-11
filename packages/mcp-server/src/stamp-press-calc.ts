export type StampPressType =
  | "progressive_die_strip"
  | "transfer_press_multi"
  | "deep_draw_cup_shell"
  | "blanking_fine_blank"
  | "coining_emboss_mint";

interface StampPressData {
  force: number;
  speed: number;
  precision: number;
  complexity: number;
  spCost: number;
  continuous: boolean;
  forHighVol: boolean;
  tooling: string;
  bestUse: string;
}

const DATA: Record<StampPressType, StampPressData> = {
  progressive_die_strip: {
    force: 8, speed: 10, precision: 9, complexity: 9, spCost: 9,
    continuous: true, forHighVol: true,
    tooling: "multi_station_strip_feed_sequential",
    bestUse: "connector_bracket_clip_high_vol",
  },
  transfer_press_multi: {
    force: 9, speed: 8, precision: 8, complexity: 10, spCost: 10,
    continuous: false, forHighVol: true,
    tooling: "transfer_finger_multi_die_station",
    bestUse: "shell_case_hub_large_complex_part",
  },
  deep_draw_cup_shell: {
    force: 10, speed: 7, precision: 7, complexity: 7, spCost: 7,
    continuous: false, forHighVol: true,
    tooling: "punch_die_blank_holder_redraw",
    bestUse: "can_body_sink_enclosure_cup_shape",
  },
  blanking_fine_blank: {
    force: 9, speed: 9, precision: 10, complexity: 5, spCost: 8,
    continuous: true, forHighVol: true,
    tooling: "v_ring_triple_action_shear_smooth",
    bestUse: "gear_blank_clutch_plate_flat_part",
  },
  coining_emboss_mint: {
    force: 10, speed: 8, precision: 10, complexity: 4, spCost: 6,
    continuous: false, forHighVol: false,
    tooling: "closed_die_high_pressure_relief",
    bestUse: "coin_medal_nameplate_precision_form",
  },
};

function get(t: StampPressType): StampPressData {
  return DATA[t];
}

export const force = (t: StampPressType) => get(t).force;
export const speed = (t: StampPressType) => get(t).speed;
export const precision = (t: StampPressType) => get(t).precision;
export const complexity = (t: StampPressType) => get(t).complexity;
export const spCost = (t: StampPressType) => get(t).spCost;
export const continuous = (t: StampPressType) => get(t).continuous;
export const forHighVol = (t: StampPressType) => get(t).forHighVol;
export const tooling = (t: StampPressType) => get(t).tooling;
export const bestUse = (t: StampPressType) => get(t).bestUse;
export const stampPressTypes = (): StampPressType[] =>
  Object.keys(DATA) as StampPressType[];
