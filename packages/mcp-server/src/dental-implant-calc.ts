export type DentalImplant = "endosteal" | "subperiosteal" | "zygomatic" | "mini_implant" | "all_on_four";

export function osseointegration(d: DentalImplant): number {
  const m: Record<DentalImplant, number> = {
    endosteal: 10, subperiosteal: 6, zygomatic: 8, mini_implant: 5, all_on_four: 9,
  };
  return m[d];
}

export function surgicalComplexity(d: DentalImplant): number {
  const m: Record<DentalImplant, number> = {
    endosteal: 6, subperiosteal: 8, zygomatic: 10, mini_implant: 3, all_on_four: 9,
  };
  return m[d];
}

export function longevity(d: DentalImplant): number {
  const m: Record<DentalImplant, number> = {
    endosteal: 10, subperiosteal: 6, zygomatic: 8, mini_implant: 5, all_on_four: 9,
  };
  return m[d];
}

export function healingTime(d: DentalImplant): number {
  const m: Record<DentalImplant, number> = {
    endosteal: 7, subperiosteal: 5, zygomatic: 8, mini_implant: 2, all_on_four: 6,
  };
  return m[d];
}

export function treatmentCost(d: DentalImplant): number {
  const m: Record<DentalImplant, number> = {
    endosteal: 6, subperiosteal: 8, zygomatic: 10, mini_implant: 3, all_on_four: 9,
  };
  return m[d];
}

export function requiresBoneGraft(d: DentalImplant): boolean {
  const m: Record<DentalImplant, boolean> = {
    endosteal: false, subperiosteal: false, zygomatic: false, mini_implant: false, all_on_four: false,
  };
  return m[d];
}

export function immediateLoading(d: DentalImplant): boolean {
  const m: Record<DentalImplant, boolean> = {
    endosteal: false, subperiosteal: false, zygomatic: true, mini_implant: true, all_on_four: true,
  };
  return m[d];
}

export function fixtureMaterial(d: DentalImplant): string {
  const m: Record<DentalImplant, string> = {
    endosteal: "titanium_screw_root_form", subperiosteal: "metal_frame_on_bone",
    zygomatic: "long_titanium_cheekbone", mini_implant: "narrow_diameter_titanium",
    all_on_four: "angled_titanium_multiunit",
  };
  return m[d];
}

export function bestCandidate(d: DentalImplant): string {
  const m: Record<DentalImplant, string> = {
    endosteal: "adequate_bone_single_tooth", subperiosteal: "insufficient_bone_height",
    zygomatic: "severe_maxillary_atrophy", mini_implant: "denture_stabilization",
    all_on_four: "full_arch_edentulous",
  };
  return m[d];
}

export function dentalImplants(): DentalImplant[] {
  return ["endosteal", "subperiosteal", "zygomatic", "mini_implant", "all_on_four"];
}
