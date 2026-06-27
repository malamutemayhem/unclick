export type AwlType = "scratch_awl" | "stitching_awl" | "diamond_awl" | "round_awl" | "curved_awl";

export function holeSize(awl: AwlType): number {
  const m: Record<AwlType, number> = {
    scratch_awl: 2, stitching_awl: 5, diamond_awl: 4, round_awl: 6, curved_awl: 4,
  };
  return m[awl];
}

export function precisionRating(awl: AwlType): number {
  const m: Record<AwlType, number> = {
    scratch_awl: 6, stitching_awl: 8, diamond_awl: 9, round_awl: 5, curved_awl: 7,
  };
  return m[awl];
}

export function threadPassage(awl: AwlType): number {
  const m: Record<AwlType, number> = {
    scratch_awl: 2, stitching_awl: 9, diamond_awl: 7, round_awl: 5, curved_awl: 8,
  };
  return m[awl];
}

export function leatherDamage(awl: AwlType): number {
  const m: Record<AwlType, number> = {
    scratch_awl: 3, stitching_awl: 4, diamond_awl: 2, round_awl: 6, curved_awl: 3,
  };
  return m[awl];
}

export function versatility(awl: AwlType): number {
  const m: Record<AwlType, number> = {
    scratch_awl: 8, stitching_awl: 6, diamond_awl: 5, round_awl: 4, curved_awl: 7,
  };
  return m[awl];
}

export function lockStitchCapable(awl: AwlType): boolean {
  const m: Record<AwlType, boolean> = {
    scratch_awl: false, stitching_awl: true, diamond_awl: false, round_awl: false, curved_awl: true,
  };
  return m[awl];
}

export function marking(awl: AwlType): boolean {
  const m: Record<AwlType, boolean> = {
    scratch_awl: true, stitching_awl: false, diamond_awl: false, round_awl: false, curved_awl: false,
  };
  return m[awl];
}

export function bestApplication(awl: AwlType): string {
  const m: Record<AwlType, string> = {
    scratch_awl: "layout_marking", stitching_awl: "saddle_stitch",
    diamond_awl: "fine_stitch", round_awl: "lacing_holes", curved_awl: "shoe_repair",
  };
  return m[awl];
}

export function costEstimate(awl: AwlType): number {
  const m: Record<AwlType, number> = {
    scratch_awl: 10, stitching_awl: 25, diamond_awl: 20, round_awl: 12, curved_awl: 18,
  };
  return m[awl];
}

export function awlTypes(): AwlType[] {
  return ["scratch_awl", "stitching_awl", "diamond_awl", "round_awl", "curved_awl"];
}
