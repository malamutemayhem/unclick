export type SawType = "circular" | "band" | "frame" | "chainsaw" | "pit_saw";

export function bladeKerfMm(type: SawType): number {
  const kerfs: Record<SawType, number> = {
    circular: 3.2, band: 1.5, frame: 2.0, chainsaw: 8.0, pit_saw: 4.0,
  };
  return kerfs[type];
}

export function boardFeetPerLog(diameterCm: number, lengthM: number): number {
  const diameterInches = diameterCm / 2.54;
  const lengthFeet = lengthM * 3.281;
  return parseFloat((((diameterInches - 4) / 4) ** 2 * lengthFeet).toFixed(1));
}

export function yieldPercent(type: SawType): number {
  const yields: Record<SawType, number> = {
    circular: 55, band: 65, frame: 60, chainsaw: 40, pit_saw: 50,
  };
  return yields[type];
}

export function cuttingSpeedMPerSec(type: SawType): number {
  const speeds: Record<SawType, number> = {
    circular: 50, band: 30, frame: 5, chainsaw: 20, pit_saw: 1,
  };
  return speeds[type];
}

export function feedRateMPerMin(type: SawType): number {
  const rates: Record<SawType, number> = {
    circular: 15, band: 10, frame: 2, chainsaw: 3, pit_saw: 0.5,
  };
  return rates[type];
}

export function bladeTensionKn(type: SawType): number {
  const tensions: Record<SawType, number> = {
    circular: 0, band: 15, frame: 8, chainsaw: 5, pit_saw: 3,
  };
  return tensions[type];
}

export function teethPerCm(type: SawType): number {
  const tpc: Record<SawType, number> = {
    circular: 1.0, band: 1.5, frame: 0.8, chainsaw: 2.5, pit_saw: 0.5,
  };
  return tpc[type];
}

export function sharpeningIntervalHours(type: SawType): number {
  const intervals: Record<SawType, number> = {
    circular: 8, band: 4, frame: 6, chainsaw: 2, pit_saw: 3,
  };
  return intervals[type];
}

export function noiseDbA(type: SawType): number {
  const noise: Record<SawType, number> = {
    circular: 105, band: 90, frame: 75, chainsaw: 110, pit_saw: 60,
  };
  return noise[type];
}

export function dailyOutputM3(type: SawType): number {
  const output: Record<SawType, number> = {
    circular: 8, band: 6, frame: 2, chainsaw: 1.5, pit_saw: 0.3,
  };
  return output[type];
}

export function sawTypes(): SawType[] {
  return ["circular", "band", "frame", "chainsaw", "pit_saw"];
}
