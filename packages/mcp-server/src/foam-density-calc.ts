export type FoamDensityType =
  | "high_resilience_firm"
  | "medium_density_general"
  | "soft_cushion_comfort"
  | "memory_foam_contour"
  | "rebond_pad_budget";

const specs: Record<FoamDensityType, {
  supportFirm: number; comfortSoft: number; durability: number;
  recoverySpeed: number; cost: number; memory: boolean; rebond: boolean;
  cellStructure: string; use: string;
}> = {
  high_resilience_firm: {
    supportFirm: 95, comfortSoft: 70, durability: 92,
    recoverySpeed: 90, cost: 35, memory: false, rebond: false,
    cellStructure: "open_cell_dense", use: "seat_cushion_firm",
  },
  medium_density_general: {
    supportFirm: 82, comfortSoft: 80, durability: 85,
    recoverySpeed: 85, cost: 22, memory: false, rebond: false,
    cellStructure: "open_cell_medium", use: "general_cushion_fill",
  },
  soft_cushion_comfort: {
    supportFirm: 65, comfortSoft: 95, durability: 72,
    recoverySpeed: 80, cost: 18, memory: false, rebond: false,
    cellStructure: "open_cell_soft", use: "back_pillow_soft",
  },
  memory_foam_contour: {
    supportFirm: 85, comfortSoft: 88, durability: 80,
    recoverySpeed: 60, cost: 40, memory: true, rebond: false,
    cellStructure: "viscoelastic_cell", use: "body_contour_seat",
  },
  rebond_pad_budget: {
    supportFirm: 78, comfortSoft: 72, durability: 88,
    recoverySpeed: 75, cost: 10, memory: false, rebond: true,
    cellStructure: "bonded_chip_foam", use: "budget_carpet_pad",
  },
};

export function supportFirm(t: FoamDensityType): number { return specs[t].supportFirm; }
export function comfortSoft(t: FoamDensityType): number { return specs[t].comfortSoft; }
export function durability(t: FoamDensityType): number { return specs[t].durability; }
export function recoverySpeed(t: FoamDensityType): number { return specs[t].recoverySpeed; }
export function foamCost(t: FoamDensityType): number { return specs[t].cost; }
export function memory(t: FoamDensityType): boolean { return specs[t].memory; }
export function rebond(t: FoamDensityType): boolean { return specs[t].rebond; }
export function cellStructure(t: FoamDensityType): string { return specs[t].cellStructure; }
export function bestUse(t: FoamDensityType): string { return specs[t].use; }
export function foamDensitys(): FoamDensityType[] { return Object.keys(specs) as FoamDensityType[]; }
