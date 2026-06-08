export interface TileLayer {
  name: string;
  data: number[][];
  visible: boolean;
}

export interface TileMap {
  width: number;
  height: number;
  tileSize: number;
  layers: TileLayer[];
}

export function createTileMap(width: number, height: number, tileSize: number): TileMap {
  return { width, height, tileSize, layers: [] };
}

export function addLayer(map: TileMap, name: string): TileLayer {
  const data = Array.from({ length: map.height }, () => new Array(map.width).fill(0));
  const layer: TileLayer = { name, data, visible: true };
  map.layers.push(layer);
  return layer;
}

export function setTile(layer: TileLayer, x: number, y: number, tileId: number): void {
  if (y >= 0 && y < layer.data.length && x >= 0 && x < layer.data[0].length) {
    layer.data[y][x] = tileId;
  }
}

export function getTile(layer: TileLayer, x: number, y: number): number {
  if (y >= 0 && y < layer.data.length && x >= 0 && x < layer.data[0].length) {
    return layer.data[y][x];
  }
  return -1;
}

export function fillRect(
  layer: TileLayer,
  x: number, y: number,
  w: number, h: number,
  tileId: number,
): void {
  for (let dy = 0; dy < h; dy++) {
    for (let dx = 0; dx < w; dx++) {
      setTile(layer, x + dx, y + dy, tileId);
    }
  }
}

export function floodFill(layer: TileLayer, x: number, y: number, tileId: number): number {
  const target = getTile(layer, x, y);
  if (target === tileId || target === -1) return 0;
  const h = layer.data.length;
  const w = layer.data[0].length;
  const stack: [number, number][] = [[x, y]];
  let count = 0;
  while (stack.length > 0) {
    const [cx, cy] = stack.pop()!;
    if (cx < 0 || cx >= w || cy < 0 || cy >= h) continue;
    if (layer.data[cy][cx] !== target) continue;
    layer.data[cy][cx] = tileId;
    count++;
    stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
  }
  return count;
}

export function worldToTile(map: TileMap, worldX: number, worldY: number): { x: number; y: number } {
  return {
    x: Math.floor(worldX / map.tileSize),
    y: Math.floor(worldY / map.tileSize),
  };
}

export function tileToWorld(map: TileMap, tileX: number, tileY: number): { x: number; y: number } {
  return {
    x: tileX * map.tileSize,
    y: tileY * map.tileSize,
  };
}

export function getVisibleTiles(
  map: TileMap,
  viewX: number, viewY: number,
  viewWidth: number, viewHeight: number,
): { x: number; y: number }[] {
  const startX = Math.max(0, Math.floor(viewX / map.tileSize));
  const startY = Math.max(0, Math.floor(viewY / map.tileSize));
  const endX = Math.min(map.width, Math.ceil((viewX + viewWidth) / map.tileSize));
  const endY = Math.min(map.height, Math.ceil((viewY + viewHeight) / map.tileSize));

  const tiles: { x: number; y: number }[] = [];
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      tiles.push({ x, y });
    }
  }
  return tiles;
}

export function findTiles(layer: TileLayer, tileId: number): { x: number; y: number }[] {
  const results: { x: number; y: number }[] = [];
  for (let y = 0; y < layer.data.length; y++) {
    for (let x = 0; x < layer.data[0].length; x++) {
      if (layer.data[y][x] === tileId) results.push({ x, y });
    }
  }
  return results;
}
