export type TuftingNeedleType =
  | "straight_point_standard"
  | "curved_point_deep"
  | "double_point_fast"
  | "button_loop_attach"
  | "pneumatic_tuft_power";

const specs: Record<TuftingNeedleType, {
  penetrate: number; loopForm: number; speedTuft: number;
  depthReach: number; cost: number; powered: boolean; forButton: boolean;
  pointStyle: string; use: string;
}> = {
  straight_point_standard: {
    penetrate: 82, loopForm: 78, speedTuft: 68,
    depthReach: 75, cost: 12, powered: false, forButton: false,
    pointStyle: "straight_sharp_point", use: "general_diamond_tuft",
  },
  curved_point_deep: {
    penetrate: 78, loopForm: 85, speedTuft: 60,
    depthReach: 92, cost: 15, powered: false, forButton: false,
    pointStyle: "curved_reach_point", use: "deep_cushion_tuft",
  },
  double_point_fast: {
    penetrate: 80, loopForm: 82, speedTuft: 88,
    depthReach: 72, cost: 18, powered: false, forButton: false,
    pointStyle: "double_end_point", use: "fast_through_tuft",
  },
  button_loop_attach: {
    penetrate: 75, loopForm: 92, speedTuft: 65,
    depthReach: 80, cost: 14, powered: false, forButton: true,
    pointStyle: "loop_eye_point", use: "button_attach_tuft",
  },
  pneumatic_tuft_power: {
    penetrate: 90, loopForm: 75, speedTuft: 95,
    depthReach: 85, cost: 350, powered: true, forButton: false,
    pointStyle: "pneumatic_drive_point", use: "production_speed_tuft",
  },
};

export function penetrate(t: TuftingNeedleType): number { return specs[t].penetrate; }
export function loopForm(t: TuftingNeedleType): number { return specs[t].loopForm; }
export function speedTuft(t: TuftingNeedleType): number { return specs[t].speedTuft; }
export function depthReach(t: TuftingNeedleType): number { return specs[t].depthReach; }
export function needleCost(t: TuftingNeedleType): number { return specs[t].cost; }
export function powered(t: TuftingNeedleType): boolean { return specs[t].powered; }
export function forButton(t: TuftingNeedleType): boolean { return specs[t].forButton; }
export function pointStyle(t: TuftingNeedleType): string { return specs[t].pointStyle; }
export function bestUse(t: TuftingNeedleType): string { return specs[t].use; }
export function tuftingNeedles(): TuftingNeedleType[] { return Object.keys(specs) as TuftingNeedleType[]; }
