// pir-sensor-calc - PIR motion sensor types

export type PirSensor =
  | "hcsr501_standard"
  | "am312_mini_compact"
  | "hcsr505_auto_repeat"
  | "dual_element_wide"
  | "fresnel_lens_narrow";

const DATA: Record<PirSensor, {
  detectionRange: number; sensitivity: number; responseSpeed: number; sizeCompact: number;
  cost: number; adjustable: boolean; autoRepeat: boolean; lensType: string; bestUse: string;
}> = {
  hcsr501_standard:     { detectionRange: 7, sensitivity: 7, responseSpeed: 6, sizeCompact: 5, cost: 2, adjustable: true, autoRepeat: false, lensType: "dome_fresnel_wide", bestUse: "general_motion_detect" },
  am312_mini_compact:   { detectionRange: 5, sensitivity: 6, responseSpeed: 8, sizeCompact: 10, cost: 2, adjustable: false, autoRepeat: true, lensType: "flat_lens_compact", bestUse: "small_space_trigger" },
  hcsr505_auto_repeat:  { detectionRange: 6, sensitivity: 7, responseSpeed: 7, sizeCompact: 7, cost: 3, adjustable: false, autoRepeat: true, lensType: "mini_dome_fresnel", bestUse: "auto_light_switch" },
  dual_element_wide:    { detectionRange: 10, sensitivity: 10, responseSpeed: 5, sizeCompact: 3, cost: 6, adjustable: true, autoRepeat: false, lensType: "multi_zone_fresnel", bestUse: "security_wide_area" },
  fresnel_lens_narrow:  { detectionRange: 8, sensitivity: 9, responseSpeed: 7, sizeCompact: 5, cost: 4, adjustable: true, autoRepeat: false, lensType: "narrow_beam_fresnel", bestUse: "corridor_beam_detect" },
};

const get = (p: PirSensor) => DATA[p];
export const detectionRange = (p: PirSensor) => get(p).detectionRange;
export const sensitivity = (p: PirSensor) => get(p).sensitivity;
export const responseSpeed = (p: PirSensor) => get(p).responseSpeed;
export const sizeCompact = (p: PirSensor) => get(p).sizeCompact;
export const sensorCost = (p: PirSensor) => get(p).cost;
export const adjustable = (p: PirSensor) => get(p).adjustable;
export const autoRepeat = (p: PirSensor) => get(p).autoRepeat;
export const lensType = (p: PirSensor) => get(p).lensType;
export const bestUse = (p: PirSensor) => get(p).bestUse;
export const pirSensors = (): PirSensor[] => Object.keys(DATA) as PirSensor[];
