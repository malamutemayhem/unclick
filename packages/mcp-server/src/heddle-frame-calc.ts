export type HeddleFrameType = "wire_heddle_metal" | "texsolv_cord_poly" | "string_heddle_cotton" | "inserted_eye_steel" | "flat_steel_strip";

export function threadControl(t: HeddleFrameType): number {
  const m: Record<HeddleFrameType, number> = {
    wire_heddle_metal: 8, texsolv_cord_poly: 9, string_heddle_cotton: 6, inserted_eye_steel: 10, flat_steel_strip: 7,
  };
  return m[t];
}

export function yarnGentle(t: HeddleFrameType): number {
  const m: Record<HeddleFrameType, number> = {
    wire_heddle_metal: 5, texsolv_cord_poly: 9, string_heddle_cotton: 10, inserted_eye_steel: 4, flat_steel_strip: 6,
  };
  return m[t];
}

export function durability(t: HeddleFrameType): number {
  const m: Record<HeddleFrameType, number> = {
    wire_heddle_metal: 9, texsolv_cord_poly: 7, string_heddle_cotton: 3, inserted_eye_steel: 10, flat_steel_strip: 8,
  };
  return m[t];
}

export function noiseLevel(t: HeddleFrameType): number {
  const m: Record<HeddleFrameType, number> = {
    wire_heddle_metal: 8, texsolv_cord_poly: 3, string_heddle_cotton: 2, inserted_eye_steel: 9, flat_steel_strip: 7,
  };
  return m[t];
}

export function heddleCost(t: HeddleFrameType): number {
  const m: Record<HeddleFrameType, number> = {
    wire_heddle_metal: 2, texsolv_cord_poly: 3, string_heddle_cotton: 1, inserted_eye_steel: 4, flat_steel_strip: 2,
  };
  return m[t];
}

export function replaceable(t: HeddleFrameType): boolean {
  const m: Record<HeddleFrameType, boolean> = {
    wire_heddle_metal: true, texsolv_cord_poly: true, string_heddle_cotton: true, inserted_eye_steel: true, flat_steel_strip: false,
  };
  return m[t];
}

export function adjustableEye(t: HeddleFrameType): boolean {
  const m: Record<HeddleFrameType, boolean> = {
    wire_heddle_metal: false, texsolv_cord_poly: true, string_heddle_cotton: false, inserted_eye_steel: false, flat_steel_strip: false,
  };
  return m[t];
}

export function heddleMaterial(t: HeddleFrameType): string {
  const m: Record<HeddleFrameType, string> = {
    wire_heddle_metal: "stainless_steel_wire",
    texsolv_cord_poly: "polyester_braided_cord",
    string_heddle_cotton: "twisted_cotton_string",
    inserted_eye_steel: "stamped_steel_eye",
    flat_steel_strip: "flat_spring_steel",
  };
  return m[t];
}

export function bestLoom(t: HeddleFrameType): string {
  const m: Record<HeddleFrameType, string> = {
    wire_heddle_metal: "floor_loom_standard",
    texsolv_cord_poly: "countermarche_loom",
    string_heddle_cotton: "backstrap_loom_simple",
    inserted_eye_steel: "dobby_loom_complex",
    flat_steel_strip: "rigid_heddle_frame",
  };
  return m[t];
}

export function heddleFrames(): HeddleFrameType[] {
  return ["wire_heddle_metal", "texsolv_cord_poly", "string_heddle_cotton", "inserted_eye_steel", "flat_steel_strip"];
}
