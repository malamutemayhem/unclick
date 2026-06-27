export type TimeSignature = "four_four" | "three_four" | "six_eight" | "five_four" | "seven_eight";

export function beatsPerMeasure(ts: TimeSignature): number {
  const m: Record<TimeSignature, number> = {
    four_four: 4, three_four: 3, six_eight: 6, five_four: 5, seven_eight: 7,
  };
  return m[ts];
}

export function beatUnit(ts: TimeSignature): number {
  const m: Record<TimeSignature, number> = {
    four_four: 4, three_four: 4, six_eight: 8, five_four: 4, seven_eight: 8,
  };
  return m[ts];
}

export function danceability(ts: TimeSignature): number {
  const m: Record<TimeSignature, number> = {
    four_four: 10, three_four: 9, six_eight: 7, five_four: 3, seven_eight: 2,
  };
  return m[ts];
}

export function complexity(ts: TimeSignature): number {
  const m: Record<TimeSignature, number> = {
    four_four: 1, three_four: 2, six_eight: 4, five_four: 7, seven_eight: 9,
  };
  return m[ts];
}

export function popularityInPop(ts: TimeSignature): number {
  const m: Record<TimeSignature, number> = {
    four_four: 10, three_four: 4, six_eight: 3, five_four: 1, seven_eight: 1,
  };
  return m[ts];
}

export function compound(ts: TimeSignature): boolean {
  const m: Record<TimeSignature, boolean> = {
    four_four: false, three_four: false, six_eight: true, five_four: false, seven_eight: false,
  };
  return m[ts];
}

export function irregular(ts: TimeSignature): boolean {
  const m: Record<TimeSignature, boolean> = {
    four_four: false, three_four: false, six_eight: false, five_four: true, seven_eight: true,
  };
  return m[ts];
}

export function commonDance(ts: TimeSignature): string {
  const m: Record<TimeSignature, string> = {
    four_four: "march", three_four: "waltz", six_eight: "jig",
    five_four: "none_standard", seven_eight: "none_standard",
  };
  return m[ts];
}

export function famousExample(ts: TimeSignature): string {
  const m: Record<TimeSignature, string> = {
    four_four: "most_pop_songs", three_four: "blue_danube",
    six_eight: "house_of_the_rising_sun", five_four: "take_five",
    seven_eight: "money_pink_floyd",
  };
  return m[ts];
}

export function timeSignatures(): TimeSignature[] {
  return ["four_four", "three_four", "six_eight", "five_four", "seven_eight"];
}
