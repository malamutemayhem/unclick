export type NestType = "cup" | "cavity" | "platform" | "burrow" | "pendant";

export function constructionDays(nest: NestType): number {
  const m: Record<NestType, number> = {
    cup: 7, cavity: 14, platform: 10, burrow: 21, pendant: 18,
  };
  return m[nest];
}

export function materialComplexity(nest: NestType): number {
  const m: Record<NestType, number> = {
    cup: 7, cavity: 3, platform: 4, burrow: 2, pendant: 10,
  };
  return m[nest];
}

export function predatorProtection(nest: NestType): number {
  const m: Record<NestType, number> = {
    cup: 4, cavity: 9, platform: 3, burrow: 10, pendant: 8,
  };
  return m[nest];
}

export function weatherResistance(nest: NestType): number {
  const m: Record<NestType, number> = {
    cup: 4, cavity: 10, platform: 2, burrow: 10, pendant: 6,
  };
  return m[nest];
}

export function reusability(nest: NestType): number {
  const m: Record<NestType, number> = {
    cup: 3, cavity: 9, platform: 10, burrow: 8, pendant: 2,
  };
  return m[nest];
}

export function groundLevel(nest: NestType): boolean {
  const m: Record<NestType, boolean> = {
    cup: false, cavity: false, platform: false, burrow: true, pendant: false,
  };
  return m[nest];
}

export function woven(nest: NestType): boolean {
  const m: Record<NestType, boolean> = {
    cup: true, cavity: false, platform: false, burrow: false, pendant: true,
  };
  return m[nest];
}

export function exampleBird(nest: NestType): string {
  const m: Record<NestType, string> = {
    cup: "robin", cavity: "woodpecker", platform: "eagle",
    burrow: "puffin", pendant: "weaver_bird",
  };
  return m[nest];
}

export function clutchSize(nest: NestType): number {
  const m: Record<NestType, number> = {
    cup: 4, cavity: 6, platform: 2, burrow: 1, pendant: 3,
  };
  return m[nest];
}

export function nestTypes(): NestType[] {
  return ["cup", "cavity", "platform", "burrow", "pendant"];
}
