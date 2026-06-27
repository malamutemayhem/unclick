export type SafetyWhistleType = "pealess_plastic" | "metal_cork_ball" | "dual_tone_storm" | "electronic_alarm" | "flat_survival_card";

export function loudness(t: SafetyWhistleType): number {
  const m: Record<SafetyWhistleType, number> = {
    pealess_plastic: 8, metal_cork_ball: 7, dual_tone_storm: 10, electronic_alarm: 9, flat_survival_card: 5,
  };
  return m[t];
}

export function reliability(t: SafetyWhistleType): number {
  const m: Record<SafetyWhistleType, number> = {
    pealess_plastic: 10, metal_cork_ball: 6, dual_tone_storm: 9, electronic_alarm: 5, flat_survival_card: 8,
  };
  return m[t];
}

export function wetPerformance(t: SafetyWhistleType): number {
  const m: Record<SafetyWhistleType, number> = {
    pealess_plastic: 10, metal_cork_ball: 3, dual_tone_storm: 10, electronic_alarm: 2, flat_survival_card: 7,
  };
  return m[t];
}

export function compactness(t: SafetyWhistleType): number {
  const m: Record<SafetyWhistleType, number> = {
    pealess_plastic: 8, metal_cork_ball: 7, dual_tone_storm: 6, electronic_alarm: 5, flat_survival_card: 10,
  };
  return m[t];
}

export function whistleCost(t: SafetyWhistleType): number {
  const m: Record<SafetyWhistleType, number> = {
    pealess_plastic: 1, metal_cork_ball: 2, dual_tone_storm: 3, electronic_alarm: 6, flat_survival_card: 2,
  };
  return m[t];
}

export function needsBattery(t: SafetyWhistleType): boolean {
  const m: Record<SafetyWhistleType, boolean> = {
    pealess_plastic: false, metal_cork_ball: false, dual_tone_storm: false, electronic_alarm: true, flat_survival_card: false,
  };
  return m[t];
}

export function floats(t: SafetyWhistleType): boolean {
  const m: Record<SafetyWhistleType, boolean> = {
    pealess_plastic: true, metal_cork_ball: false, dual_tone_storm: true, electronic_alarm: false, flat_survival_card: true,
  };
  return m[t];
}

export function soundMethod(t: SafetyWhistleType): string {
  const m: Record<SafetyWhistleType, string> = {
    pealess_plastic: "air_chamber_no_ball",
    metal_cork_ball: "cork_pea_vibrate_chamber",
    dual_tone_storm: "dual_frequency_resonator",
    electronic_alarm: "piezo_speaker_battery",
    flat_survival_card: "edge_tone_flat_slot",
  };
  return m[t];
}

export function bestUse(t: SafetyWhistleType): string {
  const m: Record<SafetyWhistleType, string> = {
    pealess_plastic: "lifeguard_marine_rescue",
    metal_cork_ball: "referee_sports_field",
    dual_tone_storm: "offshore_sailing_storm",
    electronic_alarm: "personal_safety_urban",
    flat_survival_card: "wallet_edc_emergency",
  };
  return m[t];
}

export function safetyWhistles(): SafetyWhistleType[] {
  return ["pealess_plastic", "metal_cork_ball", "dual_tone_storm", "electronic_alarm", "flat_survival_card"];
}
