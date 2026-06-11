// Deadeye lanyard calculator - rigging deadeye and lanyard tools

export type DeadeyeLanyardType =
  | "lignum_vitae_round"
  | "elm_heart_traditional"
  | "bronze_cast_modern"
  | "stainless_machined_race"
  | "synthetic_block_light";

const DEADEYE_DATA: Record<
  DeadeyeLanyardType,
  {
    loadCapacity: number;
    frictionLow: number;
    weatherResist: number;
    adjustEase: number;
    cost: number;
    wooden: boolean;
    forRacing: boolean;
    bodyMaterial: string;
    bestUse: string;
  }
> = {
  lignum_vitae_round: {
    loadCapacity: 8,
    frictionLow: 9,
    weatherResist: 9,
    adjustEase: 7,
    cost: 6,
    wooden: true,
    forRacing: false,
    bodyMaterial: "lignum_vitae_hard",
    bestUse: "traditional_shroud_rig",
  },
  elm_heart_traditional: {
    loadCapacity: 7,
    frictionLow: 7,
    weatherResist: 6,
    adjustEase: 8,
    cost: 3,
    wooden: true,
    forRacing: false,
    bodyMaterial: "elm_heartwood",
    bestUse: "period_ship_restore",
  },
  bronze_cast_modern: {
    loadCapacity: 9,
    frictionLow: 8,
    weatherResist: 9,
    adjustEase: 7,
    cost: 7,
    wooden: false,
    forRacing: false,
    bodyMaterial: "bronze_cast_alloy",
    bestUse: "marine_heavy_shroud",
  },
  stainless_machined_race: {
    loadCapacity: 10,
    frictionLow: 10,
    weatherResist: 10,
    adjustEase: 8,
    cost: 9,
    wooden: false,
    forRacing: true,
    bodyMaterial: "stainless_machined",
    bestUse: "race_yacht_rig",
  },
  synthetic_block_light: {
    loadCapacity: 7,
    frictionLow: 8,
    weatherResist: 8,
    adjustEase: 9,
    cost: 4,
    wooden: false,
    forRacing: false,
    bodyMaterial: "acetal_composite",
    bestUse: "light_dinghy_rig",
  },
};

export function loadCapacity(type: DeadeyeLanyardType): number {
  return DEADEYE_DATA[type].loadCapacity;
}
export function frictionLow(type: DeadeyeLanyardType): number {
  return DEADEYE_DATA[type].frictionLow;
}
export function weatherResist(type: DeadeyeLanyardType): number {
  return DEADEYE_DATA[type].weatherResist;
}
export function adjustEase(type: DeadeyeLanyardType): number {
  return DEADEYE_DATA[type].adjustEase;
}
export function deadeyeCost(type: DeadeyeLanyardType): number {
  return DEADEYE_DATA[type].cost;
}
export function wooden(type: DeadeyeLanyardType): boolean {
  return DEADEYE_DATA[type].wooden;
}
export function forRacing(type: DeadeyeLanyardType): boolean {
  return DEADEYE_DATA[type].forRacing;
}
export function bodyMaterial(type: DeadeyeLanyardType): string {
  return DEADEYE_DATA[type].bodyMaterial;
}
export function bestUse(type: DeadeyeLanyardType): string {
  return DEADEYE_DATA[type].bestUse;
}
export function deadeyeLanyards(): DeadeyeLanyardType[] {
  return Object.keys(DEADEYE_DATA) as DeadeyeLanyardType[];
}
