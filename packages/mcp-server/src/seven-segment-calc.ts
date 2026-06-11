// seven-segment-calc - seven segment display types

export type SevenSegment =
  | "single_digit_led"
  | "four_digit_clock"
  | "bar_graph_array"
  | "alphanumeric_14seg"
  | "large_digit_outdoor";

const DATA: Record<SevenSegment, {
  brightness: number; digitCount: number; viewDistance: number; powerDraw: number;
  cost: number; commonCathode: boolean; multiplexed: boolean; segmentType: string; bestUse: string;
}> = {
  single_digit_led:      { brightness: 6, digitCount: 2, viewDistance: 5, powerDraw: 8, cost: 1, commonCathode: true, multiplexed: false, segmentType: "standard_7seg_led", bestUse: "simple_digit_show" },
  four_digit_clock:      { brightness: 7, digitCount: 7, viewDistance: 6, powerDraw: 6, cost: 3, commonCathode: true, multiplexed: true, segmentType: "colon_clock_7seg", bestUse: "clock_counter_show" },
  bar_graph_array:       { brightness: 6, digitCount: 3, viewDistance: 5, powerDraw: 5, cost: 2, commonCathode: true, multiplexed: false, segmentType: "led_bar_segment", bestUse: "level_meter_bar" },
  alphanumeric_14seg:    { brightness: 7, digitCount: 5, viewDistance: 6, powerDraw: 5, cost: 5, commonCathode: false, multiplexed: true, segmentType: "14_segment_alpha", bestUse: "text_char_display" },
  large_digit_outdoor:   { brightness: 10, digitCount: 8, viewDistance: 10, powerDraw: 3, cost: 8, commonCathode: false, multiplexed: true, segmentType: "high_bright_outdoor", bestUse: "scoreboard_sign" },
};

const get = (s: SevenSegment) => DATA[s];
export const brightness = (s: SevenSegment) => get(s).brightness;
export const digitCount = (s: SevenSegment) => get(s).digitCount;
export const viewDistance = (s: SevenSegment) => get(s).viewDistance;
export const powerDraw = (s: SevenSegment) => get(s).powerDraw;
export const segCost = (s: SevenSegment) => get(s).cost;
export const commonCathode = (s: SevenSegment) => get(s).commonCathode;
export const multiplexed = (s: SevenSegment) => get(s).multiplexed;
export const segmentType = (s: SevenSegment) => get(s).segmentType;
export const bestUse = (s: SevenSegment) => get(s).bestUse;
export const sevenSegments = (): SevenSegment[] => Object.keys(DATA) as SevenSegment[];
