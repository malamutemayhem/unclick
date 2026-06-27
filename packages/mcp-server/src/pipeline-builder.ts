export type Stage<I, O> = (input: I) => O | Promise<O>;

export class PipelineBuilder<First, Current> {
  private stages: Stage<unknown, unknown>[] = [];

  private constructor(stages: Stage<unknown, unknown>[]) {
    this.stages = stages;
  }

  static create<T>(): PipelineBuilder<T, T> {
    return new PipelineBuilder<T, T>([]);
  }

  pipe<Next>(stage: Stage<Current, Next>): PipelineBuilder<First, Next> {
    return new PipelineBuilder<First, Next>([...this.stages, stage as Stage<unknown, unknown>]);
  }

  async execute(input: First): Promise<Current> {
    let value: unknown = input;
    for (const stage of this.stages) {
      value = await stage(value);
    }
    return value as Current;
  }

  get length(): number {
    return this.stages.length;
  }
}

export function pipeline<T>(): PipelineBuilder<T, T> {
  return PipelineBuilder.create<T>();
}
