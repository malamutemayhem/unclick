export type PilotLightType =
  | "led_panel_mount"
  | "neon_indicator_120v"
  | "incandescent_bayonet"
  | "fiber_optic_remote"
  | "flush_mount_sealed";

const DATA: Record<PilotLightType, {
  brightness: number; lifeSpan: number; powerDraw: number;
  visibility: number; lightCost: number; lowVoltage: boolean;
  sealed: boolean; lampType: string; bestUse: string;
}> = {
  led_panel_mount: { brightness: 8, lifeSpan: 10, powerDraw: 9, visibility: 8, lightCost: 3, lowVoltage: true, sealed: false, lampType: "led_chip_diffused", bestUse: "status_panel_indicator" },
  neon_indicator_120v: { brightness: 5, lifeSpan: 7, powerDraw: 7, visibility: 6, lightCost: 2, lowVoltage: false, sealed: false, lampType: "neon_glow_gas_tube", bestUse: "mains_power_present" },
  incandescent_bayonet: { brightness: 7, lifeSpan: 3, powerDraw: 3, visibility: 7, lightCost: 1, lowVoltage: true, sealed: false, lampType: "filament_miniature_bulb", bestUse: "vintage_equipment_light" },
  fiber_optic_remote: { brightness: 6, lifeSpan: 9, powerDraw: 8, visibility: 5, lightCost: 7, lowVoltage: true, sealed: true, lampType: "fiber_bundle_transmit", bestUse: "hazard_zone_remote_ind" },
  flush_mount_sealed: { brightness: 7, lifeSpan: 9, powerDraw: 8, visibility: 9, lightCost: 5, lowVoltage: true, sealed: true, lampType: "led_epoxy_sealed", bestUse: "outdoor_machine_status" },
};

const get = (t: PilotLightType) => DATA[t];

export const brightness = (t: PilotLightType) => get(t).brightness;
export const lifeSpan = (t: PilotLightType) => get(t).lifeSpan;
export const powerDraw = (t: PilotLightType) => get(t).powerDraw;
export const visibility = (t: PilotLightType) => get(t).visibility;
export const lightCost = (t: PilotLightType) => get(t).lightCost;
export const lowVoltage = (t: PilotLightType) => get(t).lowVoltage;
export const sealed = (t: PilotLightType) => get(t).sealed;
export const lampType = (t: PilotLightType) => get(t).lampType;
export const bestUse = (t: PilotLightType) => get(t).bestUse;
export const pilotLights = (): PilotLightType[] => Object.keys(DATA) as PilotLightType[];
