export type FiberPrepMethod = "scouring" | "carding" | "combing" | "hackling" | "degumming";

export function waterTempCelsius(method: FiberPrepMethod): number {
  const t: Record<FiberPrepMethod, number> = {
    scouring: 60, carding: 0, combing: 0, hackling: 0, degumming: 95,
  };
  return t[method];
}

export function timePerKgMinutes(method: FiberPrepMethod): number {
  const t: Record<FiberPrepMethod, number> = {
    scouring: 45, carding: 30, combing: 60, hackling: 40, degumming: 120,
  };
  return t[method];
}

export function wastePercent(method: FiberPrepMethod): number {
  const w: Record<FiberPrepMethod, number> = {
    scouring: 30, carding: 5, combing: 25, hackling: 20, degumming: 25,
  };
  return w[method];
}

export function fiberAlignment(method: FiberPrepMethod): string {
  const a: Record<FiberPrepMethod, string> = {
    scouring: "unchanged", carding: "random", combing: "parallel",
    hackling: "parallel", degumming: "unchanged",
  };
  return a[method];
}

export function bestForFiber(method: FiberPrepMethod): string {
  const f: Record<FiberPrepMethod, string> = {
    scouring: "wool", carding: "wool", combing: "wool",
    hackling: "flax", degumming: "silk",
  };
  return f[method];
}

export function chemicalsRequired(method: FiberPrepMethod): boolean {
  return method === "scouring" || method === "degumming";
}

export function toolWeight(method: FiberPrepMethod): string {
  const w: Record<FiberPrepMethod, string> = {
    scouring: "light", carding: "medium", combing: "heavy",
    hackling: "heavy", degumming: "light",
  };
  return w[method];
}

export function outputForm(method: FiberPrepMethod): string {
  const o: Record<FiberPrepMethod, string> = {
    scouring: "clean_fleece", carding: "rolag", combing: "top",
    hackling: "strick", degumming: "clean_fiber",
  };
  return o[method];
}

export function costPerKg(method: FiberPrepMethod): number {
  const c: Record<FiberPrepMethod, number> = {
    scouring: 5, carding: 8, combing: 15, hackling: 12, degumming: 10,
  };
  return c[method];
}

export function fiberPrepMethods(): FiberPrepMethod[] {
  return ["scouring", "carding", "combing", "hackling", "degumming"];
}
