export type PetTagType = "stainless_steel_engraved" | "brass_stamped_classic" | "silicone_slide_on_quiet" | "smart_qr_code_scan" | "glow_dark_reflective";

export function durability(t: PetTagType): number {
  const m: Record<PetTagType, number> = {
    stainless_steel_engraved: 10, brass_stamped_classic: 8, silicone_slide_on_quiet: 6, smart_qr_code_scan: 7, glow_dark_reflective: 5,
  };
  return m[t];
}

export function readability(t: PetTagType): number {
  const m: Record<PetTagType, number> = {
    stainless_steel_engraved: 9, brass_stamped_classic: 8, silicone_slide_on_quiet: 7, smart_qr_code_scan: 10, glow_dark_reflective: 6,
  };
  return m[t];
}

export function noiseLevel(t: PetTagType): number {
  const m: Record<PetTagType, number> = {
    stainless_steel_engraved: 7, brass_stamped_classic: 7, silicone_slide_on_quiet: 1, smart_qr_code_scan: 5, glow_dark_reflective: 4,
  };
  return m[t];
}

export function nightVisibility(t: PetTagType): number {
  const m: Record<PetTagType, number> = {
    stainless_steel_engraved: 2, brass_stamped_classic: 2, silicone_slide_on_quiet: 1, smart_qr_code_scan: 4, glow_dark_reflective: 10,
  };
  return m[t];
}

export function tagCost(t: PetTagType): number {
  const m: Record<PetTagType, number> = {
    stainless_steel_engraved: 2, brass_stamped_classic: 2, silicone_slide_on_quiet: 1, smart_qr_code_scan: 4, glow_dark_reflective: 2,
  };
  return m[t];
}

export function hasDigitalInfo(t: PetTagType): boolean {
  const m: Record<PetTagType, boolean> = {
    stainless_steel_engraved: false, brass_stamped_classic: false, silicone_slide_on_quiet: false, smart_qr_code_scan: true, glow_dark_reflective: false,
  };
  return m[t];
}

export function silent(t: PetTagType): boolean {
  const m: Record<PetTagType, boolean> = {
    stainless_steel_engraved: false, brass_stamped_classic: false, silicone_slide_on_quiet: true, smart_qr_code_scan: false, glow_dark_reflective: true,
  };
  return m[t];
}

export function attachMethod(t: PetTagType): string {
  const m: Record<PetTagType, string> = {
    stainless_steel_engraved: "split_ring_clip",
    brass_stamped_classic: "split_ring_clip",
    silicone_slide_on_quiet: "slide_over_collar",
    smart_qr_code_scan: "carabiner_quick_clip",
    glow_dark_reflective: "elastic_loop_stretch",
  };
  return m[t];
}

export function bestPet(t: PetTagType): string {
  const m: Record<PetTagType, string> = {
    stainless_steel_engraved: "active_outdoor_dog",
    brass_stamped_classic: "show_dog_formal",
    silicone_slide_on_quiet: "indoor_cat_sensitive",
    smart_qr_code_scan: "travel_pet_frequent",
    glow_dark_reflective: "night_walker_safety",
  };
  return m[t];
}

export function petTags(): PetTagType[] {
  return ["stainless_steel_engraved", "brass_stamped_classic", "silicone_slide_on_quiet", "smart_qr_code_scan", "glow_dark_reflective"];
}
