export type SpokeTenonType =
  | "round_tenon_standard"
  | "square_tenon_strong"
  | "tapered_tenon_wedge"
  | "fox_wedge_hidden"
  | "through_tenon_visible";

const specs: Record<SpokeTenonType, {
  jointStrength: number; fitAccuracy: number; assemblyEase: number;
  repairAccess: number; cost: number; hidden: boolean; wedged: boolean;
  jointProfile: string; use: string;
}> = {
  round_tenon_standard: {
    jointStrength: 78, fitAccuracy: 82, assemblyEase: 88,
    repairAccess: 75, cost: 30, hidden: false, wedged: false,
    jointProfile: "round_shoulder_fit", use: "general_spoke_joint",
  },
  square_tenon_strong: {
    jointStrength: 92, fitAccuracy: 75, assemblyEase: 65,
    repairAccess: 70, cost: 40, hidden: false, wedged: false,
    jointProfile: "square_shoulder_fit", use: "heavy_load_spoke",
  },
  tapered_tenon_wedge: {
    jointStrength: 88, fitAccuracy: 85, assemblyEase: 72,
    repairAccess: 80, cost: 35, hidden: false, wedged: true,
    jointProfile: "tapered_wedge_lock", use: "adjustable_spoke_fit",
  },
  fox_wedge_hidden: {
    jointStrength: 85, fitAccuracy: 90, assemblyEase: 55,
    repairAccess: 45, cost: 45, hidden: true, wedged: true,
    jointProfile: "blind_wedge_expand", use: "fine_wheel_spoke",
  },
  through_tenon_visible: {
    jointStrength: 90, fitAccuracy: 80, assemblyEase: 78,
    repairAccess: 92, cost: 35, hidden: false, wedged: false,
    jointProfile: "through_pin_lock", use: "repair_access_spoke",
  },
};

export function jointStrength(t: SpokeTenonType): number { return specs[t].jointStrength; }
export function fitAccuracy(t: SpokeTenonType): number { return specs[t].fitAccuracy; }
export function assemblyEase(t: SpokeTenonType): number { return specs[t].assemblyEase; }
export function repairAccess(t: SpokeTenonType): number { return specs[t].repairAccess; }
export function tenonCost(t: SpokeTenonType): number { return specs[t].cost; }
export function hidden(t: SpokeTenonType): boolean { return specs[t].hidden; }
export function wedged(t: SpokeTenonType): boolean { return specs[t].wedged; }
export function jointProfile(t: SpokeTenonType): string { return specs[t].jointProfile; }
export function bestUse(t: SpokeTenonType): string { return specs[t].use; }
export function spokeTenons(): SpokeTenonType[] { return Object.keys(specs) as SpokeTenonType[]; }
