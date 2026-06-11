export type NaveBorerType =
  | "tapered_auger_standard"
  | "shell_bore_smooth"
  | "expansion_bore_adjust"
  | "power_bore_electric"
  | "hand_reamer_finish";

const specs: Record<NaveBorerType, {
  holeClean: number; alignTrue: number; speedBore: number;
  sizeRange: number; cost: number; powered: boolean; adjustable: boolean;
  cutterType: string; use: string;
}> = {
  tapered_auger_standard: {
    holeClean: 78, alignTrue: 80, speedBore: 65,
    sizeRange: 60, cost: 40, powered: false, adjustable: false,
    cutterType: "tapered_spiral_flute", use: "general_nave_bore",
  },
  shell_bore_smooth: {
    holeClean: 92, alignTrue: 85, speedBore: 55,
    sizeRange: 55, cost: 55, powered: false, adjustable: false,
    cutterType: "smooth_shell_edge", use: "finish_nave_smooth",
  },
  expansion_bore_adjust: {
    holeClean: 75, alignTrue: 78, speedBore: 60,
    sizeRange: 95, cost: 70, powered: false, adjustable: true,
    cutterType: "expanding_blade_set", use: "variable_nave_size",
  },
  power_bore_electric: {
    holeClean: 80, alignTrue: 72, speedBore: 95,
    sizeRange: 80, cost: 300, powered: true, adjustable: false,
    cutterType: "forstner_power_bit", use: "production_nave_bore",
  },
  hand_reamer_finish: {
    holeClean: 88, alignTrue: 90, speedBore: 45,
    sizeRange: 50, cost: 50, powered: false, adjustable: false,
    cutterType: "straight_flute_ream", use: "precision_nave_finish",
  },
};

export function holeClean(t: NaveBorerType): number { return specs[t].holeClean; }
export function alignTrue(t: NaveBorerType): number { return specs[t].alignTrue; }
export function speedBore(t: NaveBorerType): number { return specs[t].speedBore; }
export function sizeRange(t: NaveBorerType): number { return specs[t].sizeRange; }
export function borerCost(t: NaveBorerType): number { return specs[t].cost; }
export function powered(t: NaveBorerType): boolean { return specs[t].powered; }
export function adjustable(t: NaveBorerType): boolean { return specs[t].adjustable; }
export function cutterType(t: NaveBorerType): string { return specs[t].cutterType; }
export function bestUse(t: NaveBorerType): string { return specs[t].use; }
export function naveborers(): NaveBorerType[] { return Object.keys(specs) as NaveBorerType[]; }
