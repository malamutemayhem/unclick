// Splint gauge calculator - basket weaving width/thickness measuring tools

export type SplintGaugeType =
  | "brass_plate_slot"
  | "adjustable_slide_rule"
  | "wooden_block_notch"
  | "steel_caliper_pinch"
  | "plastic_template_set";

const GAUGE_DATA: Record<
  SplintGaugeType,
  {
    measureAccuracy: number;
    repeatConsist: number;
    easeOfUse: number;
    durability: number;
    cost: number;
    adjustable: boolean;
    forWidth: boolean;
    scaleType: string;
    bestUse: string;
  }
> = {
  brass_plate_slot: {
    measureAccuracy: 8,
    repeatConsist: 9,
    easeOfUse: 7,
    durability: 9,
    cost: 5,
    adjustable: false,
    forWidth: true,
    scaleType: "fixed_slot_sizes",
    bestUse: "standard_width_check",
  },
  adjustable_slide_rule: {
    measureAccuracy: 9,
    repeatConsist: 8,
    easeOfUse: 7,
    durability: 7,
    cost: 6,
    adjustable: true,
    forWidth: true,
    scaleType: "sliding_scale_bar",
    bestUse: "custom_width_set",
  },
  wooden_block_notch: {
    measureAccuracy: 6,
    repeatConsist: 7,
    easeOfUse: 9,
    durability: 6,
    cost: 2,
    adjustable: false,
    forWidth: true,
    scaleType: "carved_notch_step",
    bestUse: "quick_rough_sort",
  },
  steel_caliper_pinch: {
    measureAccuracy: 10,
    repeatConsist: 9,
    easeOfUse: 6,
    durability: 10,
    cost: 7,
    adjustable: true,
    forWidth: false,
    scaleType: "vernier_dial_read",
    bestUse: "thickness_measure",
  },
  plastic_template_set: {
    measureAccuracy: 7,
    repeatConsist: 8,
    easeOfUse: 10,
    durability: 5,
    cost: 3,
    adjustable: false,
    forWidth: true,
    scaleType: "molded_slot_array",
    bestUse: "beginner_size_sort",
  },
};

export function measureAccuracy(type: SplintGaugeType): number {
  return GAUGE_DATA[type].measureAccuracy;
}
export function repeatConsist(type: SplintGaugeType): number {
  return GAUGE_DATA[type].repeatConsist;
}
export function easeOfUse(type: SplintGaugeType): number {
  return GAUGE_DATA[type].easeOfUse;
}
export function durability(type: SplintGaugeType): number {
  return GAUGE_DATA[type].durability;
}
export function gaugeCost(type: SplintGaugeType): number {
  return GAUGE_DATA[type].cost;
}
export function adjustable(type: SplintGaugeType): boolean {
  return GAUGE_DATA[type].adjustable;
}
export function forWidth(type: SplintGaugeType): boolean {
  return GAUGE_DATA[type].forWidth;
}
export function scaleType(type: SplintGaugeType): string {
  return GAUGE_DATA[type].scaleType;
}
export function bestUse(type: SplintGaugeType): string {
  return GAUGE_DATA[type].bestUse;
}
export function splintGauges(): SplintGaugeType[] {
  return Object.keys(GAUGE_DATA) as SplintGaugeType[];
}
