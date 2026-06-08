type Direction = "L" | "R" | "S";

interface TMTransition {
  write: string;
  move: Direction;
  nextState: string;
}

export class TuringMachine {
  private transitions: Map<string, TMTransition> = new Map();
  private startState: string;
  private acceptState: string;
  private rejectState: string;
  private blank: string;

  constructor(startState: string, acceptState: string, rejectState: string, blank = "_") {
    this.startState = startState;
    this.acceptState = acceptState;
    this.rejectState = rejectState;
    this.blank = blank;
  }

  addTransition(state: string, read: string, write: string, move: Direction, nextState: string): void {
    this.transitions.set(`${state},${read}`, { write, move, nextState });
  }

  run(input: string, maxSteps = 10000): { accepted: boolean; tape: string; steps: number } {
    const tape: string[] = [...input];
    if (tape.length === 0) tape.push(this.blank);
    let head = 0;
    let state = this.startState;
    let steps = 0;

    while (steps < maxSteps) {
      if (state === this.acceptState) {
        return { accepted: true, tape: this.tapeToString(tape), steps };
      }
      if (state === this.rejectState) {
        return { accepted: false, tape: this.tapeToString(tape), steps };
      }

      const symbol = head >= 0 && head < tape.length ? tape[head] : this.blank;
      const key = `${state},${symbol}`;
      const transition = this.transitions.get(key);

      if (!transition) {
        return { accepted: false, tape: this.tapeToString(tape), steps };
      }

      while (head >= tape.length) tape.push(this.blank);
      while (head < 0) { tape.unshift(this.blank); head++; }
      tape[head] = transition.write;
      state = transition.nextState;

      if (transition.move === "R") head++;
      else if (transition.move === "L") head--;

      steps++;
    }

    return { accepted: false, tape: this.tapeToString(tape), steps };
  }

  private tapeToString(tape: string[]): string {
    let start = 0;
    let end = tape.length - 1;
    while (start < tape.length && tape[start] === this.blank) start++;
    while (end >= 0 && tape[end] === this.blank) end--;
    if (start > end) return "";
    return tape.slice(start, end + 1).join("");
  }

  transitionCount(): number {
    return this.transitions.size;
  }
}
