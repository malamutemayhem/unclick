export type AutomatonType = "music_box" | "barrel_organ" | "player_piano" | "carillon" | "orchestrion";

export function pinsPerRevolution(notesPerBar: number, bars: number): number {
  return notesPerBar * bars;
}

export function cylinderDiameter(pins: number, pinSpacingMm: number): number {
  const circumference = pins * pinSpacingMm;
  return parseFloat((circumference / Math.PI).toFixed(1));
}

export function cylinderLength(notes: number, noteSpacingMm: number): number {
  return parseFloat((notes * noteSpacingMm).toFixed(1));
}

export function playTime(pins: number, rpm: number): number {
  if (rpm <= 0) return 0;
  const revolutions = 1;
  return parseFloat((60 / rpm).toFixed(1));
}

export function combTeeth(type: AutomatonType): number {
  const teeth: Record<AutomatonType, number> = {
    music_box: 18, barrel_organ: 36, player_piano: 88,
    carillon: 23, orchestrion: 65,
  };
  return teeth[type];
}

export function frequency(noteNumber: number): number {
  return parseFloat((440 * Math.pow(2, (noteNumber - 49) / 12)).toFixed(2));
}

export function toothLength(freq: number): number {
  if (freq <= 0) return 0;
  return parseFloat((5000 / freq).toFixed(2));
}

export function springTension(cylinderWeightG: number): number {
  return parseFloat((cylinderWeightG * 0.3).toFixed(1));
}

export function windingTurns(playTimeMin: number): number {
  return Math.ceil(playTimeMin * 5);
}

export function tuningError(targetHz: number, actualHz: number): number {
  if (targetHz <= 0) return 0;
  return parseFloat((1200 * Math.log2(actualHz / targetHz)).toFixed(1));
}

export function costEstimate(type: AutomatonType): number {
  const usd: Record<AutomatonType, number> = {
    music_box: 30, barrel_organ: 5000, player_piano: 8000,
    carillon: 50000, orchestrion: 100000,
  };
  return usd[type];
}

export function automatonTypes(): AutomatonType[] {
  return ["music_box", "barrel_organ", "player_piano", "carillon", "orchestrion"];
}
