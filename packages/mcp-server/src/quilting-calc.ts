export type QuiltSize = "baby" | "throw" | "twin" | "full" | "queen" | "king";
export type BlockType = "square" | "half_square_triangle" | "flying_geese" | "log_cabin" | "pinwheel" | "star";

export function quiltDimensions(size: QuiltSize): { widthIn: number; heightIn: number } {
  const dims: Record<QuiltSize, [number, number]> = {
    baby: [36, 52], throw: [50, 65], twin: [68, 86],
    full: [86, 86], queen: [90, 108], king: [108, 108],
  };
  const [w, h] = dims[size];
  return { widthIn: w, heightIn: h };
}

export function blocksNeeded(quiltWidthIn: number, quiltHeightIn: number, blockSizeIn: number): number {
  if (blockSizeIn <= 0) return 0;
  const cols = Math.ceil(quiltWidthIn / blockSizeIn);
  const rows = Math.ceil(quiltHeightIn / blockSizeIn);
  return cols * rows;
}

export function fabricYards(squareInches: number): number {
  const sqYards = squareInches / 1296;
  return parseFloat((sqYards * 1.15).toFixed(2));
}

export function battingYards(widthIn: number, heightIn: number): number {
  const area = (widthIn + 4) * (heightIn + 4);
  return parseFloat((area / 1296).toFixed(2));
}

export function bindingStrips(perimeterIn: number, fabricWidthIn: number): number {
  const totalBinding = perimeterIn + 12;
  if (fabricWidthIn <= 0) return 0;
  return Math.ceil(totalBinding / fabricWidthIn);
}

export function seamAllowance(): number {
  return 0.25;
}

export function cutSize(finishedSizeIn: number): number {
  return parseFloat((finishedSizeIn + 0.5).toFixed(2));
}

export function piecesPerBlock(block: BlockType): number {
  const pieces: Record<BlockType, number> = {
    square: 1, half_square_triangle: 2, flying_geese: 3,
    log_cabin: 13, pinwheel: 4, star: 8,
  };
  return pieces[block];
}

export function totalPieces(blocks: number, piecesPerBlock: number): number {
  return blocks * piecesPerBlock;
}

export function sewingTime(totalPieces: number, minutesPerPiece: number): number {
  return parseFloat((totalPieces * minutesPerPiece / 60).toFixed(1));
}

export function threadYards(perimeterInchesTotal: number): number {
  return parseFloat((perimeterInchesTotal * 2.5 / 36).toFixed(1));
}

export function quiltWeight(widthIn: number, heightIn: number): number {
  const sqFt = (widthIn * heightIn) / 144;
  return parseFloat((sqFt * 0.15).toFixed(1));
}

export function quiltSizes(): QuiltSize[] {
  return ["baby", "throw", "twin", "full", "queen", "king"];
}
