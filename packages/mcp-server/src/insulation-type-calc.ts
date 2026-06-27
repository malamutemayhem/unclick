export type InsulationType = "fiberglass" | "cellulose" | "spray_foam" | "mineral_wool" | "rigid_board";

export function rValuePerInch(insul: InsulationType): number {
  const m: Record<InsulationType, number> = {
    fiberglass: 3.2, cellulose: 3.7, spray_foam: 6.5, mineral_wool: 3.3, rigid_board: 5.0,
  };
  return m[insul];
}

export function moistureResistance(insul: InsulationType): number {
  const m: Record<InsulationType, number> = {
    fiberglass: 4, cellulose: 3, spray_foam: 10, mineral_wool: 5, rigid_board: 8,
  };
  return m[insul];
}

export function fireSafety(insul: InsulationType): number {
  const m: Record<InsulationType, number> = {
    fiberglass: 8, cellulose: 6, spray_foam: 4, mineral_wool: 10, rigid_board: 5,
  };
  return m[insul];
}

export function installEase(insul: InsulationType): number {
  const m: Record<InsulationType, number> = {
    fiberglass: 8, cellulose: 7, spray_foam: 3, mineral_wool: 7, rigid_board: 6,
  };
  return m[insul];
}

export function soundproofing(insul: InsulationType): number {
  const m: Record<InsulationType, number> = {
    fiberglass: 6, cellulose: 8, spray_foam: 7, mineral_wool: 9, rigid_board: 4,
  };
  return m[insul];
}

export function airSealant(insul: InsulationType): boolean {
  const m: Record<InsulationType, boolean> = {
    fiberglass: false, cellulose: false, spray_foam: true, mineral_wool: false, rigid_board: true,
  };
  return m[insul];
}

export function recycledContent(insul: InsulationType): boolean {
  const m: Record<InsulationType, boolean> = {
    fiberglass: true, cellulose: true, spray_foam: false, mineral_wool: true, rigid_board: false,
  };
  return m[insul];
}

export function bestLocation(insul: InsulationType): string {
  const m: Record<InsulationType, string> = {
    fiberglass: "attic", cellulose: "wall_cavity", spray_foam: "crawl_space",
    mineral_wool: "basement", rigid_board: "exterior_sheathing",
  };
  return m[insul];
}

export function costPerSqFt(insul: InsulationType): number {
  const m: Record<InsulationType, number> = {
    fiberglass: 1, cellulose: 1.5, spray_foam: 4, mineral_wool: 2, rigid_board: 3,
  };
  return m[insul];
}

export function insulationTypes(): InsulationType[] {
  return ["fiberglass", "cellulose", "spray_foam", "mineral_wool", "rigid_board"];
}
