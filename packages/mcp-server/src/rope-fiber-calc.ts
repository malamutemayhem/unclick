export type RopeFiber = "manila" | "nylon" | "polyester" | "cotton" | "dyneema";

export function breakingStrengthKn(fiber: RopeFiber): number {
  const b: Record<RopeFiber, number> = {
    manila: 10, nylon: 30, polyester: 25, cotton: 6, dyneema: 50,
  };
  return b[fiber];
}

export function stretchPercent(fiber: RopeFiber): number {
  const s: Record<RopeFiber, number> = {
    manila: 8, nylon: 20, polyester: 5, cotton: 3, dyneema: 2,
  };
  return s[fiber];
}

export function uvResistance(fiber: RopeFiber): number {
  const u: Record<RopeFiber, number> = {
    manila: 4, nylon: 5, polyester: 9, cotton: 3, dyneema: 7,
  };
  return u[fiber];
}

export function waterAbsorption(fiber: RopeFiber): number {
  const w: Record<RopeFiber, number> = {
    manila: 8, nylon: 4, polyester: 1, cotton: 10, dyneema: 0,
  };
  return w[fiber];
}

export function abrasionResistance(fiber: RopeFiber): number {
  const a: Record<RopeFiber, number> = {
    manila: 5, nylon: 8, polyester: 9, cotton: 3, dyneema: 7,
  };
  return a[fiber];
}

export function floats(fiber: RopeFiber): boolean {
  const f: Record<RopeFiber, boolean> = {
    manila: false, nylon: false, polyester: false, cotton: false, dyneema: true,
  };
  return f[fiber];
}

export function natural(fiber: RopeFiber): boolean {
  const n: Record<RopeFiber, boolean> = {
    manila: true, nylon: false, polyester: false, cotton: true, dyneema: false,
  };
  return n[fiber];
}

export function bestUse(fiber: RopeFiber): string {
  const b: Record<RopeFiber, string> = {
    manila: "decorative", nylon: "anchoring", polyester: "sailing",
    cotton: "clothesline", dyneema: "climbing",
  };
  return b[fiber];
}

export function costPerMeter(fiber: RopeFiber): number {
  const c: Record<RopeFiber, number> = {
    manila: 2, nylon: 3, polyester: 4, cotton: 1, dyneema: 15,
  };
  return c[fiber];
}

export function ropeFibers(): RopeFiber[] {
  return ["manila", "nylon", "polyester", "cotton", "dyneema"];
}
