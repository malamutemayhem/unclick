export interface LumberDimension {
  nominalWidth: number;
  nominalThickness: number;
  actualWidth: number;
  actualThickness: number;
}

const DIMENSIONS: LumberDimension[] = [
  { nominalWidth: 2, nominalThickness: 2, actualWidth: 1.5, actualThickness: 1.5 },
  { nominalWidth: 4, nominalThickness: 2, actualWidth: 3.5, actualThickness: 1.5 },
  { nominalWidth: 6, nominalThickness: 2, actualWidth: 5.5, actualThickness: 1.5 },
  { nominalWidth: 8, nominalThickness: 2, actualWidth: 7.25, actualThickness: 1.5 },
  { nominalWidth: 10, nominalThickness: 2, actualWidth: 9.25, actualThickness: 1.5 },
  { nominalWidth: 12, nominalThickness: 2, actualWidth: 11.25, actualThickness: 1.5 },
  { nominalWidth: 4, nominalThickness: 4, actualWidth: 3.5, actualThickness: 3.5 },
  { nominalWidth: 6, nominalThickness: 4, actualWidth: 5.5, actualThickness: 3.5 },
  { nominalWidth: 6, nominalThickness: 6, actualWidth: 5.5, actualThickness: 5.5 },
];

export function actualDimension(nominalWidth: number, nominalThickness: number): LumberDimension | null {
  return DIMENSIONS.find(d => d.nominalWidth === nominalWidth && d.nominalThickness === nominalThickness) ?? null;
}

export function boardFeet(thicknessIn: number, widthIn: number, lengthFt: number): number {
  return parseFloat(((thicknessIn * widthIn * lengthFt) / 12).toFixed(2));
}

export function linearFeetToBoardFeet(linearFeet: number, nominalWidth: number, nominalThickness: number): number {
  return boardFeet(nominalThickness, nominalWidth, linearFeet);
}

export function boardFeetToLinearFeet(bf: number, nominalWidth: number, nominalThickness: number): number {
  const bfPerFoot = (nominalThickness * nominalWidth) / 12;
  if (bfPerFoot === 0) return 0;
  return parseFloat((bf / bfPerFoot).toFixed(2));
}

export function lumberCost(boardFeet_: number, pricePerBF: number): number {
  return parseFloat((boardFeet_ * pricePerBF).toFixed(2));
}

export function wasteAllowance(needed: number, wastePercent: number = 10): number {
  return parseFloat((needed * (1 + wastePercent / 100)).toFixed(2));
}

export function cutList(totalLength: number, stockLength: number): { pieces: number; waste: number } {
  if (stockLength <= 0) return { pieces: 0, waste: 0 };
  const pieces = Math.ceil(totalLength / stockLength);
  const waste = parseFloat((pieces * stockLength - totalLength).toFixed(2));
  return { pieces, waste };
}

export function optimizeCuts(lengths: number[], stockLength: number): { bins: number[][]; waste: number } {
  const sorted = [...lengths].sort((a, b) => b - a);
  const bins: number[][] = [];
  const remaining: number[] = [];

  for (const len of sorted) {
    let placed = false;
    for (let i = 0; i < bins.length; i++) {
      if (remaining[i] >= len) {
        bins[i].push(len);
        remaining[i] -= len;
        placed = true;
        break;
      }
    }
    if (!placed) {
      bins.push([len]);
      remaining.push(stockLength - len);
    }
  }

  const totalWaste = remaining.reduce((a, b) => a + b, 0);
  return { bins, waste: parseFloat(totalWaste.toFixed(2)) };
}

export function sheetGoods(widthIn: number, heightIn: number, sheetWidth = 48, sheetHeight = 96): { sheets: number; layout: { x: number; y: number }[] } {
  const cols = Math.floor(sheetWidth / widthIn);
  const rows = Math.floor(sheetHeight / heightIn);
  const perSheet = cols * rows;

  const layout: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      layout.push({ x: c * widthIn, y: r * heightIn });
    }
  }

  return { sheets: perSheet > 0 ? 1 : 0, layout };
}

export function sheetsNeeded(pieces: number, widthIn: number, heightIn: number, sheetWidth = 48, sheetHeight = 96): number {
  const cols = Math.floor(sheetWidth / widthIn);
  const rows = Math.floor(sheetHeight / heightIn);
  const perSheet = cols * rows;
  if (perSheet === 0) return pieces;
  return Math.ceil(pieces / perSheet);
}

export function weight(boardFeet_: number, densityLbsPerCuFt: number): number {
  const cubicFeet = boardFeet_ / 12;
  return parseFloat((cubicFeet * densityLbsPerCuFt).toFixed(1));
}

export const WOOD_DENSITIES: Record<string, number> = {
  pine: 31, oak: 47, maple: 44, cherry: 35, walnut: 38,
  cedar: 23, birch: 43, ash: 42, poplar: 29, mahogany: 40,
  teak: 41, spruce: 28, fir: 31, hickory: 51, bamboo: 45,
};

export function woodWeight(boardFeet_: number, species: string): number {
  const density = WOOD_DENSITIES[species.toLowerCase()] ?? 35;
  return weight(boardFeet_, density);
}

export function screwsNeeded(boardFeet_: number, screwsPerBF: number = 2): number {
  return Math.ceil(boardFeet_ * screwsPerBF);
}

export function glueCoverage(areaSqIn: number, spreadRate = 250): number {
  return parseFloat((areaSqIn / spreadRate).toFixed(2));
}

export function finishCoverage(areaSqFt: number, coats: number, coveragePerGallon = 350): number {
  return parseFloat(((areaSqFt * coats) / coveragePerGallon).toFixed(2));
}
