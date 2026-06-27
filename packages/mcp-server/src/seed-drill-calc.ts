export type SeedDrillType =
  | "conventional_fluted_roller"
  | "no_till_disc_opener"
  | "pneumatic_precision_planter"
  | "broadcast_spinner_spreader"
  | "strip_till_zone_builder";

interface SeedDrillData {
  placement: number;
  spacing: number;
  speed: number;
  soilDisturb: number;
  sdCost: number;
  gpsRate: boolean;
  forNoTill: boolean;
  metering: string;
  bestUse: string;
}

const DATA: Record<SeedDrillType, SeedDrillData> = {
  conventional_fluted_roller: {
    placement: 7, spacing: 7, speed: 8, soilDisturb: 4, sdCost: 5,
    gpsRate: false, forNoTill: false,
    metering: "fluted_roller_gravity_drop",
    bestUse: "small_grain_wheat_barley",
  },
  no_till_disc_opener: {
    placement: 8, spacing: 8, speed: 7, soilDisturb: 8, sdCost: 7,
    gpsRate: true, forNoTill: true,
    metering: "disc_opener_coulter_residue_cut",
    bestUse: "conservation_tillage_cover_crop",
  },
  pneumatic_precision_planter: {
    placement: 10, spacing: 10, speed: 9, soilDisturb: 6, sdCost: 9,
    gpsRate: true, forNoTill: false,
    metering: "vacuum_disc_singulation_monitor",
    bestUse: "corn_soybean_precision_row_crop",
  },
  broadcast_spinner_spreader: {
    placement: 3, spacing: 3, speed: 10, soilDisturb: 2, sdCost: 2,
    gpsRate: false, forNoTill: false,
    metering: "spinner_disc_broadcast_scatter",
    bestUse: "pasture_overseed_cover_crop",
  },
  strip_till_zone_builder: {
    placement: 9, spacing: 9, speed: 7, soilDisturb: 7, sdCost: 8,
    gpsRate: true, forNoTill: true,
    metering: "strip_zone_knife_fertilizer_band",
    bestUse: "strip_till_fertilizer_placement",
  },
};

function get(t: SeedDrillType): SeedDrillData {
  return DATA[t];
}

export const placement = (t: SeedDrillType) => get(t).placement;
export const spacing = (t: SeedDrillType) => get(t).spacing;
export const speed = (t: SeedDrillType) => get(t).speed;
export const soilDisturb = (t: SeedDrillType) => get(t).soilDisturb;
export const sdCost = (t: SeedDrillType) => get(t).sdCost;
export const gpsRate = (t: SeedDrillType) => get(t).gpsRate;
export const forNoTill = (t: SeedDrillType) => get(t).forNoTill;
export const metering = (t: SeedDrillType) => get(t).metering;
export const bestUse = (t: SeedDrillType) => get(t).bestUse;
export const seedDrillTypes = (): SeedDrillType[] =>
  Object.keys(DATA) as SeedDrillType[];
