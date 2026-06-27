export type PrintPaperType = "mulberry_thin_soft" | "rives_bfk_heavy" | "hosho_japanese_smooth" | "stonehenge_cotton_warm" | "newsprint_practice_cheap";

export function inkAbsorb(t: PrintPaperType): number {
  const m: Record<PrintPaperType, number> = {
    mulberry_thin_soft: 9, rives_bfk_heavy: 8, hosho_japanese_smooth: 10, stonehenge_cotton_warm: 7, newsprint_practice_cheap: 6,
  };
  return m[t];
}

export function printDetail(t: PrintPaperType): number {
  const m: Record<PrintPaperType, number> = {
    mulberry_thin_soft: 8, rives_bfk_heavy: 9, hosho_japanese_smooth: 10, stonehenge_cotton_warm: 8, newsprint_practice_cheap: 4,
  };
  return m[t];
}

export function durability(t: PrintPaperType): number {
  const m: Record<PrintPaperType, number> = {
    mulberry_thin_soft: 5, rives_bfk_heavy: 10, hosho_japanese_smooth: 6, stonehenge_cotton_warm: 9, newsprint_practice_cheap: 2,
  };
  return m[t];
}

export function surfaceTexture(t: PrintPaperType): number {
  const m: Record<PrintPaperType, number> = {
    mulberry_thin_soft: 7, rives_bfk_heavy: 8, hosho_japanese_smooth: 5, stonehenge_cotton_warm: 9, newsprint_practice_cheap: 3,
  };
  return m[t];
}

export function paperCost(t: PrintPaperType): number {
  const m: Record<PrintPaperType, number> = {
    mulberry_thin_soft: 4, rives_bfk_heavy: 5, hosho_japanese_smooth: 5, stonehenge_cotton_warm: 4, newsprint_practice_cheap: 1,
  };
  return m[t];
}

export function archival(t: PrintPaperType): boolean {
  const m: Record<PrintPaperType, boolean> = {
    mulberry_thin_soft: true, rives_bfk_heavy: true, hosho_japanese_smooth: true, stonehenge_cotton_warm: true, newsprint_practice_cheap: false,
  };
  return m[t];
}

export function forWoodcut(t: PrintPaperType): boolean {
  const m: Record<PrintPaperType, boolean> = {
    mulberry_thin_soft: true, rives_bfk_heavy: true, hosho_japanese_smooth: true, stonehenge_cotton_warm: false, newsprint_practice_cheap: false,
  };
  return m[t];
}

export function paperFiber(t: PrintPaperType): string {
  const m: Record<PrintPaperType, string> = {
    mulberry_thin_soft: "kozo_mulberry_fiber",
    rives_bfk_heavy: "cotton_rag_mould_made",
    hosho_japanese_smooth: "gampi_kozo_blend",
    stonehenge_cotton_warm: "cotton_warm_tone",
    newsprint_practice_cheap: "wood_pulp_uncoated",
  };
  return m[t];
}

export function bestUse(t: PrintPaperType): string {
  const m: Record<PrintPaperType, string> = {
    mulberry_thin_soft: "woodcut_mokuhanga",
    rives_bfk_heavy: "intaglio_edition_print",
    hosho_japanese_smooth: "fine_detail_transfer",
    stonehenge_cotton_warm: "lithograph_screen_print",
    newsprint_practice_cheap: "proof_practice_test",
  };
  return m[t];
}

export function printPapers(): PrintPaperType[] {
  return ["mulberry_thin_soft", "rives_bfk_heavy", "hosho_japanese_smooth", "stonehenge_cotton_warm", "newsprint_practice_cheap"];
}
