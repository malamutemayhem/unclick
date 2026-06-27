export type PetGateType = "pressure_mount" | "hardware_mount" | "freestanding_fold" | "retractable_mesh" | "extra_tall_walk_through";

export function installEase(t: PetGateType): number {
  const m: Record<PetGateType, number> = {
    pressure_mount: 10, hardware_mount: 4, freestanding_fold: 9, retractable_mesh: 5, extra_tall_walk_through: 4,
  };
  return m[t];
}

export function securityStrength(t: PetGateType): number {
  const m: Record<PetGateType, number> = {
    pressure_mount: 6, hardware_mount: 10, freestanding_fold: 4, retractable_mesh: 5, extra_tall_walk_through: 9,
  };
  return m[t];
}

export function walkThrough(t: PetGateType): number {
  const m: Record<PetGateType, number> = {
    pressure_mount: 7, hardware_mount: 8, freestanding_fold: 3, retractable_mesh: 6, extra_tall_walk_through: 10,
  };
  return m[t];
}

export function portability(t: PetGateType): number {
  const m: Record<PetGateType, number> = {
    pressure_mount: 8, hardware_mount: 1, freestanding_fold: 10, retractable_mesh: 4, extra_tall_walk_through: 2,
  };
  return m[t];
}

export function gateCost(t: PetGateType): number {
  const m: Record<PetGateType, number> = {
    pressure_mount: 3, hardware_mount: 5, freestanding_fold: 4, retractable_mesh: 6, extra_tall_walk_through: 7,
  };
  return m[t];
}

export function noDamageWall(t: PetGateType): boolean {
  const m: Record<PetGateType, boolean> = {
    pressure_mount: true, hardware_mount: false, freestanding_fold: true, retractable_mesh: false, extra_tall_walk_through: false,
  };
  return m[t];
}

export function autoClose(t: PetGateType): boolean {
  const m: Record<PetGateType, boolean> = {
    pressure_mount: true, hardware_mount: true, freestanding_fold: false, retractable_mesh: true, extra_tall_walk_through: true,
  };
  return m[t];
}

export function gateDesign(t: PetGateType): string {
  const m: Record<PetGateType, string> = {
    pressure_mount: "spring_loaded_bar_fit",
    hardware_mount: "screw_hinge_steel_frame",
    freestanding_fold: "zigzag_panel_self_stand",
    retractable_mesh: "roll_up_mesh_cassette",
    extra_tall_walk_through: "tall_steel_door_latch",
  };
  return m[t];
}

export function bestSpot(t: PetGateType): string {
  const m: Record<PetGateType, string> = {
    pressure_mount: "doorway_hallway_rental",
    hardware_mount: "top_of_stairs_safety",
    freestanding_fold: "open_room_divider",
    retractable_mesh: "wide_opening_discrete",
    extra_tall_walk_through: "large_dog_jumper",
  };
  return m[t];
}

export function petGates(): PetGateType[] {
  return ["pressure_mount", "hardware_mount", "freestanding_fold", "retractable_mesh", "extra_tall_walk_through"];
}
