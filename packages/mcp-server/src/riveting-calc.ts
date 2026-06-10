export type RivetType = "solid" | "blind" | "tubular" | "split" | "copper_tack";

export function shankDiameterMm(type: RivetType): number {
  const dia: Record<RivetType, number> = {
    solid: 4, blind: 3.2, tubular: 3, split: 3, copper_tack: 2,
  };
  return dia[type];
}

export function gripRangeMm(type: RivetType): { min: number; max: number } {
  const ranges: Record<RivetType, { min: number; max: number }> = {
    solid: { min: 1, max: 12 }, blind: { min: 1, max: 10 },
    tubular: { min: 0.5, max: 6 }, split: { min: 0.5, max: 8 },
    copper_tack: { min: 0.5, max: 3 },
  };
  return ranges[type];
}

export function shearStrengthKg(type: RivetType): number {
  const strength: Record<RivetType, number> = {
    solid: 250, blind: 150, tubular: 100, split: 80, copper_tack: 50,
  };
  return strength[type];
}

export function backAccessRequired(type: RivetType): boolean {
  return type === "solid" || type === "copper_tack";
}

export function toolRequired(type: RivetType): string {
  const tools: Record<RivetType, string> = {
    solid: "rivet_set_and_hammer", blind: "pop_rivet_gun", tubular: "setter_and_anvil",
    split: "hammer", copper_tack: "ball_peen_hammer",
  };
  return tools[type];
}

export function flushFinish(type: RivetType): boolean {
  return type === "solid" || type === "blind";
}

export function waterproof(type: RivetType): boolean {
  return type === "solid" || type === "copper_tack";
}

export function installTimeSeconds(type: RivetType): number {
  const secs: Record<RivetType, number> = {
    solid: 15, blind: 5, tubular: 10, split: 8, copper_tack: 20,
  };
  return secs[type];
}

export function costPer100(type: RivetType): number {
  const costs: Record<RivetType, number> = {
    solid: 8, blind: 5, tubular: 6, split: 4, copper_tack: 12,
  };
  return costs[type];
}

export function rivetTypes(): RivetType[] {
  return ["solid", "blind", "tubular", "split", "copper_tack"];
}
