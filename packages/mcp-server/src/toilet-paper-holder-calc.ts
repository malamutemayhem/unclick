export type ToiletPaperHolderType = "spring_rod_recessed" | "freestanding_floor_stand" | "wall_mount_pivot" | "double_roll_shelf" | "industrial_jumbo_roll";

export function rollCapacity(t: ToiletPaperHolderType): number {
  const m: Record<ToiletPaperHolderType, number> = {
    spring_rod_recessed: 3, freestanding_floor_stand: 8, wall_mount_pivot: 3, double_roll_shelf: 6, industrial_jumbo_roll: 10,
  };
  return m[t];
}

export function rollChangeEase(t: ToiletPaperHolderType): number {
  const m: Record<ToiletPaperHolderType, number> = {
    spring_rod_recessed: 6, freestanding_floor_stand: 10, wall_mount_pivot: 8, double_roll_shelf: 7, industrial_jumbo_roll: 4,
  };
  return m[t];
}

export function aesthetics(t: ToiletPaperHolderType): number {
  const m: Record<ToiletPaperHolderType, number> = {
    spring_rod_recessed: 8, freestanding_floor_stand: 6, wall_mount_pivot: 9, double_roll_shelf: 10, industrial_jumbo_roll: 3,
  };
  return m[t];
}

export function stability(t: ToiletPaperHolderType): number {
  const m: Record<ToiletPaperHolderType, number> = {
    spring_rod_recessed: 10, freestanding_floor_stand: 5, wall_mount_pivot: 9, double_roll_shelf: 9, industrial_jumbo_roll: 10,
  };
  return m[t];
}

export function holderCost(t: ToiletPaperHolderType): number {
  const m: Record<ToiletPaperHolderType, number> = {
    spring_rod_recessed: 1, freestanding_floor_stand: 3, wall_mount_pivot: 3, double_roll_shelf: 5, industrial_jumbo_roll: 4,
  };
  return m[t];
}

export function noDrilling(t: ToiletPaperHolderType): boolean {
  const m: Record<ToiletPaperHolderType, boolean> = {
    spring_rod_recessed: true, freestanding_floor_stand: true, wall_mount_pivot: false, double_roll_shelf: false, industrial_jumbo_roll: false,
  };
  return m[t];
}

export function hasShelf(t: ToiletPaperHolderType): boolean {
  const m: Record<ToiletPaperHolderType, boolean> = {
    spring_rod_recessed: false, freestanding_floor_stand: false, wall_mount_pivot: false, double_roll_shelf: true, industrial_jumbo_roll: false,
  };
  return m[t];
}

export function mountType(t: ToiletPaperHolderType): string {
  const m: Record<ToiletPaperHolderType, string> = {
    spring_rod_recessed: "spring_tension_recessed",
    freestanding_floor_stand: "weighted_base_floor",
    wall_mount_pivot: "screw_mount_pivot_arm",
    double_roll_shelf: "screw_mount_shelf_top",
    industrial_jumbo_roll: "bolt_mount_enclosed",
  };
  return m[t];
}

export function bestBathroom(t: ToiletPaperHolderType): string {
  const m: Record<ToiletPaperHolderType, string> = {
    spring_rod_recessed: "existing_recessed_slot",
    freestanding_floor_stand: "rental_no_holes_needed",
    wall_mount_pivot: "home_standard_install",
    double_roll_shelf: "modern_phone_shelf_combo",
    industrial_jumbo_roll: "commercial_high_traffic",
  };
  return m[t];
}

export function toiletPaperHolders(): ToiletPaperHolderType[] {
  return ["spring_rod_recessed", "freestanding_floor_stand", "wall_mount_pivot", "double_roll_shelf", "industrial_jumbo_roll"];
}
