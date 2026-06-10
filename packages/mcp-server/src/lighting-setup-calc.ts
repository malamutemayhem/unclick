export type LightingSetup = "rembrandt" | "butterfly" | "split" | "loop" | "broad";

export function dramaticEffect(setup: LightingSetup): number {
  const m: Record<LightingSetup, number> = {
    rembrandt: 9, butterfly: 6, split: 10, loop: 5, broad: 4,
  };
  return m[setup];
}

export function flatteringRating(setup: LightingSetup): number {
  const m: Record<LightingSetup, number> = {
    rembrandt: 7, butterfly: 10, split: 4, loop: 8, broad: 6,
  };
  return m[setup];
}

export function shadowDepth(setup: LightingSetup): number {
  const m: Record<LightingSetup, number> = {
    rembrandt: 8, butterfly: 4, split: 10, loop: 5, broad: 3,
  };
  return m[setup];
}

export function setupDifficulty(setup: LightingSetup): number {
  const m: Record<LightingSetup, number> = {
    rembrandt: 6, butterfly: 7, split: 3, loop: 4, broad: 5,
  };
  return m[setup];
}

export function lightsRequired(setup: LightingSetup): number {
  const m: Record<LightingSetup, number> = {
    rembrandt: 2, butterfly: 2, split: 1, loop: 2, broad: 1,
  };
  return m[setup];
}

export function naturalLight(setup: LightingSetup): boolean {
  const m: Record<LightingSetup, boolean> = {
    rembrandt: true, butterfly: false, split: true, loop: true, broad: true,
  };
  return m[setup];
}

export function bestForHeadshot(setup: LightingSetup): boolean {
  const m: Record<LightingSetup, boolean> = {
    rembrandt: true, butterfly: true, split: false, loop: true, broad: false,
  };
  return m[setup];
}

export function bestSubject(setup: LightingSetup): string {
  const m: Record<LightingSetup, string> = {
    rembrandt: "character_portrait", butterfly: "beauty", split: "dramatic",
    loop: "corporate", broad: "casual",
  };
  return m[setup];
}

export function moodConveyed(setup: LightingSetup): string {
  const m: Record<LightingSetup, string> = {
    rembrandt: "artistic", butterfly: "glamorous", split: "mysterious",
    loop: "professional", broad: "open",
  };
  return m[setup];
}

export function lightingSetups(): LightingSetup[] {
  return ["rembrandt", "butterfly", "split", "loop", "broad"];
}
