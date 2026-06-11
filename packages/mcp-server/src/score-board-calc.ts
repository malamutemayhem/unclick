// score-board-calc - paper craft scoring board types

export type ScoreBoard =
  | "imperial_board_inch"
  | "metric_board_cm"
  | "mini_board_travel"
  | "magnetic_board_lock"
  | "glass_board_precision";

const DATA: Record<ScoreBoard, {
  scoreAccuracy: number; channelRange: number; durability: number; portability: number;
  cost: number; magnetic: boolean; metric: boolean; surfaceType: string; bestUse: string;
}> = {
  imperial_board_inch:   { scoreAccuracy: 8, channelRange: 9, durability: 8, portability: 6, cost: 7, magnetic: false, metric: false, surfaceType: "scored_plastic_grid", bestUse: "general_card_score" },
  metric_board_cm:       { scoreAccuracy: 8, channelRange: 8, durability: 8, portability: 6, cost: 7, magnetic: false, metric: true, surfaceType: "metric_engraved_grid", bestUse: "metric_project_score" },
  mini_board_travel:     { scoreAccuracy: 6, channelRange: 5, durability: 7, portability: 10, cost: 5, magnetic: false, metric: false, surfaceType: "compact_score_grid", bestUse: "travel_small_project" },
  magnetic_board_lock:   { scoreAccuracy: 9, channelRange: 8, durability: 9, portability: 5, cost: 9, magnetic: true, metric: false, surfaceType: "magnetic_lock_grid", bestUse: "precision_repeat_score" },
  glass_board_precision: { scoreAccuracy: 10, channelRange: 7, durability: 10, portability: 4, cost: 10, magnetic: false, metric: false, surfaceType: "tempered_glass_flat", bestUse: "fine_detail_score" },
};

const get = (b: ScoreBoard) => DATA[b];
export const scoreAccuracy = (b: ScoreBoard) => get(b).scoreAccuracy;
export const channelRange = (b: ScoreBoard) => get(b).channelRange;
export const durability = (b: ScoreBoard) => get(b).durability;
export const portability = (b: ScoreBoard) => get(b).portability;
export const boardCost = (b: ScoreBoard) => get(b).cost;
export const magnetic = (b: ScoreBoard) => get(b).magnetic;
export const metric = (b: ScoreBoard) => get(b).metric;
export const surfaceType = (b: ScoreBoard) => get(b).surfaceType;
export const bestUse = (b: ScoreBoard) => get(b).bestUse;
export const scoreBoards = (): ScoreBoard[] => Object.keys(DATA) as ScoreBoard[];
