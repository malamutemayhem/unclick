export type RopeJackType =
  | "wooden_frame_standard"
  | "iron_frame_heavy"
  | "portable_field_light"
  | "geared_crank_speed"
  | "electric_drive_power";

const specs: Record<RopeJackType, {
  tensionControl: number; twistConsist: number; speedLay: number;
  ropeRange: number; cost: number; powered: boolean; portable: boolean;
  frameType: string; use: string;
}> = {
  wooden_frame_standard: {
    tensionControl: 78, twistConsist: 80, speedLay: 65,
    ropeRange: 72, cost: 80, powered: false, portable: false,
    frameType: "hardwood_post_frame", use: "general_rope_lay",
  },
  iron_frame_heavy: {
    tensionControl: 88, twistConsist: 85, speedLay: 70,
    ropeRange: 90, cost: 200, powered: false, portable: false,
    frameType: "cast_iron_base", use: "heavy_hawser_lay",
  },
  portable_field_light: {
    tensionControl: 68, twistConsist: 72, speedLay: 75,
    ropeRange: 55, cost: 50, powered: false, portable: true,
    frameType: "folding_wood_tripod", use: "field_repair_rope",
  },
  geared_crank_speed: {
    tensionControl: 82, twistConsist: 88, speedLay: 90,
    ropeRange: 78, cost: 150, powered: false, portable: false,
    frameType: "geared_crank_frame", use: "fast_cordage_lay",
  },
  electric_drive_power: {
    tensionControl: 85, twistConsist: 92, speedLay: 95,
    ropeRange: 85, cost: 500, powered: true, portable: false,
    frameType: "motor_drive_frame", use: "production_rope_lay",
  },
};

export function tensionControl(t: RopeJackType): number { return specs[t].tensionControl; }
export function twistConsist(t: RopeJackType): number { return specs[t].twistConsist; }
export function speedLay(t: RopeJackType): number { return specs[t].speedLay; }
export function ropeRange(t: RopeJackType): number { return specs[t].ropeRange; }
export function jackCost(t: RopeJackType): number { return specs[t].cost; }
export function powered(t: RopeJackType): boolean { return specs[t].powered; }
export function portable(t: RopeJackType): boolean { return specs[t].portable; }
export function frameType(t: RopeJackType): string { return specs[t].frameType; }
export function bestUse(t: RopeJackType): string { return specs[t].use; }
export function ropeJacks(): RopeJackType[] { return Object.keys(specs) as RopeJackType[]; }
