export interface Vec2 {
  x: number;
  y: number;
}

export interface Ray {
  origin: Vec2;
  direction: Vec2;
}

export interface RayHit {
  distance: number;
  point: Vec2;
  normal: Vec2;
  side: "horizontal" | "vertical";
}

export interface GridMap {
  width: number;
  height: number;
  cells: number[][];
}

export function createMap(width: number, height: number): GridMap {
  const cells: number[][] = [];
  for (let y = 0; y < height; y++) {
    cells.push(new Array(width).fill(0));
  }
  return { width, height, cells };
}

export function setWall(map: GridMap, x: number, y: number, value = 1): void {
  if (x >= 0 && x < map.width && y >= 0 && y < map.height) {
    map.cells[y][x] = value;
  }
}

export function isWall(map: GridMap, x: number, y: number): boolean {
  if (x < 0 || x >= map.width || y < 0 || y >= map.height) return true;
  return map.cells[y][x] > 0;
}

export function castRay(map: GridMap, ray: Ray, maxDist = 100): RayHit | null {
  const dx = ray.direction.x;
  const dy = ray.direction.y;

  let mapX = Math.floor(ray.origin.x);
  let mapY = Math.floor(ray.origin.y);

  const stepX = dx > 0 ? 1 : -1;
  const stepY = dy > 0 ? 1 : -1;

  const tDeltaX = dx !== 0 ? Math.abs(1 / dx) : Infinity;
  const tDeltaY = dy !== 0 ? Math.abs(1 / dy) : Infinity;

  let tMaxX = dx !== 0
    ? ((dx > 0 ? mapX + 1 : mapX) - ray.origin.x) / dx
    : Infinity;
  let tMaxY = dy !== 0
    ? ((dy > 0 ? mapY + 1 : mapY) - ray.origin.y) / dy
    : Infinity;

  let side: "horizontal" | "vertical" = "vertical";

  for (let i = 0; i < maxDist * 10; i++) {
    if (tMaxX < tMaxY) {
      tMaxX += tDeltaX;
      mapX += stepX;
      side = "vertical";
    } else {
      tMaxY += tDeltaY;
      mapY += stepY;
      side = "horizontal";
    }

    if (mapX < 0 || mapX >= map.width || mapY < 0 || mapY >= map.height) {
      return null;
    }

    if (map.cells[mapY][mapX] > 0) {
      const dist = side === "vertical"
        ? (mapX - ray.origin.x + (1 - stepX) / 2) / dx
        : (mapY - ray.origin.y + (1 - stepY) / 2) / dy;

      if (dist > maxDist) return null;

      const point: Vec2 = {
        x: ray.origin.x + dist * dx,
        y: ray.origin.y + dist * dy,
      };

      const normal: Vec2 = side === "vertical"
        ? { x: -stepX, y: 0 }
        : { x: 0, y: -stepY };

      return { distance: dist, point, normal, side };
    }
  }

  return null;
}

export function castMultipleRays(
  map: GridMap,
  origin: Vec2,
  startAngle: number,
  fov: number,
  numRays: number,
  maxDist = 100
): (RayHit | null)[] {
  const results: (RayHit | null)[] = [];
  const step = fov / numRays;

  for (let i = 0; i < numRays; i++) {
    const angle = startAngle - fov / 2 + i * step;
    const rad = (angle * Math.PI) / 180;
    const ray: Ray = {
      origin,
      direction: { x: Math.cos(rad), y: Math.sin(rad) },
    };
    results.push(castRay(map, ray, maxDist));
  }

  return results;
}

export function renderTopDown(map: GridMap, playerPos?: Vec2): string {
  const lines: string[] = [];
  for (let y = 0; y < map.height; y++) {
    let line = "";
    for (let x = 0; x < map.width; x++) {
      if (playerPos && Math.floor(playerPos.x) === x && Math.floor(playerPos.y) === y) {
        line += "@";
      } else {
        line += map.cells[y][x] > 0 ? "#" : ".";
      }
    }
    lines.push(line);
  }
  return lines.join("\n");
}

export function renderColumnView(
  hits: (RayHit | null)[],
  screenHeight: number,
  maxDist: number
): string[] {
  const columns: string[] = [];
  for (const hit of hits) {
    if (!hit) {
      columns.push(" ".repeat(screenHeight));
      continue;
    }
    const wallHeight = Math.min(screenHeight, Math.floor(screenHeight / (hit.distance + 0.1)));
    const padding = Math.floor((screenHeight - wallHeight) / 2);
    const wallChar = hit.side === "vertical" ? "#" : "%";
    columns.push(
      " ".repeat(padding) +
      wallChar.repeat(wallHeight) +
      " ".repeat(screenHeight - padding - wallHeight)
    );
  }
  return columns;
}
