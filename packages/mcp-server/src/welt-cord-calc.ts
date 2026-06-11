export type WeltCordType =
  | "single_welt_standard"
  | "double_welt_thick"
  | "micro_welt_thin"
  | "leather_welt_premium"
  | "vinyl_welt_marine";

const specs: Record<WeltCordType, {
  edgeDefine: number; flexBend: number; durability: number;
  sewEase: number; cost: number; forMarine: boolean; leather: boolean;
  profileShape: string; use: string;
}> = {
  single_welt_standard: {
    edgeDefine: 78, flexBend: 82, durability: 75,
    sewEase: 88, cost: 10, forMarine: false, leather: false,
    profileShape: "single_round_bead", use: "general_seam_finish",
  },
  double_welt_thick: {
    edgeDefine: 90, flexBend: 65, durability: 80,
    sewEase: 68, cost: 18, forMarine: false, leather: false,
    profileShape: "double_channel_bead", use: "thick_edge_cover",
  },
  micro_welt_thin: {
    edgeDefine: 72, flexBend: 92, durability: 70,
    sewEase: 85, cost: 12, forMarine: false, leather: false,
    profileShape: "micro_slim_bead", use: "subtle_edge_define",
  },
  leather_welt_premium: {
    edgeDefine: 88, flexBend: 75, durability: 88,
    sewEase: 60, cost: 35, forMarine: false, leather: true,
    profileShape: "leather_strip_fold", use: "premium_leather_edge",
  },
  vinyl_welt_marine: {
    edgeDefine: 82, flexBend: 78, durability: 95,
    sewEase: 80, cost: 15, forMarine: true, leather: false,
    profileShape: "vinyl_round_bead", use: "marine_outdoor_edge",
  },
};

export function edgeDefine(t: WeltCordType): number { return specs[t].edgeDefine; }
export function flexBend(t: WeltCordType): number { return specs[t].flexBend; }
export function durability(t: WeltCordType): number { return specs[t].durability; }
export function sewEase(t: WeltCordType): number { return specs[t].sewEase; }
export function cordCost(t: WeltCordType): number { return specs[t].cost; }
export function forMarine(t: WeltCordType): boolean { return specs[t].forMarine; }
export function leather(t: WeltCordType): boolean { return specs[t].leather; }
export function profileShape(t: WeltCordType): string { return specs[t].profileShape; }
export function bestUse(t: WeltCordType): string { return specs[t].use; }
export function weltCords(): WeltCordType[] { return Object.keys(specs) as WeltCordType[]; }
