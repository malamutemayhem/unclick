export type BambooSpecies = "moso" | "black" | "golden" | "timber" | "clumping" | "arrow";
export type JointType = "lashing" | "dowel" | "mortise" | "fish_mouth" | "socket";

export function culmDiameter(species: BambooSpecies): number {
  const mm: Record<BambooSpecies, number> = {
    moso: 120, black: 50, golden: 60, timber: 150, clumping: 80, arrow: 15,
  };
  return mm[species];
}

export function wallThickness(species: BambooSpecies): number {
  const mm: Record<BambooSpecies, number> = {
    moso: 12, black: 5, golden: 6, timber: 15, clumping: 8, arrow: 3,
  };
  return mm[species];
}

export function maxLength(species: BambooSpecies): number {
  const meters: Record<BambooSpecies, number> = {
    moso: 20, black: 8, golden: 10, timber: 25, clumping: 12, arrow: 5,
  };
  return meters[species];
}

export function bendingStrength(diameterMm: number, wallMm: number): number {
  const moment = Math.PI * (Math.pow(diameterMm, 4) - Math.pow(diameterMm - 2 * wallMm, 4)) / 64;
  return parseFloat((moment / 1000).toFixed(1));
}

export function nodeSpacing(species: BambooSpecies): number {
  const cm: Record<BambooSpecies, number> = {
    moso: 30, black: 20, golden: 25, timber: 35, clumping: 25, arrow: 15,
  };
  return cm[species];
}

export function curingDays(method: "air" | "smoke" | "chemical"): number {
  const days: Record<string, number> = { air: 90, smoke: 14, chemical: 7 };
  return days[method];
}

export function shrinkagePercent(greenDiameterMm: number): number {
  return parseFloat((greenDiameterMm * 0.08).toFixed(1));
}

export function splitStrips(diameterMm: number, stripWidthMm: number): number {
  const circumference = Math.PI * diameterMm;
  return Math.floor(circumference / stripWidthMm);
}

export function jointStrength(type: JointType): number {
  const pct: Record<JointType, number> = {
    lashing: 60, dowel: 75, mortise: 85, fish_mouth: 90, socket: 70,
  };
  return pct[type];
}

export function lashingLength(diameterMm: number, wraps: number): number {
  const circumference = Math.PI * diameterMm;
  return parseFloat((circumference * wraps / 10).toFixed(1));
}

export function preservativeSoak(diameterMm: number): number {
  return Math.ceil(diameterMm / 10);
}

export function weightPerMeter(diameterMm: number, wallMm: number): number {
  const outerArea = Math.PI * (diameterMm / 2) ** 2;
  const innerArea = Math.PI * ((diameterMm / 2) - wallMm) ** 2;
  const crossSection = outerArea - innerArea;
  const density = 0.0007;
  return parseFloat((crossSection * 1000 * density).toFixed(1));
}

export function bambooSpecies(): BambooSpecies[] {
  return ["moso", "black", "golden", "timber", "clumping", "arrow"];
}
