export type KerningMethod = "metric" | "optical" | "manual" | "class_based" | "contextual";

export function precision(k: KerningMethod): number {
  const m: Record<KerningMethod, number> = {
    metric: 7, optical: 8, manual: 10, class_based: 6, contextual: 9,
  };
  return m[k];
}

export function automationLevel(k: KerningMethod): number {
  const m: Record<KerningMethod, number> = {
    metric: 8, optical: 9, manual: 1, class_based: 7, contextual: 10,
  };
  return m[k];
}

export function timeRequired(k: KerningMethod): number {
  const m: Record<KerningMethod, number> = {
    metric: 3, optical: 2, manual: 10, class_based: 5, contextual: 4,
  };
  return m[k];
}

export function pairCoverage(k: KerningMethod): number {
  const m: Record<KerningMethod, number> = {
    metric: 7, optical: 9, manual: 5, class_based: 8, contextual: 10,
  };
  return m[k];
}

export function fileOverhead(k: KerningMethod): number {
  const m: Record<KerningMethod, number> = {
    metric: 6, optical: 2, manual: 8, class_based: 5, contextual: 7,
  };
  return m[k];
}

export function requiresExpertise(k: KerningMethod): boolean {
  const m: Record<KerningMethod, boolean> = {
    metric: false, optical: false, manual: true, class_based: true, contextual: false,
  };
  return m[k];
}

export function builtIntoApps(k: KerningMethod): boolean {
  const m: Record<KerningMethod, boolean> = {
    metric: true, optical: true, manual: true, class_based: false, contextual: false,
  };
  return m[k];
}

export function openTypeFeature(k: KerningMethod): string {
  const m: Record<KerningMethod, string> = {
    metric: "kern_table", optical: "application_calculated",
    manual: "kern_pair_override", class_based: "kern_class_table",
    contextual: "gpos_lookup",
  };
  return m[k];
}

export function bestScenario(k: KerningMethod): string {
  const m: Record<KerningMethod, string> = {
    metric: "standard_body_text", optical: "display_mixed_fonts",
    manual: "logo_headline_craft", class_based: "large_font_families",
    contextual: "script_connected_faces",
  };
  return m[k];
}

export function kerningMethods(): KerningMethod[] {
  return ["metric", "optical", "manual", "class_based", "contextual"];
}
