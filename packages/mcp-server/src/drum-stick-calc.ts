export type DrumStick = "wood_tip_5a" | "wood_tip_5b" | "nylon_tip_7a" | "brush_wire" | "mallet_felt";

export function volume(d: DrumStick): number {
  const m: Record<DrumStick, number> = {
    wood_tip_5a: 7, wood_tip_5b: 9, nylon_tip_7a: 5, brush_wire: 3, mallet_felt: 6,
  };
  return m[d];
}

export function articulation(d: DrumStick): number {
  const m: Record<DrumStick, number> = {
    wood_tip_5a: 8, wood_tip_5b: 6, nylon_tip_7a: 9, brush_wire: 7, mallet_felt: 4,
  };
  return m[d];
}

export function rebound(d: DrumStick): number {
  const m: Record<DrumStick, number> = {
    wood_tip_5a: 8, wood_tip_5b: 7, nylon_tip_7a: 9, brush_wire: 2, mallet_felt: 3,
  };
  return m[d];
}

export function cymbalResponse(d: DrumStick): number {
  const m: Record<DrumStick, number> = {
    wood_tip_5a: 7, wood_tip_5b: 6, nylon_tip_7a: 10, brush_wire: 8, mallet_felt: 5,
  };
  return m[d];
}

export function stickCost(d: DrumStick): number {
  const m: Record<DrumStick, number> = {
    wood_tip_5a: 3, wood_tip_5b: 3, nylon_tip_7a: 4, brush_wire: 6, mallet_felt: 5,
  };
  return m[d];
}

export function retractable(d: DrumStick): boolean {
  const m: Record<DrumStick, boolean> = {
    wood_tip_5a: false, wood_tip_5b: false, nylon_tip_7a: false, brush_wire: true, mallet_felt: false,
  };
  return m[d];
}

export function suitableForRock(d: DrumStick): boolean {
  const m: Record<DrumStick, boolean> = {
    wood_tip_5a: true, wood_tip_5b: true, nylon_tip_7a: false, brush_wire: false, mallet_felt: false,
  };
  return m[d];
}

export function tipMaterial(d: DrumStick): string {
  const m: Record<DrumStick, string> = {
    wood_tip_5a: "hickory_acorn_wood_tip", wood_tip_5b: "hickory_barrel_wood_tip",
    nylon_tip_7a: "maple_nylon_round_tip", brush_wire: "steel_wire_retractable_fan",
    mallet_felt: "birch_shaft_wrapped_felt",
  };
  return m[d];
}

export function bestGenre(d: DrumStick): string {
  const m: Record<DrumStick, string> = {
    wood_tip_5a: "pop_funk_general_purpose", wood_tip_5b: "rock_metal_heavy_hitting",
    nylon_tip_7a: "jazz_light_fast_technique", brush_wire: "jazz_ballad_quiet_sweep",
    mallet_felt: "orchestral_timpani_cymbal_roll",
  };
  return m[d];
}

export function drumSticks(): DrumStick[] {
  return ["wood_tip_5a", "wood_tip_5b", "nylon_tip_7a", "brush_wire", "mallet_felt"];
}
