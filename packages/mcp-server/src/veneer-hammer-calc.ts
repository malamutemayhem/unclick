// Veneer hammer calculator - veneer laying hammer tools

export type VeneerHammerType =
  | "cross_peen_standard"
  | "round_face_broad"
  | "electric_heat_iron"
  | "roller_press_hand"
  | "wooden_mallet_tap";

const HAMMER_DATA: Record<
  VeneerHammerType,
  {
    pressForce: number;
    heatTransfer: number;
    controlFeel: number;
    coverageSpeed: number;
    cost: number;
    heated: boolean;
    forCurve: boolean;
    faceShape: string;
    bestUse: string;
  }
> = {
  cross_peen_standard: {
    pressForce: 9,
    heatTransfer: 7,
    controlFeel: 8,
    coverageSpeed: 7,
    cost: 4,
    heated: false,
    forCurve: false,
    faceShape: "cross_peen_narrow",
    bestUse: "general_veneer_lay",
  },
  round_face_broad: {
    pressForce: 8,
    heatTransfer: 6,
    controlFeel: 7,
    coverageSpeed: 9,
    cost: 4,
    heated: false,
    forCurve: true,
    faceShape: "round_broad_flat",
    bestUse: "large_panel_press",
  },
  electric_heat_iron: {
    pressForce: 7,
    heatTransfer: 10,
    controlFeel: 6,
    coverageSpeed: 8,
    cost: 7,
    heated: true,
    forCurve: false,
    faceShape: "flat_iron_plate",
    bestUse: "hide_glue_reactivate",
  },
  roller_press_hand: {
    pressForce: 8,
    heatTransfer: 4,
    controlFeel: 7,
    coverageSpeed: 10,
    cost: 5,
    heated: false,
    forCurve: true,
    faceShape: "cylinder_roller",
    bestUse: "contact_cement_roll",
  },
  wooden_mallet_tap: {
    pressForce: 6,
    heatTransfer: 3,
    controlFeel: 9,
    coverageSpeed: 5,
    cost: 3,
    heated: false,
    forCurve: false,
    faceShape: "flat_wood_face",
    bestUse: "delicate_inlay_tap",
  },
};

export function pressForce(type: VeneerHammerType): number {
  return HAMMER_DATA[type].pressForce;
}
export function heatTransfer(type: VeneerHammerType): number {
  return HAMMER_DATA[type].heatTransfer;
}
export function controlFeel(type: VeneerHammerType): number {
  return HAMMER_DATA[type].controlFeel;
}
export function coverageSpeed(type: VeneerHammerType): number {
  return HAMMER_DATA[type].coverageSpeed;
}
export function hammerCost(type: VeneerHammerType): number {
  return HAMMER_DATA[type].cost;
}
export function heated(type: VeneerHammerType): boolean {
  return HAMMER_DATA[type].heated;
}
export function forCurve(type: VeneerHammerType): boolean {
  return HAMMER_DATA[type].forCurve;
}
export function faceShape(type: VeneerHammerType): string {
  return HAMMER_DATA[type].faceShape;
}
export function bestUse(type: VeneerHammerType): string {
  return HAMMER_DATA[type].bestUse;
}
export function veneerHammers(): VeneerHammerType[] {
  return Object.keys(HAMMER_DATA) as VeneerHammerType[];
}
