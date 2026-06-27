export type DressFormType = "adjustable_dial_standard" | "foam_pinnable_pro" | "wire_cage_display" | "custom_clone_body" | "child_size_petite";

export function fitAccuracy(t: DressFormType): number {
  const m: Record<DressFormType, number> = {
    adjustable_dial_standard: 7, foam_pinnable_pro: 8, wire_cage_display: 4, custom_clone_body: 10, child_size_petite: 6,
  };
  return m[t];
}

export function adjustability(t: DressFormType): number {
  const m: Record<DressFormType, number> = {
    adjustable_dial_standard: 10, foam_pinnable_pro: 3, wire_cage_display: 5, custom_clone_body: 2, child_size_petite: 4,
  };
  return m[t];
}

export function pinnability(t: DressFormType): number {
  const m: Record<DressFormType, number> = {
    adjustable_dial_standard: 5, foam_pinnable_pro: 10, wire_cage_display: 2, custom_clone_body: 9, child_size_petite: 7,
  };
  return m[t];
}

export function stability(t: DressFormType): number {
  const m: Record<DressFormType, number> = {
    adjustable_dial_standard: 8, foam_pinnable_pro: 7, wire_cage_display: 6, custom_clone_body: 9, child_size_petite: 5,
  };
  return m[t];
}

export function formCost(t: DressFormType): number {
  const m: Record<DressFormType, number> = {
    adjustable_dial_standard: 5, foam_pinnable_pro: 7, wire_cage_display: 4, custom_clone_body: 10, child_size_petite: 3,
  };
  return m[t];
}

export function collapsible(t: DressFormType): boolean {
  const m: Record<DressFormType, boolean> = {
    adjustable_dial_standard: false, foam_pinnable_pro: false, wire_cage_display: true, custom_clone_body: false, child_size_petite: false,
  };
  return m[t];
}

export function hasArms(t: DressFormType): boolean {
  const m: Record<DressFormType, boolean> = {
    adjustable_dial_standard: false, foam_pinnable_pro: true, wire_cage_display: false, custom_clone_body: true, child_size_petite: false,
  };
  return m[t];
}

export function coverMaterial(t: DressFormType): string {
  const m: Record<DressFormType, string> = {
    adjustable_dial_standard: "jersey_knit_stretch",
    foam_pinnable_pro: "high_density_polyurethane",
    wire_cage_display: "powder_coated_steel",
    custom_clone_body: "fiberglass_body_cast",
    child_size_petite: "cotton_muslin_padded",
  };
  return m[t];
}

export function bestSewer(t: DressFormType): string {
  const m: Record<DressFormType, string> = {
    adjustable_dial_standard: "home_sewer_multiple_sizes",
    foam_pinnable_pro: "professional_draping_fitting",
    wire_cage_display: "retail_mannequin_display",
    custom_clone_body: "couture_bespoke_tailoring",
    child_size_petite: "children_clothing_small",
  };
  return m[t];
}

export function dressForms(): DressFormType[] {
  return ["adjustable_dial_standard", "foam_pinnable_pro", "wire_cage_display", "custom_clone_body", "child_size_petite"];
}
