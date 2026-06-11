export type EmergencyLightType =
  | "combo_exit_emergency"
  | "twin_head_battery"
  | "recessed_architectural"
  | "industrial_hazardous"
  | "remote_head_central";

interface EmergencyLightData {
  brightness: number;
  duration: number;
  aesthetic: number;
  reliability: number;
  elCost: number;
  selfTest: boolean;
  forHazardous: boolean;
  battery: string;
  bestUse: string;
}

const DATA: Record<EmergencyLightType, EmergencyLightData> = {
  combo_exit_emergency: {
    brightness: 6, duration: 7, aesthetic: 7, reliability: 7, elCost: 4,
    selfTest: true, forHazardous: false,
    battery: "nicad_sealed_rechargeable",
    bestUse: "standard_exit_door_dual_purpose",
  },
  twin_head_battery: {
    brightness: 8, duration: 7, aesthetic: 4, reliability: 8, elCost: 3,
    selfTest: true, forHazardous: false,
    battery: "sealed_lead_acid_6v_battery",
    bestUse: "corridor_stairwell_basic",
  },
  recessed_architectural: {
    brightness: 6, duration: 7, aesthetic: 10, reliability: 7, elCost: 7,
    selfTest: true, forHazardous: false,
    battery: "lithium_ion_slim_recessed",
    bestUse: "hotel_lobby_upscale_office",
  },
  industrial_hazardous: {
    brightness: 10, duration: 9, aesthetic: 2, reliability: 10, elCost: 9,
    selfTest: true, forHazardous: true,
    battery: "sealed_nicad_explosion_proof",
    bestUse: "refinery_chemical_plant_class1",
  },
  remote_head_central: {
    brightness: 7, duration: 10, aesthetic: 8, reliability: 9, elCost: 8,
    selfTest: false, forHazardous: false,
    battery: "central_inverter_battery_bank",
    bestUse: "large_facility_central_system",
  },
};

function get(t: EmergencyLightType): EmergencyLightData {
  return DATA[t];
}

export const brightness = (t: EmergencyLightType) => get(t).brightness;
export const duration = (t: EmergencyLightType) => get(t).duration;
export const aesthetic = (t: EmergencyLightType) => get(t).aesthetic;
export const reliability = (t: EmergencyLightType) => get(t).reliability;
export const elCost = (t: EmergencyLightType) => get(t).elCost;
export const selfTest = (t: EmergencyLightType) => get(t).selfTest;
export const forHazardous = (t: EmergencyLightType) => get(t).forHazardous;
export const battery = (t: EmergencyLightType) => get(t).battery;
export const bestUse = (t: EmergencyLightType) => get(t).bestUse;
export const emergencyLightTypes = (): EmergencyLightType[] =>
  Object.keys(DATA) as EmergencyLightType[];
