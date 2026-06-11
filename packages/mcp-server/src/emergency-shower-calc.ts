export type EmergencyShowerType =
  | "combination_drench"
  | "eyewash_pedestal"
  | "drench_hose"
  | "recirculating_eyewash"
  | "freeze_protected_heated";

interface EmergencyShowerData {
  flowRate: number;
  activationSpeed: number;
  coverageArea: number;
  waterTemperature: number;
  esCost: number;
  plumbed: boolean;
  forAcidSplash: boolean;
  delivery: string;
  bestUse: string;
}

const DATA: Record<EmergencyShowerType, EmergencyShowerData> = {
  combination_drench: {
    flowRate: 10, activationSpeed: 9, coverageArea: 10, waterTemperature: 7, esCost: 6,
    plumbed: true, forAcidSplash: true,
    delivery: "overhead_deluge_head_plus_eyewash_bowl_single_pull_activate",
    bestUse: "chemical_lab_plant_full_body_drench_eye_face_wash_ansi_z358",
  },
  eyewash_pedestal: {
    flowRate: 6, activationSpeed: 10, coverageArea: 4, waterTemperature: 7, esCost: 4,
    plumbed: true, forAcidSplash: true,
    delivery: "dual_nozzle_aerated_flow_push_plate_hands_free_15_min_flush",
    bestUse: "laboratory_battery_room_eye_face_only_chemical_splash_first",
  },
  drench_hose: {
    flowRate: 5, activationSpeed: 7, coverageArea: 6, waterTemperature: 7, esCost: 3,
    plumbed: true, forAcidSplash: true,
    delivery: "flexible_hose_squeeze_valve_directed_stream_spot_flush_body",
    bestUse: "dental_lab_workshop_bench_mount_spot_wash_small_splash_area",
  },
  recirculating_eyewash: {
    flowRate: 6, activationSpeed: 8, coverageArea: 4, waterTemperature: 9, esCost: 5,
    plumbed: false, forAcidSplash: false,
    delivery: "sealed_tank_tempered_fluid_battery_powered_pump_portable",
    bestUse: "remote_site_construction_no_plumbing_portable_emergency_use",
  },
  freeze_protected_heated: {
    flowRate: 10, activationSpeed: 9, coverageArea: 10, waterTemperature: 10, esCost: 9,
    plumbed: true, forAcidSplash: true,
    delivery: "insulated_cabinet_heat_trace_pipe_tepid_water_16_to_38c",
    bestUse: "outdoor_plant_cold_climate_mining_refinery_freeze_protect",
  },
};

function get(t: EmergencyShowerType): EmergencyShowerData {
  return DATA[t];
}

export const flowRate = (t: EmergencyShowerType) => get(t).flowRate;
export const activationSpeed = (t: EmergencyShowerType) => get(t).activationSpeed;
export const coverageArea = (t: EmergencyShowerType) => get(t).coverageArea;
export const waterTemperature = (t: EmergencyShowerType) => get(t).waterTemperature;
export const esCost = (t: EmergencyShowerType) => get(t).esCost;
export const plumbed = (t: EmergencyShowerType) => get(t).plumbed;
export const forAcidSplash = (t: EmergencyShowerType) => get(t).forAcidSplash;
export const delivery = (t: EmergencyShowerType) => get(t).delivery;
export const bestUse = (t: EmergencyShowerType) => get(t).bestUse;
export const emergencyShowerTypes = (): EmergencyShowerType[] =>
  Object.keys(DATA) as EmergencyShowerType[];
