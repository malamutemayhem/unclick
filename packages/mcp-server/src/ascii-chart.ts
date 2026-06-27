export interface ChartOptions {
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  title?: string;
}

export function lineChart(data: number[], options: ChartOptions = {}): string {
  const { height = 10, title } = options;
  if (data.length === 0) return "";

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const lines: string[] = [];
  if (title) lines.push(title);

  const labelWidth = Math.max(max.toFixed(1).length, min.toFixed(1).length);

  for (let row = height; row >= 0; row--) {
    const value = min + (range * row) / height;
    const label = value.toFixed(1).padStart(labelWidth);
    let line = `${label} |`;
    for (let col = 0; col < data.length; col++) {
      const normalized = ((data[col] - min) / range) * height;
      const rounded = Math.round(normalized);
      if (rounded === row) {
        line += "*";
      } else {
        line += " ";
      }
    }
    lines.push(line);
  }

  const axisLine = " ".repeat(labelWidth) + " +" + "-".repeat(data.length);
  lines.push(axisLine);

  return lines.join("\n");
}

export function barChart(
  labels: string[],
  values: number[],
  options: ChartOptions = {},
): string {
  const { width = 40, title } = options;
  if (labels.length === 0) return "";

  const max = Math.max(...values, 1);
  const lines: string[] = [];
  if (title) lines.push(title);

  const maxLabel = Math.max(...labels.map((l) => l.length));

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i].padStart(maxLabel);
    const barLen = Math.round((values[i] / max) * width);
    const bar = "#".repeat(barLen);
    lines.push(`${label} | ${bar} ${values[i]}`);
  }

  return lines.join("\n");
}

export function histogram(
  data: number[],
  bins = 10,
  options: ChartOptions = {},
): string {
  if (data.length === 0) return "";
  const min = Math.min(...data);
  const max = Math.max(...data);
  const binWidth = (max - min) / bins || 1;

  const counts = new Array(bins).fill(0);
  for (const v of data) {
    const idx = Math.min(Math.floor((v - min) / binWidth), bins - 1);
    counts[idx]++;
  }

  const labels = counts.map((_, i) => {
    const low = min + i * binWidth;
    const high = low + binWidth;
    return `${low.toFixed(1)}-${high.toFixed(1)}`;
  });

  return barChart(labels, counts, options);
}

export function sparkline(data: number[]): string {
  if (data.length === 0) return "";
  const chars = "▁▂▃▄▅▆▇█";
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data
    .map((v) => {
      const idx = Math.min(Math.floor(((v - min) / range) * (chars.length - 1)), chars.length - 1);
      return chars[idx];
    })
    .join("");
}

export function scatterPlot(
  xData: number[],
  yData: number[],
  options: ChartOptions = {},
): string {
  const { width = 40, height = 15, title } = options;
  if (xData.length === 0) return "";

  const xMin = Math.min(...xData);
  const xMax = Math.max(...xData);
  const yMin = Math.min(...yData);
  const yMax = Math.max(...yData);
  const xRange = xMax - xMin || 1;
  const yRange = yMax - yMin || 1;

  const grid: string[][] = Array.from({ length: height + 1 }, () =>
    new Array(width + 1).fill(" "),
  );

  for (let i = 0; i < xData.length; i++) {
    const col = Math.round(((xData[i] - xMin) / xRange) * width);
    const row = height - Math.round(((yData[i] - yMin) / yRange) * height);
    grid[row][col] = "*";
  }

  const lines: string[] = [];
  if (title) lines.push(title);
  for (const row of grid) {
    lines.push("|" + row.join(""));
  }
  lines.push("+" + "-".repeat(width + 1));
  return lines.join("\n");
}
