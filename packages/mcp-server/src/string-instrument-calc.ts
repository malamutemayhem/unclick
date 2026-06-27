export type StringInstrument = "violin" | "guitar" | "harp" | "cello" | "banjo";

export function stringCount(inst: StringInstrument): number {
  const m: Record<StringInstrument, number> = {
    violin: 4, guitar: 6, harp: 47, cello: 4, banjo: 5,
  };
  return m[inst];
}

export function pitchRangeOctaves(inst: StringInstrument): number {
  const m: Record<StringInstrument, number> = {
    violin: 4, guitar: 4, harp: 7, cello: 4, banjo: 3,
  };
  return m[inst];
}

export function volumeProjection(inst: StringInstrument): number {
  const m: Record<StringInstrument, number> = {
    violin: 7, guitar: 5, harp: 6, cello: 8, banjo: 7,
  };
  return m[inst];
}

export function learningDifficulty(inst: StringInstrument): number {
  const m: Record<StringInstrument, number> = {
    violin: 9, guitar: 5, harp: 8, cello: 8, banjo: 6,
  };
  return m[inst];
}

export function sustainSeconds(inst: StringInstrument): number {
  const m: Record<StringInstrument, number> = {
    violin: 10, guitar: 4, harp: 6, cello: 10, banjo: 2,
  };
  return m[inst];
}

export function bowed(inst: StringInstrument): boolean {
  const m: Record<StringInstrument, boolean> = {
    violin: true, guitar: false, harp: false, cello: true, banjo: false,
  };
  return m[inst];
}

export function fretted(inst: StringInstrument): boolean {
  const m: Record<StringInstrument, boolean> = {
    violin: false, guitar: true, harp: false, cello: false, banjo: true,
  };
  return m[inst];
}

export function bestGenre(inst: StringInstrument): string {
  const m: Record<StringInstrument, string> = {
    violin: "classical", guitar: "pop", harp: "orchestral",
    cello: "chamber", banjo: "bluegrass",
  };
  return m[inst];
}

export function averagePriceUsd(inst: StringInstrument): number {
  const m: Record<StringInstrument, number> = {
    violin: 2000, guitar: 500, harp: 5000, cello: 3000, banjo: 600,
  };
  return m[inst];
}

export function stringInstruments(): StringInstrument[] {
  return ["violin", "guitar", "harp", "cello", "banjo"];
}
