export type BlockingWireType = "straight_steel_long" | "flexible_cable_set" | "lace_pin_fine" | "combi_wire_pin" | "rust_proof_coated";

export function edgeStraight(t: BlockingWireType): number {
  const m: Record<BlockingWireType, number> = {
    straight_steel_long: 10, flexible_cable_set: 6, lace_pin_fine: 7, combi_wire_pin: 9, rust_proof_coated: 9,
  };
  return m[t];
}

export function curveAbility(t: BlockingWireType): number {
  const m: Record<BlockingWireType, number> = {
    straight_steel_long: 3, flexible_cable_set: 10, lace_pin_fine: 8, combi_wire_pin: 7, rust_proof_coated: 4,
  };
  return m[t];
}

export function durability(t: BlockingWireType): number {
  const m: Record<BlockingWireType, number> = {
    straight_steel_long: 9, flexible_cable_set: 7, lace_pin_fine: 5, combi_wire_pin: 8, rust_proof_coated: 10,
  };
  return m[t];
}

export function precision(t: BlockingWireType): number {
  const m: Record<BlockingWireType, number> = {
    straight_steel_long: 9, flexible_cable_set: 6, lace_pin_fine: 10, combi_wire_pin: 8, rust_proof_coated: 8,
  };
  return m[t];
}

export function wireCost(t: BlockingWireType): number {
  const m: Record<BlockingWireType, number> = {
    straight_steel_long: 3, flexible_cable_set: 4, lace_pin_fine: 2, combi_wire_pin: 5, rust_proof_coated: 4,
  };
  return m[t];
}

export function rustResist(t: BlockingWireType): boolean {
  const m: Record<BlockingWireType, boolean> = {
    straight_steel_long: false, flexible_cable_set: true, lace_pin_fine: false, combi_wire_pin: true, rust_proof_coated: true,
  };
  return m[t];
}

export function flexWire(t: BlockingWireType): boolean {
  const m: Record<BlockingWireType, boolean> = {
    straight_steel_long: false, flexible_cable_set: true, lace_pin_fine: true, combi_wire_pin: false, rust_proof_coated: false,
  };
  return m[t];
}

export function wireMaterial(t: BlockingWireType): string {
  const m: Record<BlockingWireType, string> = {
    straight_steel_long: "stainless_steel_rod",
    flexible_cable_set: "braided_cable_coated",
    lace_pin_fine: "thin_gauge_steel",
    combi_wire_pin: "steel_with_pin_end",
    rust_proof_coated: "nickel_plated_steel",
  };
  return m[t];
}

export function bestUse(t: BlockingWireType): string {
  const m: Record<BlockingWireType, string> = {
    straight_steel_long: "straight_edge_scarf",
    flexible_cable_set: "curved_shawl_edge",
    lace_pin_fine: "delicate_lace_point",
    combi_wire_pin: "mixed_edge_project",
    rust_proof_coated: "wet_block_soak",
  };
  return m[t];
}

export function blockingWires(): BlockingWireType[] {
  return ["straight_steel_long", "flexible_cable_set", "lace_pin_fine", "combi_wire_pin", "rust_proof_coated"];
}
