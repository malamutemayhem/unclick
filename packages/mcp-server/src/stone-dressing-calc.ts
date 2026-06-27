export type DressingFinish = "rough_picked" | "bush_hammered" | "tooled" | "rubbed" | "polished";

export function surfaceRoughnessMm(finish: DressingFinish): number {
  const r: Record<DressingFinish, number> = {
    rough_picked: 15, bush_hammered: 5, tooled: 2, rubbed: 0.5, polished: 0.05,
  };
  return r[finish];
}

export function passesRequired(finish: DressingFinish): number {
  const p: Record<DressingFinish, number> = {
    rough_picked: 1, bush_hammered: 3, tooled: 5, rubbed: 8, polished: 12,
  };
  return p[finish];
}

export function timePerM2Hours(finish: DressingFinish): number {
  const t: Record<DressingFinish, number> = {
    rough_picked: 1, bush_hammered: 3, tooled: 6, rubbed: 10, polished: 20,
  };
  return t[finish];
}

export function toolType(finish: DressingFinish): string {
  const t: Record<DressingFinish, string> = {
    rough_picked: "point_chisel", bush_hammered: "bush_hammer",
    tooled: "tooth_chisel", rubbed: "abrasive_stone",
    polished: "diamond_pad",
  };
  return t[finish];
}

export function waterRequired(finish: DressingFinish): boolean {
  return finish === "rubbed" || finish === "polished";
}

export function dustLevel(finish: DressingFinish): number {
  const d: Record<DressingFinish, number> = {
    rough_picked: 9, bush_hammered: 8, tooled: 7, rubbed: 4, polished: 2,
  };
  return d[finish];
}

export function noiseLevel(finish: DressingFinish): number {
  const n: Record<DressingFinish, number> = {
    rough_picked: 8, bush_hammered: 9, tooled: 7, rubbed: 3, polished: 4,
  };
  return n[finish];
}

export function slipResistance(finish: DressingFinish): number {
  const s: Record<DressingFinish, number> = {
    rough_picked: 10, bush_hammered: 8, tooled: 6, rubbed: 4, polished: 2,
  };
  return s[finish];
}

export function costPerM2(finish: DressingFinish): number {
  const c: Record<DressingFinish, number> = {
    rough_picked: 30, bush_hammered: 60, tooled: 120, rubbed: 200, polished: 350,
  };
  return c[finish];
}

export function dressingFinishes(): DressingFinish[] {
  return ["rough_picked", "bush_hammered", "tooled", "rubbed", "polished"];
}
