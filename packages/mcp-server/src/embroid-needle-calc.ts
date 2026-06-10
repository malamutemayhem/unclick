export type EmbroidNeedleType = "crewel_sharp_eye" | "tapestry_blunt_large" | "chenille_sharp_large" | "beading_thin_long" | "milliners_straw_long";

export function fabricPierce(t: EmbroidNeedleType): number {
  const m: Record<EmbroidNeedleType, number> = {
    crewel_sharp_eye: 9, tapestry_blunt_large: 3, chenille_sharp_large: 10, beading_thin_long: 7, milliners_straw_long: 8,
  };
  return m[t];
}

export function threadCapacity(t: EmbroidNeedleType): number {
  const m: Record<EmbroidNeedleType, number> = {
    crewel_sharp_eye: 7, tapestry_blunt_large: 10, chenille_sharp_large: 9, beading_thin_long: 3, milliners_straw_long: 5,
  };
  return m[t];
}

export function fabricSafe(t: EmbroidNeedleType): number {
  const m: Record<EmbroidNeedleType, number> = {
    crewel_sharp_eye: 6, tapestry_blunt_large: 10, chenille_sharp_large: 5, beading_thin_long: 8, milliners_straw_long: 7,
  };
  return m[t];
}

export function versatility(t: EmbroidNeedleType): number {
  const m: Record<EmbroidNeedleType, number> = {
    crewel_sharp_eye: 10, tapestry_blunt_large: 6, chenille_sharp_large: 7, beading_thin_long: 4, milliners_straw_long: 8,
  };
  return m[t];
}

export function needleCost(t: EmbroidNeedleType): number {
  const m: Record<EmbroidNeedleType, number> = {
    crewel_sharp_eye: 1, tapestry_blunt_large: 1, chenille_sharp_large: 1, beading_thin_long: 2, milliners_straw_long: 1,
  };
  return m[t];
}

export function sharpPoint(t: EmbroidNeedleType): boolean {
  const m: Record<EmbroidNeedleType, boolean> = {
    crewel_sharp_eye: true, tapestry_blunt_large: false, chenille_sharp_large: true, beading_thin_long: true, milliners_straw_long: true,
  };
  return m[t];
}

export function largeEye(t: EmbroidNeedleType): boolean {
  const m: Record<EmbroidNeedleType, boolean> = {
    crewel_sharp_eye: true, tapestry_blunt_large: true, chenille_sharp_large: true, beading_thin_long: false, milliners_straw_long: false,
  };
  return m[t];
}

export function needleProfile(t: EmbroidNeedleType): string {
  const m: Record<EmbroidNeedleType, string> = {
    crewel_sharp_eye: "medium_sharp_oval_eye",
    tapestry_blunt_large: "blunt_round_large_eye",
    chenille_sharp_large: "thick_sharp_wide_eye",
    beading_thin_long: "thin_fine_tiny_eye",
    milliners_straw_long: "long_uniform_round",
  };
  return m[t];
}

export function bestStitch(t: EmbroidNeedleType): string {
  const m: Record<EmbroidNeedleType, string> = {
    crewel_sharp_eye: "surface_embroidery_all",
    tapestry_blunt_large: "cross_stitch_canvas",
    chenille_sharp_large: "ribbon_embroidery_thick",
    beading_thin_long: "bead_attach_sequin",
    milliners_straw_long: "bullion_knot_wrap",
  };
  return m[t];
}

export function embroidNeedles(): EmbroidNeedleType[] {
  return ["crewel_sharp_eye", "tapestry_blunt_large", "chenille_sharp_large", "beading_thin_long", "milliners_straw_long"];
}
