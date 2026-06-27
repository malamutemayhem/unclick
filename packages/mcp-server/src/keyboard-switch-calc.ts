export type KeyboardSwitchType = "cherry_red_linear" | "cherry_brown_tactile" | "cherry_blue_clicky" | "topre_electro" | "optical_analog";

export function actuationForce(t: KeyboardSwitchType): number {
  const m: Record<KeyboardSwitchType, number> = {
    cherry_red_linear: 3, cherry_brown_tactile: 5, cherry_blue_clicky: 6, topre_electro: 4, optical_analog: 3,
  };
  return m[t];
}

export function typingFeedback(t: KeyboardSwitchType): number {
  const m: Record<KeyboardSwitchType, number> = {
    cherry_red_linear: 2, cherry_brown_tactile: 7, cherry_blue_clicky: 10, topre_electro: 8, optical_analog: 3,
  };
  return m[t];
}

export function noiseLevel(t: KeyboardSwitchType): number {
  const m: Record<KeyboardSwitchType, number> = {
    cherry_red_linear: 3, cherry_brown_tactile: 5, cherry_blue_clicky: 10, topre_electro: 2, optical_analog: 3,
  };
  return m[t];
}

export function durabilityMillion(t: KeyboardSwitchType): number {
  const m: Record<KeyboardSwitchType, number> = {
    cherry_red_linear: 7, cherry_brown_tactile: 7, cherry_blue_clicky: 7, topre_electro: 8, optical_analog: 10,
  };
  return m[t];
}

export function switchCost(t: KeyboardSwitchType): number {
  const m: Record<KeyboardSwitchType, number> = {
    cherry_red_linear: 5, cherry_brown_tactile: 5, cherry_blue_clicky: 5, topre_electro: 10, optical_analog: 7,
  };
  return m[t];
}

export function hotSwappable(t: KeyboardSwitchType): boolean {
  const m: Record<KeyboardSwitchType, boolean> = {
    cherry_red_linear: true, cherry_brown_tactile: true, cherry_blue_clicky: true, topre_electro: false, optical_analog: true,
  };
  return m[t];
}

export function rgbTransparent(t: KeyboardSwitchType): boolean {
  const m: Record<KeyboardSwitchType, boolean> = {
    cherry_red_linear: true, cherry_brown_tactile: true, cherry_blue_clicky: false, topre_electro: false, optical_analog: true,
  };
  return m[t];
}

export function mechanism(t: KeyboardSwitchType): string {
  const m: Record<KeyboardSwitchType, string> = {
    cherry_red_linear: "spring_crosspoint_contact", cherry_brown_tactile: "bump_leaf_spring",
    cherry_blue_clicky: "click_jacket_two_piece", topre_electro: "rubber_dome_capacitive",
    optical_analog: "infrared_beam_trigger",
  };
  return m[t];
}

export function bestUse(t: KeyboardSwitchType): string {
  const m: Record<KeyboardSwitchType, string> = {
    cherry_red_linear: "gaming_fast_keypress", cherry_brown_tactile: "typing_office_allround",
    cherry_blue_clicky: "writer_tactile_audio", topre_electro: "premium_quiet_typing",
    optical_analog: "competitive_fps_esports",
  };
  return m[t];
}

export function keyboardSwitches(): KeyboardSwitchType[] {
  return ["cherry_red_linear", "cherry_brown_tactile", "cherry_blue_clicky", "topre_electro", "optical_analog"];
}
