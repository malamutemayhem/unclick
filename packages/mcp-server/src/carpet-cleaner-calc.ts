export type CarpetCleanerType = "upright_deep_clean" | "portable_spot" | "canister_pro" | "robotic_auto" | "dry_powder_host";

export function cleaningPower(t: CarpetCleanerType): number {
  const m: Record<CarpetCleanerType, number> = {
    upright_deep_clean: 9, portable_spot: 6, canister_pro: 10, robotic_auto: 5, dry_powder_host: 4,
  };
  return m[t];
}

export function dryingTime(t: CarpetCleanerType): number {
  const m: Record<CarpetCleanerType, number> = {
    upright_deep_clean: 6, portable_spot: 7, canister_pro: 5, robotic_auto: 7, dry_powder_host: 10,
  };
  return m[t];
}

export function tankCapacity(t: CarpetCleanerType): number {
  const m: Record<CarpetCleanerType, number> = {
    upright_deep_clean: 8, portable_spot: 3, canister_pro: 10, robotic_auto: 2, dry_powder_host: 1,
  };
  return m[t];
}

export function portability(t: CarpetCleanerType): number {
  const m: Record<CarpetCleanerType, number> = {
    upright_deep_clean: 4, portable_spot: 9, canister_pro: 2, robotic_auto: 10, dry_powder_host: 7,
  };
  return m[t];
}

export function cleanerCost(t: CarpetCleanerType): number {
  const m: Record<CarpetCleanerType, number> = {
    upright_deep_clean: 6, portable_spot: 4, canister_pro: 10, robotic_auto: 8, dry_powder_host: 3,
  };
  return m[t];
}

export function heatedClean(t: CarpetCleanerType): boolean {
  const m: Record<CarpetCleanerType, boolean> = {
    upright_deep_clean: true, portable_spot: false, canister_pro: true, robotic_auto: false, dry_powder_host: false,
  };
  return m[t];
}

export function noWater(t: CarpetCleanerType): boolean {
  const m: Record<CarpetCleanerType, boolean> = {
    upright_deep_clean: false, portable_spot: false, canister_pro: false, robotic_auto: false, dry_powder_host: true,
  };
  return m[t];
}

export function cleanMethod(t: CarpetCleanerType): string {
  const m: Record<CarpetCleanerType, string> = {
    upright_deep_clean: "hot_water_extraction",
    portable_spot: "spray_suction_spot",
    canister_pro: "truck_mount_injection",
    robotic_auto: "brush_roll_solution_spray",
    dry_powder_host: "absorbent_compound_vacuum",
  };
  return m[t];
}

export function bestJob(t: CarpetCleanerType): string {
  const m: Record<CarpetCleanerType, string> = {
    upright_deep_clean: "whole_room_seasonal",
    portable_spot: "pet_stain_spill_quick",
    canister_pro: "commercial_rental_deep",
    robotic_auto: "maintenance_auto_schedule",
    dry_powder_host: "delicate_carpet_low_moisture",
  };
  return m[t];
}

export function carpetCleaners(): CarpetCleanerType[] {
  return ["upright_deep_clean", "portable_spot", "canister_pro", "robotic_auto", "dry_powder_host"];
}
