export class LearningRateScheduler {
  static constant(initialLR: number): (epoch: number) => number {
    return () => initialLR;
  }

  static stepDecay(initialLR: number, dropRate: number, dropEvery: number): (epoch: number) => number {
    return (epoch: number) => {
      const factor = Math.pow(dropRate, Math.floor(epoch / dropEvery));
      return Math.round(initialLR * factor * 10000) / 10000;
    };
  }

  static exponentialDecay(initialLR: number, decayRate: number): (epoch: number) => number {
    return (epoch: number) => {
      return Math.round(initialLR * Math.exp(-decayRate * epoch) * 10000) / 10000;
    };
  }

  static cosineAnnealing(initialLR: number, totalEpochs: number, minLR = 0): (epoch: number) => number {
    return (epoch: number) => {
      const lr = minLR + 0.5 * (initialLR - minLR) * (1 + Math.cos(Math.PI * epoch / totalEpochs));
      return Math.round(lr * 10000) / 10000;
    };
  }

  static warmup(initialLR: number, warmupEpochs: number): (epoch: number) => number {
    return (epoch: number) => {
      if (epoch < warmupEpochs) {
        return Math.round(initialLR * (epoch + 1) / warmupEpochs * 10000) / 10000;
      }
      return initialLR;
    };
  }

  static warmupCosine(initialLR: number, warmupEpochs: number, totalEpochs: number): (epoch: number) => number {
    return (epoch: number) => {
      if (epoch < warmupEpochs) {
        return Math.round(initialLR * (epoch + 1) / warmupEpochs * 10000) / 10000;
      }
      const progress = (epoch - warmupEpochs) / (totalEpochs - warmupEpochs);
      const lr = 0.5 * initialLR * (1 + Math.cos(Math.PI * progress));
      return Math.round(lr * 10000) / 10000;
    };
  }

  static polynomial(initialLR: number, totalEpochs: number, power = 2, endLR = 0): (epoch: number) => number {
    return (epoch: number) => {
      const decay = Math.pow(1 - epoch / totalEpochs, power);
      const lr = (initialLR - endLR) * decay + endLR;
      return Math.round(Math.max(0, lr) * 10000) / 10000;
    };
  }

  static cyclical(baseLR: number, maxLR: number, stepSize: number): (epoch: number) => number {
    return (epoch: number) => {
      const cycle = Math.floor(1 + epoch / (2 * stepSize));
      const x = Math.abs(epoch / stepSize - 2 * cycle + 1);
      const lr = baseLR + (maxLR - baseLR) * Math.max(0, 1 - x);
      return Math.round(lr * 10000) / 10000;
    };
  }

  static schedule(scheduler: (epoch: number) => number, epochs: number): number[] {
    return Array.from({ length: epochs }, (_, i) => scheduler(i));
  }
}
