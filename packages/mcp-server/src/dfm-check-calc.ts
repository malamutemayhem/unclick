export type DfmCheckType =
  | "basic_rule_check"
  | "advanced_fabrication"
  | "assembly_dfma"
  | "testability_dft"
  | "thermal_reliability";

const DATA: Record<DfmCheckType, {
  coverage: number; accuracy: number; ruleDepth: number;
  reportDetail: number; checkCost: number; automated: boolean;
  forProduction: boolean; checkFocus: string; bestUse: string;
}> = {
  basic_rule_check: { coverage: 5, accuracy: 6, ruleDepth: 4, reportDetail: 4, checkCost: 1, automated: true, forProduction: false, checkFocus: "spacing_width_clearance", bestUse: "quick_prototype_screen" },
  advanced_fabrication: { coverage: 9, accuracy: 9, ruleDepth: 9, reportDetail: 8, checkCost: 6, automated: true, forProduction: true, checkFocus: "via_annular_aspect_ratio", bestUse: "complex_multilayer_fab" },
  assembly_dfma: { coverage: 7, accuracy: 7, ruleDepth: 7, reportDetail: 7, checkCost: 5, automated: true, forProduction: true, checkFocus: "pad_solder_component_place", bestUse: "smt_assembly_readiness" },
  testability_dft: { coverage: 6, accuracy: 8, ruleDepth: 6, reportDetail: 9, checkCost: 4, automated: true, forProduction: true, checkFocus: "test_point_probe_access", bestUse: "ict_test_coverage_audit" },
  thermal_reliability: { coverage: 8, accuracy: 8, ruleDepth: 8, reportDetail: 8, checkCost: 7, automated: false, forProduction: true, checkFocus: "thermal_via_copper_balance", bestUse: "power_board_thermal_audit" },
};

const get = (t: DfmCheckType) => DATA[t];

export const coverage = (t: DfmCheckType) => get(t).coverage;
export const accuracy = (t: DfmCheckType) => get(t).accuracy;
export const ruleDepth = (t: DfmCheckType) => get(t).ruleDepth;
export const reportDetail = (t: DfmCheckType) => get(t).reportDetail;
export const checkCost = (t: DfmCheckType) => get(t).checkCost;
export const automated = (t: DfmCheckType) => get(t).automated;
export const forProduction = (t: DfmCheckType) => get(t).forProduction;
export const checkFocus = (t: DfmCheckType) => get(t).checkFocus;
export const bestUse = (t: DfmCheckType) => get(t).bestUse;
export const dfmChecks = (): DfmCheckType[] => Object.keys(DATA) as DfmCheckType[];
