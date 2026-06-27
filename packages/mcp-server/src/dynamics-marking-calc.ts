export type DynamicsMarking = "pp" | "p" | "mp" | "mf" | "ff";

export function decibelLevel(d: DynamicsMarking): number {
  const m: Record<DynamicsMarking, number> = {
    pp: 40, p: 50, mp: 60, mf: 70, ff: 90,
  };
  return m[d];
}

export function expressiveIntensity(d: DynamicsMarking): number {
  const m: Record<DynamicsMarking, number> = {
    pp: 8, p: 5, mp: 4, mf: 6, ff: 9,
  };
  return m[d];
}

export function physicalEffort(d: DynamicsMarking): number {
  const m: Record<DynamicsMarking, number> = {
    pp: 7, p: 4, mp: 3, mf: 5, ff: 10,
  };
  return m[d];
}

export function controlDifficulty(d: DynamicsMarking): number {
  const m: Record<DynamicsMarking, number> = {
    pp: 9, p: 5, mp: 3, mf: 4, ff: 7,
  };
  return m[d];
}

export function usageFrequency(d: DynamicsMarking): number {
  const m: Record<DynamicsMarking, number> = {
    pp: 4, p: 7, mp: 8, mf: 9, ff: 5,
  };
  return m[d];
}

export function softDynamic(d: DynamicsMarking): boolean {
  const m: Record<DynamicsMarking, boolean> = {
    pp: true, p: true, mp: true, mf: false, ff: false,
  };
  return m[d];
}

export function extremeDynamic(d: DynamicsMarking): boolean {
  const m: Record<DynamicsMarking, boolean> = {
    pp: true, p: false, mp: false, mf: false, ff: true,
  };
  return m[d];
}

export function italianName(d: DynamicsMarking): string {
  const m: Record<DynamicsMarking, string> = {
    pp: "pianissimo", p: "piano", mp: "mezzo_piano",
    mf: "mezzo_forte", ff: "fortissimo",
  };
  return m[d];
}

export function typicalContext(d: DynamicsMarking): string {
  const m: Record<DynamicsMarking, string> = {
    pp: "intimate_passage", p: "accompaniment",
    mp: "secondary_melody", mf: "primary_melody",
    ff: "climax",
  };
  return m[d];
}

export function dynamicsMarkings(): DynamicsMarking[] {
  return ["pp", "p", "mp", "mf", "ff"];
}
