export type VivariumType = "paludarium" | "aquarium" | "riparium" | "orchidarium" | "insectarium";
export type Inhabitant = "frog" | "gecko" | "snake" | "tarantula" | "isopod" | "mantis";

export function enclosureVolumeLiters(lengthCm: number, widthCm: number, heightCm: number): number {
  return parseFloat((lengthCm * widthCm * heightCm / 1000).toFixed(1));
}

export function minSize(inhabitant: Inhabitant): { lengthCm: number; widthCm: number; heightCm: number } {
  const sizes: Record<Inhabitant, { lengthCm: number; widthCm: number; heightCm: number }> = {
    frog: { lengthCm: 45, widthCm: 45, heightCm: 60 },
    gecko: { lengthCm: 60, widthCm: 45, heightCm: 45 },
    snake: { lengthCm: 90, widthCm: 45, heightCm: 30 },
    tarantula: { lengthCm: 30, widthCm: 30, heightCm: 30 },
    isopod: { lengthCm: 30, widthCm: 20, heightCm: 15 },
    mantis: { lengthCm: 20, widthCm: 20, heightCm: 30 },
  };
  return sizes[inhabitant];
}

export function substrateDepthCm(type: VivariumType): number {
  const depths: Record<VivariumType, number> = {
    paludarium: 10, aquarium: 5, riparium: 8, orchidarium: 12, insectarium: 5,
  };
  return depths[type];
}

export function substrateLiters(areaCm2: number, depthCm: number): number {
  return parseFloat((areaCm2 * depthCm / 1000).toFixed(1));
}

export function humidityTarget(inhabitant: Inhabitant): number {
  const pct: Record<Inhabitant, number> = {
    frog: 80, gecko: 50, snake: 60, tarantula: 65, isopod: 85, mantis: 60,
  };
  return pct[inhabitant];
}

export function temperatureRange(inhabitant: Inhabitant): { min: number; max: number } {
  const ranges: Record<Inhabitant, { min: number; max: number }> = {
    frog: { min: 20, max: 26 }, gecko: { min: 24, max: 32 }, snake: { min: 24, max: 30 },
    tarantula: { min: 22, max: 28 }, isopod: { min: 18, max: 24 }, mantis: { min: 22, max: 28 },
  };
  return ranges[inhabitant];
}

export function lightingWatts(areaCm2: number, plantDensity: "low" | "medium" | "high"): number {
  const factor: Record<string, number> = { low: 0.003, medium: 0.006, high: 0.01 };
  return parseFloat((areaCm2 * factor[plantDensity]).toFixed(1));
}

export function mistingFrequency(humidity: number, target: number): number {
  const diff = target - humidity;
  if (diff <= 0) return 0;
  return Math.ceil(diff / 10);
}

export function drainageLayerCm(totalDepthCm: number): number {
  return parseFloat((totalDepthCm * 0.25).toFixed(1));
}

export function waterChangePct(type: VivariumType): number {
  if (type === "aquarium") return 25;
  if (type === "paludarium" || type === "riparium") return 15;
  return 0;
}

export function feedingSchedule(inhabitant: Inhabitant): string {
  const schedules: Record<Inhabitant, string> = {
    frog: "every 2 days", gecko: "every 2-3 days", snake: "weekly",
    tarantula: "weekly", isopod: "weekly (leaf litter)", mantis: "every 2-3 days",
  };
  return schedules[inhabitant];
}

export function vivariumTypes(): VivariumType[] {
  return ["paludarium", "aquarium", "riparium", "orchidarium", "insectarium"];
}
