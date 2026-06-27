export type ChainConveyorType =
  | "drag_flight_en_masse"
  | "scraper_chain_bottom"
  | "tubular_drag_enclosed"
  | "overhead_trolley_chain"
  | "apron_pan_heavy_duty";

interface ChainConveyorData {
  loadCapacity: number;
  abrasionResist: number;
  inclination: number;
  maintenance: number;
  ccCost: number;
  enclosed: boolean;
  forHotMaterial: boolean;
  chain: string;
  bestUse: string;
}

const DATA: Record<ChainConveyorType, ChainConveyorData> = {
  drag_flight_en_masse: {
    loadCapacity: 8, abrasionResist: 7, inclination: 7, maintenance: 7, ccCost: 5,
    enclosed: true, forHotMaterial: false,
    chain: "single_or_double_strand_flight_bar_trough",
    bestUse: "grain_cement_powder_en_masse_horizontal_convey",
  },
  scraper_chain_bottom: {
    loadCapacity: 9, abrasionResist: 8, inclination: 6, maintenance: 6, ccCost: 4,
    enclosed: false, forHotMaterial: true,
    chain: "heavy_scraper_flight_open_trough_bottom_drag",
    bestUse: "ash_clinker_hot_material_bottom_discharge",
  },
  tubular_drag_enclosed: {
    loadCapacity: 6, abrasionResist: 9, inclination: 9, maintenance: 9, ccCost: 7,
    enclosed: true, forHotMaterial: false,
    chain: "disc_puck_chain_inside_sealed_tube_gentle",
    bestUse: "food_pharma_chemical_dust_free_multi_direction",
  },
  overhead_trolley_chain: {
    loadCapacity: 7, abrasionResist: 5, inclination: 8, maintenance: 7, ccCost: 6,
    enclosed: false, forHotMaterial: false,
    chain: "overhead_i_beam_track_trolley_pendant_carrier",
    bestUse: "automotive_paint_line_garment_poultry_overhead",
  },
  apron_pan_heavy_duty: {
    loadCapacity: 10, abrasionResist: 10, inclination: 8, maintenance: 5, ccCost: 8,
    enclosed: false, forHotMaterial: true,
    chain: "heavy_steel_pan_overlapping_plate_high_temp",
    bestUse: "mining_ore_hot_clinker_heavy_lump_inclined",
  },
};

function get(t: ChainConveyorType): ChainConveyorData {
  return DATA[t];
}

export const loadCapacity = (t: ChainConveyorType) => get(t).loadCapacity;
export const abrasionResist = (t: ChainConveyorType) => get(t).abrasionResist;
export const inclination = (t: ChainConveyorType) => get(t).inclination;
export const maintenance = (t: ChainConveyorType) => get(t).maintenance;
export const ccCost = (t: ChainConveyorType) => get(t).ccCost;
export const enclosed = (t: ChainConveyorType) => get(t).enclosed;
export const forHotMaterial = (t: ChainConveyorType) => get(t).forHotMaterial;
export const chain = (t: ChainConveyorType) => get(t).chain;
export const bestUse = (t: ChainConveyorType) => get(t).bestUse;
export const chainConveyorTypes = (): ChainConveyorType[] =>
  Object.keys(DATA) as ChainConveyorType[];
