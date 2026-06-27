export type SpiderWebType = "orb" | "funnel" | "sheet" | "cobweb" | "trapdoor";

export function tensileStrength(web: SpiderWebType): number {
  const m: Record<SpiderWebType, number> = {
    orb: 9, funnel: 6, sheet: 5, cobweb: 4, trapdoor: 3,
  };
  return m[web];
}

export function constructionTimeMinutes(web: SpiderWebType): number {
  const m: Record<SpiderWebType, number> = {
    orb: 30, funnel: 60, sheet: 120, cobweb: 180, trapdoor: 480,
  };
  return m[web];
}

export function captureEfficiency(web: SpiderWebType): number {
  const m: Record<SpiderWebType, number> = {
    orb: 9, funnel: 7, sheet: 6, cobweb: 5, trapdoor: 8,
  };
  return m[web];
}

export function windResistance(web: SpiderWebType): number {
  const m: Record<SpiderWebType, number> = {
    orb: 4, funnel: 8, sheet: 3, cobweb: 6, trapdoor: 10,
  };
  return m[web];
}

export function stickyThreadCount(web: SpiderWebType): number {
  const m: Record<SpiderWebType, number> = {
    orb: 10, funnel: 3, sheet: 5, cobweb: 8, trapdoor: 1,
  };
  return m[web];
}

export function geometric(web: SpiderWebType): boolean {
  const m: Record<SpiderWebType, boolean> = {
    orb: true, funnel: false, sheet: false, cobweb: false, trapdoor: false,
  };
  return m[web];
}

export function underground(web: SpiderWebType): boolean {
  const m: Record<SpiderWebType, boolean> = {
    orb: false, funnel: false, sheet: false, cobweb: false, trapdoor: true,
  };
  return m[web];
}

export function exampleSpider(web: SpiderWebType): string {
  const m: Record<SpiderWebType, string> = {
    orb: "garden_spider", funnel: "hobo_spider", sheet: "bowl_weaver",
    cobweb: "black_widow", trapdoor: "trapdoor_spider",
  };
  return m[web];
}

export function silkInvestment(web: SpiderWebType): number {
  const m: Record<SpiderWebType, number> = {
    orb: 7, funnel: 5, sheet: 8, cobweb: 6, trapdoor: 3,
  };
  return m[web];
}

export function spiderWebTypes(): SpiderWebType[] {
  return ["orb", "funnel", "sheet", "cobweb", "trapdoor"];
}
