export type InstrumentFamily = "string" | "woodwind" | "brass" | "percussion" | "keyboard";

export function pitchRange(i: InstrumentFamily): number {
  const m: Record<InstrumentFamily, number> = {
    string: 8, woodwind: 6, brass: 5, percussion: 3, keyboard: 10,
  };
  return m[i];
}

export function dynamicRange(i: InstrumentFamily): number {
  const m: Record<InstrumentFamily, number> = {
    string: 8, woodwind: 6, brass: 9, percussion: 10, keyboard: 7,
  };
  return m[i];
}

export function portabilityScore(i: InstrumentFamily): number {
  const m: Record<InstrumentFamily, number> = {
    string: 6, woodwind: 8, brass: 7, percussion: 3, keyboard: 2,
  };
  return m[i];
}

export function learningCurve(i: InstrumentFamily): number {
  const m: Record<InstrumentFamily, number> = {
    string: 8, woodwind: 7, brass: 6, percussion: 4, keyboard: 5,
  };
  return m[i];
}

export function orchestraCount(i: InstrumentFamily): number {
  const m: Record<InstrumentFamily, number> = {
    string: 60, woodwind: 12, brass: 16, percussion: 6, keyboard: 2,
  };
  return m[i];
}

export function requiresBreath(i: InstrumentFamily): boolean {
  const m: Record<InstrumentFamily, boolean> = {
    string: false, woodwind: true, brass: true, percussion: false, keyboard: false,
  };
  return m[i];
}

export function sustainedTone(i: InstrumentFamily): boolean {
  const m: Record<InstrumentFamily, boolean> = {
    string: true, woodwind: true, brass: true, percussion: false, keyboard: false,
  };
  return m[i];
}

export function exampleInstrument(i: InstrumentFamily): string {
  const m: Record<InstrumentFamily, string> = {
    string: "violin", woodwind: "clarinet", brass: "trumpet",
    percussion: "timpani", keyboard: "piano",
  };
  return m[i];
}

export function soundProduction(i: InstrumentFamily): string {
  const m: Record<InstrumentFamily, string> = {
    string: "vibrating_string", woodwind: "air_column",
    brass: "lip_buzz", percussion: "striking",
    keyboard: "hammer_mechanism",
  };
  return m[i];
}

export function instrumentFamilies(): InstrumentFamily[] {
  return ["string", "woodwind", "brass", "percussion", "keyboard"];
}
