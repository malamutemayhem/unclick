export interface Room {
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
}

export interface Corridor {
  from: number;
  to: number;
  path: { x: number; y: number }[];
}

export interface DungeonConfig {
  width: number;
  height: number;
  maxRooms?: number;
  minRoomSize?: number;
  maxRoomSize?: number;
  seed?: number;
}

export interface Dungeon {
  grid: number[][];
  rooms: Room[];
  corridors: Corridor[];
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

export function generate(config: DungeonConfig): Dungeon {
  const {
    width, height,
    maxRooms = 10,
    minRoomSize = 4,
    maxRoomSize = 10,
    seed = Date.now(),
  } = config;

  const rng = seededRandom(seed);
  const grid: number[][] = Array.from({ length: height }, () => new Array(width).fill(1));
  const rooms: Room[] = [];

  for (let attempt = 0; attempt < maxRooms * 10 && rooms.length < maxRooms; attempt++) {
    const w = Math.floor(rng() * (maxRoomSize - minRoomSize + 1)) + minRoomSize;
    const h = Math.floor(rng() * (maxRoomSize - minRoomSize + 1)) + minRoomSize;
    const x = Math.floor(rng() * (width - w - 2)) + 1;
    const y = Math.floor(rng() * (height - h - 2)) + 1;

    const room: Room = { x, y, width: w, height: h, id: rooms.length };
    let overlaps = false;
    for (const other of rooms) {
      if (
        room.x - 1 < other.x + other.width &&
        room.x + room.width + 1 > other.x &&
        room.y - 1 < other.y + other.height &&
        room.y + room.height + 1 > other.y
      ) {
        overlaps = true;
        break;
      }
    }
    if (overlaps) continue;

    for (let ry = y; ry < y + h; ry++) {
      for (let rx = x; rx < x + w; rx++) {
        grid[ry][rx] = 0;
      }
    }
    rooms.push(room);
  }

  const corridors: Corridor[] = [];
  for (let i = 1; i < rooms.length; i++) {
    const a = rooms[i - 1];
    const b = rooms[i];
    const ax = Math.floor(a.x + a.width / 2);
    const ay = Math.floor(a.y + a.height / 2);
    const bx = Math.floor(b.x + b.width / 2);
    const by = Math.floor(b.y + b.height / 2);

    const path: { x: number; y: number }[] = [];

    if (rng() > 0.5) {
      for (let x = Math.min(ax, bx); x <= Math.max(ax, bx); x++) {
        grid[ay][x] = 0;
        path.push({ x, y: ay });
      }
      for (let y = Math.min(ay, by); y <= Math.max(ay, by); y++) {
        grid[y][bx] = 0;
        path.push({ x: bx, y });
      }
    } else {
      for (let y = Math.min(ay, by); y <= Math.max(ay, by); y++) {
        grid[y][ax] = 0;
        path.push({ x: ax, y });
      }
      for (let x = Math.min(ax, bx); x <= Math.max(ax, bx); x++) {
        grid[by][x] = 0;
        path.push({ x, y: by });
      }
    }

    corridors.push({ from: a.id, to: b.id, path });
  }

  return { grid, rooms, corridors };
}

export function gridToString(grid: number[][]): string {
  return grid.map((row) => row.map((c) => (c === 0 ? "." : "#")).join("")).join("\n");
}

export function findSpawnPoint(dungeon: Dungeon): { x: number; y: number } {
  const room = dungeon.rooms[0];
  return {
    x: Math.floor(room.x + room.width / 2),
    y: Math.floor(room.y + room.height / 2),
  };
}

export function findExitPoint(dungeon: Dungeon): { x: number; y: number } {
  const room = dungeon.rooms[dungeon.rooms.length - 1];
  return {
    x: Math.floor(room.x + room.width / 2),
    y: Math.floor(room.y + room.height / 2),
  };
}
