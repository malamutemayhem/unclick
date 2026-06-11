export type FilterPressType =
  | "recessed_plate_standard"
  | "membrane_squeeze_high"
  | "plate_frame_polypropylene"
  | "belt_filter_continuous"
  | "tower_press_automatic";

interface FilterPressData {
  dryness: number;
  throughput: number;
  automation: number;
  washability: number;
  fpCost: number;
  continuous: boolean;
  forMining: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<FilterPressType, FilterPressData> = {
  recessed_plate_standard: {
    dryness: 7, throughput: 7, automation: 6, washability: 7, fpCost: 5,
    continuous: false, forMining: true,
    mechanism: "recessed_chamber_hydraulic_close",
    bestUse: "mine_tailings_municipal_sludge",
  },
  membrane_squeeze_high: {
    dryness: 10, throughput: 8, automation: 8, washability: 8, fpCost: 8,
    continuous: false, forMining: true,
    mechanism: "membrane_diaphragm_air_squeeze",
    bestUse: "chemical_slurry_high_dry_cake",
  },
  plate_frame_polypropylene: {
    dryness: 7, throughput: 6, automation: 5, washability: 9, fpCost: 4,
    continuous: false, forMining: false,
    mechanism: "plate_frame_cloth_filter_media",
    bestUse: "food_beverage_pharma_filtration",
  },
  belt_filter_continuous: {
    dryness: 5, throughput: 10, automation: 9, washability: 6, fpCost: 6,
    continuous: true, forMining: false,
    mechanism: "gravity_pressure_belt_dewater",
    bestUse: "wastewater_sludge_continuous_flow",
  },
  tower_press_automatic: {
    dryness: 9, throughput: 9, automation: 10, washability: 7, fpCost: 10,
    continuous: false, forMining: true,
    mechanism: "vertical_tower_automated_cycle",
    bestUse: "large_volume_coal_mineral_process",
  },
};

function get(t: FilterPressType): FilterPressData {
  return DATA[t];
}

export const dryness = (t: FilterPressType) => get(t).dryness;
export const throughput = (t: FilterPressType) => get(t).throughput;
export const automation = (t: FilterPressType) => get(t).automation;
export const washability = (t: FilterPressType) => get(t).washability;
export const fpCost = (t: FilterPressType) => get(t).fpCost;
export const continuous = (t: FilterPressType) => get(t).continuous;
export const forMining = (t: FilterPressType) => get(t).forMining;
export const mechanism = (t: FilterPressType) => get(t).mechanism;
export const bestUse = (t: FilterPressType) => get(t).bestUse;
export const filterPressTypes = (): FilterPressType[] =>
  Object.keys(DATA) as FilterPressType[];
