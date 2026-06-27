export type DieCastingType =
  | "hot_chamber_zinc"
  | "cold_chamber_aluminum"
  | "vacuum_assisted_porosity"
  | "squeeze_cast_forged"
  | "semi_solid_thixo";

interface DieCastingData {
  precision: number;
  speed: number;
  strength: number;
  porosity: number;
  dcCost: number;
  thinWall: boolean;
  forAluminum: boolean;
  process: string;
  bestUse: string;
}

const DATA: Record<DieCastingType, DieCastingData> = {
  hot_chamber_zinc: {
    precision: 9, speed: 10, strength: 6, porosity: 6, dcCost: 4,
    thinWall: true, forAluminum: false,
    process: "gooseneck_submerged_zinc_pot",
    bestUse: "zinc_connector_buckle_small_part",
  },
  cold_chamber_aluminum: {
    precision: 8, speed: 8, strength: 8, porosity: 6, dcCost: 6,
    thinWall: true, forAluminum: true,
    process: "horizontal_shot_sleeve_ladle",
    bestUse: "engine_block_transmission_housing",
  },
  vacuum_assisted_porosity: {
    precision: 9, speed: 7, strength: 9, porosity: 10, dcCost: 8,
    thinWall: true, forAluminum: true,
    process: "sealed_die_vacuum_evacuation",
    bestUse: "structural_auto_shock_tower_node",
  },
  squeeze_cast_forged: {
    precision: 7, speed: 5, strength: 10, porosity: 10, dcCost: 9,
    thinWall: false, forAluminum: true,
    process: "high_pressure_slow_fill_forge",
    bestUse: "wheel_knuckle_suspension_arm",
  },
  semi_solid_thixo: {
    precision: 10, speed: 6, strength: 9, porosity: 9, dcCost: 10,
    thinWall: true, forAluminum: true,
    process: "thixotropic_slug_partial_melt",
    bestUse: "electronics_heat_sink_precision",
  },
};

function get(t: DieCastingType): DieCastingData {
  return DATA[t];
}

export const precision = (t: DieCastingType) => get(t).precision;
export const speed = (t: DieCastingType) => get(t).speed;
export const strength = (t: DieCastingType) => get(t).strength;
export const porosity = (t: DieCastingType) => get(t).porosity;
export const dcCost = (t: DieCastingType) => get(t).dcCost;
export const thinWall = (t: DieCastingType) => get(t).thinWall;
export const forAluminum = (t: DieCastingType) => get(t).forAluminum;
export const process = (t: DieCastingType) => get(t).process;
export const bestUse = (t: DieCastingType) => get(t).bestUse;
export const dieCastingTypes = (): DieCastingType[] =>
  Object.keys(DATA) as DieCastingType[];
