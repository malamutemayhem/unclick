export type CockspurChiselType =
  | "single_spur_standard"
  | "double_spur_fast"
  | "carbide_spur_hard"
  | "narrow_spur_detail"
  | "pneumatic_spur_power";

const specs: Record<CockspurChiselType, {
  grooveClean: number; dragControl: number; speedScore: number;
  edgeLife: number; cost: number; powered: boolean; forDetail: boolean;
  spurCount: string; use: string;
}> = {
  single_spur_standard: {
    grooveClean: 80, dragControl: 85, speedScore: 68,
    edgeLife: 75, cost: 45, powered: false, forDetail: false,
    spurCount: "single_point_spur", use: "general_groove_score",
  },
  double_spur_fast: {
    grooveClean: 75, dragControl: 72, speedScore: 88,
    edgeLife: 70, cost: 55, powered: false, forDetail: false,
    spurCount: "double_point_spur", use: "fast_parallel_score",
  },
  carbide_spur_hard: {
    grooveClean: 85, dragControl: 80, speedScore: 72,
    edgeLife: 95, cost: 120, powered: false, forDetail: false,
    spurCount: "single_carbide_spur", use: "hard_stone_score",
  },
  narrow_spur_detail: {
    grooveClean: 90, dragControl: 92, speedScore: 55,
    edgeLife: 68, cost: 50, powered: false, forDetail: true,
    spurCount: "fine_narrow_spur", use: "detail_line_score",
  },
  pneumatic_spur_power: {
    grooveClean: 78, dragControl: 65, speedScore: 95,
    edgeLife: 62, cost: 380, powered: true, forDetail: false,
    spurCount: "rapid_single_spur", use: "production_line_score",
  },
};

export function grooveClean(t: CockspurChiselType): number { return specs[t].grooveClean; }
export function dragControl(t: CockspurChiselType): number { return specs[t].dragControl; }
export function speedScore(t: CockspurChiselType): number { return specs[t].speedScore; }
export function edgeLife(t: CockspurChiselType): number { return specs[t].edgeLife; }
export function chiselCost(t: CockspurChiselType): number { return specs[t].cost; }
export function powered(t: CockspurChiselType): boolean { return specs[t].powered; }
export function forDetail(t: CockspurChiselType): boolean { return specs[t].forDetail; }
export function spurCount(t: CockspurChiselType): string { return specs[t].spurCount; }
export function bestUse(t: CockspurChiselType): string { return specs[t].use; }
export function cockspurChisels(): CockspurChiselType[] { return Object.keys(specs) as CockspurChiselType[]; }
