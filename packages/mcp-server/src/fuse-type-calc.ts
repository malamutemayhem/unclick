export type FuseType = "visco" | "quick_match" | "electric" | "black_match" | "time_delay";

export function burnRate(f: FuseType): number {
  const m: Record<FuseType, number> = {
    visco: 4, quick_match: 10, electric: 8, black_match: 7, time_delay: 2,
  };
  return m[f];
}

export function reliability(f: FuseType): number {
  const m: Record<FuseType, number> = {
    visco: 9, quick_match: 7, electric: 10, black_match: 6, time_delay: 8,
  };
  return m[f];
}

export function safetyRating(f: FuseType): number {
  const m: Record<FuseType, number> = {
    visco: 8, quick_match: 4, electric: 9, black_match: 5, time_delay: 7,
  };
  return m[f];
}

export function precisionTiming(f: FuseType): number {
  const m: Record<FuseType, number> = {
    visco: 5, quick_match: 3, electric: 10, black_match: 4, time_delay: 9,
  };
  return m[f];
}

export function weatherResistance(f: FuseType): number {
  const m: Record<FuseType, number> = {
    visco: 9, quick_match: 3, electric: 7, black_match: 2, time_delay: 6,
  };
  return m[f];
}

export function requiresIgniter(f: FuseType): boolean {
  const m: Record<FuseType, boolean> = {
    visco: false, quick_match: false, electric: true, black_match: false, time_delay: false,
  };
  return m[f];
}

export function consumerLegal(f: FuseType): boolean {
  const m: Record<FuseType, boolean> = {
    visco: true, quick_match: false, electric: false, black_match: false, time_delay: false,
  };
  return m[f];
}

export function primaryUse(f: FuseType): string {
  const m: Record<FuseType, string> = {
    visco: "consumer_fireworks", quick_match: "professional_chain_firing",
    electric: "synchronized_shows", black_match: "shell_leaders",
    time_delay: "multi_break_shells",
  };
  return m[f];
}

export function composition(f: FuseType): string {
  const m: Record<FuseType, string> = {
    visco: "black_powder_lacquer_wrap", quick_match: "black_match_paper_tube",
    electric: "nichrome_wire_pyrogen", black_match: "raw_black_powder_string",
    time_delay: "compressed_delay_composition",
  };
  return m[f];
}

export function fuseTypes(): FuseType[] {
  return ["visco", "quick_match", "electric", "black_match", "time_delay"];
}
