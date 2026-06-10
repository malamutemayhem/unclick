export type ConveyorBelt = "flat" | "inclined" | "roller" | "pneumatic" | "screw";

export function throughput(c: ConveyorBelt): number {
  const m: Record<ConveyorBelt, number> = {
    flat: 8, inclined: 6, roller: 7, pneumatic: 5, screw: 4,
  };
  return m[c];
}

export function maxIncline(c: ConveyorBelt): number {
  const m: Record<ConveyorBelt, number> = {
    flat: 2, inclined: 10, roller: 3, pneumatic: 8, screw: 9,
  };
  return m[c];
}

export function materialVersatility(c: ConveyorBelt): number {
  const m: Record<ConveyorBelt, number> = {
    flat: 9, inclined: 7, roller: 6, pneumatic: 4, screw: 5,
  };
  return m[c];
}

export function cleanability(c: ConveyorBelt): number {
  const m: Record<ConveyorBelt, number> = {
    flat: 8, inclined: 7, roller: 6, pneumatic: 10, screw: 5,
  };
  return m[c];
}

export function energyConsumption(c: ConveyorBelt): number {
  const m: Record<ConveyorBelt, number> = {
    flat: 4, inclined: 6, roller: 3, pneumatic: 9, screw: 7,
  };
  return m[c];
}

export function enclosedSystem(c: ConveyorBelt): boolean {
  const m: Record<ConveyorBelt, boolean> = {
    flat: false, inclined: false, roller: false, pneumatic: true, screw: true,
  };
  return m[c];
}

export function foodGradeAvailable(c: ConveyorBelt): boolean {
  const m: Record<ConveyorBelt, boolean> = {
    flat: true, inclined: true, roller: true, pneumatic: true, screw: true,
  };
  return m[c];
}

export function bestApplication(c: ConveyorBelt): string {
  const m: Record<ConveyorBelt, string> = {
    flat: "packaging_assembly", inclined: "elevation_changes",
    roller: "box_parcel_handling", pneumatic: "grain_powder_transport",
    screw: "bulk_material_mixing",
  };
  return m[c];
}

export function beltMaterial(c: ConveyorBelt): string {
  const m: Record<ConveyorBelt, string> = {
    flat: "rubber_pvc_fabric", inclined: "textured_rubber_cleated",
    roller: "steel_plastic_rollers", pneumatic: "pipe_ductwork",
    screw: "steel_auger_trough",
  };
  return m[c];
}

export function conveyorBelts(): ConveyorBelt[] {
  return ["flat", "inclined", "roller", "pneumatic", "screw"];
}
