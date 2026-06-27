export type ChinRestFitType =
  | "guarneri_standard_center"
  | "teka_side_mount"
  | "flesch_flat_wide"
  | "kaufman_tall_offset"
  | "wave_contour_ergonomic";

const specs: Record<ChinRestFitType, {
  comfort: number; stability: number; jawClear: number;
  fitRange: number; cost: number; sideMount: boolean; contoured: boolean;
  mountStyle: string; use: string;
}> = {
  guarneri_standard_center: {
    comfort: 80, stability: 85, jawClear: 78,
    fitRange: 82, cost: 30, sideMount: false, contoured: false,
    mountStyle: "center_over_tailpiece", use: "general_center_chin",
  },
  teka_side_mount: {
    comfort: 82, stability: 88, jawClear: 85,
    fitRange: 78, cost: 35, sideMount: true, contoured: false,
    mountStyle: "left_side_mount", use: "side_jaw_player",
  },
  flesch_flat_wide: {
    comfort: 78, stability: 80, jawClear: 75,
    fitRange: 90, cost: 25, sideMount: false, contoured: false,
    mountStyle: "center_flat_plate", use: "flat_jaw_player",
  },
  kaufman_tall_offset: {
    comfort: 85, stability: 82, jawClear: 92,
    fitRange: 70, cost: 45, sideMount: true, contoured: true,
    mountStyle: "raised_offset_cup", use: "long_neck_player",
  },
  wave_contour_ergonomic: {
    comfort: 92, stability: 78, jawClear: 88,
    fitRange: 75, cost: 55, sideMount: false, contoured: true,
    mountStyle: "sculpted_wave_form", use: "ergonomic_comfort_fit",
  },
};

export function comfort(t: ChinRestFitType): number { return specs[t].comfort; }
export function stability(t: ChinRestFitType): number { return specs[t].stability; }
export function jawClear(t: ChinRestFitType): number { return specs[t].jawClear; }
export function fitRange(t: ChinRestFitType): number { return specs[t].fitRange; }
export function restCost(t: ChinRestFitType): number { return specs[t].cost; }
export function sideMount(t: ChinRestFitType): boolean { return specs[t].sideMount; }
export function contoured(t: ChinRestFitType): boolean { return specs[t].contoured; }
export function mountStyle(t: ChinRestFitType): string { return specs[t].mountStyle; }
export function bestUse(t: ChinRestFitType): string { return specs[t].use; }
export function chinRestFits(): ChinRestFitType[] { return Object.keys(specs) as ChinRestFitType[]; }
