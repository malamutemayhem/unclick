// Webbing stretcher calculator - upholstery webbing tensioning tools

export type WebbingStretchType =
  | "gooseneck_lever_pull"
  | "rubber_jaw_grip"
  | "spike_tooth_grab"
  | "slot_loop_wrap"
  | "ratchet_strap_mech";

const STRETCH_DATA: Record<
  WebbingStretchType,
  {
    tensionForce: number;
    gripSecure: number;
    speedWork: number;
    fabricSafe: number;
    cost: number;
    leverAction: boolean;
    forJute: boolean;
    jawType: string;
    bestUse: string;
  }
> = {
  gooseneck_lever_pull: {
    tensionForce: 9,
    gripSecure: 8,
    speedWork: 8,
    fabricSafe: 7,
    cost: 5,
    leverAction: true,
    forJute: true,
    jawType: "metal_spike_plate",
    bestUse: "jute_web_tension",
  },
  rubber_jaw_grip: {
    tensionForce: 6,
    gripSecure: 7,
    speedWork: 7,
    fabricSafe: 9,
    cost: 3,
    leverAction: false,
    forJute: false,
    jawType: "rubber_lined_clamp",
    bestUse: "elastic_web_pull",
  },
  spike_tooth_grab: {
    tensionForce: 8,
    gripSecure: 9,
    speedWork: 6,
    fabricSafe: 5,
    cost: 4,
    leverAction: false,
    forJute: true,
    jawType: "steel_spike_teeth",
    bestUse: "heavy_jute_grab",
  },
  slot_loop_wrap: {
    tensionForce: 5,
    gripSecure: 6,
    speedWork: 9,
    fabricSafe: 8,
    cost: 2,
    leverAction: false,
    forJute: false,
    jawType: "slotted_bar_wrap",
    bestUse: "light_band_loop",
  },
  ratchet_strap_mech: {
    tensionForce: 10,
    gripSecure: 9,
    speedWork: 5,
    fabricSafe: 6,
    cost: 7,
    leverAction: true,
    forJute: true,
    jawType: "ratchet_lock_strap",
    bestUse: "max_tension_hold",
  },
};

export function tensionForce(type: WebbingStretchType): number {
  return STRETCH_DATA[type].tensionForce;
}
export function gripSecure(type: WebbingStretchType): number {
  return STRETCH_DATA[type].gripSecure;
}
export function speedWork(type: WebbingStretchType): number {
  return STRETCH_DATA[type].speedWork;
}
export function fabricSafe(type: WebbingStretchType): number {
  return STRETCH_DATA[type].fabricSafe;
}
export function stretchCost(type: WebbingStretchType): number {
  return STRETCH_DATA[type].cost;
}
export function leverAction(type: WebbingStretchType): boolean {
  return STRETCH_DATA[type].leverAction;
}
export function forJute(type: WebbingStretchType): boolean {
  return STRETCH_DATA[type].forJute;
}
export function jawType(type: WebbingStretchType): string {
  return STRETCH_DATA[type].jawType;
}
export function bestUse(type: WebbingStretchType): string {
  return STRETCH_DATA[type].bestUse;
}
export function webbingStretchers(): WebbingStretchType[] {
  return Object.keys(STRETCH_DATA) as WebbingStretchType[];
}
