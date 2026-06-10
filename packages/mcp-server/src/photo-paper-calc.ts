export type PhotoPaperType = "glossy_rc" | "matte_fiber" | "pearl_luster" | "baryta_warmtone" | "metallic_high_gloss";

export function colorDepth(t: PhotoPaperType): number {
  const m: Record<PhotoPaperType, number> = {
    glossy_rc: 7, matte_fiber: 6, pearl_luster: 8, baryta_warmtone: 10, metallic_high_gloss: 9,
  };
  return m[t];
}

export function tonalRange(t: PhotoPaperType): number {
  const m: Record<PhotoPaperType, number> = {
    glossy_rc: 6, matte_fiber: 8, pearl_luster: 7, baryta_warmtone: 10, metallic_high_gloss: 7,
  };
  return m[t];
}

export function fingerResist(t: PhotoPaperType): number {
  const m: Record<PhotoPaperType, number> = {
    glossy_rc: 2, matte_fiber: 10, pearl_luster: 7, baryta_warmtone: 6, metallic_high_gloss: 3,
  };
  return m[t];
}

export function dryingSpeed(t: PhotoPaperType): number {
  const m: Record<PhotoPaperType, number> = {
    glossy_rc: 9, matte_fiber: 4, pearl_luster: 8, baryta_warmtone: 3, metallic_high_gloss: 8,
  };
  return m[t];
}

export function paperCost(t: PhotoPaperType): number {
  const m: Record<PhotoPaperType, number> = {
    glossy_rc: 3, matte_fiber: 6, pearl_luster: 5, baryta_warmtone: 10, metallic_high_gloss: 8,
  };
  return m[t];
}

export function archivalGrade(t: PhotoPaperType): boolean {
  const m: Record<PhotoPaperType, boolean> = {
    glossy_rc: false, matte_fiber: true, pearl_luster: false, baryta_warmtone: true, metallic_high_gloss: false,
  };
  return m[t];
}

export function resinCoated(t: PhotoPaperType): boolean {
  const m: Record<PhotoPaperType, boolean> = {
    glossy_rc: true, matte_fiber: false, pearl_luster: true, baryta_warmtone: false, metallic_high_gloss: true,
  };
  return m[t];
}

export function surfaceFinish(t: PhotoPaperType): string {
  const m: Record<PhotoPaperType, string> = {
    glossy_rc: "high_gloss_smooth",
    matte_fiber: "textured_cotton_rag",
    pearl_luster: "semi_gloss_pebble",
    baryta_warmtone: "barium_sulfate_warm",
    metallic_high_gloss: "silver_base_mirror",
  };
  return m[t];
}

export function bestPrint(t: PhotoPaperType): string {
  const m: Record<PhotoPaperType, string> = {
    glossy_rc: "snapshot_proof_sheet",
    matte_fiber: "gallery_exhibition_fine",
    pearl_luster: "portrait_wedding_album",
    baryta_warmtone: "museum_archival_collect",
    metallic_high_gloss: "commercial_display_pop",
  };
  return m[t];
}

export function photoPapers(): PhotoPaperType[] {
  return ["glossy_rc", "matte_fiber", "pearl_luster", "baryta_warmtone", "metallic_high_gloss"];
}
