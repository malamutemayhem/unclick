export type TurnstileType =
  | "tripod_waist_high"
  | "full_height_rotor"
  | "optical_speed_gate"
  | "swing_barrier_glass"
  | "drop_arm_barrier";

interface TurnstileData {
  throughput: number;
  security: number;
  aesthetic: number;
  accessibility: number;
  ttCost: number;
  bidirectional: boolean;
  forHighSecurity: boolean;
  barrier: string;
  bestUse: string;
}

const DATA: Record<TurnstileType, TurnstileData> = {
  tripod_waist_high: {
    throughput: 7, security: 5, aesthetic: 4, accessibility: 5, ttCost: 3,
    bidirectional: true, forHighSecurity: false,
    barrier: "rotating_tripod_arm_waist",
    bestUse: "stadium_transit_basic_entry",
  },
  full_height_rotor: {
    throughput: 5, security: 10, aesthetic: 3, accessibility: 3, ttCost: 7,
    bidirectional: true, forHighSecurity: true,
    barrier: "full_height_rotating_cage",
    bestUse: "prison_perimeter_unmanned_gate",
  },
  optical_speed_gate: {
    throughput: 10, security: 6, aesthetic: 10, accessibility: 9, ttCost: 9,
    bidirectional: true, forHighSecurity: false,
    barrier: "infrared_beam_retract_paddle",
    bestUse: "corporate_lobby_high_volume",
  },
  swing_barrier_glass: {
    throughput: 8, security: 6, aesthetic: 9, accessibility: 8, ttCost: 7,
    bidirectional: true, forHighSecurity: false,
    barrier: "tempered_glass_swing_panel",
    bestUse: "office_lobby_ada_accessible",
  },
  drop_arm_barrier: {
    throughput: 8, security: 5, aesthetic: 6, accessibility: 7, ttCost: 4,
    bidirectional: true, forHighSecurity: false,
    barrier: "motorized_drop_arm_horizontal",
    bestUse: "gym_pool_membership_entry",
  },
};

function get(t: TurnstileType): TurnstileData {
  return DATA[t];
}

export const throughput = (t: TurnstileType) => get(t).throughput;
export const security = (t: TurnstileType) => get(t).security;
export const aesthetic = (t: TurnstileType) => get(t).aesthetic;
export const accessibility = (t: TurnstileType) => get(t).accessibility;
export const ttCost = (t: TurnstileType) => get(t).ttCost;
export const bidirectional = (t: TurnstileType) => get(t).bidirectional;
export const forHighSecurity = (t: TurnstileType) => get(t).forHighSecurity;
export const barrier = (t: TurnstileType) => get(t).barrier;
export const bestUse = (t: TurnstileType) => get(t).bestUse;
export const turnstileTypes = (): TurnstileType[] =>
  Object.keys(DATA) as TurnstileType[];
