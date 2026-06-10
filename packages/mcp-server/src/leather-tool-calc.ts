export type LeatherTool = "swivel_knife" | "beveler" | "pear_shader" | "backgrounder" | "seeder";

export function precisionRating(tool: LeatherTool): number {
  const m: Record<LeatherTool, number> = {
    swivel_knife: 9, beveler: 6, pear_shader: 7, backgrounder: 5, seeder: 4,
  };
  return m[tool];
}

export function depthControl(tool: LeatherTool): number {
  const m: Record<LeatherTool, number> = {
    swivel_knife: 8, beveler: 7, pear_shader: 5, backgrounder: 4, seeder: 3,
  };
  return m[tool];
}

export function textureCreation(tool: LeatherTool): number {
  const m: Record<LeatherTool, number> = {
    swivel_knife: 3, beveler: 5, pear_shader: 7, backgrounder: 9, seeder: 8,
  };
  return m[tool];
}

export function versatility(tool: LeatherTool): number {
  const m: Record<LeatherTool, number> = {
    swivel_knife: 9, beveler: 7, pear_shader: 5, backgrounder: 4, seeder: 3,
  };
  return m[tool];
}

export function learningCurve(tool: LeatherTool): number {
  const m: Record<LeatherTool, number> = {
    swivel_knife: 8, beveler: 5, pear_shader: 4, backgrounder: 3, seeder: 2,
  };
  return m[tool];
}

export function essentialTool(tool: LeatherTool): boolean {
  const m: Record<LeatherTool, boolean> = {
    swivel_knife: true, beveler: true, pear_shader: false, backgrounder: false, seeder: false,
  };
  return m[tool];
}

export function malletRequired(tool: LeatherTool): boolean {
  const m: Record<LeatherTool, boolean> = {
    swivel_knife: false, beveler: true, pear_shader: true, backgrounder: true, seeder: true,
  };
  return m[tool];
}

export function bestTechnique(tool: LeatherTool): string {
  const m: Record<LeatherTool, string> = {
    swivel_knife: "cutting_lines", beveler: "sculpting_relief", pear_shader: "shading",
    backgrounder: "matting", seeder: "decorating",
  };
  return m[tool];
}

export function costEstimate(tool: LeatherTool): number {
  const m: Record<LeatherTool, number> = {
    swivel_knife: 40, beveler: 15, pear_shader: 12, backgrounder: 10, seeder: 10,
  };
  return m[tool];
}

export function leatherTools(): LeatherTool[] {
  return ["swivel_knife", "beveler", "pear_shader", "backgrounder", "seeder"];
}
