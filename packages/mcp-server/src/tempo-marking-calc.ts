export type TempoMarking = "largo" | "adagio" | "andante" | "allegro" | "presto";

export function bpmMin(tempo: TempoMarking): number {
  const m: Record<TempoMarking, number> = {
    largo: 40, adagio: 66, andante: 76, allegro: 120, presto: 168,
  };
  return m[tempo];
}

export function bpmMax(tempo: TempoMarking): number {
  const m: Record<TempoMarking, number> = {
    largo: 65, adagio: 76, andante: 108, allegro: 156, presto: 200,
  };
  return m[tempo];
}

export function energyLevel(tempo: TempoMarking): number {
  const m: Record<TempoMarking, number> = {
    largo: 1, adagio: 3, andante: 5, allegro: 8, presto: 10,
  };
  return m[tempo];
}

export function technicalDifficulty(tempo: TempoMarking): number {
  const m: Record<TempoMarking, number> = {
    largo: 5, adagio: 4, andante: 3, allegro: 7, presto: 10,
  };
  return m[tempo];
}

export function emotionalWeight(tempo: TempoMarking): number {
  const m: Record<TempoMarking, number> = {
    largo: 10, adagio: 9, andante: 5, allegro: 4, presto: 3,
  };
  return m[tempo];
}

export function danceableForHumans(tempo: TempoMarking): boolean {
  const m: Record<TempoMarking, boolean> = {
    largo: false, adagio: true, andante: true, allegro: true, presto: false,
  };
  return m[tempo];
}

export function suitableForMarch(tempo: TempoMarking): boolean {
  const m: Record<TempoMarking, boolean> = {
    largo: false, adagio: false, andante: true, allegro: true, presto: false,
  };
  return m[tempo];
}

export function italianMeaning(tempo: TempoMarking): string {
  const m: Record<TempoMarking, string> = {
    largo: "broadly", adagio: "at_ease", andante: "walking_pace",
    allegro: "fast_lively", presto: "very_fast",
  };
  return m[tempo];
}

export function commonUsage(tempo: TempoMarking): string {
  const m: Record<TempoMarking, string> = {
    largo: "funeral_march", adagio: "slow_movement", andante: "lyrical_passage",
    allegro: "opening_movement", presto: "finale",
  };
  return m[tempo];
}

export function tempoMarkings(): TempoMarking[] {
  return ["largo", "adagio", "andante", "allegro", "presto"];
}
