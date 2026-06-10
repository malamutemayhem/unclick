export type FiberPaperType = "thin_1mm_shelf" | "medium_3mm_dam" | "thick_6mm_mold" | "rigid_board_form" | "blanket_wrap_insulate";

export function heatResist(t: FiberPaperType): number {
  const m: Record<FiberPaperType, number> = {
    thin_1mm_shelf: 8, medium_3mm_dam: 8, thick_6mm_mold: 9, rigid_board_form: 10, blanket_wrap_insulate: 9,
  };
  return m[t];
}

export function flexibility(t: FiberPaperType): number {
  const m: Record<FiberPaperType, number> = {
    thin_1mm_shelf: 10, medium_3mm_dam: 7, thick_6mm_mold: 4, rigid_board_form: 2, blanket_wrap_insulate: 8,
  };
  return m[t];
}

export function insulation(t: FiberPaperType): number {
  const m: Record<FiberPaperType, number> = {
    thin_1mm_shelf: 4, medium_3mm_dam: 6, thick_6mm_mold: 8, rigid_board_form: 10, blanket_wrap_insulate: 9,
  };
  return m[t];
}

export function reusability(t: FiberPaperType): number {
  const m: Record<FiberPaperType, number> = {
    thin_1mm_shelf: 3, medium_3mm_dam: 5, thick_6mm_mold: 7, rigid_board_form: 9, blanket_wrap_insulate: 6,
  };
  return m[t];
}

export function paperCost(t: FiberPaperType): number {
  const m: Record<FiberPaperType, number> = {
    thin_1mm_shelf: 1, medium_3mm_dam: 1, thick_6mm_mold: 2, rigid_board_form: 3, blanket_wrap_insulate: 2,
  };
  return m[t];
}

export function carvable(t: FiberPaperType): boolean {
  const m: Record<FiberPaperType, boolean> = {
    thin_1mm_shelf: false, medium_3mm_dam: false, thick_6mm_mold: true, rigid_board_form: true, blanket_wrap_insulate: false,
  };
  return m[t];
}

export function shelfLiner(t: FiberPaperType): boolean {
  const m: Record<FiberPaperType, boolean> = {
    thin_1mm_shelf: true, medium_3mm_dam: false, thick_6mm_mold: false, rigid_board_form: false, blanket_wrap_insulate: false,
  };
  return m[t];
}

export function fiberType(t: FiberPaperType): string {
  const m: Record<FiberPaperType, string> = {
    thin_1mm_shelf: "alumina_silica_sheet",
    medium_3mm_dam: "ceramic_fiber_mat",
    thick_6mm_mold: "compressed_fiber_block",
    rigid_board_form: "vacuum_formed_board",
    blanket_wrap_insulate: "needle_punch_blanket",
  };
  return m[t];
}

export function bestUse(t: FiberPaperType): string {
  const m: Record<FiberPaperType, string> = {
    thin_1mm_shelf: "shelf_release_liner",
    medium_3mm_dam: "glass_dam_barrier",
    thick_6mm_mold: "slump_mold_carve",
    rigid_board_form: "kiln_wall_insulate",
    blanket_wrap_insulate: "element_cover_wrap",
  };
  return m[t];
}

export function fiberPapers(): FiberPaperType[] {
  return ["thin_1mm_shelf", "medium_3mm_dam", "thick_6mm_mold", "rigid_board_form", "blanket_wrap_insulate"];
}
