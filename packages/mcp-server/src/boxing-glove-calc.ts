export type BoxingGloveType = "bag_glove_light_12oz" | "sparring_padded_16oz" | "competition_lace_10oz" | "mma_open_finger_4oz" | "cardio_wrap_quick_on";

export function handProtection(t: BoxingGloveType): number {
  const m: Record<BoxingGloveType, number> = {
    bag_glove_light_12oz: 7, sparring_padded_16oz: 10, competition_lace_10oz: 8, mma_open_finger_4oz: 4, cardio_wrap_quick_on: 5,
  };
  return m[t];
}

export function punchFeedback(t: BoxingGloveType): number {
  const m: Record<BoxingGloveType, number> = {
    bag_glove_light_12oz: 8, sparring_padded_16oz: 5, competition_lace_10oz: 9, mma_open_finger_4oz: 10, cardio_wrap_quick_on: 6,
  };
  return m[t];
}

export function wristSupport(t: BoxingGloveType): number {
  const m: Record<BoxingGloveType, number> = {
    bag_glove_light_12oz: 7, sparring_padded_16oz: 9, competition_lace_10oz: 10, mma_open_finger_4oz: 5, cardio_wrap_quick_on: 4,
  };
  return m[t];
}

export function easeOnOff(t: BoxingGloveType): number {
  const m: Record<BoxingGloveType, number> = {
    bag_glove_light_12oz: 8, sparring_padded_16oz: 7, competition_lace_10oz: 3, mma_open_finger_4oz: 9, cardio_wrap_quick_on: 10,
  };
  return m[t];
}

export function gloveCost(t: BoxingGloveType): number {
  const m: Record<BoxingGloveType, number> = {
    bag_glove_light_12oz: 3, sparring_padded_16oz: 5, competition_lace_10oz: 8, mma_open_finger_4oz: 6, cardio_wrap_quick_on: 2,
  };
  return m[t];
}

export function thumbAttached(t: BoxingGloveType): boolean {
  const m: Record<BoxingGloveType, boolean> = {
    bag_glove_light_12oz: true, sparring_padded_16oz: true, competition_lace_10oz: true, mma_open_finger_4oz: false, cardio_wrap_quick_on: true,
  };
  return m[t];
}

export function laceUp(t: BoxingGloveType): boolean {
  const m: Record<BoxingGloveType, boolean> = {
    bag_glove_light_12oz: false, sparring_padded_16oz: false, competition_lace_10oz: true, mma_open_finger_4oz: false, cardio_wrap_quick_on: false,
  };
  return m[t];
}

export function paddingType(t: BoxingGloveType): string {
  const m: Record<BoxingGloveType, string> = {
    bag_glove_light_12oz: "multi_layer_foam_12oz",
    sparring_padded_16oz: "injected_mold_foam_16oz",
    competition_lace_10oz: "horsehair_foam_hybrid_10oz",
    mma_open_finger_4oz: "thin_foam_open_palm_4oz",
    cardio_wrap_quick_on: "neoprene_gel_wrap",
  };
  return m[t];
}

export function bestTraining(t: BoxingGloveType): string {
  const m: Record<BoxingGloveType, string> = {
    bag_glove_light_12oz: "heavy_bag_mitt_drill",
    sparring_padded_16oz: "partner_sparring_safe",
    competition_lace_10oz: "amateur_pro_bout",
    mma_open_finger_4oz: "mma_grapple_strike",
    cardio_wrap_quick_on: "fitness_class_cardio",
  };
  return m[t];
}

export function boxingGloves(): BoxingGloveType[] {
  return ["bag_glove_light_12oz", "sparring_padded_16oz", "competition_lace_10oz", "mma_open_finger_4oz", "cardio_wrap_quick_on"];
}
