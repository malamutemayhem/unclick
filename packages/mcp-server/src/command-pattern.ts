export interface Command {
  execute(): void;
  undo?(): void;
  description?: string;
}

export class CommandQueue {
  private queue: Command[] = [];
  private history: Command[] = [];
  private maxHistory: number;

  constructor(maxHistory = 1000) {
    this.maxHistory = maxHistory;
  }

  enqueue(command: Command): void {
    this.queue.push(command);
  }

  executeNext(): boolean {
    const command = this.queue.shift();
    if (!command) return false;
    command.execute();
    this.history.push(command);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
    return true;
  }

  executeAll(): number {
    let count = 0;
    while (this.queue.length > 0) {
      this.executeNext();
      count++;
    }
    return count;
  }

  undoLast(): boolean {
    const command = this.history.pop();
    if (!command?.undo) return false;
    command.undo();
    return true;
  }

  pending(): number {
    return this.queue.length;
  }

  executed(): number {
    return this.history.length;
  }

  clear(): void {
    this.queue = [];
  }

  clearHistory(): void {
    this.history = [];
  }
}

export class MacroCommand implements Command {
  private commands: Command[];
  description?: string;

  constructor(commands: Command[], description?: string) {
    this.commands = commands;
    this.description = description;
  }

  execute(): void {
    for (const cmd of this.commands) {
      cmd.execute();
    }
  }

  undo(): void {
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i].undo?.();
    }
  }
}

export class ConditionalCommand implements Command {
  description?: string;

  constructor(
    private condition: () => boolean,
    private thenCmd: Command,
    private elseCmd?: Command,
  ) {}

  execute(): void {
    if (this.condition()) {
      this.thenCmd.execute();
    } else {
      this.elseCmd?.execute();
    }
  }
}

export class DelayedCommand implements Command {
  private timer: ReturnType<typeof setTimeout> | null = null;
  description?: string;

  constructor(
    private command: Command,
    private delayMs: number,
  ) {}

  execute(): void {
    this.timer = setTimeout(() => {
      this.command.execute();
      this.timer = null;
    }, this.delayMs);
  }

  cancel(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
