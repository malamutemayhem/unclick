export type WatchCrystal = "sapphire" | "mineral" | "acrylic" | "hesalite" | "gorilla_glass";

export function scratchResistance(c: WatchCrystal): number {
  const m: Record<WatchCrystal, number> = {
    sapphire: 10, mineral: 6, acrylic: 2, hesalite: 3, gorilla_glass: 7,
  };
  return m[c];
}

export function shatterResistance(c: WatchCrystal): number {
  const m: Record<WatchCrystal, number> = {
    sapphire: 5, mineral: 6, acrylic: 10, hesalite: 9, gorilla_glass: 8,
  };
  return m[c];
}

export function clarity(c: WatchCrystal): number {
  const m: Record<WatchCrystal, number> = {
    sapphire: 10, mineral: 7, acrylic: 6, hesalite: 7, gorilla_glass: 8,
  };
  return m[c];
}

export function antiReflective(c: WatchCrystal): number {
  const m: Record<WatchCrystal, number> = {
    sapphire: 9, mineral: 5, acrylic: 3, hesalite: 4, gorilla_glass: 7,
  };
  return m[c];
}

export function costLevel(c: WatchCrystal): number {
  const m: Record<WatchCrystal, number> = {
    sapphire: 10, mineral: 5, acrylic: 2, hesalite: 3, gorilla_glass: 6,
  };
  return m[c];
}

export function polishable(c: WatchCrystal): boolean {
  const m: Record<WatchCrystal, boolean> = {
    sapphire: false, mineral: false, acrylic: true, hesalite: true, gorilla_glass: false,
  };
  return m[c];
}

export function luxuryGrade(c: WatchCrystal): boolean {
  const m: Record<WatchCrystal, boolean> = {
    sapphire: true, mineral: false, acrylic: false, hesalite: false, gorilla_glass: false,
  };
  return m[c];
}

export function materialComposition(c: WatchCrystal): string {
  const m: Record<WatchCrystal, string> = {
    sapphire: "synthetic_corundum", mineral: "tempered_silica_glass",
    acrylic: "polymethyl_methacrylate", hesalite: "plexiglass_variant",
    gorilla_glass: "aluminosilicate",
  };
  return m[c];
}

export function famousUsage(c: WatchCrystal): string {
  const m: Record<WatchCrystal, string> = {
    sapphire: "rolex_patek_philippe", mineral: "seiko_citizen_mid_range",
    acrylic: "vintage_timex_swatch", hesalite: "omega_speedmaster_moonwatch",
    gorilla_glass: "garmin_smartwatches",
  };
  return m[c];
}

export function watchCrystals(): WatchCrystal[] {
  return ["sapphire", "mineral", "acrylic", "hesalite", "gorilla_glass"];
}
