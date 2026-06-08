export interface Command {
  execute(): void;
  undo?(): void;
  description?: string;
}

export class CommandHistory {
  private history: Command[] = [];
  private pointer = -1;
  private readonly maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  execute(command: Command): void {
    this.history = this.history.slice(0, this.pointer + 1);
    this.history.push(command);
    if (this.history.length > this.maxSize) this.history.shift();
    else this.pointer++;
    command.execute();
  }

  undo(): boolean {
    if (this.pointer < 0) return false;
    const command = this.history[this.pointer];
    if (!command.undo) return false;
    command.undo();
    this.pointer--;
    return true;
  }

  redo(): boolean {
    if (this.pointer >= this.history.length - 1) return false;
    this.pointer++;
    this.history[this.pointer].execute();
    return true;
  }

  get canUndo(): boolean {
    return this.pointer >= 0 && !!this.history[this.pointer]?.undo;
  }

  get canRedo(): boolean {
    return this.pointer < this.history.length - 1;
  }

  get size(): number {
    return this.history.length;
  }

  getHistory(): string[] {
    return this.history.map((c) => c.description ?? "unknown");
  }

  clear(): void {
    this.history = [];
    this.pointer = -1;
  }
}

export class MacroCommand implements Command {
  private commands: Command[];
  description: string;

  constructor(commands: Command[], description: string = "macro") {
    this.commands = commands;
    this.description = description;
  }

  execute(): void {
    for (const cmd of this.commands) cmd.execute();
  }

  undo(): void {
    for (let i = this.commands.length - 1; i >= 0; i--) {
      if (this.commands[i].undo) this.commands[i].undo!();
    }
  }
}
