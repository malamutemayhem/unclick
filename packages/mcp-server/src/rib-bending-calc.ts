export type RibBendingType =
  | "bending_iron_standard"
  | "hot_pipe_traditional"
  | "fox_bender_mold"
  | "electric_blanket_even"
  | "steam_box_large";

const specs: Record<RibBendingType, {
  bendControl: number; heatEven: number; speedBend: number;
  sizeRange: number; cost: number; electric: boolean; useMold: boolean;
  heatMethod: string; use: string;
}> = {
  bending_iron_standard: {
    bendControl: 88, heatEven: 72, speedBend: 75,
    sizeRange: 80, cost: 60, electric: false, useMold: false,
    heatMethod: "heated_iron_contact", use: "general_rib_bend",
  },
  hot_pipe_traditional: {
    bendControl: 82, heatEven: 68, speedBend: 70,
    sizeRange: 75, cost: 40, electric: false, useMold: false,
    heatMethod: "alcohol_flame_pipe", use: "traditional_hand_bend",
  },
  fox_bender_mold: {
    bendControl: 75, heatEven: 90, speedBend: 85,
    sizeRange: 60, cost: 120, electric: true, useMold: true,
    heatMethod: "heating_blanket_mold", use: "consistent_shape_bend",
  },
  electric_blanket_even: {
    bendControl: 78, heatEven: 95, speedBend: 80,
    sizeRange: 85, cost: 80, electric: true, useMold: false,
    heatMethod: "silicone_heat_pad", use: "even_heat_free_bend",
  },
  steam_box_large: {
    bendControl: 70, heatEven: 82, speedBend: 65,
    sizeRange: 95, cost: 100, electric: false, useMold: false,
    heatMethod: "steam_chamber_soak", use: "large_cello_rib_bend",
  },
};

export function bendControl(t: RibBendingType): number { return specs[t].bendControl; }
export function heatEven(t: RibBendingType): number { return specs[t].heatEven; }
export function speedBend(t: RibBendingType): number { return specs[t].speedBend; }
export function sizeRange(t: RibBendingType): number { return specs[t].sizeRange; }
export function bendCost(t: RibBendingType): number { return specs[t].cost; }
export function electric(t: RibBendingType): boolean { return specs[t].electric; }
export function useMold(t: RibBendingType): boolean { return specs[t].useMold; }
export function heatMethod(t: RibBendingType): string { return specs[t].heatMethod; }
export function bestUse(t: RibBendingType): string { return specs[t].use; }
export function ribBendings(): RibBendingType[] { return Object.keys(specs) as RibBendingType[]; }
