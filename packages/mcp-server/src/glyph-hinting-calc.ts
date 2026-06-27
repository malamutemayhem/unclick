export type GlyphHinting = "truetype" | "postscript" | "autohint" | "cleartype" | "none";

export function screenClarity(h: GlyphHinting): number {
  const m: Record<GlyphHinting, number> = {
    truetype: 9, postscript: 7, autohint: 6, cleartype: 10, none: 3,
  };
  return m[h];
}

export function printQuality(h: GlyphHinting): number {
  const m: Record<GlyphHinting, number> = {
    truetype: 7, postscript: 10, autohint: 6, cleartype: 5, none: 9,
  };
  return m[h];
}

export function developmentEffort(h: GlyphHinting): number {
  const m: Record<GlyphHinting, number> = {
    truetype: 10, postscript: 8, autohint: 2, cleartype: 3, none: 1,
  };
  return m[h];
}

export function smallSizeRendering(h: GlyphHinting): number {
  const m: Record<GlyphHinting, number> = {
    truetype: 9, postscript: 6, autohint: 5, cleartype: 10, none: 2,
  };
  return m[h];
}

export function crossPlatformConsistency(h: GlyphHinting): number {
  const m: Record<GlyphHinting, number> = {
    truetype: 4, postscript: 7, autohint: 8, cleartype: 3, none: 10,
  };
  return m[h];
}

export function platformSpecific(h: GlyphHinting): boolean {
  const m: Record<GlyphHinting, boolean> = {
    truetype: false, postscript: false, autohint: false, cleartype: true, none: false,
  };
  return m[h];
}

export function manualInstructionsBased(h: GlyphHinting): boolean {
  const m: Record<GlyphHinting, boolean> = {
    truetype: true, postscript: true, autohint: false, cleartype: false, none: false,
  };
  return m[h];
}

export function renderingEngine(h: GlyphHinting): string {
  const m: Record<GlyphHinting, string> = {
    truetype: "grid_fitting_bytecode", postscript: "stem_snap_alignment",
    autohint: "freetype_auto", cleartype: "subpixel_rgb",
    none: "outline_only",
  };
  return m[h];
}

export function bestPlatform(h: GlyphHinting): string {
  const m: Record<GlyphHinting, string> = {
    truetype: "windows_classic", postscript: "macos_print",
    autohint: "linux_freetype", cleartype: "windows_modern",
    none: "retina_hidpi",
  };
  return m[h];
}

export function glyphHintingMethods(): GlyphHinting[] {
  return ["truetype", "postscript", "autohint", "cleartype", "none"];
}
