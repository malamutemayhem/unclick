export type DeskPadType = "leather_executive" | "cork_natural" | "felt_wool_blend" | "extended_mouse_pad" | "clear_vinyl_overlay";

export function writingComfort(t: DeskPadType): number {
  const m: Record<DeskPadType, number> = {
    leather_executive: 9, cork_natural: 7, felt_wool_blend: 8, extended_mouse_pad: 6, clear_vinyl_overlay: 4,
  };
  return m[t];
}

export function deskProtection(t: DeskPadType): number {
  const m: Record<DeskPadType, number> = {
    leather_executive: 9, cork_natural: 8, felt_wool_blend: 7, extended_mouse_pad: 6, clear_vinyl_overlay: 10,
  };
  return m[t];
}

export function mouseTracking(t: DeskPadType): number {
  const m: Record<DeskPadType, number> = {
    leather_executive: 6, cork_natural: 5, felt_wool_blend: 7, extended_mouse_pad: 10, clear_vinyl_overlay: 4,
  };
  return m[t];
}

export function easyClean(t: DeskPadType): number {
  const m: Record<DeskPadType, number> = {
    leather_executive: 8, cork_natural: 6, felt_wool_blend: 4, extended_mouse_pad: 7, clear_vinyl_overlay: 10,
  };
  return m[t];
}

export function padCost(t: DeskPadType): number {
  const m: Record<DeskPadType, number> = {
    leather_executive: 8, cork_natural: 4, felt_wool_blend: 5, extended_mouse_pad: 3, clear_vinyl_overlay: 2,
  };
  return m[t];
}

export function waterResistant(t: DeskPadType): boolean {
  const m: Record<DeskPadType, boolean> = {
    leather_executive: true, cork_natural: true, felt_wool_blend: false, extended_mouse_pad: true, clear_vinyl_overlay: true,
  };
  return m[t];
}

export function nonSlip(t: DeskPadType): boolean {
  const m: Record<DeskPadType, boolean> = {
    leather_executive: true, cork_natural: true, felt_wool_blend: false, extended_mouse_pad: true, clear_vinyl_overlay: false,
  };
  return m[t];
}

export function surfaceMaterial(t: DeskPadType): string {
  const m: Record<DeskPadType, string> = {
    leather_executive: "full_grain_pu_leather",
    cork_natural: "sustainable_cork_sheet",
    felt_wool_blend: "merino_wool_pressed",
    extended_mouse_pad: "micro_weave_cloth",
    clear_vinyl_overlay: "pvc_transparent_sheet",
  };
  return m[t];
}

export function bestSetup(t: DeskPadType): string {
  const m: Record<DeskPadType, string> = {
    leather_executive: "executive_office_formal",
    cork_natural: "eco_home_office",
    felt_wool_blend: "minimalist_warm_desk",
    extended_mouse_pad: "gaming_dual_monitor",
    clear_vinyl_overlay: "reference_doc_under",
  };
  return m[t];
}

export function deskPads(): DeskPadType[] {
  return ["leather_executive", "cork_natural", "felt_wool_blend", "extended_mouse_pad", "clear_vinyl_overlay"];
}
