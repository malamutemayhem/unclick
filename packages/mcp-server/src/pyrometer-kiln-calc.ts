export type PyrometerKilnType =
  | "thermocouple_k_standard"
  | "thermocouple_s_high"
  | "infrared_spot_quick"
  | "digital_controller_auto"
  | "optical_pyrometer_visual";

const specs: Record<PyrometerKilnType, {
  accuracy: number; tempRange: number; responseSpeed: number;
  durability: number; cost: number; digital: boolean; contactFree: boolean;
  sensorType: string; use: string;
}> = {
  thermocouple_k_standard: {
    accuracy: 85, tempRange: 82, responseSpeed: 80,
    durability: 85, cost: 30, digital: true, contactFree: false,
    sensorType: "chromel_alumel_wire", use: "general_kiln_monitor",
  },
  thermocouple_s_high: {
    accuracy: 92, tempRange: 95, responseSpeed: 82,
    durability: 78, cost: 120, digital: true, contactFree: false,
    sensorType: "platinum_rhodium_wire", use: "high_fire_precise",
  },
  infrared_spot_quick: {
    accuracy: 80, tempRange: 78, responseSpeed: 95,
    durability: 88, cost: 60, digital: true, contactFree: true,
    sensorType: "infrared_sensor_lens", use: "quick_spot_check",
  },
  digital_controller_auto: {
    accuracy: 90, tempRange: 88, responseSpeed: 85,
    durability: 82, cost: 200, digital: true, contactFree: false,
    sensorType: "integrated_controller", use: "automated_fire_program",
  },
  optical_pyrometer_visual: {
    accuracy: 78, tempRange: 85, responseSpeed: 88,
    durability: 90, cost: 80, digital: false, contactFree: true,
    sensorType: "visual_color_match", use: "traditional_color_read",
  },
};

export function accuracy(t: PyrometerKilnType): number { return specs[t].accuracy; }
export function tempRange(t: PyrometerKilnType): number { return specs[t].tempRange; }
export function responseSpeed(t: PyrometerKilnType): number { return specs[t].responseSpeed; }
export function durability(t: PyrometerKilnType): number { return specs[t].durability; }
export function pyroCost(t: PyrometerKilnType): number { return specs[t].cost; }
export function digital(t: PyrometerKilnType): boolean { return specs[t].digital; }
export function contactFree(t: PyrometerKilnType): boolean { return specs[t].contactFree; }
export function sensorType(t: PyrometerKilnType): string { return specs[t].sensorType; }
export function bestUse(t: PyrometerKilnType): string { return specs[t].use; }
export function pyrometerKilns(): PyrometerKilnType[] { return Object.keys(specs) as PyrometerKilnType[]; }
