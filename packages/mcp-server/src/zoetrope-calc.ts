export type AnimationType = "walk_cycle" | "run_cycle" | "jump" | "wave" | "morph" | "abstract";

export function frameCount(animation: AnimationType): number {
  const frames: Record<AnimationType, number> = {
    walk_cycle: 12, run_cycle: 8, jump: 10, wave: 8, morph: 16, abstract: 12,
  };
  return frames[animation];
}

export function slitCount(frames: number): number {
  return frames;
}

export function drumDiameter(frames: number, frameWidthCm: number): number {
  const circumference = frames * frameWidthCm * 1.2;
  return parseFloat((circumference / Math.PI).toFixed(1));
}

export function drumHeight(frameHeightCm: number): number {
  return parseFloat((frameHeightCm * 1.5).toFixed(1));
}

export function slitWidth(frameWidthCm: number): number {
  return parseFloat((frameWidthCm * 0.1).toFixed(2));
}

export function rotationSpeed(fps: number, frames: number): number {
  if (frames <= 0) return 0;
  return parseFloat((fps * 60 / frames).toFixed(1));
}

export function optimalFps(): number {
  return 12;
}

export function persistenceOfVision(): number {
  return 0.04;
}

export function stripLength(drumDiameterCm: number): number {
  return parseFloat((Math.PI * drumDiameterCm).toFixed(1));
}

export function frameSpacing(stripLengthCm: number, frames: number): number {
  if (frames <= 0) return 0;
  return parseFloat((stripLengthCm / frames).toFixed(2));
}

export function viewingAngle(slitWidthCm: number, drumDiameterCm: number): number {
  return parseFloat((Math.atan(slitWidthCm / (drumDiameterCm / 2)) * 180 / Math.PI).toFixed(1));
}

export function motorSpeed(targetRpm: number): number {
  return targetRpm;
}

export function buildDifficulty(frames: number): string {
  if (frames <= 8) return "easy";
  if (frames <= 12) return "moderate";
  return "challenging";
}

export function animationTypes(): AnimationType[] {
  return ["walk_cycle", "run_cycle", "jump", "wave", "morph", "abstract"];
}
