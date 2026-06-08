export class HMM {
  states: string[];
  observations: string[];
  startProb: number[];
  transitionProb: number[][];
  emissionProb: number[][];

  constructor(
    states: string[],
    observations: string[],
    startProb: number[],
    transitionProb: number[][],
    emissionProb: number[][],
  ) {
    this.states = states;
    this.observations = observations;
    this.startProb = startProb;
    this.transitionProb = transitionProb;
    this.emissionProb = emissionProb;
  }

  forward(observationSeq: string[]): number[][] {
    const T = observationSeq.length;
    const N = this.states.length;
    const alpha: number[][] = Array.from({ length: T }, () => new Array(N).fill(0));

    const o0 = this.observations.indexOf(observationSeq[0]);
    for (let i = 0; i < N; i++) {
      alpha[0][i] = this.startProb[i] * this.emissionProb[i][o0];
    }

    for (let t = 1; t < T; t++) {
      const ot = this.observations.indexOf(observationSeq[t]);
      for (let j = 0; j < N; j++) {
        let sum = 0;
        for (let i = 0; i < N; i++) {
          sum += alpha[t - 1][i] * this.transitionProb[i][j];
        }
        alpha[t][j] = sum * this.emissionProb[j][ot];
      }
    }
    return alpha;
  }

  likelihood(observationSeq: string[]): number {
    const alpha = this.forward(observationSeq);
    const last = alpha[alpha.length - 1];
    return Math.round(last.reduce((s, v) => s + v, 0) * 10000) / 10000;
  }

  viterbi(observationSeq: string[]): { path: string[]; probability: number } {
    const T = observationSeq.length;
    const N = this.states.length;
    const delta: number[][] = Array.from({ length: T }, () => new Array(N).fill(0));
    const psi: number[][] = Array.from({ length: T }, () => new Array(N).fill(0));

    const o0 = this.observations.indexOf(observationSeq[0]);
    for (let i = 0; i < N; i++) {
      delta[0][i] = this.startProb[i] * this.emissionProb[i][o0];
      psi[0][i] = 0;
    }

    for (let t = 1; t < T; t++) {
      const ot = this.observations.indexOf(observationSeq[t]);
      for (let j = 0; j < N; j++) {
        let maxVal = 0;
        let maxIdx = 0;
        for (let i = 0; i < N; i++) {
          const val = delta[t - 1][i] * this.transitionProb[i][j];
          if (val > maxVal) {
            maxVal = val;
            maxIdx = i;
          }
        }
        delta[t][j] = maxVal * this.emissionProb[j][ot];
        psi[t][j] = maxIdx;
      }
    }

    const path: number[] = new Array(T);
    let maxProb = 0;
    path[T - 1] = 0;
    for (let i = 0; i < N; i++) {
      if (delta[T - 1][i] > maxProb) {
        maxProb = delta[T - 1][i];
        path[T - 1] = i;
      }
    }

    for (let t = T - 2; t >= 0; t--) {
      path[t] = psi[t + 1][path[t + 1]];
    }

    return {
      path: path.map(i => this.states[i]),
      probability: Math.round(maxProb * 10000) / 10000,
    };
  }

  generate(length: number): { states: string[]; observations: string[] } {
    const stateSeq: number[] = [];
    const obsSeq: number[] = [];

    let state = HMM.sampleDiscrete(this.startProb);
    stateSeq.push(state);
    obsSeq.push(HMM.sampleDiscrete(this.emissionProb[state]));

    for (let t = 1; t < length; t++) {
      state = HMM.sampleDiscrete(this.transitionProb[state]);
      stateSeq.push(state);
      obsSeq.push(HMM.sampleDiscrete(this.emissionProb[state]));
    }

    return {
      states: stateSeq.map(i => this.states[i]),
      observations: obsSeq.map(i => this.observations[i]),
    };
  }

  private static sampleDiscrete(probs: number[]): number {
    const r = Math.random();
    let cumulative = 0;
    for (let i = 0; i < probs.length; i++) {
      cumulative += probs[i];
      if (r < cumulative) return i;
    }
    return probs.length - 1;
  }
}
