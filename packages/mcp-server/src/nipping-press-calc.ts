export type NippingPressType = "cast_iron_screw" | "brass_plate_small" | "steel_lever_quick" | "wood_veneer_press" | "aluminum_light_port";

export function pressForce(t: NippingPressType): number {
  const m: Record<NippingPressType, number> = {
    cast_iron_screw: 10, brass_plate_small: 7, steel_lever_quick: 9, wood_veneer_press: 6, aluminum_light_port: 5,
  };
  return m[t];
}

export function plateFlatness(t: NippingPressType): number {
  const m: Record<NippingPressType, number> = {
    cast_iron_screw: 10, brass_plate_small: 9, steel_lever_quick: 8, wood_veneer_press: 6, aluminum_light_port: 7,
  };
  return m[t];
}

export function portability(t: NippingPressType): number {
  const m: Record<NippingPressType, number> = {
    cast_iron_screw: 2, brass_plate_small: 7, steel_lever_quick: 4, wood_veneer_press: 5, aluminum_light_port: 10,
  };
  return m[t];
}

export function speedOfUse(t: NippingPressType): number {
  const m: Record<NippingPressType, number> = {
    cast_iron_screw: 6, brass_plate_small: 7, steel_lever_quick: 10, wood_veneer_press: 5, aluminum_light_port: 8,
  };
  return m[t];
}

export function pressCost(t: NippingPressType): number {
  const m: Record<NippingPressType, number> = {
    cast_iron_screw: 5, brass_plate_small: 4, steel_lever_quick: 4, wood_veneer_press: 3, aluminum_light_port: 2,
  };
  return m[t];
}

export function leverAction(t: NippingPressType): boolean {
  const m: Record<NippingPressType, boolean> = {
    cast_iron_screw: false, brass_plate_small: false, steel_lever_quick: true, wood_veneer_press: false, aluminum_light_port: false,
  };
  return m[t];
}

export function screwDrive(t: NippingPressType): boolean {
  const m: Record<NippingPressType, boolean> = {
    cast_iron_screw: true, brass_plate_small: true, steel_lever_quick: false, wood_veneer_press: true, aluminum_light_port: true,
  };
  return m[t];
}

export function pressMaterial(t: NippingPressType): string {
  const m: Record<NippingPressType, string> = {
    cast_iron_screw: "cast_iron_machined",
    brass_plate_small: "brass_plate_polished",
    steel_lever_quick: "steel_cam_lever",
    wood_veneer_press: "maple_veneer_screw",
    aluminum_light_port: "aluminum_anodized",
  };
  return m[t];
}

export function bestUse(t: NippingPressType): string {
  const m: Record<NippingPressType, string> = {
    cast_iron_screw: "production_case_bind",
    brass_plate_small: "fine_press_edition",
    steel_lever_quick: "quick_press_release",
    wood_veneer_press: "veneer_laminate_glue",
    aluminum_light_port: "travel_workshop_press",
  };
  return m[t];
}

export function nippingPresses(): NippingPressType[] {
  return ["cast_iron_screw", "brass_plate_small", "steel_lever_quick", "wood_veneer_press", "aluminum_light_port"];
}
