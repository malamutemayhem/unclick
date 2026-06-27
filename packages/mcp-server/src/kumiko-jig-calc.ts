export type KumikoJigType =
  | "angle_jig_standard"
  | "assembly_board_flat"
  | "cutting_guide_precise"
  | "spacing_template_even"
  | "pattern_master_complex";

const specs: Record<KumikoJigType, {
  angleAccuracy: number; repeatPrecision: number; setupSpeed: number;
  patternRange: number; cost: number; adjustable: boolean; forComplex: boolean;
  jigStyle: string; use: string;
}> = {
  angle_jig_standard: {
    angleAccuracy: 90, repeatPrecision: 85, setupSpeed: 82,
    patternRange: 78, cost: 25, adjustable: false, forComplex: false,
    jigStyle: "fixed_angle_block", use: "general_angle_cut",
  },
  assembly_board_flat: {
    angleAccuracy: 82, repeatPrecision: 88, setupSpeed: 85,
    patternRange: 80, cost: 20, adjustable: false, forComplex: false,
    jigStyle: "flat_pin_board", use: "assembly_layout_hold",
  },
  cutting_guide_precise: {
    angleAccuracy: 95, repeatPrecision: 92, setupSpeed: 78,
    patternRange: 82, cost: 35, adjustable: true, forComplex: false,
    jigStyle: "adjustable_fence_guide", use: "precise_repeat_cut",
  },
  spacing_template_even: {
    angleAccuracy: 85, repeatPrecision: 95, setupSpeed: 88,
    patternRange: 75, cost: 15, adjustable: false, forComplex: false,
    jigStyle: "notched_spacing_bar", use: "even_spacing_layout",
  },
  pattern_master_complex: {
    angleAccuracy: 92, repeatPrecision: 90, setupSpeed: 70,
    patternRange: 95, cost: 50, adjustable: true, forComplex: true,
    jigStyle: "multi_angle_system", use: "complex_pattern_build",
  },
};

export function angleAccuracy(t: KumikoJigType): number { return specs[t].angleAccuracy; }
export function repeatPrecision(t: KumikoJigType): number { return specs[t].repeatPrecision; }
export function setupSpeed(t: KumikoJigType): number { return specs[t].setupSpeed; }
export function patternRange(t: KumikoJigType): number { return specs[t].patternRange; }
export function jigCost(t: KumikoJigType): number { return specs[t].cost; }
export function adjustable(t: KumikoJigType): boolean { return specs[t].adjustable; }
export function forComplex(t: KumikoJigType): boolean { return specs[t].forComplex; }
export function jigStyle(t: KumikoJigType): string { return specs[t].jigStyle; }
export function bestUse(t: KumikoJigType): string { return specs[t].use; }
export function kumikoJigs(): KumikoJigType[] { return Object.keys(specs) as KumikoJigType[]; }
