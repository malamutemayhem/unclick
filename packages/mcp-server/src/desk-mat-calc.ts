export type DeskMatType = "felt_wool_minimal" | "cork_natural_eco" | "leather_vegan_dual" | "rubber_gaming_rgb" | "acrylic_clear_protector";

export function surfaceArea(t: DeskMatType): number {
  const m: Record<DeskMatType, number> = {
    felt_wool_minimal: 7, cork_natural_eco: 7, leather_vegan_dual: 8, rubber_gaming_rgb: 10, acrylic_clear_protector: 9,
  };
  return m[t];
}

export function deskProtection(t: DeskMatType): number {
  const m: Record<DeskMatType, number> = {
    felt_wool_minimal: 8, cork_natural_eco: 7, leather_vegan_dual: 9, rubber_gaming_rgb: 6, acrylic_clear_protector: 10,
  };
  return m[t];
}

export function writingComfort(t: DeskMatType): number {
  const m: Record<DeskMatType, number> = {
    felt_wool_minimal: 9, cork_natural_eco: 7, leather_vegan_dual: 10, rubber_gaming_rgb: 5, acrylic_clear_protector: 4,
  };
  return m[t];
}

export function spillResist(t: DeskMatType): number {
  const m: Record<DeskMatType, number> = {
    felt_wool_minimal: 3, cork_natural_eco: 5, leather_vegan_dual: 8, rubber_gaming_rgb: 7, acrylic_clear_protector: 10,
  };
  return m[t];
}

export function matCost(t: DeskMatType): number {
  const m: Record<DeskMatType, number> = {
    felt_wool_minimal: 5, cork_natural_eco: 4, leather_vegan_dual: 7, rubber_gaming_rgb: 8, acrylic_clear_protector: 6,
  };
  return m[t];
}

export function reversible(t: DeskMatType): boolean {
  const m: Record<DeskMatType, boolean> = {
    felt_wool_minimal: false, cork_natural_eco: false, leather_vegan_dual: true, rubber_gaming_rgb: false, acrylic_clear_protector: false,
  };
  return m[t];
}

export function ecoFriendly(t: DeskMatType): boolean {
  const m: Record<DeskMatType, boolean> = {
    felt_wool_minimal: true, cork_natural_eco: true, leather_vegan_dual: true, rubber_gaming_rgb: false, acrylic_clear_protector: false,
  };
  return m[t];
}

export function matMaterial(t: DeskMatType): string {
  const m: Record<DeskMatType, string> = {
    felt_wool_minimal: "merino_wool_pressed",
    cork_natural_eco: "portuguese_cork_bark",
    leather_vegan_dual: "polyurethane_vegan_leather",
    rubber_gaming_rgb: "natural_rubber_cloth_top",
    acrylic_clear_protector: "polished_acrylic_sheet",
  };
  return m[t];
}

export function bestWorkspace(t: DeskMatType): string {
  const m: Record<DeskMatType, string> = {
    felt_wool_minimal: "minimalist_home_office",
    cork_natural_eco: "eco_conscious_studio",
    leather_vegan_dual: "executive_professional",
    rubber_gaming_rgb: "gaming_streaming_setup",
    acrylic_clear_protector: "shared_desk_protection",
  };
  return m[t];
}

export function deskMats(): DeskMatType[] {
  return ["felt_wool_minimal", "cork_natural_eco", "leather_vegan_dual", "rubber_gaming_rgb", "acrylic_clear_protector"];
}
