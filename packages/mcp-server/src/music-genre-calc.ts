export type MusicGenre = "classical" | "jazz" | "rock" | "electronic" | "hip_hop";

export function tempoRange(genre: MusicGenre): number {
  const m: Record<MusicGenre, number> = {
    classical: 60, jazz: 40, rock: 30, electronic: 50, hip_hop: 20,
  };
  return m[genre];
}

export function harmonicComplexity(genre: MusicGenre): number {
  const m: Record<MusicGenre, number> = {
    classical: 10, jazz: 10, rock: 5, electronic: 6, hip_hop: 4,
  };
  return m[genre];
}

export function rhythmicComplexity(genre: MusicGenre): number {
  const m: Record<MusicGenre, number> = {
    classical: 7, jazz: 10, rock: 5, electronic: 8, hip_hop: 9,
  };
  return m[genre];
}

export function improvisationLevel(genre: MusicGenre): number {
  const m: Record<MusicGenre, number> = {
    classical: 2, jazz: 10, rock: 5, electronic: 4, hip_hop: 7,
  };
  return m[genre];
}

export function productionComplexity(genre: MusicGenre): number {
  const m: Record<MusicGenre, number> = {
    classical: 5, jazz: 4, rock: 6, electronic: 10, hip_hop: 8,
  };
  return m[genre];
}

export function livePerformance(genre: MusicGenre): boolean {
  const m: Record<MusicGenre, boolean> = {
    classical: true, jazz: true, rock: true, electronic: true, hip_hop: true,
  };
  return m[genre];
}

export function usesNotation(genre: MusicGenre): boolean {
  const m: Record<MusicGenre, boolean> = {
    classical: true, jazz: true, rock: false, electronic: false, hip_hop: false,
  };
  return m[genre];
}

export function originDecade(genre: MusicGenre): string {
  const m: Record<MusicGenre, string> = {
    classical: "1600s", jazz: "1900s", rock: "1950s",
    electronic: "1970s", hip_hop: "1970s",
  };
  return m[genre];
}

export function globalPopularity(genre: MusicGenre): number {
  const m: Record<MusicGenre, number> = {
    classical: 5, jazz: 4, rock: 8, electronic: 7, hip_hop: 10,
  };
  return m[genre];
}

export function musicGenres(): MusicGenre[] {
  return ["classical", "jazz", "rock", "electronic", "hip_hop"];
}
