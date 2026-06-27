export type RollerKilnType =
  | "single_deck_tile"
  | "multi_deck_tableware"
  | "sanitaryware_high"
  | "fast_cycle_porcelain"
  | "decorating_low_temp";

interface RollerKilnData {
  firingSpeed: number;
  loadFlexibility: number;
  energyEfficiency: number;
  temperatureRange: number;
  rkCost: number;
  multiDeck: boolean;
  forTile: boolean;
  kilnConfig: string;
  bestUse: string;
}

const DATA: Record<RollerKilnType, RollerKilnData> = {
  single_deck_tile: {
    firingSpeed: 10, loadFlexibility: 5, energyEfficiency: 9, temperatureRange: 8, rkCost: 8,
    multiDeck: false, forTile: true,
    kilnConfig: "single_deck_roller_hearth_flat_tile_fast_fire_gas_burner_zone",
    bestUse: "ceramic_floor_wall_tile_single_deck_roller_fast_fire_high_vol",
  },
  multi_deck_tableware: {
    firingSpeed: 7, loadFlexibility: 8, energyEfficiency: 8, temperatureRange: 8, rkCost: 9,
    multiDeck: true, forTile: false,
    kilnConfig: "multi_deck_roller_tableware_cup_plate_stacked_setter_fire_zone",
    bestUse: "tableware_cup_plate_bowl_multi_deck_roller_kiln_batch_setting",
  },
  sanitaryware_high: {
    firingSpeed: 6, loadFlexibility: 7, energyEfficiency: 7, temperatureRange: 10, rkCost: 10,
    multiDeck: false, forTile: false,
    kilnConfig: "high_temp_roller_sanitaryware_toilet_basin_large_piece_fire",
    bestUse: "sanitaryware_toilet_basin_large_piece_high_temp_roller_fire",
  },
  fast_cycle_porcelain: {
    firingSpeed: 9, loadFlexibility: 6, energyEfficiency: 9, temperatureRange: 9, rkCost: 9,
    multiDeck: false, forTile: true,
    kilnConfig: "fast_cycle_porcelain_tile_roller_rapid_fire_cool_high_strength",
    bestUse: "porcelain_tile_slab_fast_cycle_roller_kiln_high_strength_fire",
  },
  decorating_low_temp: {
    firingSpeed: 8, loadFlexibility: 9, energyEfficiency: 10, temperatureRange: 4, rkCost: 5,
    multiDeck: true, forTile: true,
    kilnConfig: "low_temp_decorating_roller_kiln_decal_glaze_on_glaze_fix_fire",
    bestUse: "decorating_fire_decal_on_glaze_overglaze_low_temp_roller_kiln",
  },
};

function get(t: RollerKilnType): RollerKilnData {
  return DATA[t];
}

export const firingSpeed = (t: RollerKilnType) => get(t).firingSpeed;
export const loadFlexibility = (t: RollerKilnType) => get(t).loadFlexibility;
export const energyEfficiency = (t: RollerKilnType) => get(t).energyEfficiency;
export const temperatureRange = (t: RollerKilnType) => get(t).temperatureRange;
export const rkCost = (t: RollerKilnType) => get(t).rkCost;
export const multiDeck = (t: RollerKilnType) => get(t).multiDeck;
export const forTile = (t: RollerKilnType) => get(t).forTile;
export const kilnConfig = (t: RollerKilnType) => get(t).kilnConfig;
export const bestUse = (t: RollerKilnType) => get(t).bestUse;
export const rollerKilnTypes = (): RollerKilnType[] =>
  Object.keys(DATA) as RollerKilnType[];
