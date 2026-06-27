export interface HeatGrid {
  width: number;
  height: number;
  temperature: Float64Array;
  conductivity: number;
}

export function createGrid(width: number, height: number, initialTemp = 0, conductivity = 0.25): HeatGrid {
  const temperature = new Float64Array(width * height).fill(initialTemp);
  return { width, height, temperature, conductivity };
}

export function setTemperature(grid: HeatGrid, x: number, y: number, temp: number): void {
  if (x >= 0 && x < grid.width && y >= 0 && y < grid.height) {
    grid.temperature[y * grid.width + x] = temp;
  }
}

export function getTemperature(grid: HeatGrid, x: number, y: number): number {
  if (x < 0 || x >= grid.width || y < 0 || y >= grid.height) return 0;
  return grid.temperature[y * grid.width + x];
}

export function addHeatSource(grid: HeatGrid, x: number, y: number, radius: number, temp: number): void {
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      if (dx * dx + dy * dy <= radius * radius) {
        setTemperature(grid, x + dx, y + dy, temp);
      }
    }
  }
}

export function step(grid: HeatGrid): void {
  const next = new Float64Array(grid.temperature.length);
  const k = grid.conductivity;

  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const idx = y * grid.width + x;
      const current = grid.temperature[idx];

      const left = x > 0 ? grid.temperature[idx - 1] : current;
      const right = x < grid.width - 1 ? grid.temperature[idx + 1] : current;
      const up = y > 0 ? grid.temperature[idx - grid.width] : current;
      const down = y < grid.height - 1 ? grid.temperature[idx + grid.width] : current;

      next[idx] = current + k * (left + right + up + down - 4 * current);
    }
  }

  grid.temperature = next;
}

export function stepN(grid: HeatGrid, n: number): void {
  for (let i = 0; i < n; i++) step(grid);
}

export function getAverageTemp(grid: HeatGrid): number {
  let sum = 0;
  for (let i = 0; i < grid.temperature.length; i++) {
    sum += grid.temperature[i];
  }
  return sum / grid.temperature.length;
}

export function getMaxTemp(grid: HeatGrid): number {
  let max = -Infinity;
  for (let i = 0; i < grid.temperature.length; i++) {
    if (grid.temperature[i] > max) max = grid.temperature[i];
  }
  return max;
}

export function getMinTemp(grid: HeatGrid): number {
  let min = Infinity;
  for (let i = 0; i < grid.temperature.length; i++) {
    if (grid.temperature[i] < min) min = grid.temperature[i];
  }
  return min;
}

export function toAscii(grid: HeatGrid, chars = " .:-=+*#%@"): string {
  const max = getMaxTemp(grid) || 1;
  const min = getMinTemp(grid);
  const range = max - min || 1;
  const lines: string[] = [];

  for (let y = 0; y < grid.height; y++) {
    let line = "";
    for (let x = 0; x < grid.width; x++) {
      const t = grid.temperature[y * grid.width + x];
      const normalized = (t - min) / range;
      const idx = Math.min(chars.length - 1, Math.floor(normalized * chars.length));
      line += chars[idx];
    }
    lines.push(line);
  }

  return lines.join("\n");
}

export function getTotalEnergy(grid: HeatGrid): number {
  let total = 0;
  for (let i = 0; i < grid.temperature.length; i++) {
    total += grid.temperature[i];
  }
  return total;
}
