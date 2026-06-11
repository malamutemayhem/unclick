export type DrcCheckType =
  | "clearance_spacing"
  | "trace_width_min"
  | "drill_annular_ring"
  | "copper_pour_connect"
  | "silkscreen_overlap";

const DATA: Record<DrcCheckType, {
  criticalLevel: number; frequency: number; autoFix: number;
  impactSeverity: number; checkSpeed: number; blocking: boolean;
  forSignoff: boolean; ruleCategory: string; bestUse: string;
}> = {
  clearance_spacing: { criticalLevel: 10, frequency: 10, autoFix: 6, impactSeverity: 10, checkSpeed: 9, blocking: true, forSignoff: true, ruleCategory: "electrical_clearance", bestUse: "prevent_short_circuit" },
  trace_width_min: { criticalLevel: 9, frequency: 8, autoFix: 7, impactSeverity: 9, checkSpeed: 9, blocking: true, forSignoff: true, ruleCategory: "manufacturing_width", bestUse: "ensure_etch_yield" },
  drill_annular_ring: { criticalLevel: 8, frequency: 7, autoFix: 5, impactSeverity: 8, checkSpeed: 8, blocking: true, forSignoff: true, ruleCategory: "drill_registration", bestUse: "via_pad_integrity" },
  copper_pour_connect: { criticalLevel: 6, frequency: 6, autoFix: 8, impactSeverity: 5, checkSpeed: 7, blocking: false, forSignoff: false, ruleCategory: "connectivity_island", bestUse: "remove_floating_copper" },
  silkscreen_overlap: { criticalLevel: 3, frequency: 9, autoFix: 9, impactSeverity: 2, checkSpeed: 10, blocking: false, forSignoff: false, ruleCategory: "cosmetic_readability", bestUse: "clean_board_labeling" },
};

const get = (t: DrcCheckType) => DATA[t];

export const criticalLevel = (t: DrcCheckType) => get(t).criticalLevel;
export const frequency = (t: DrcCheckType) => get(t).frequency;
export const autoFix = (t: DrcCheckType) => get(t).autoFix;
export const impactSeverity = (t: DrcCheckType) => get(t).impactSeverity;
export const checkSpeed = (t: DrcCheckType) => get(t).checkSpeed;
export const blocking = (t: DrcCheckType) => get(t).blocking;
export const forSignoff = (t: DrcCheckType) => get(t).forSignoff;
export const ruleCategory = (t: DrcCheckType) => get(t).ruleCategory;
export const bestUse = (t: DrcCheckType) => get(t).bestUse;
export const drcChecks = (): DrcCheckType[] => Object.keys(DATA) as DrcCheckType[];
