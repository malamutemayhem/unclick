export type SyscallHandler = (args: unknown[], context: ProcessContext) => unknown;

export interface ProcessContext {
  pid: number;
  uid: number;
  permissions: Set<string>;
  memory: Map<string, unknown>;
}

export interface SyscallDef {
  name: string;
  num: number;
  handler: SyscallHandler;
  requiredPermission?: string;
}

export class SyscallTable {
  private table = new Map<number, SyscallDef>();
  private nameIndex = new Map<string, number>();
  private callLog: { num: number; pid: number; result: unknown }[] = [];

  register(def: SyscallDef): void {
    this.table.set(def.num, def);
    this.nameIndex.set(def.name, def.num);
  }

  unregister(num: number): boolean {
    const def = this.table.get(num);
    if (!def) return false;
    this.nameIndex.delete(def.name);
    this.table.delete(num);
    return true;
  }

  invoke(num: number, args: unknown[], ctx: ProcessContext): { ok: boolean; result: unknown } {
    const def = this.table.get(num);
    if (!def) {
      return { ok: false, result: `Unknown syscall: ${num}` };
    }
    if (def.requiredPermission && !ctx.permissions.has(def.requiredPermission)) {
      return { ok: false, result: `Permission denied: ${def.requiredPermission}` };
    }
    try {
      const result = def.handler(args, ctx);
      this.callLog.push({ num, pid: ctx.pid, result });
      return { ok: true, result };
    } catch (err) {
      return { ok: false, result: err instanceof Error ? err.message : String(err) };
    }
  }

  invokeByName(name: string, args: unknown[], ctx: ProcessContext): { ok: boolean; result: unknown } {
    const num = this.nameIndex.get(name);
    if (num === undefined) {
      return { ok: false, result: `Unknown syscall: ${name}` };
    }
    return this.invoke(num, args, ctx);
  }

  get(num: number): SyscallDef | undefined {
    return this.table.get(num);
  }

  getByName(name: string): SyscallDef | undefined {
    const num = this.nameIndex.get(name);
    return num !== undefined ? this.table.get(num) : undefined;
  }

  list(): SyscallDef[] {
    return [...this.table.values()].sort((a, b) => a.num - b.num);
  }

  get count(): number {
    return this.table.size;
  }

  getLog(): typeof this.callLog {
    return [...this.callLog];
  }

  clearLog(): void {
    this.callLog = [];
  }
}

export function createDefaultTable(): SyscallTable {
  const table = new SyscallTable();

  table.register({
    name: "read",
    num: 0,
    handler: (args, ctx) => ctx.memory.get(args[0] as string),
    requiredPermission: "read",
  });

  table.register({
    name: "write",
    num: 1,
    handler: (args, ctx) => {
      ctx.memory.set(args[0] as string, args[1]);
      return true;
    },
    requiredPermission: "write",
  });

  table.register({
    name: "getpid",
    num: 2,
    handler: (_args, ctx) => ctx.pid,
  });

  table.register({
    name: "getuid",
    num: 3,
    handler: (_args, ctx) => ctx.uid,
  });

  table.register({
    name: "exit",
    num: 4,
    handler: (args) => ({ exitCode: args[0] ?? 0 }),
  });

  return table;
}

export function createContext(pid: number, uid = 0, permissions: string[] = []): ProcessContext {
  return {
    pid,
    uid,
    permissions: new Set(permissions),
    memory: new Map(),
  };
}
