export type ShuttleLoomType =
  | "boat_shuttle_standard"
  | "stick_shuttle_flat"
  | "rag_shuttle_wide"
  | "ski_shuttle_long"
  | "end_feed_tension";

const specs: Record<ShuttleLoomType, {
  throwSmooth: number; weftEven: number; speedWeave: number;
  yarnRange: number; cost: number; tensioned: boolean; forRag: boolean;
  shuttleShape: string; use: string;
}> = {
  boat_shuttle_standard: {
    throwSmooth: 90, weftEven: 88, speedWeave: 85,
    yarnRange: 82, cost: 25, tensioned: false, forRag: false,
    shuttleShape: "tapered_boat_form", use: "general_fine_weave",
  },
  stick_shuttle_flat: {
    throwSmooth: 75, weftEven: 78, speedWeave: 70,
    yarnRange: 90, cost: 5, tensioned: false, forRag: false,
    shuttleShape: "flat_notched_stick", use: "rigid_heddle_weave",
  },
  rag_shuttle_wide: {
    throwSmooth: 72, weftEven: 75, speedWeave: 78,
    yarnRange: 95, cost: 8, tensioned: false, forRag: true,
    shuttleShape: "wide_flat_shuttle", use: "rag_rug_weave",
  },
  ski_shuttle_long: {
    throwSmooth: 85, weftEven: 82, speedWeave: 88,
    yarnRange: 78, cost: 20, tensioned: false, forRag: false,
    shuttleShape: "long_ski_curved", use: "wide_loom_throw",
  },
  end_feed_tension: {
    throwSmooth: 88, weftEven: 92, speedWeave: 82,
    yarnRange: 80, cost: 35, tensioned: true, forRag: false,
    shuttleShape: "pirn_feed_boat", use: "even_tension_weave",
  },
};

export function throwSmooth(t: ShuttleLoomType): number { return specs[t].throwSmooth; }
export function weftEven(t: ShuttleLoomType): number { return specs[t].weftEven; }
export function speedWeave(t: ShuttleLoomType): number { return specs[t].speedWeave; }
export function yarnRange(t: ShuttleLoomType): number { return specs[t].yarnRange; }
export function shuttleCost(t: ShuttleLoomType): number { return specs[t].cost; }
export function tensioned(t: ShuttleLoomType): boolean { return specs[t].tensioned; }
export function forRag(t: ShuttleLoomType): boolean { return specs[t].forRag; }
export function shuttleShape(t: ShuttleLoomType): string { return specs[t].shuttleShape; }
export function bestUse(t: ShuttleLoomType): string { return specs[t].use; }
export function shuttleLooms(): ShuttleLoomType[] { return Object.keys(specs) as ShuttleLoomType[]; }
