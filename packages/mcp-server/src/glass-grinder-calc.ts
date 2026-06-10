export type GlassGrinderType = "diamond_bit_wet" | "belt_sander_flat" | "ring_saw_curve" | "bandsaw_glass_thick" | "lapidary_flat_lap";

export function grindSpeed(t: GlassGrinderType): number {
  const m: Record<GlassGrinderType, number> = {
    diamond_bit_wet: 7, belt_sander_flat: 8, ring_saw_curve: 6, bandsaw_glass_thick: 9, lapidary_flat_lap: 5,
  };
  return m[t];
}

export function edgeQuality(t: GlassGrinderType): number {
  const m: Record<GlassGrinderType, number> = {
    diamond_bit_wet: 9, belt_sander_flat: 7, ring_saw_curve: 8, bandsaw_glass_thick: 5, lapidary_flat_lap: 10,
  };
  return m[t];
}

export function curveAbility(t: GlassGrinderType): number {
  const m: Record<GlassGrinderType, number> = {
    diamond_bit_wet: 9, belt_sander_flat: 3, ring_saw_curve: 10, bandsaw_glass_thick: 7, lapidary_flat_lap: 2,
  };
  return m[t];
}

export function glassThickness(t: GlassGrinderType): number {
  const m: Record<GlassGrinderType, number> = {
    diamond_bit_wet: 5, belt_sander_flat: 6, ring_saw_curve: 8, bandsaw_glass_thick: 10, lapidary_flat_lap: 4,
  };
  return m[t];
}

export function grinderCost(t: GlassGrinderType): number {
  const m: Record<GlassGrinderType, number> = {
    diamond_bit_wet: 2, belt_sander_flat: 3, ring_saw_curve: 4, bandsaw_glass_thick: 5, lapidary_flat_lap: 3,
  };
  return m[t];
}

export function usesWater(t: GlassGrinderType): boolean {
  const m: Record<GlassGrinderType, boolean> = {
    diamond_bit_wet: true, belt_sander_flat: false, ring_saw_curve: true, bandsaw_glass_thick: true, lapidary_flat_lap: true,
  };
  return m[t];
}

export function cutsInterior(t: GlassGrinderType): boolean {
  const m: Record<GlassGrinderType, boolean> = {
    diamond_bit_wet: false, belt_sander_flat: false, ring_saw_curve: true, bandsaw_glass_thick: false, lapidary_flat_lap: false,
  };
  return m[t];
}

export function abrasiveType(t: GlassGrinderType): string {
  const m: Record<GlassGrinderType, string> = {
    diamond_bit_wet: "diamond_coated_bit",
    belt_sander_flat: "silicon_carbide_belt",
    ring_saw_curve: "diamond_ring_blade",
    bandsaw_glass_thick: "diamond_band_blade",
    lapidary_flat_lap: "diamond_flat_disc",
  };
  return m[t];
}

export function bestProject(t: GlassGrinderType): string {
  const m: Record<GlassGrinderType, string> = {
    diamond_bit_wet: "stained_glass_edge",
    belt_sander_flat: "fused_glass_straight",
    ring_saw_curve: "intricate_inside_cut",
    bandsaw_glass_thick: "thick_slab_sculpt",
    lapidary_flat_lap: "flat_polish_cabochon",
  };
  return m[t];
}

export function glassGrinders(): GlassGrinderType[] {
  return ["diamond_bit_wet", "belt_sander_flat", "ring_saw_curve", "bandsaw_glass_thick", "lapidary_flat_lap"];
}
