export type CephalopodType = "octopus" | "squid" | "cuttlefish" | "nautilus" | "giant_squid";

export function armCount(ceph: CephalopodType): number {
  const m: Record<CephalopodType, number> = {
    octopus: 8, squid: 10, cuttlefish: 10, nautilus: 90, giant_squid: 10,
  };
  return m[ceph];
}

export function intelligence(ceph: CephalopodType): number {
  const m: Record<CephalopodType, number> = {
    octopus: 10, squid: 6, cuttlefish: 8, nautilus: 2, giant_squid: 4,
  };
  return m[ceph];
}

export function camouflageAbility(ceph: CephalopodType): number {
  const m: Record<CephalopodType, number> = {
    octopus: 10, squid: 6, cuttlefish: 9, nautilus: 1, giant_squid: 3,
  };
  return m[ceph];
}

export function maxDepthMeters(ceph: CephalopodType): number {
  const m: Record<CephalopodType, number> = {
    octopus: 500, squid: 1000, cuttlefish: 200, nautilus: 700, giant_squid: 1500,
  };
  return m[ceph];
}

export function lifespanYears(ceph: CephalopodType): number {
  const m: Record<CephalopodType, number> = {
    octopus: 3, squid: 2, cuttlefish: 2, nautilus: 20, giant_squid: 5,
  };
  return m[ceph];
}

export function hasExternalShell(ceph: CephalopodType): boolean {
  const m: Record<CephalopodType, boolean> = {
    octopus: false, squid: false, cuttlefish: false, nautilus: true, giant_squid: false,
  };
  return m[ceph];
}

export function producesInk(ceph: CephalopodType): boolean {
  const m: Record<CephalopodType, boolean> = {
    octopus: true, squid: true, cuttlefish: true, nautilus: false, giant_squid: true,
  };
  return m[ceph];
}

export function primaryDefense(ceph: CephalopodType): string {
  const m: Record<CephalopodType, string> = {
    octopus: "camouflage", squid: "speed", cuttlefish: "color_change",
    nautilus: "shell_retreat", giant_squid: "deep_water",
  };
  return m[ceph];
}

export function scientificInterest(ceph: CephalopodType): number {
  const m: Record<CephalopodType, number> = {
    octopus: 9, squid: 6, cuttlefish: 8, nautilus: 7, giant_squid: 10,
  };
  return m[ceph];
}

export function cephalopodTypes(): CephalopodType[] {
  return ["octopus", "squid", "cuttlefish", "nautilus", "giant_squid"];
}
