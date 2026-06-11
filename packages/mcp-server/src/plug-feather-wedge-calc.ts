export type PlugFeatherWedgeType =
  | "steel_plug_standard"
  | "carbide_plug_hard"
  | "wide_feather_broad"
  | "narrow_feather_deep"
  | "pneumatic_splitter_power";

const specs: Record<PlugFeatherWedgeType, {
  splitForce: number; controlCrack: number; depthReach: number;
  reuse: number; cost: number; powered: boolean; forDeep: boolean;
  wedgeProfile: string; use: string;
}> = {
  steel_plug_standard: {
    splitForce: 80, controlCrack: 82, depthReach: 70,
    reuse: 90, cost: 25, powered: false, forDeep: false,
    wedgeProfile: "tapered_steel_plug", use: "general_stone_split",
  },
  carbide_plug_hard: {
    splitForce: 88, controlCrack: 78, depthReach: 72,
    reuse: 95, cost: 60, powered: false, forDeep: false,
    wedgeProfile: "carbide_tipped_plug", use: "hard_granite_split",
  },
  wide_feather_broad: {
    splitForce: 75, controlCrack: 90, depthReach: 60,
    reuse: 85, cost: 30, powered: false, forDeep: false,
    wedgeProfile: "broad_half_round", use: "controlled_slab_split",
  },
  narrow_feather_deep: {
    splitForce: 70, controlCrack: 85, depthReach: 92,
    reuse: 80, cost: 35, powered: false, forDeep: true,
    wedgeProfile: "narrow_deep_half", use: "deep_block_split",
  },
  pneumatic_splitter_power: {
    splitForce: 95, controlCrack: 65, depthReach: 85,
    reuse: 70, cost: 450, powered: true, forDeep: false,
    wedgeProfile: "hydraulic_wedge_set", use: "production_quarry_split",
  },
};

export function splitForce(t: PlugFeatherWedgeType): number { return specs[t].splitForce; }
export function controlCrack(t: PlugFeatherWedgeType): number { return specs[t].controlCrack; }
export function depthReach(t: PlugFeatherWedgeType): number { return specs[t].depthReach; }
export function reuse(t: PlugFeatherWedgeType): number { return specs[t].reuse; }
export function wedgeCost(t: PlugFeatherWedgeType): number { return specs[t].cost; }
export function powered(t: PlugFeatherWedgeType): boolean { return specs[t].powered; }
export function forDeep(t: PlugFeatherWedgeType): boolean { return specs[t].forDeep; }
export function wedgeProfile(t: PlugFeatherWedgeType): string { return specs[t].wedgeProfile; }
export function bestUse(t: PlugFeatherWedgeType): string { return specs[t].use; }
export function plugFeatherWedges(): PlugFeatherWedgeType[] { return Object.keys(specs) as PlugFeatherWedgeType[]; }
