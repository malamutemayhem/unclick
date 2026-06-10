// Dumpy level calculator - surveying tripod-mounted leveling tools

export type DumpyLevelType =
  | "classic_brass_scope"
  | "modern_alloy_sealed"
  | "transit_rotate_full"
  | "wye_level_removable"
  | "quick_set_auto";

const DUMPY_DATA: Record<
  DumpyLevelType,
  {
    sightClarity: number;
    levelStability: number;
    rotateSmooth: number;
    fieldDurable: number;
    cost: number;
    fullRotation: boolean;
    removableScope: boolean;
    bodyFinish: string;
    bestUse: string;
  }
> = {
  classic_brass_scope: {
    sightClarity: 7,
    levelStability: 8,
    rotateSmooth: 6,
    fieldDurable: 9,
    cost: 7,
    fullRotation: false,
    removableScope: false,
    bodyFinish: "lacquered_brass",
    bestUse: "heritage_survey_work",
  },
  modern_alloy_sealed: {
    sightClarity: 8,
    levelStability: 8,
    rotateSmooth: 8,
    fieldDurable: 8,
    cost: 5,
    fullRotation: false,
    removableScope: false,
    bodyFinish: "powder_coat_alloy",
    bestUse: "standard_site_level",
  },
  transit_rotate_full: {
    sightClarity: 8,
    levelStability: 7,
    rotateSmooth: 9,
    fieldDurable: 7,
    cost: 8,
    fullRotation: true,
    removableScope: false,
    bodyFinish: "anodized_aluminum",
    bestUse: "angle_height_combo",
  },
  wye_level_removable: {
    sightClarity: 7,
    levelStability: 6,
    rotateSmooth: 7,
    fieldDurable: 6,
    cost: 6,
    fullRotation: false,
    removableScope: true,
    bodyFinish: "machined_steel",
    bestUse: "scope_swap_adjust",
  },
  quick_set_auto: {
    sightClarity: 9,
    levelStability: 9,
    rotateSmooth: 9,
    fieldDurable: 7,
    cost: 9,
    fullRotation: true,
    removableScope: false,
    bodyFinish: "rubber_armor_coat",
    bestUse: "rapid_grade_set",
  },
};

export function sightClarity(type: DumpyLevelType): number {
  return DUMPY_DATA[type].sightClarity;
}
export function levelStability(type: DumpyLevelType): number {
  return DUMPY_DATA[type].levelStability;
}
export function rotateSmooth(type: DumpyLevelType): number {
  return DUMPY_DATA[type].rotateSmooth;
}
export function fieldDurable(type: DumpyLevelType): number {
  return DUMPY_DATA[type].fieldDurable;
}
export function dumpyCost(type: DumpyLevelType): number {
  return DUMPY_DATA[type].cost;
}
export function fullRotation(type: DumpyLevelType): boolean {
  return DUMPY_DATA[type].fullRotation;
}
export function removableScope(type: DumpyLevelType): boolean {
  return DUMPY_DATA[type].removableScope;
}
export function bodyFinish(type: DumpyLevelType): string {
  return DUMPY_DATA[type].bodyFinish;
}
export function bestUse(type: DumpyLevelType): string {
  return DUMPY_DATA[type].bestUse;
}
export function dumpyLevels(): DumpyLevelType[] {
  return Object.keys(DUMPY_DATA) as DumpyLevelType[];
}
