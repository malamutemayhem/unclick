export type SewingStitch = "straight" | "zigzag" | "overlock" | "blind_hem" | "topstitch";

export function stretchability(s: SewingStitch): number {
  const m: Record<SewingStitch, number> = {
    straight: 2, zigzag: 8, overlock: 9, blind_hem: 3, topstitch: 2,
  };
  return m[s];
}

export function seamStrength(s: SewingStitch): number {
  const m: Record<SewingStitch, number> = {
    straight: 7, zigzag: 6, overlock: 9, blind_hem: 4, topstitch: 8,
  };
  return m[s];
}

export function visibility(s: SewingStitch): number {
  const m: Record<SewingStitch, number> = {
    straight: 5, zigzag: 7, overlock: 3, blind_hem: 1, topstitch: 10,
  };
  return m[s];
}

export function speedRating(s: SewingStitch): number {
  const m: Record<SewingStitch, number> = {
    straight: 10, zigzag: 7, overlock: 8, blind_hem: 5, topstitch: 6,
  };
  return m[s];
}

export function fabricBulk(s: SewingStitch): number {
  const m: Record<SewingStitch, number> = {
    straight: 2, zigzag: 4, overlock: 6, blind_hem: 1, topstitch: 3,
  };
  return m[s];
}

export function preventsRavel(s: SewingStitch): boolean {
  const m: Record<SewingStitch, boolean> = {
    straight: false, zigzag: true, overlock: true, blind_hem: false, topstitch: false,
  };
  return m[s];
}

export function decorative(s: SewingStitch): boolean {
  const m: Record<SewingStitch, boolean> = {
    straight: false, zigzag: false, overlock: false, blind_hem: false, topstitch: true,
  };
  return m[s];
}

export function bestUse(s: SewingStitch): string {
  const m: Record<SewingStitch, string> = {
    straight: "woven_seams", zigzag: "knit_fabrics", overlock: "edge_finishing",
    blind_hem: "invisible_hems", topstitch: "denim_detailing",
  };
  return m[s];
}

export function threadConsumption(s: SewingStitch): number {
  const m: Record<SewingStitch, number> = {
    straight: 3, zigzag: 6, overlock: 8, blind_hem: 4, topstitch: 5,
  };
  return m[s];
}

export function sewingStitches(): SewingStitch[] {
  return ["straight", "zigzag", "overlock", "blind_hem", "topstitch"];
}
