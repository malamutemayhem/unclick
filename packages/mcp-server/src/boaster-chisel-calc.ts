export type BoasterChiselType =
  | "wide_face_standard"
  | "narrow_face_detail"
  | "carbide_face_hard"
  | "pneumatic_boaster_fast"
  | "hand_set_traditional";

const specs: Record<BoasterChiselType, {
  flatArea: number; surfaceSmooth: number; speedDress: number;
  edgeKeep: number; cost: number; powered: boolean; forDetail: boolean;
  faceWidth: string; use: string;
}> = {
  wide_face_standard: {
    flatArea: 92, surfaceSmooth: 80, speedDress: 75,
    edgeKeep: 72, cost: 55, powered: false, forDetail: false,
    faceWidth: "broad_three_inch", use: "flat_surface_dress",
  },
  narrow_face_detail: {
    flatArea: 55, surfaceSmooth: 88, speedDress: 60,
    edgeKeep: 75, cost: 50, powered: false, forDetail: true,
    faceWidth: "narrow_one_inch", use: "detail_edge_clean",
  },
  carbide_face_hard: {
    flatArea: 85, surfaceSmooth: 78, speedDress: 70,
    edgeKeep: 95, cost: 130, powered: false, forDetail: false,
    faceWidth: "medium_two_inch", use: "hard_granite_dress",
  },
  pneumatic_boaster_fast: {
    flatArea: 88, surfaceSmooth: 72, speedDress: 95,
    edgeKeep: 68, cost: 380, powered: true, forDetail: false,
    faceWidth: "broad_three_inch", use: "production_flat_dress",
  },
  hand_set_traditional: {
    flatArea: 78, surfaceSmooth: 85, speedDress: 55,
    edgeKeep: 70, cost: 40, powered: false, forDetail: false,
    faceWidth: "medium_two_inch", use: "heritage_stone_dress",
  },
};

export function flatArea(t: BoasterChiselType): number { return specs[t].flatArea; }
export function surfaceSmooth(t: BoasterChiselType): number { return specs[t].surfaceSmooth; }
export function speedDress(t: BoasterChiselType): number { return specs[t].speedDress; }
export function edgeKeep(t: BoasterChiselType): number { return specs[t].edgeKeep; }
export function chiselCost(t: BoasterChiselType): number { return specs[t].cost; }
export function powered(t: BoasterChiselType): boolean { return specs[t].powered; }
export function forDetail(t: BoasterChiselType): boolean { return specs[t].forDetail; }
export function faceWidth(t: BoasterChiselType): string { return specs[t].faceWidth; }
export function bestUse(t: BoasterChiselType): string { return specs[t].use; }
export function boasterChisels(): BoasterChiselType[] { return Object.keys(specs) as BoasterChiselType[]; }
