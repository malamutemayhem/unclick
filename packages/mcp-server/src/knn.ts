export interface KNNPoint {
  features: number[];
  label: string;
}

export class KNN {
  private data: KNNPoint[] = [];

  add(features: number[], label: string): void {
    this.data.push({ features, label });
  }

  addBatch(points: KNNPoint[]): void {
    this.data.push(...points);
  }

  predict(features: number[], k = 3): string {
    const distances = this.data.map(point => ({
      label: point.label,
      distance: KNN.euclidean(features, point.features),
    }));
    distances.sort((a, b) => a.distance - b.distance);
    const neighbors = distances.slice(0, k);

    const votes: Record<string, number> = {};
    for (const n of neighbors) {
      votes[n.label] = (votes[n.label] || 0) + 1;
    }

    let best = "";
    let bestCount = 0;
    for (const [label, count] of Object.entries(votes)) {
      if (count > bestCount) {
        bestCount = count;
        best = label;
      }
    }
    return best;
  }

  predictWeighted(features: number[], k = 3): string {
    const distances = this.data.map(point => ({
      label: point.label,
      distance: KNN.euclidean(features, point.features),
    }));
    distances.sort((a, b) => a.distance - b.distance);
    const neighbors = distances.slice(0, k);

    const votes: Record<string, number> = {};
    for (const n of neighbors) {
      const weight = n.distance === 0 ? 1e10 : 1 / n.distance;
      votes[n.label] = (votes[n.label] || 0) + weight;
    }

    let best = "";
    let bestWeight = 0;
    for (const [label, weight] of Object.entries(votes)) {
      if (weight > bestWeight) {
        bestWeight = weight;
        best = label;
      }
    }
    return best;
  }

  accuracy(testData: KNNPoint[], k = 3): number {
    let correct = 0;
    for (const point of testData) {
      if (this.predict(point.features, k) === point.label) correct++;
    }
    return Math.round((correct / testData.length) * 10000) / 10000;
  }

  nearestNeighbors(features: number[], k = 3): KNNPoint[] {
    const distances = this.data.map(point => ({
      point,
      distance: KNN.euclidean(features, point.features),
    }));
    distances.sort((a, b) => a.distance - b.distance);
    return distances.slice(0, k).map(d => d.point);
  }

  get size(): number {
    return this.data.length;
  }

  static euclidean(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += (a[i] - b[i]) ** 2;
    }
    return Math.sqrt(sum);
  }

  static manhattan(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += Math.abs(a[i] - b[i]);
    }
    return sum;
  }

  static normalize(data: number[][]): number[][] {
    if (data.length === 0) return [];
    const dims = data[0].length;
    const mins = new Array(dims).fill(Infinity);
    const maxs = new Array(dims).fill(-Infinity);
    for (const point of data) {
      for (let i = 0; i < dims; i++) {
        mins[i] = Math.min(mins[i], point[i]);
        maxs[i] = Math.max(maxs[i], point[i]);
      }
    }
    return data.map(point =>
      point.map((v, i) => {
        const range = maxs[i] - mins[i];
        return range === 0 ? 0 : Math.round(((v - mins[i]) / range) * 10000) / 10000;
      }),
    );
  }
}
