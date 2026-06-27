export type ShutterType = "mechanical" | "electronic" | "electronic_first_curtain" | "global" | "rolling";

export function maxSpeedFraction(s: ShutterType): number {
  const m: Record<ShutterType, number> = {
    mechanical: 8000, electronic: 32000, electronic_first_curtain: 8000, global: 16000, rolling: 32000,
  };
  return m[s];
}

export function flashSyncSpeed(s: ShutterType): number {
  const m: Record<ShutterType, number> = {
    mechanical: 250, electronic: 0, electronic_first_curtain: 250, global: 500, rolling: 0,
  };
  return m[s];
}

export function rollingShutterDistortion(s: ShutterType): number {
  const m: Record<ShutterType, number> = {
    mechanical: 0, electronic: 7, electronic_first_curtain: 3, global: 0, rolling: 9,
  };
  return m[s];
}

export function shutterNoise(s: ShutterType): number {
  const m: Record<ShutterType, number> = {
    mechanical: 9, electronic: 0, electronic_first_curtain: 5, global: 0, rolling: 0,
  };
  return m[s];
}

export function durabilityActuations(s: ShutterType): number {
  const m: Record<ShutterType, number> = {
    mechanical: 200000, electronic: 999999, electronic_first_curtain: 300000, global: 999999, rolling: 999999,
  };
  return m[s];
}

export function silent(s: ShutterType): boolean {
  const m: Record<ShutterType, boolean> = {
    mechanical: false, electronic: true, electronic_first_curtain: false, global: true, rolling: true,
  };
  return m[s];
}

export function hasPhysicalBlades(s: ShutterType): boolean {
  const m: Record<ShutterType, boolean> = {
    mechanical: true, electronic: false, electronic_first_curtain: true, global: false, rolling: false,
  };
  return m[s];
}

export function bestUseCase(s: ShutterType): string {
  const m: Record<ShutterType, string> = {
    mechanical: "general_photography", electronic: "wildlife_stealth",
    electronic_first_curtain: "studio_portrait", global: "fast_action",
    rolling: "video",
  };
  return m[s];
}

export function bandingRisk(s: ShutterType): number {
  const m: Record<ShutterType, number> = {
    mechanical: 0, electronic: 8, electronic_first_curtain: 4, global: 1, rolling: 8,
  };
  return m[s];
}

export function shutterTypes(): ShutterType[] {
  return ["mechanical", "electronic", "electronic_first_curtain", "global", "rolling"];
}
