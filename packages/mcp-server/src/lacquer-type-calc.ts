export type LacquerType = "urushi" | "shellac" | "nitrocellulose" | "polyurethane" | "acrylic";

export function hardness(lacquer: LacquerType): number {
  const m: Record<LacquerType, number> = {
    urushi: 9, shellac: 5, nitrocellulose: 6, polyurethane: 8, acrylic: 7,
  };
  return m[lacquer];
}

export function glossLevel(lacquer: LacquerType): number {
  const m: Record<LacquerType, number> = {
    urushi: 10, shellac: 7, nitrocellulose: 8, polyurethane: 9, acrylic: 6,
  };
  return m[lacquer];
}

export function dryingTimeHours(lacquer: LacquerType): number {
  const m: Record<LacquerType, number> = {
    urushi: 48, shellac: 1, nitrocellulose: 2, polyurethane: 6, acrylic: 3,
  };
  return m[lacquer];
}

export function coatsRequired(lacquer: LacquerType): number {
  const m: Record<LacquerType, number> = {
    urushi: 30, shellac: 5, nitrocellulose: 4, polyurethane: 3, acrylic: 3,
  };
  return m[lacquer];
}

export function repairability(lacquer: LacquerType): number {
  const m: Record<LacquerType, number> = {
    urushi: 8, shellac: 10, nitrocellulose: 7, polyurethane: 3, acrylic: 4,
  };
  return m[lacquer];
}

export function foodSafe(lacquer: LacquerType): boolean {
  const m: Record<LacquerType, boolean> = {
    urushi: true, shellac: true, nitrocellulose: false, polyurethane: true, acrylic: false,
  };
  return m[lacquer];
}

export function naturalOrigin(lacquer: LacquerType): boolean {
  const m: Record<LacquerType, boolean> = {
    urushi: true, shellac: true, nitrocellulose: false, polyurethane: false, acrylic: false,
  };
  return m[lacquer];
}

export function bestApplication(lacquer: LacquerType): string {
  const m: Record<LacquerType, string> = {
    urushi: "japanese_bowls", shellac: "french_polish", nitrocellulose: "guitar_finish",
    polyurethane: "floor_coating", acrylic: "automotive",
  };
  return m[lacquer];
}

export function costPerLiter(lacquer: LacquerType): number {
  const m: Record<LacquerType, number> = {
    urushi: 200, shellac: 30, nitrocellulose: 20, polyurethane: 15, acrylic: 12,
  };
  return m[lacquer];
}

export function lacquerTypes(): LacquerType[] {
  return ["urushi", "shellac", "nitrocellulose", "polyurethane", "acrylic"];
}
