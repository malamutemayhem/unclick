export type SeamRubberType =
  | "flat_rubber_standard"
  | "grooved_rubber_guide"
  | "round_rubber_crease"
  | "heated_rubber_set"
  | "teflon_rubber_slide";

const specs: Record<SeamRubberType, {
  seamFlat: number; speedWork: number; controlGuide: number;
  fabricRange: number; cost: number; heated: boolean; nonStick: boolean;
  surfaceType: string; use: string;
}> = {
  flat_rubber_standard: {
    seamFlat: 85, speedWork: 82, controlGuide: 80,
    fabricRange: 88, cost: 10, heated: false, nonStick: false,
    surfaceType: "smooth_flat_face", use: "general_seam_flatten",
  },
  grooved_rubber_guide: {
    seamFlat: 82, speedWork: 78, controlGuide: 92,
    fabricRange: 80, cost: 15, heated: false, nonStick: false,
    surfaceType: "grooved_track_face", use: "guided_seam_crease",
  },
  round_rubber_crease: {
    seamFlat: 78, speedWork: 80, controlGuide: 85,
    fabricRange: 75, cost: 12, heated: false, nonStick: false,
    surfaceType: "round_edge_face", use: "round_crease_mark",
  },
  heated_rubber_set: {
    seamFlat: 92, speedWork: 85, controlGuide: 78,
    fabricRange: 82, cost: 25, heated: true, nonStick: false,
    surfaceType: "heated_flat_plate", use: "permanent_seam_set",
  },
  teflon_rubber_slide: {
    seamFlat: 88, speedWork: 90, controlGuide: 82,
    fabricRange: 85, cost: 18, heated: false, nonStick: true,
    surfaceType: "teflon_coated_face", use: "sticky_fabric_slide",
  },
};

export function seamFlat(t: SeamRubberType): number { return specs[t].seamFlat; }
export function speedWork(t: SeamRubberType): number { return specs[t].speedWork; }
export function controlGuide(t: SeamRubberType): number { return specs[t].controlGuide; }
export function fabricRange(t: SeamRubberType): number { return specs[t].fabricRange; }
export function rubberCost(t: SeamRubberType): number { return specs[t].cost; }
export function heated(t: SeamRubberType): boolean { return specs[t].heated; }
export function nonStick(t: SeamRubberType): boolean { return specs[t].nonStick; }
export function surfaceType(t: SeamRubberType): string { return specs[t].surfaceType; }
export function bestUse(t: SeamRubberType): string { return specs[t].use; }
export function seamRubbers(): SeamRubberType[] { return Object.keys(specs) as SeamRubberType[]; }
