export type PianoActionType = "grand_hammer" | "upright_vertical" | "weighted_digital" | "semi_weighted" | "synth_spring";

export function keyFeel(t: PianoActionType): number {
  const m: Record<PianoActionType, number> = {
    grand_hammer: 10, upright_vertical: 8, weighted_digital: 7, semi_weighted: 5, synth_spring: 3,
  };
  return m[t];
}

export function expressiveness(t: PianoActionType): number {
  const m: Record<PianoActionType, number> = {
    grand_hammer: 10, upright_vertical: 8, weighted_digital: 7, semi_weighted: 6, synth_spring: 4,
  };
  return m[t];
}

export function repeatSpeed(t: PianoActionType): number {
  const m: Record<PianoActionType, number> = {
    grand_hammer: 9, upright_vertical: 6, weighted_digital: 8, semi_weighted: 9, synth_spring: 10,
  };
  return m[t];
}

export function maintenanceNeed(t: PianoActionType): number {
  const m: Record<PianoActionType, number> = {
    grand_hammer: 2, upright_vertical: 4, weighted_digital: 8, semi_weighted: 9, synth_spring: 10,
  };
  return m[t];
}

export function actionCost(t: PianoActionType): number {
  const m: Record<PianoActionType, number> = {
    grand_hammer: 10, upright_vertical: 7, weighted_digital: 5, semi_weighted: 3, synth_spring: 1,
  };
  return m[t];
}

export function velocitySensitive(t: PianoActionType): boolean {
  const m: Record<PianoActionType, boolean> = {
    grand_hammer: true, upright_vertical: true, weighted_digital: true, semi_weighted: true, synth_spring: false,
  };
  return m[t];
}

export function aftertouch(t: PianoActionType): boolean {
  const m: Record<PianoActionType, boolean> = {
    grand_hammer: false, upright_vertical: false, weighted_digital: false, semi_weighted: true, synth_spring: true,
  };
  return m[t];
}

export function mechanismType(t: PianoActionType): string {
  const m: Record<PianoActionType, string> = {
    grand_hammer: "double_escapement_gravity", upright_vertical: "compressed_spring_return",
    weighted_digital: "graded_hammer_counterweight", semi_weighted: "spring_loaded_resistance",
    synth_spring: "light_spring_no_weight",
  };
  return m[t];
}

export function bestPlayer(t: PianoActionType): string {
  const m: Record<PianoActionType, string> = {
    grand_hammer: "concert_classical_pianist", upright_vertical: "home_practice_student",
    weighted_digital: "gigging_musician_portable", semi_weighted: "synth_player_organ_style",
    synth_spring: "beginner_controller_producer",
  };
  return m[t];
}

export function pianoActions(): PianoActionType[] {
  return ["grand_hammer", "upright_vertical", "weighted_digital", "semi_weighted", "synth_spring"];
}
