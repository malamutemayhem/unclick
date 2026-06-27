// Optical level calculator - surveying leveling instrument tools

export type OpticalLevelType =
  | "dumpy_fixed_tube"
  | "tilting_fine_adjust"
  | "automatic_compensator"
  | "digital_bar_code"
  | "builders_hand_sight";

const LEVEL_DATA: Record<
  OpticalLevelType,
  {
    readAccuracy: number;
    setupSpeed: number;
    weatherSeal: number;
    magnification: number;
    cost: number;
    autoLevel: boolean;
    needsTripod: boolean;
    opticType: string;
    bestUse: string;
  }
> = {
  dumpy_fixed_tube: {
    readAccuracy: 7,
    setupSpeed: 5,
    weatherSeal: 7,
    magnification: 6,
    cost: 4,
    autoLevel: false,
    needsTripod: true,
    opticType: "fixed_telescope_tube",
    bestUse: "basic_site_level",
  },
  tilting_fine_adjust: {
    readAccuracy: 9,
    setupSpeed: 4,
    weatherSeal: 7,
    magnification: 8,
    cost: 6,
    autoLevel: false,
    needsTripod: true,
    opticType: "tilting_micrometer_tube",
    bestUse: "precise_height_diff",
  },
  automatic_compensator: {
    readAccuracy: 8,
    setupSpeed: 9,
    weatherSeal: 8,
    magnification: 7,
    cost: 7,
    autoLevel: true,
    needsTripod: true,
    opticType: "compensator_pendulum",
    bestUse: "fast_construction_level",
  },
  digital_bar_code: {
    readAccuracy: 10,
    setupSpeed: 8,
    weatherSeal: 9,
    magnification: 9,
    cost: 9,
    autoLevel: true,
    needsTripod: true,
    opticType: "ccd_barcode_reader",
    bestUse: "high_precision_monitor",
  },
  builders_hand_sight: {
    readAccuracy: 4,
    setupSpeed: 10,
    weatherSeal: 5,
    magnification: 3,
    cost: 2,
    autoLevel: false,
    needsTripod: false,
    opticType: "hand_held_sight",
    bestUse: "quick_rough_grade",
  },
};

export function readAccuracy(type: OpticalLevelType): number {
  return LEVEL_DATA[type].readAccuracy;
}
export function setupSpeed(type: OpticalLevelType): number {
  return LEVEL_DATA[type].setupSpeed;
}
export function weatherSeal(type: OpticalLevelType): number {
  return LEVEL_DATA[type].weatherSeal;
}
export function magnification(type: OpticalLevelType): number {
  return LEVEL_DATA[type].magnification;
}
export function levelCost(type: OpticalLevelType): number {
  return LEVEL_DATA[type].cost;
}
export function autoLevel(type: OpticalLevelType): boolean {
  return LEVEL_DATA[type].autoLevel;
}
export function needsTripod(type: OpticalLevelType): boolean {
  return LEVEL_DATA[type].needsTripod;
}
export function opticType(type: OpticalLevelType): string {
  return LEVEL_DATA[type].opticType;
}
export function bestUse(type: OpticalLevelType): string {
  return LEVEL_DATA[type].bestUse;
}
export function opticalLevels(): OpticalLevelType[] {
  return Object.keys(LEVEL_DATA) as OpticalLevelType[];
}
