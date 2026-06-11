export type FanCoilType =
  | "two_pipe_heat_cool"
  | "four_pipe_simultaneous"
  | "ceiling_concealed_duct"
  | "vertical_stack_unit"
  | "cassette_ceiling_mount";

interface FanCoilData {
  capacity: number;
  efficiency: number;
  noise: number;
  aesthetic: number;
  fcCost: number;
  independent: boolean;
  forHotel: boolean;
  coil: string;
  bestUse: string;
}

const DATA: Record<FanCoilType, FanCoilData> = {
  two_pipe_heat_cool: {
    capacity: 6, efficiency: 6, noise: 7, aesthetic: 6, fcCost: 3,
    independent: false, forHotel: false,
    coil: "single_coil_changeover_valve",
    bestUse: "apartment_condo_basic_system",
  },
  four_pipe_simultaneous: {
    capacity: 8, efficiency: 8, noise: 7, aesthetic: 6, fcCost: 6,
    independent: true, forHotel: true,
    coil: "dual_coil_hot_cold_separate",
    bestUse: "hotel_guestroom_office_zone",
  },
  ceiling_concealed_duct: {
    capacity: 7, efficiency: 7, noise: 8, aesthetic: 10, fcCost: 5,
    independent: false, forHotel: true,
    coil: "horizontal_coil_ducted_supply",
    bestUse: "hotel_lobby_upscale_office",
  },
  vertical_stack_unit: {
    capacity: 7, efficiency: 6, noise: 6, aesthetic: 5, fcCost: 4,
    independent: false, forHotel: false,
    coil: "vertical_coil_floor_stack",
    bestUse: "high_rise_residential_stack",
  },
  cassette_ceiling_mount: {
    capacity: 8, efficiency: 7, noise: 7, aesthetic: 8, fcCost: 5,
    independent: true, forHotel: false,
    coil: "four_way_blow_ceiling_cassette",
    bestUse: "open_office_retail_even_dist",
  },
};

function get(t: FanCoilType): FanCoilData {
  return DATA[t];
}

export const capacity = (t: FanCoilType) => get(t).capacity;
export const efficiency = (t: FanCoilType) => get(t).efficiency;
export const noise = (t: FanCoilType) => get(t).noise;
export const aesthetic = (t: FanCoilType) => get(t).aesthetic;
export const fcCost = (t: FanCoilType) => get(t).fcCost;
export const independent = (t: FanCoilType) => get(t).independent;
export const forHotel = (t: FanCoilType) => get(t).forHotel;
export const coil = (t: FanCoilType) => get(t).coil;
export const bestUse = (t: FanCoilType) => get(t).bestUse;
export const fanCoilTypes = (): FanCoilType[] =>
  Object.keys(DATA) as FanCoilType[];
