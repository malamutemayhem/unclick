export type MacrameRingType = "wood_ring_natural" | "metal_ring_weld" | "brass_ring_solid" | "acrylic_ring_color" | "rattan_hoop_woven";

export function knotGrip(t: MacrameRingType): number {
  const m: Record<MacrameRingType, number> = {
    wood_ring_natural: 9, metal_ring_weld: 7, brass_ring_solid: 6, acrylic_ring_color: 5, rattan_hoop_woven: 10,
  };
  return m[t];
}

export function strength(t: MacrameRingType): number {
  const m: Record<MacrameRingType, number> = {
    wood_ring_natural: 6, metal_ring_weld: 10, brass_ring_solid: 9, acrylic_ring_color: 4, rattan_hoop_woven: 5,
  };
  return m[t];
}

export function sizeRange(t: MacrameRingType): number {
  const m: Record<MacrameRingType, number> = {
    wood_ring_natural: 8, metal_ring_weld: 10, brass_ring_solid: 6, acrylic_ring_color: 7, rattan_hoop_woven: 9,
  };
  return m[t];
}

export function visualAppeal(t: MacrameRingType): number {
  const m: Record<MacrameRingType, number> = {
    wood_ring_natural: 8, metal_ring_weld: 5, brass_ring_solid: 9, acrylic_ring_color: 7, rattan_hoop_woven: 10,
  };
  return m[t];
}

export function ringCost(t: MacrameRingType): number {
  const m: Record<MacrameRingType, number> = {
    wood_ring_natural: 2, metal_ring_weld: 1, brass_ring_solid: 3, acrylic_ring_color: 1, rattan_hoop_woven: 2,
  };
  return m[t];
}

export function paintable(t: MacrameRingType): boolean {
  const m: Record<MacrameRingType, boolean> = {
    wood_ring_natural: true, metal_ring_weld: true, brass_ring_solid: false, acrylic_ring_color: false, rattan_hoop_woven: true,
  };
  return m[t];
}

export function showsThrough(t: MacrameRingType): boolean {
  const m: Record<MacrameRingType, boolean> = {
    wood_ring_natural: false, metal_ring_weld: false, brass_ring_solid: true, acrylic_ring_color: true, rattan_hoop_woven: false,
  };
  return m[t];
}

export function ringFinish(t: MacrameRingType): string {
  const m: Record<MacrameRingType, string> = {
    wood_ring_natural: "sanded_raw_wood",
    metal_ring_weld: "welded_steel_zinc",
    brass_ring_solid: "polished_brass_shine",
    acrylic_ring_color: "molded_smooth_plastic",
    rattan_hoop_woven: "woven_natural_vine",
  };
  return m[t];
}

export function bestProject(t: MacrameRingType): string {
  const m: Record<MacrameRingType, string> = {
    wood_ring_natural: "dreamcatcher_center",
    metal_ring_weld: "plant_hanger_ring",
    brass_ring_solid: "pendant_light_frame",
    acrylic_ring_color: "baby_mobile_ring",
    rattan_hoop_woven: "wreath_base_frame",
  };
  return m[t];
}

export function macrameRings(): MacrameRingType[] {
  return ["wood_ring_natural", "metal_ring_weld", "brass_ring_solid", "acrylic_ring_color", "rattan_hoop_woven"];
}
