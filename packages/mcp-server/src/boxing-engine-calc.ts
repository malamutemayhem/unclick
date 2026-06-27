export type BoxingEngineType =
  | "hand_crank_standard"
  | "foot_treadle_pedal"
  | "electric_motor_power"
  | "weight_drop_gravity"
  | "hydraulic_ram_press";

const specs: Record<BoxingEngineType, {
  pressForce: number; controlFine: number; speedCycle: number;
  sizeRange: number; cost: number; powered: boolean; portable: boolean;
  driveMethod: string; use: string;
}> = {
  hand_crank_standard: {
    pressForce: 70, controlFine: 88, speedCycle: 55,
    sizeRange: 72, cost: 200, powered: false, portable: true,
    driveMethod: "manual_crank_gear", use: "general_hub_box",
  },
  foot_treadle_pedal: {
    pressForce: 75, controlFine: 82, speedCycle: 68,
    sizeRange: 70, cost: 250, powered: false, portable: false,
    driveMethod: "foot_pedal_lever", use: "hands_free_box",
  },
  electric_motor_power: {
    pressForce: 88, controlFine: 72, speedCycle: 92,
    sizeRange: 85, cost: 600, powered: true, portable: false,
    driveMethod: "electric_gear_drive", use: "production_hub_box",
  },
  weight_drop_gravity: {
    pressForce: 85, controlFine: 65, speedCycle: 60,
    sizeRange: 78, cost: 300, powered: false, portable: false,
    driveMethod: "gravity_drop_weight", use: "heavy_hub_press",
  },
  hydraulic_ram_press: {
    pressForce: 95, controlFine: 78, speedCycle: 75,
    sizeRange: 90, cost: 800, powered: true, portable: false,
    driveMethod: "hydraulic_piston_ram", use: "precision_hub_press",
  },
};

export function pressForce(t: BoxingEngineType): number { return specs[t].pressForce; }
export function controlFine(t: BoxingEngineType): number { return specs[t].controlFine; }
export function speedCycle(t: BoxingEngineType): number { return specs[t].speedCycle; }
export function sizeRange(t: BoxingEngineType): number { return specs[t].sizeRange; }
export function engineCost(t: BoxingEngineType): number { return specs[t].cost; }
export function powered(t: BoxingEngineType): boolean { return specs[t].powered; }
export function portable(t: BoxingEngineType): boolean { return specs[t].portable; }
export function driveMethod(t: BoxingEngineType): string { return specs[t].driveMethod; }
export function bestUse(t: BoxingEngineType): string { return specs[t].use; }
export function boxingEngines(): BoxingEngineType[] { return Object.keys(specs) as BoxingEngineType[]; }
