export type DoorStopperType = "wedge_rubber" | "hinge_pin_brass" | "magnetic_wall_mount" | "kick_down_spring" | "weighted_fabric";

export function holdStrength(t: DoorStopperType): number {
  const m: Record<DoorStopperType, number> = {
    wedge_rubber: 6, hinge_pin_brass: 8, magnetic_wall_mount: 9, kick_down_spring: 7, weighted_fabric: 4,
  };
  return m[t];
}

export function floorSafe(t: DoorStopperType): number {
  const m: Record<DoorStopperType, number> = {
    wedge_rubber: 9, hinge_pin_brass: 10, magnetic_wall_mount: 10, kick_down_spring: 6, weighted_fabric: 10,
  };
  return m[t];
}

export function aestheticClean(t: DoorStopperType): number {
  const m: Record<DoorStopperType, number> = {
    wedge_rubber: 3, hinge_pin_brass: 8, magnetic_wall_mount: 9, kick_down_spring: 5, weighted_fabric: 7,
  };
  return m[t];
}

export function portability(t: DoorStopperType): number {
  const m: Record<DoorStopperType, number> = {
    wedge_rubber: 10, hinge_pin_brass: 3, magnetic_wall_mount: 2, kick_down_spring: 4, weighted_fabric: 8,
  };
  return m[t];
}

export function stopperCost(t: DoorStopperType): number {
  const m: Record<DoorStopperType, number> = {
    wedge_rubber: 1, hinge_pin_brass: 3, magnetic_wall_mount: 5, kick_down_spring: 2, weighted_fabric: 3,
  };
  return m[t];
}

export function permanentMount(t: DoorStopperType): boolean {
  const m: Record<DoorStopperType, boolean> = {
    wedge_rubber: false, hinge_pin_brass: true, magnetic_wall_mount: true, kick_down_spring: true, weighted_fabric: false,
  };
  return m[t];
}

export function tripHazard(t: DoorStopperType): boolean {
  const m: Record<DoorStopperType, boolean> = {
    wedge_rubber: true, hinge_pin_brass: false, magnetic_wall_mount: false, kick_down_spring: true, weighted_fabric: true,
  };
  return m[t];
}

export function mountMethod(t: DoorStopperType): string {
  const m: Record<DoorStopperType, string> = {
    wedge_rubber: "floor_wedge_friction",
    hinge_pin_brass: "hinge_pin_insert",
    magnetic_wall_mount: "screw_wall_magnet_catch",
    kick_down_spring: "door_base_spring_flip",
    weighted_fabric: "sand_fill_draft_block",
  };
  return m[t];
}

export function bestDoor(t: DoorStopperType): string {
  const m: Record<DoorStopperType, string> = {
    wedge_rubber: "hotel_travel_temporary",
    hinge_pin_brass: "interior_door_permanent",
    magnetic_wall_mount: "wall_protect_swing_open",
    kick_down_spring: "commercial_propped_open",
    weighted_fabric: "draft_blocker_exterior",
  };
  return m[t];
}

export function doorStoppers(): DoorStopperType[] {
  return ["wedge_rubber", "hinge_pin_brass", "magnetic_wall_mount", "kick_down_spring", "weighted_fabric"];
}
