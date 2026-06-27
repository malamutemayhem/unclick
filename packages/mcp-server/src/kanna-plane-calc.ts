export type KannaPlaneType =
  | "hira_kanna_flat"
  | "maru_kanna_round"
  | "kiwa_kanna_edge"
  | "sori_kanna_curved"
  | "dai_naoshi_tune";

const specs: Record<KannaPlaneType, {
  cutSmooth: number; controlFine: number; adjustEase: number;
  woodRange: number; cost: number; curved: boolean; forEdge: boolean;
  bladeStyle: string; use: string;
}> = {
  hira_kanna_flat: {
    cutSmooth: 92, controlFine: 85, adjustEase: 80,
    woodRange: 88, cost: 60, curved: false, forEdge: false,
    bladeStyle: "flat_single_blade", use: "general_flat_surface",
  },
  maru_kanna_round: {
    cutSmooth: 85, controlFine: 88, adjustEase: 75,
    woodRange: 78, cost: 80, curved: true, forEdge: false,
    bladeStyle: "round_sole_blade", use: "concave_surface_plane",
  },
  kiwa_kanna_edge: {
    cutSmooth: 82, controlFine: 92, adjustEase: 78,
    woodRange: 72, cost: 70, curved: false, forEdge: true,
    bladeStyle: "side_edge_blade", use: "right_angle_edge",
  },
  sori_kanna_curved: {
    cutSmooth: 88, controlFine: 82, adjustEase: 72,
    woodRange: 75, cost: 85, curved: true, forEdge: false,
    bladeStyle: "curved_sole_blade", use: "convex_surface_plane",
  },
  dai_naoshi_tune: {
    cutSmooth: 78, controlFine: 90, adjustEase: 92,
    woodRange: 82, cost: 45, curved: false, forEdge: false,
    bladeStyle: "tuning_flat_blade", use: "plane_body_tune",
  },
};

export function cutSmooth(t: KannaPlaneType): number { return specs[t].cutSmooth; }
export function controlFine(t: KannaPlaneType): number { return specs[t].controlFine; }
export function adjustEase(t: KannaPlaneType): number { return specs[t].adjustEase; }
export function woodRange(t: KannaPlaneType): number { return specs[t].woodRange; }
export function kannaCost(t: KannaPlaneType): number { return specs[t].cost; }
export function curved(t: KannaPlaneType): boolean { return specs[t].curved; }
export function forEdge(t: KannaPlaneType): boolean { return specs[t].forEdge; }
export function bladeStyle(t: KannaPlaneType): string { return specs[t].bladeStyle; }
export function bestUse(t: KannaPlaneType): string { return specs[t].use; }
export function kannaPlanes(): KannaPlaneType[] { return Object.keys(specs) as KannaPlaneType[]; }
