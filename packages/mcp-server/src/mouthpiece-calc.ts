export type Mouthpiece = "brass_cup" | "single_reed" | "double_reed" | "flute_embouchure" | "recorder_fipple";

export function toneRange(m2: Mouthpiece): number {
  const m: Record<Mouthpiece, number> = {
    brass_cup: 9, single_reed: 8, double_reed: 7, flute_embouchure: 10, recorder_fipple: 4,
  };
  return m[m2];
}

export function breathControl(m2: Mouthpiece): number {
  const m: Record<Mouthpiece, number> = {
    brass_cup: 8, single_reed: 7, double_reed: 10, flute_embouchure: 9, recorder_fipple: 3,
  };
  return m[m2];
}

export function beginnerDifficulty(m2: Mouthpiece): number {
  const m: Record<Mouthpiece, number> = {
    brass_cup: 7, single_reed: 5, double_reed: 9, flute_embouchure: 8, recorder_fipple: 1,
  };
  return m[m2];
}

export function maintenanceLevel(m2: Mouthpiece): number {
  const m: Record<Mouthpiece, number> = {
    brass_cup: 4, single_reed: 6, double_reed: 10, flute_embouchure: 3, recorder_fipple: 1,
  };
  return m[m2];
}

export function partCost(m2: Mouthpiece): number {
  const m: Record<Mouthpiece, number> = {
    brass_cup: 6, single_reed: 5, double_reed: 8, flute_embouchure: 7, recorder_fipple: 2,
  };
  return m[m2];
}

export function usesReed(m2: Mouthpiece): boolean {
  const m: Record<Mouthpiece, boolean> = {
    brass_cup: false, single_reed: true, double_reed: true, flute_embouchure: false, recorder_fipple: false,
  };
  return m[m2];
}

export function buzzRequired(m2: Mouthpiece): boolean {
  const m: Record<Mouthpiece, boolean> = {
    brass_cup: true, single_reed: false, double_reed: false, flute_embouchure: false, recorder_fipple: false,
  };
  return m[m2];
}

export function soundProduction(m2: Mouthpiece): string {
  const m: Record<Mouthpiece, string> = {
    brass_cup: "lip_buzz_cup_resonance", single_reed: "reed_vibration_against_lay",
    double_reed: "two_reed_blade_oscillation", flute_embouchure: "air_stream_edge_split",
    recorder_fipple: "windway_labium_air_channel",
  };
  return m[m2];
}

export function bestInstrumentFamily(m2: Mouthpiece): string {
  const m: Record<Mouthpiece, string> = {
    brass_cup: "trumpet_trombone_tuba", single_reed: "clarinet_saxophone",
    double_reed: "oboe_bassoon_english_horn", flute_embouchure: "concert_flute_piccolo",
    recorder_fipple: "soprano_alto_recorder",
  };
  return m[m2];
}

export function mouthpieces(): Mouthpiece[] {
  return ["brass_cup", "single_reed", "double_reed", "flute_embouchure", "recorder_fipple"];
}
