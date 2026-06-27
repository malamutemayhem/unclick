// lcd-character-calc - LCD character display module types

export type LcdCharacter =
  | "lcd_16x2_standard"
  | "lcd_20x4_large"
  | "lcd_8x2_compact"
  | "lcd_40x4_wide"
  | "lcd_16x2_i2c_backpack";

const DATA: Record<LcdCharacter, {
  charCapacity: number; viewAngle: number; powerDraw: number; readability: number;
  cost: number; backlit: boolean; i2cInterface: boolean; controllerType: string; bestUse: string;
}> = {
  lcd_16x2_standard:      { charCapacity: 6, viewAngle: 6, powerDraw: 5, readability: 7, cost: 2, backlit: true, i2cInterface: false, controllerType: "hd44780_parallel", bestUse: "general_text_readout" },
  lcd_20x4_large:         { charCapacity: 9, viewAngle: 7, powerDraw: 4, readability: 8, cost: 4, backlit: true, i2cInterface: false, controllerType: "hd44780_parallel", bestUse: "multi_line_data" },
  lcd_8x2_compact:        { charCapacity: 3, viewAngle: 5, powerDraw: 7, readability: 6, cost: 3, backlit: false, i2cInterface: false, controllerType: "hd44780_mini", bestUse: "tiny_status_text" },
  lcd_40x4_wide:          { charCapacity: 10, viewAngle: 7, powerDraw: 3, readability: 8, cost: 7, backlit: true, i2cInterface: false, controllerType: "dual_hd44780", bestUse: "wide_format_text" },
  lcd_16x2_i2c_backpack:  { charCapacity: 6, viewAngle: 6, powerDraw: 5, readability: 7, cost: 4, backlit: true, i2cInterface: true, controllerType: "pcf8574_i2c_hd44780", bestUse: "easy_wire_text" },
};

const get = (l: LcdCharacter) => DATA[l];
export const charCapacity = (l: LcdCharacter) => get(l).charCapacity;
export const viewAngle = (l: LcdCharacter) => get(l).viewAngle;
export const powerDraw = (l: LcdCharacter) => get(l).powerDraw;
export const readability = (l: LcdCharacter) => get(l).readability;
export const lcdCost = (l: LcdCharacter) => get(l).cost;
export const backlit = (l: LcdCharacter) => get(l).backlit;
export const i2cInterface = (l: LcdCharacter) => get(l).i2cInterface;
export const controllerType = (l: LcdCharacter) => get(l).controllerType;
export const bestUse = (l: LcdCharacter) => get(l).bestUse;
export const lcdCharacters = (): LcdCharacter[] => Object.keys(DATA) as LcdCharacter[];
