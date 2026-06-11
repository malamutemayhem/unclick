export type PipingCordType =
  | "cotton_cord_standard"
  | "polyester_cord_durable"
  | "foam_cord_soft"
  | "jute_cord_natural"
  | "welting_cord_firm";

const specs: Record<PipingCordType, {
  firmness: number; flexBend: number; durability: number;
  sizeRange: number; cost: number; synthetic: boolean; forOutdoor: boolean;
  coreMaterial: string; use: string;
}> = {
  cotton_cord_standard: {
    firmness: 75, flexBend: 82, durability: 68,
    sizeRange: 85, cost: 8, synthetic: false, forOutdoor: false,
    coreMaterial: "twisted_cotton_core", use: "general_piping_edge",
  },
  polyester_cord_durable: {
    firmness: 80, flexBend: 78, durability: 92,
    sizeRange: 80, cost: 12, synthetic: true, forOutdoor: true,
    coreMaterial: "braided_polyester", use: "durable_outdoor_pipe",
  },
  foam_cord_soft: {
    firmness: 55, flexBend: 95, durability: 60,
    sizeRange: 75, cost: 10, synthetic: true, forOutdoor: false,
    coreMaterial: "closed_cell_foam", use: "soft_cushion_pipe",
  },
  jute_cord_natural: {
    firmness: 82, flexBend: 70, durability: 55,
    sizeRange: 70, cost: 6, synthetic: false, forOutdoor: false,
    coreMaterial: "twisted_jute_fiber", use: "natural_rustic_pipe",
  },
  welting_cord_firm: {
    firmness: 92, flexBend: 65, durability: 85,
    sizeRange: 78, cost: 14, synthetic: true, forOutdoor: true,
    coreMaterial: "solid_poly_rod", use: "firm_edge_define",
  },
};

export function firmness(t: PipingCordType): number { return specs[t].firmness; }
export function flexBend(t: PipingCordType): number { return specs[t].flexBend; }
export function durability(t: PipingCordType): number { return specs[t].durability; }
export function sizeRange(t: PipingCordType): number { return specs[t].sizeRange; }
export function cordCost(t: PipingCordType): number { return specs[t].cost; }
export function synthetic(t: PipingCordType): boolean { return specs[t].synthetic; }
export function forOutdoor(t: PipingCordType): boolean { return specs[t].forOutdoor; }
export function coreMaterial(t: PipingCordType): string { return specs[t].coreMaterial; }
export function bestUse(t: PipingCordType): string { return specs[t].use; }
export function pipingCords(): PipingCordType[] { return Object.keys(specs) as PipingCordType[]; }
