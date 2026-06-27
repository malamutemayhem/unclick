export type FabricFinish = "mercerized" | "sanforized" | "calendered" | "napped" | "waterproof";

export function softness(f: FabricFinish): number {
  const m: Record<FabricFinish, number> = {
    mercerized: 8, sanforized: 6, calendered: 7, napped: 10, waterproof: 3,
  };
  return m[f];
}

export function lustEnhancement(f: FabricFinish): number {
  const m: Record<FabricFinish, number> = {
    mercerized: 10, sanforized: 2, calendered: 8, napped: 1, waterproof: 3,
  };
  return m[f];
}

export function shrinkageControl(f: FabricFinish): number {
  const m: Record<FabricFinish, number> = {
    mercerized: 7, sanforized: 10, calendered: 3, napped: 2, waterproof: 4,
  };
  return m[f];
}

export function durabilityEffect(f: FabricFinish): number {
  const m: Record<FabricFinish, number> = {
    mercerized: 8, sanforized: 6, calendered: 5, napped: 3, waterproof: 7,
  };
  return m[f];
}

export function processCost(f: FabricFinish): number {
  const m: Record<FabricFinish, number> = {
    mercerized: 7, sanforized: 4, calendered: 3, napped: 5, waterproof: 8,
  };
  return m[f];
}

export function chemicalProcess(f: FabricFinish): boolean {
  const m: Record<FabricFinish, boolean> = {
    mercerized: true, sanforized: false, calendered: false, napped: false, waterproof: true,
  };
  return m[f];
}

export function permanent(f: FabricFinish): boolean {
  const m: Record<FabricFinish, boolean> = {
    mercerized: true, sanforized: true, calendered: false, napped: false, waterproof: false,
  };
  return m[f];
}

export function bestForFiber(f: FabricFinish): string {
  const m: Record<FabricFinish, string> = {
    mercerized: "cotton", sanforized: "cotton_denim",
    calendered: "cotton_synthetics", napped: "flannel_fleece",
    waterproof: "outerwear_technical",
  };
  return m[f];
}

export function mechanismType(f: FabricFinish): string {
  const m: Record<FabricFinish, string> = {
    mercerized: "caustic_soda_tension", sanforized: "mechanical_compaction",
    calendered: "heated_roller_pressure", napped: "wire_brush_raising",
    waterproof: "membrane_coating",
  };
  return m[f];
}

export function fabricFinishes(): FabricFinish[] {
  return ["mercerized", "sanforized", "calendered", "napped", "waterproof"];
}
