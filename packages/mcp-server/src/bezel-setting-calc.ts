export type BezelSettingType = "round_cup_cabochon" | "oval_scallop_edge" | "square_box_frame" | "freeform_gallery_wire" | "tube_rivet_flush";

export function stoneProtect(t: BezelSettingType): number {
  const m: Record<BezelSettingType, number> = {
    round_cup_cabochon: 9, oval_scallop_edge: 8, square_box_frame: 10, freeform_gallery_wire: 6, tube_rivet_flush: 7,
  };
  return m[t];
}

export function setEase(t: BezelSettingType): number {
  const m: Record<BezelSettingType, number> = {
    round_cup_cabochon: 9, oval_scallop_edge: 7, square_box_frame: 6, freeform_gallery_wire: 4, tube_rivet_flush: 8,
  };
  return m[t];
}

export function shapeFlexibility(t: BezelSettingType): number {
  const m: Record<BezelSettingType, number> = {
    round_cup_cabochon: 3, oval_scallop_edge: 5, square_box_frame: 4, freeform_gallery_wire: 10, tube_rivet_flush: 3,
  };
  return m[t];
}

export function lightEntry(t: BezelSettingType): number {
  const m: Record<BezelSettingType, number> = {
    round_cup_cabochon: 4, oval_scallop_edge: 7, square_box_frame: 3, freeform_gallery_wire: 9, tube_rivet_flush: 5,
  };
  return m[t];
}

export function bezelCost(t: BezelSettingType): number {
  const m: Record<BezelSettingType, number> = {
    round_cup_cabochon: 1, oval_scallop_edge: 2, square_box_frame: 2, freeform_gallery_wire: 3, tube_rivet_flush: 1,
  };
  return m[t];
}

export function preMade(t: BezelSettingType): boolean {
  const m: Record<BezelSettingType, boolean> = {
    round_cup_cabochon: true, oval_scallop_edge: true, square_box_frame: true, freeform_gallery_wire: false, tube_rivet_flush: true,
  };
  return m[t];
}

export function openBack(t: BezelSettingType): boolean {
  const m: Record<BezelSettingType, boolean> = {
    round_cup_cabochon: false, oval_scallop_edge: true, square_box_frame: false, freeform_gallery_wire: true, tube_rivet_flush: false,
  };
  return m[t];
}

export function wallStyle(t: BezelSettingType): string {
  const m: Record<BezelSettingType, string> = {
    round_cup_cabochon: "smooth_straight_wall",
    oval_scallop_edge: "scalloped_decorative_rim",
    square_box_frame: "mitered_corner_box",
    freeform_gallery_wire: "shaped_wire_wrap",
    tube_rivet_flush: "flush_tube_collar",
  };
  return m[t];
}

export function bestStone(t: BezelSettingType): string {
  const m: Record<BezelSettingType, string> = {
    round_cup_cabochon: "round_cabochon_agate",
    oval_scallop_edge: "oval_turquoise_cab",
    square_box_frame: "princess_cut_gem",
    freeform_gallery_wire: "rough_crystal_point",
    tube_rivet_flush: "flat_back_cz_small",
  };
  return m[t];
}

export function bezelSettings(): BezelSettingType[] {
  return ["round_cup_cabochon", "oval_scallop_edge", "square_box_frame", "freeform_gallery_wire", "tube_rivet_flush"];
}
