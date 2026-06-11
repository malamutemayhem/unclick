export type DrawFrameType =
  | "single_head_breaker"
  | "double_head_finisher"
  | "autoleveler_regulated"
  | "high_speed_compact"
  | "blended_mixing";

interface DrawFrameData {
  draftQuality: number;
  deliverySpeed: number;
  evenness: number;
  doublingCapacity: number;
  dfCost: number;
  autoLeveler: boolean;
  forCombing: boolean;
  rollerConfig: string;
  bestUse: string;
}

const DATA: Record<DrawFrameType, DrawFrameData> = {
  single_head_breaker: {
    draftQuality: 6, deliverySpeed: 7, evenness: 6, doublingCapacity: 8, dfCost: 3,
    autoLeveler: false, forCombing: false,
    rollerConfig: "single_delivery_head_3_over_3_roller_draft_breaker_passage",
    bestUse: "first_passage_drawing_parallelize_fiber_reduce_sliver_hook",
  },
  double_head_finisher: {
    draftQuality: 8, deliverySpeed: 8, evenness: 8, doublingCapacity: 7, dfCost: 5,
    autoLeveler: false, forCombing: true,
    rollerConfig: "twin_delivery_head_4_over_3_roller_finisher_even_sliver_out",
    bestUse: "finisher_drawing_post_combing_even_sliver_ring_spinning_feed",
  },
  autoleveler_regulated: {
    draftQuality: 10, deliverySpeed: 9, evenness: 10, doublingCapacity: 8, dfCost: 9,
    autoLeveler: true, forCombing: true,
    rollerConfig: "servo_regulated_draft_tongue_groove_autoleveler_sensor_loop",
    bestUse: "premium_combed_yarn_autoleveled_sliver_compact_spinning_feed",
  },
  high_speed_compact: {
    draftQuality: 7, deliverySpeed: 10, evenness: 7, doublingCapacity: 6, dfCost: 7,
    autoLeveler: true, forCombing: false,
    rollerConfig: "high_speed_single_head_compact_coiler_fast_can_change_auto",
    bestUse: "high_volume_open_end_rotor_spinning_feed_fast_sliver_output",
  },
  blended_mixing: {
    draftQuality: 7, deliverySpeed: 6, evenness: 9, doublingCapacity: 10, dfCost: 6,
    autoLeveler: false, forCombing: false,
    rollerConfig: "multi_creel_doubling_8_to_12_fold_blend_mixing_draft_passage",
    bestUse: "intimate_fiber_blend_polyester_cotton_viscose_multi_component",
  },
};

function get(t: DrawFrameType): DrawFrameData {
  return DATA[t];
}

export const draftQuality = (t: DrawFrameType) => get(t).draftQuality;
export const deliverySpeed = (t: DrawFrameType) => get(t).deliverySpeed;
export const evenness = (t: DrawFrameType) => get(t).evenness;
export const doublingCapacity = (t: DrawFrameType) => get(t).doublingCapacity;
export const dfCost = (t: DrawFrameType) => get(t).dfCost;
export const autoLeveler = (t: DrawFrameType) => get(t).autoLeveler;
export const forCombing = (t: DrawFrameType) => get(t).forCombing;
export const rollerConfig = (t: DrawFrameType) => get(t).rollerConfig;
export const bestUse = (t: DrawFrameType) => get(t).bestUse;
export const drawFrameTypes = (): DrawFrameType[] =>
  Object.keys(DATA) as DrawFrameType[];
