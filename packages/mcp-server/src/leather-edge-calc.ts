export type LeatherEdgeFinish = "burnished" | "painted" | "turned" | "beveled" | "raw";

export function durabilityRating(finish: LeatherEdgeFinish): number {
  const m: Record<LeatherEdgeFinish, number> = {
    burnished: 8, painted: 6, turned: 9, beveled: 5, raw: 2,
  };
  return m[finish];
}

export function timeMinutes(finish: LeatherEdgeFinish): number {
  const m: Record<LeatherEdgeFinish, number> = {
    burnished: 15, painted: 10, turned: 25, beveled: 5, raw: 0,
  };
  return m[finish];
}

export function appearanceRating(finish: LeatherEdgeFinish): number {
  const m: Record<LeatherEdgeFinish, number> = {
    burnished: 8, painted: 9, turned: 7, beveled: 6, raw: 3,
  };
  return m[finish];
}

export function waterResistance(finish: LeatherEdgeFinish): number {
  const m: Record<LeatherEdgeFinish, number> = {
    burnished: 7, painted: 8, turned: 9, beveled: 4, raw: 1,
  };
  return m[finish];
}

export function repairability(finish: LeatherEdgeFinish): number {
  const m: Record<LeatherEdgeFinish, number> = {
    burnished: 8, painted: 7, turned: 3, beveled: 6, raw: 9,
  };
  return m[finish];
}

export function toolsNeeded(finish: LeatherEdgeFinish): boolean {
  const m: Record<LeatherEdgeFinish, boolean> = {
    burnished: true, painted: true, turned: true, beveled: true, raw: false,
  };
  return m[finish];
}

export function colorOptions(finish: LeatherEdgeFinish): boolean {
  const m: Record<LeatherEdgeFinish, boolean> = {
    burnished: false, painted: true, turned: false, beveled: false, raw: false,
  };
  return m[finish];
}

export function bestProduct(finish: LeatherEdgeFinish): string {
  const m: Record<LeatherEdgeFinish, string> = {
    burnished: "belt", painted: "luxury_bag", turned: "wallet",
    beveled: "holster", raw: "rustic_pouch",
  };
  return m[finish];
}

export function costPerMeter(finish: LeatherEdgeFinish): number {
  const m: Record<LeatherEdgeFinish, number> = {
    burnished: 3, painted: 5, turned: 8, beveled: 2, raw: 0,
  };
  return m[finish];
}

export function leatherEdgeFinishes(): LeatherEdgeFinish[] {
  return ["burnished", "painted", "turned", "beveled", "raw"];
}
