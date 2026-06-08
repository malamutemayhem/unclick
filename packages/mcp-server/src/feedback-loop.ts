export interface Iteration<I = unknown, O = unknown> {
  input: I;
  output: O;
  score: number;
  feedback?: string;
}

export interface LoopResult<I, O> {
  iterations: Iteration<I, O>[];
  bestIteration: Iteration<I, O>;
  converged: boolean;
  totalIterations: number;
}

export async function feedbackLoop<I, O>(
  initialInput: I,
  process: (input: I) => O | Promise<O>,
  score: (output: O) => number | Promise<number>,
  refine: (input: I, output: O, currentScore: number) => I | Promise<I>,
  options: { maxIterations?: number; targetScore?: number; improvementThreshold?: number } = {},
): Promise<LoopResult<I, O>> {
  const maxIter = options.maxIterations ?? 5;
  const targetScore = options.targetScore ?? 1;
  const threshold = options.improvementThreshold ?? 0.01;

  const iterations: Iteration<I, O>[] = [];
  let currentInput = initialInput;
  let bestIteration: Iteration<I, O> | null = null;
  let converged = false;

  for (let i = 0; i < maxIter; i++) {
    const output = await process(currentInput);
    const currentScore = await score(output);
    const iteration: Iteration<I, O> = { input: currentInput, output, score: currentScore };
    iterations.push(iteration);

    if (!bestIteration || currentScore > bestIteration.score) {
      bestIteration = iteration;
    }

    if (currentScore >= targetScore) {
      converged = true;
      break;
    }

    if (i > 0 && currentScore - iterations[i - 1].score < threshold) {
      converged = true;
      break;
    }

    if (i < maxIter - 1) {
      currentInput = await refine(currentInput, output, currentScore);
    }
  }

  return {
    iterations,
    bestIteration: bestIteration!,
    converged,
    totalIterations: iterations.length,
  };
}

export function selectBest<T>(candidates: Array<{ item: T; score: number }>): T | undefined {
  if (candidates.length === 0) return undefined;
  return candidates.reduce((best, c) => c.score > best.score ? c : best).item;
}

export function isImproving(scores: number[], windowSize = 3): boolean {
  if (scores.length < 2) return true;
  const recent = scores.slice(-windowSize);
  for (let i = 1; i < recent.length; i++) {
    if (recent[i] <= recent[i - 1]) return false;
  }
  return true;
}
