export type FireSuppress =
  | "wet_sprinkler_pipe"
  | "dry_sprinkler_preaction"
  | "clean_agent_fm200"
  | "co2_total_flood"
  | "water_mist_high_press";

const DATA: Record<FireSuppress, {
  effectiveness: number; speed: number; damage: number;
  coverage: number; fsCost: number; waterFree: boolean;
  forElectrical: boolean; agent: string; bestUse: string;
}> = {
  wet_sprinkler_pipe: {
    effectiveness: 8, speed: 10, damage: 4,
    coverage: 10, fsCost: 1, waterFree: false,
    forElectrical: false, agent: "water_pressurized_pipe",
    bestUse: "office_building_general_protect",
  },
  dry_sprinkler_preaction: {
    effectiveness: 7, speed: 7, damage: 5,
    coverage: 8, fsCost: 3, waterFree: false,
    forElectrical: false, agent: "water_air_pressurized_hold",
    bestUse: "cold_warehouse_freeze_protect",
  },
  clean_agent_fm200: {
    effectiveness: 9, speed: 9, damage: 10,
    coverage: 6, fsCost: 5, waterFree: true,
    forElectrical: true, agent: "hfc_227ea_gas_flood",
    bestUse: "server_room_data_center_protect",
  },
  co2_total_flood: {
    effectiveness: 10, speed: 8, damage: 9,
    coverage: 7, fsCost: 3, waterFree: true,
    forElectrical: true, agent: "carbon_dioxide_inert_gas",
    bestUse: "industrial_machinery_enclosure",
  },
  water_mist_high_press: {
    effectiveness: 8, speed: 8, damage: 7,
    coverage: 5, fsCost: 4, waterFree: false,
    forElectrical: true, agent: "atomized_water_droplet_mist",
    bestUse: "marine_engine_room_tunnel",
  },
};

const get = (t: FireSuppress) => DATA[t];

export const effectiveness = (t: FireSuppress) => get(t).effectiveness;
export const speed = (t: FireSuppress) => get(t).speed;
export const damage = (t: FireSuppress) => get(t).damage;
export const coverage = (t: FireSuppress) => get(t).coverage;
export const fsCost = (t: FireSuppress) => get(t).fsCost;
export const waterFree = (t: FireSuppress) => get(t).waterFree;
export const forElectrical = (t: FireSuppress) => get(t).forElectrical;
export const agent = (t: FireSuppress) => get(t).agent;
export const bestUse = (t: FireSuppress) => get(t).bestUse;
export const fireSuppresses = (): FireSuppress[] => Object.keys(DATA) as FireSuppress[];
