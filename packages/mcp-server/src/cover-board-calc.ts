export type CoverBoardType = "davey_grey_standard" | "binder_board_dense" | "mat_board_color" | "corrugated_flute_light" | "wood_veneer_thin";

export function rigidity(t: CoverBoardType): number {
  const m: Record<CoverBoardType, number> = {
    davey_grey_standard: 9, binder_board_dense: 10, mat_board_color: 5, corrugated_flute_light: 3, wood_veneer_thin: 8,
  };
  return m[t];
}

export function cutEase(t: CoverBoardType): number {
  const m: Record<CoverBoardType, number> = {
    davey_grey_standard: 7, binder_board_dense: 5, mat_board_color: 10, corrugated_flute_light: 9, wood_veneer_thin: 4,
  };
  return m[t];
}

export function glueBond(t: CoverBoardType): number {
  const m: Record<CoverBoardType, number> = {
    davey_grey_standard: 9, binder_board_dense: 8, mat_board_color: 7, corrugated_flute_light: 6, wood_veneer_thin: 5,
  };
  return m[t];
}

export function archivalQuality(t: CoverBoardType): number {
  const m: Record<CoverBoardType, number> = {
    davey_grey_standard: 8, binder_board_dense: 9, mat_board_color: 10, corrugated_flute_light: 4, wood_veneer_thin: 6,
  };
  return m[t];
}

export function boardCost(t: CoverBoardType): number {
  const m: Record<CoverBoardType, number> = {
    davey_grey_standard: 2, binder_board_dense: 3, mat_board_color: 2, corrugated_flute_light: 1, wood_veneer_thin: 3,
  };
  return m[t];
}

export function acidFree(t: CoverBoardType): boolean {
  const m: Record<CoverBoardType, boolean> = {
    davey_grey_standard: false, binder_board_dense: false, mat_board_color: true, corrugated_flute_light: false, wood_veneer_thin: false,
  };
  return m[t];
}

export function lightweight(t: CoverBoardType): boolean {
  const m: Record<CoverBoardType, boolean> = {
    davey_grey_standard: false, binder_board_dense: false, mat_board_color: true, corrugated_flute_light: true, wood_veneer_thin: false,
  };
  return m[t];
}

export function boardMaterial(t: CoverBoardType): string {
  const m: Record<CoverBoardType, string> = {
    davey_grey_standard: "recycled_paper_pressed",
    binder_board_dense: "dense_fiber_laminate",
    mat_board_color: "cotton_rag_core",
    corrugated_flute_light: "kraft_paper_flute",
    wood_veneer_thin: "sliced_hardwood_sheet",
  };
  return m[t];
}

export function bestBinding(t: CoverBoardType): string {
  const m: Record<CoverBoardType, string> = {
    davey_grey_standard: "hardcover_case_bind",
    binder_board_dense: "heavy_album_cover",
    mat_board_color: "portfolio_presentation",
    corrugated_flute_light: "soft_flex_cover",
    wood_veneer_thin: "wood_cover_journal",
  };
  return m[t];
}

export function coverBoards(): CoverBoardType[] {
  return ["davey_grey_standard", "binder_board_dense", "mat_board_color", "corrugated_flute_light", "wood_veneer_thin"];
}
