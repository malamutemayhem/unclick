export type SpongeType = "cellulose_natural" | "melamine_magic_eraser" | "steel_wool_scrub" | "silicone_antimicrobial" | "pop_up_compressed";

export function scrubbingPower(t: SpongeType): number {
  const m: Record<SpongeType, number> = {
    cellulose_natural: 5, melamine_magic_eraser: 8, steel_wool_scrub: 10, silicone_antimicrobial: 4, pop_up_compressed: 3,
  };
  return m[t];
}

export function surfaceSafe(t: SpongeType): number {
  const m: Record<SpongeType, number> = {
    cellulose_natural: 8, melamine_magic_eraser: 4, steel_wool_scrub: 2, silicone_antimicrobial: 10, pop_up_compressed: 7,
  };
  return m[t];
}

export function absorption(t: SpongeType): number {
  const m: Record<SpongeType, number> = {
    cellulose_natural: 9, melamine_magic_eraser: 6, steel_wool_scrub: 2, silicone_antimicrobial: 3, pop_up_compressed: 8,
  };
  return m[t];
}

export function longevity(t: SpongeType): number {
  const m: Record<SpongeType, number> = {
    cellulose_natural: 4, melamine_magic_eraser: 2, steel_wool_scrub: 5, silicone_antimicrobial: 10, pop_up_compressed: 3,
  };
  return m[t];
}

export function spongeCost(t: SpongeType): number {
  const m: Record<SpongeType, number> = {
    cellulose_natural: 2, melamine_magic_eraser: 3, steel_wool_scrub: 2, silicone_antimicrobial: 5, pop_up_compressed: 1,
  };
  return m[t];
}

export function biodegradable(t: SpongeType): boolean {
  const m: Record<SpongeType, boolean> = {
    cellulose_natural: true, melamine_magic_eraser: false, steel_wool_scrub: false, silicone_antimicrobial: false, pop_up_compressed: true,
  };
  return m[t];
}

export function dishwasherSafe(t: SpongeType): boolean {
  const m: Record<SpongeType, boolean> = {
    cellulose_natural: false, melamine_magic_eraser: false, steel_wool_scrub: false, silicone_antimicrobial: true, pop_up_compressed: false,
  };
  return m[t];
}

export function spongeMaterial(t: SpongeType): string {
  const m: Record<SpongeType, string> = {
    cellulose_natural: "plant_cellulose_fiber",
    melamine_magic_eraser: "melamine_foam_micro_abrasive",
    steel_wool_scrub: "fine_steel_wire_pad",
    silicone_antimicrobial: "food_grade_silicone_sheet",
    pop_up_compressed: "compressed_cellulose_dry",
  };
  return m[t];
}

export function bestTask(t: SpongeType): string {
  const m: Record<SpongeType, string> = {
    cellulose_natural: "everyday_dish_wipe_down",
    melamine_magic_eraser: "scuff_mark_wall_stain",
    steel_wool_scrub: "burnt_pan_grill_grate",
    silicone_antimicrobial: "baby_bottle_food_prep",
    pop_up_compressed: "travel_compact_emergency",
  };
  return m[t];
}

export function sponges(): SpongeType[] {
  return ["cellulose_natural", "melamine_magic_eraser", "steel_wool_scrub", "silicone_antimicrobial", "pop_up_compressed"];
}
