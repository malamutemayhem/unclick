import { spawn } from "node:child_process";
import type { CommandExecutionResult, CommandSpec } from "./types.js";

export type CommandRunner = (spec: CommandSpec) => Promise<CommandExecutionResult>;

export const runCommand: CommandRunner = (spec) =>
  new Promise((resolve, reject) => {
    const child = spawn(spec.command, spec.args, {
      cwd: spec.cwd,
      shell: false,
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    const timeout =
      spec.timeoutMs && spec.timeoutMs > 0
        ? setTimeout(() => {
            timedOut = true;
            child.kill("SIGTERM");
          }, spec.timeoutMs)
        : null;
    child.stdout?.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr?.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("error", (err) => {
      if (timeout) clearTimeout(timeout);
      reject(err);
    });
    child.on("close", (code) => {
      if (timeout) clearTimeout(timeout);
      resolve({
        exitCode: timedOut ? 124 : code ?? 1,
        stdout,
        stderr: timedOut ? `${stderr}\nCommand timed out after ${spec.timeoutMs}ms.`.trim() : stderr,
      });
    });
  });

