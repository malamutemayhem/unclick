export type MintMark = "philadelphia" | "denver" | "san_francisco" | "west_point" | "carson_city";

export function rarityFactor(m_: MintMark): number {
  const m: Record<MintMark, number> = {
    philadelphia: 3, denver: 4, san_francisco: 7, west_point: 8, carson_city: 10,
  };
  return m[m_];
}

export function mintageVolume(m_: MintMark): number {
  const m: Record<MintMark, number> = {
    philadelphia: 10, denver: 9, san_francisco: 5, west_point: 3, carson_city: 1,
  };
  return m[m_];
}

export function proofProduction(m_: MintMark): number {
  const m: Record<MintMark, number> = {
    philadelphia: 3, denver: 2, san_francisco: 10, west_point: 9, carson_city: 1,
  };
  return m[m_];
}

export function collectorPremium(m_: MintMark): number {
  const m: Record<MintMark, number> = {
    philadelphia: 3, denver: 4, san_francisco: 7, west_point: 8, carson_city: 10,
  };
  return m[m_];
}

export function historicalSignificance(m_: MintMark): number {
  const m: Record<MintMark, number> = {
    philadelphia: 10, denver: 6, san_francisco: 8, west_point: 4, carson_city: 9,
  };
  return m[m_];
}

export function stillOperating(m_: MintMark): boolean {
  const m: Record<MintMark, boolean> = {
    philadelphia: true, denver: true, san_francisco: true, west_point: true, carson_city: false,
  };
  return m[m_];
}

export function producesCirculation(m_: MintMark): boolean {
  const m: Record<MintMark, boolean> = {
    philadelphia: true, denver: true, san_francisco: false, west_point: false, carson_city: false,
  };
  return m[m_];
}

export function markLetter(m_: MintMark): string {
  const m: Record<MintMark, string> = {
    philadelphia: "P_or_none", denver: "D",
    san_francisco: "S", west_point: "W",
    carson_city: "CC",
  };
  return m[m_];
}

export function foundedYear(m_: MintMark): string {
  const m: Record<MintMark, string> = {
    philadelphia: "1792", denver: "1906",
    san_francisco: "1854", west_point: "1937",
    carson_city: "1870",
  };
  return m[m_];
}

export function mintMarks(): MintMark[] {
  return ["philadelphia", "denver", "san_francisco", "west_point", "carson_city"];
}
