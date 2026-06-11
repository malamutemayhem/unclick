export type JournalBearingType =
  | "plain_sleeve_bushing"
  | "tilting_pad_radial"
  | "lemon_bore_elliptical"
  | "pressure_dam_groove"
  | "foil_air_bearing";

interface JournalBearingData {
  loadCapacity: number;
  stability: number;
  damping: number;
  friction: number;
  jbCost: number;
  oilFree: boolean;
  forHighSpeed: boolean;
  film: string;
  bestUse: string;
}

const DATA: Record<JournalBearingType, JournalBearingData> = {
  plain_sleeve_bushing: {
    loadCapacity: 8, stability: 5, damping: 7, friction: 6, jbCost: 3,
    oilFree: false, forHighSpeed: false,
    film: "full_film_hydrodynamic_cylindrical_bore",
    bestUse: "slow_speed_heavy_load_marine_diesel_shaft",
  },
  tilting_pad_radial: {
    loadCapacity: 9, stability: 10, damping: 9, friction: 5, jbCost: 9,
    oilFree: false, forHighSpeed: true,
    film: "tilting_pad_multi_shoe_inherently_stable",
    bestUse: "high_speed_turbine_compressor_critical_rotor",
  },
  lemon_bore_elliptical: {
    loadCapacity: 8, stability: 8, damping: 8, friction: 6, jbCost: 5,
    oilFree: false, forHighSpeed: true,
    film: "elliptical_bore_two_lobe_preload_stabilize",
    bestUse: "steam_turbine_generator_moderate_speed_stable",
  },
  pressure_dam_groove: {
    loadCapacity: 8, stability: 9, damping: 8, friction: 6, jbCost: 6,
    oilFree: false, forHighSpeed: true,
    film: "circumferential_groove_dam_step_anti_whirl",
    bestUse: "centrifugal_compressor_light_load_anti_whirl",
  },
  foil_air_bearing: {
    loadCapacity: 4, stability: 7, damping: 6, friction: 10, jbCost: 8,
    oilFree: true, forHighSpeed: true,
    film: "compliant_foil_air_film_no_oil_high_speed",
    bestUse: "micro_turbine_turbocharger_oil_free_high_rpm",
  },
};

function get(t: JournalBearingType): JournalBearingData {
  return DATA[t];
}

export const loadCapacity = (t: JournalBearingType) => get(t).loadCapacity;
export const stability = (t: JournalBearingType) => get(t).stability;
export const damping = (t: JournalBearingType) => get(t).damping;
export const friction = (t: JournalBearingType) => get(t).friction;
export const jbCost = (t: JournalBearingType) => get(t).jbCost;
export const oilFree = (t: JournalBearingType) => get(t).oilFree;
export const forHighSpeed = (t: JournalBearingType) => get(t).forHighSpeed;
export const film = (t: JournalBearingType) => get(t).film;
export const bestUse = (t: JournalBearingType) => get(t).bestUse;
export const journalBearingTypes = (): JournalBearingType[] =>
  Object.keys(DATA) as JournalBearingType[];
