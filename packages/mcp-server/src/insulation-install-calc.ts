export type InsulationInstall = "batt_roll" | "blown_in" | "spray_foam" | "rigid_board" | "loose_fill";

export function coverageUniformity(i: InsulationInstall): number {
  const m: Record<InsulationInstall, number> = {
    batt_roll: 5, blown_in: 9, spray_foam: 10, rigid_board: 7, loose_fill: 8,
  };
  return m[i];
}

export function airSealingAbility(i: InsulationInstall): number {
  const m: Record<InsulationInstall, number> = {
    batt_roll: 2, blown_in: 4, spray_foam: 10, rigid_board: 7, loose_fill: 3,
  };
  return m[i];
}

export function laborCost(i: InsulationInstall): number {
  const m: Record<InsulationInstall, number> = {
    batt_roll: 3, blown_in: 5, spray_foam: 9, rigid_board: 7, loose_fill: 4,
  };
  return m[i];
}

export function moistureResistance(i: InsulationInstall): number {
  const m: Record<InsulationInstall, number> = {
    batt_roll: 3, blown_in: 4, spray_foam: 9, rigid_board: 8, loose_fill: 3,
  };
  return m[i];
}

export function retrofitSuitability(i: InsulationInstall): number {
  const m: Record<InsulationInstall, number> = {
    batt_roll: 4, blown_in: 10, spray_foam: 7, rigid_board: 3, loose_fill: 9,
  };
  return m[i];
}

export function diyFriendly(i: InsulationInstall): boolean {
  const m: Record<InsulationInstall, boolean> = {
    batt_roll: true, blown_in: true, spray_foam: false, rigid_board: true, loose_fill: true,
  };
  return m[i];
}

export function expandsToFill(i: InsulationInstall): boolean {
  const m: Record<InsulationInstall, boolean> = {
    batt_roll: false, blown_in: false, spray_foam: true, rigid_board: false, loose_fill: false,
  };
  return m[i];
}

export function typicalMaterial(i: InsulationInstall): string {
  const m: Record<InsulationInstall, string> = {
    batt_roll: "fiberglass_mineral_wool", blown_in: "cellulose_fiberglass",
    spray_foam: "polyurethane_open_closed", rigid_board: "xps_eps_polyiso",
    loose_fill: "perlite_vermiculite",
  };
  return m[i];
}

export function bestApplication(i: InsulationInstall): string {
  const m: Record<InsulationInstall, string> = {
    batt_roll: "stud_wall_new_construction", blown_in: "attic_enclosed_cavity",
    spray_foam: "rim_joist_crawl_space", rigid_board: "exterior_continuous",
    loose_fill: "masonry_cavity_fill",
  };
  return m[i];
}

export function insulationInstallMethods(): InsulationInstall[] {
  return ["batt_roll", "blown_in", "spray_foam", "rigid_board", "loose_fill"];
}
