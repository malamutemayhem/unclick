export type RivetType = "pop_blind_aluminum" | "solid_steel_buck" | "drive_pin_hammer" | "tubular_semi_hollow" | "structural_lock_bolt";

export function shearStrength(t: RivetType): number {
  const m: Record<RivetType, number> = {
    pop_blind_aluminum: 5, solid_steel_buck: 10, drive_pin_hammer: 4, tubular_semi_hollow: 6, structural_lock_bolt: 9,
  };
  return m[t];
}

export function installSpeed(t: RivetType): number {
  const m: Record<RivetType, number> = {
    pop_blind_aluminum: 10, solid_steel_buck: 3, drive_pin_hammer: 9, tubular_semi_hollow: 7, structural_lock_bolt: 5,
  };
  return m[t];
}

export function singleSideAccess(t: RivetType): number {
  const m: Record<RivetType, number> = {
    pop_blind_aluminum: 10, solid_steel_buck: 2, drive_pin_hammer: 8, tubular_semi_hollow: 5, structural_lock_bolt: 9,
  };
  return m[t];
}

export function vibrationResist(t: RivetType): number {
  const m: Record<RivetType, number> = {
    pop_blind_aluminum: 4, solid_steel_buck: 10, drive_pin_hammer: 3, tubular_semi_hollow: 6, structural_lock_bolt: 9,
  };
  return m[t];
}

export function rivetCost(t: RivetType): number {
  const m: Record<RivetType, number> = {
    pop_blind_aluminum: 3, solid_steel_buck: 6, drive_pin_hammer: 2, tubular_semi_hollow: 5, structural_lock_bolt: 9,
  };
  return m[t];
}

export function removable(t: RivetType): boolean {
  const m: Record<RivetType, boolean> = {
    pop_blind_aluminum: false, solid_steel_buck: false, drive_pin_hammer: false, tubular_semi_hollow: false, structural_lock_bolt: false,
  };
  return m[t];
}

export function needsSpecialTool(t: RivetType): boolean {
  const m: Record<RivetType, boolean> = {
    pop_blind_aluminum: true, solid_steel_buck: true, drive_pin_hammer: false, tubular_semi_hollow: true, structural_lock_bolt: true,
  };
  return m[t];
}

export function rivetMaterial(t: RivetType): string {
  const m: Record<RivetType, string> = {
    pop_blind_aluminum: "aluminum_alloy_mandrel",
    solid_steel_buck: "carbon_steel_solid",
    drive_pin_hammer: "steel_pin_expanding",
    tubular_semi_hollow: "brass_copper_hollow",
    structural_lock_bolt: "steel_collar_lock_ring",
  };
  return m[t];
}

export function bestApplication(t: RivetType): string {
  const m: Record<RivetType, string> = {
    pop_blind_aluminum: "sheet_metal_enclosure",
    solid_steel_buck: "aircraft_bridge_structural",
    drive_pin_hammer: "nameplate_hinge_light",
    tubular_semi_hollow: "leather_fabric_craft",
    structural_lock_bolt: "heavy_steel_frame_joint",
  };
  return m[t];
}

export function rivets(): RivetType[] {
  return ["pop_blind_aluminum", "solid_steel_buck", "drive_pin_hammer", "tubular_semi_hollow", "structural_lock_bolt"];
}
