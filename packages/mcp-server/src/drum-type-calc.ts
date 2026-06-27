export type DrumType = "snare" | "bass" | "tom" | "djembe" | "timpani";

export function diameterCm(drum: DrumType): number {
  const m: Record<DrumType, number> = {
    snare: 36, bass: 56, tom: 40, djembe: 33, timpani: 66,
  };
  return m[drum];
}

export function pitchRange(drum: DrumType): number {
  const m: Record<DrumType, number> = {
    snare: 4, bass: 2, tom: 6, djembe: 8, timpani: 10,
  };
  return m[drum];
}

export function volumeDb(drum: DrumType): number {
  const m: Record<DrumType, number> = {
    snare: 100, bass: 110, tom: 95, djembe: 90, timpani: 105,
  };
  return m[drum];
}

export function attackSharpness(drum: DrumType): number {
  const m: Record<DrumType, number> = {
    snare: 10, bass: 5, tom: 6, djembe: 8, timpani: 7,
  };
  return m[drum];
}

export function sustainMs(drum: DrumType): number {
  const m: Record<DrumType, number> = {
    snare: 200, bass: 800, tom: 500, djembe: 300, timpani: 1500,
  };
  return m[drum];
}

export function tunable(drum: DrumType): boolean {
  const m: Record<DrumType, boolean> = {
    snare: true, bass: true, tom: true, djembe: false, timpani: true,
  };
  return m[drum];
}

export function handPlayed(drum: DrumType): boolean {
  const m: Record<DrumType, boolean> = {
    snare: false, bass: false, tom: false, djembe: true, timpani: false,
  };
  return m[drum];
}

export function bestGenre(drum: DrumType): string {
  const m: Record<DrumType, string> = {
    snare: "rock", bass: "marching", tom: "jazz",
    djembe: "world", timpani: "orchestral",
  };
  return m[drum];
}

export function priceRange(drum: DrumType): number {
  const m: Record<DrumType, number> = {
    snare: 300, bass: 500, tom: 200, djembe: 150, timpani: 3000,
  };
  return m[drum];
}

export function drumTypes(): DrumType[] {
  return ["snare", "bass", "tom", "djembe", "timpani"];
}
