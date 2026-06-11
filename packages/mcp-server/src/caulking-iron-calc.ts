// Caulking iron calculator - marine/boatbuilding seam packing tools

export type CaulkingIronType =
  | "making_iron_thin"
  | "reaming_iron_wide"
  | "hawsing_iron_deep"
  | "bent_iron_angle"
  | "dumb_iron_set";

const CAULK_DATA: Record<
  CaulkingIronType,
  {
    packForce: number;
    seamReach: number;
    controlFeel: number;
    edgeProtect: number;
    cost: number;
    bent: boolean;
    forDeepSeam: boolean;
    bladeWidth: string;
    bestUse: string;
  }
> = {
  making_iron_thin: {
    packForce: 7,
    seamReach: 8,
    controlFeel: 9,
    edgeProtect: 7,
    cost: 4,
    bent: false,
    forDeepSeam: false,
    bladeWidth: "narrow_thread_edge",
    bestUse: "first_thread_seat",
  },
  reaming_iron_wide: {
    packForce: 9,
    seamReach: 6,
    controlFeel: 7,
    edgeProtect: 8,
    cost: 5,
    bent: false,
    forDeepSeam: false,
    bladeWidth: "wide_flat_pack",
    bestUse: "open_seam_ream",
  },
  hawsing_iron_deep: {
    packForce: 10,
    seamReach: 9,
    controlFeel: 6,
    edgeProtect: 8,
    cost: 6,
    bent: false,
    forDeepSeam: true,
    bladeWidth: "deep_drive_blade",
    bestUse: "deep_oakum_pack",
  },
  bent_iron_angle: {
    packForce: 7,
    seamReach: 10,
    controlFeel: 8,
    edgeProtect: 7,
    cost: 6,
    bent: true,
    forDeepSeam: false,
    bladeWidth: "angled_reach_tip",
    bestUse: "curved_hull_seam",
  },
  dumb_iron_set: {
    packForce: 8,
    seamReach: 7,
    controlFeel: 8,
    edgeProtect: 9,
    cost: 5,
    bent: false,
    forDeepSeam: false,
    bladeWidth: "blunt_smooth_face",
    bestUse: "finish_smooth_seat",
  },
};

export function packForce(type: CaulkingIronType): number {
  return CAULK_DATA[type].packForce;
}
export function seamReach(type: CaulkingIronType): number {
  return CAULK_DATA[type].seamReach;
}
export function controlFeel(type: CaulkingIronType): number {
  return CAULK_DATA[type].controlFeel;
}
export function edgeProtect(type: CaulkingIronType): number {
  return CAULK_DATA[type].edgeProtect;
}
export function caulkCost(type: CaulkingIronType): number {
  return CAULK_DATA[type].cost;
}
export function bent(type: CaulkingIronType): boolean {
  return CAULK_DATA[type].bent;
}
export function forDeepSeam(type: CaulkingIronType): boolean {
  return CAULK_DATA[type].forDeepSeam;
}
export function bladeWidth(type: CaulkingIronType): string {
  return CAULK_DATA[type].bladeWidth;
}
export function bestUse(type: CaulkingIronType): string {
  return CAULK_DATA[type].bestUse;
}
export function caulkingIrons(): CaulkingIronType[] {
  return Object.keys(CAULK_DATA) as CaulkingIronType[];
}
