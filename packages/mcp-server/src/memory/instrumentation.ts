/**
 * Instrumentation surface for UnClick Memory.
 *
 * Thin wrappers over session-state.ts so server.ts can keep its
 * request handlers focused on protocol work while still recording
 * which autoload path (instructions / prompt / resource / tool
 * description) actually reached the agent.
 */

import {
  markPromptUsed,
  markResourceRead,
  markContextLoaded,
  setClientInfo,
  setInstructionsSent,
  type AutoloadMethod,
} from "./session-state.js";

/** Called from the Initialize handler. */
export function trackInitialize(
  clientInfo: { name?: string; version?: string } | undefined,
  instructionsSent: boolean
): void {
  setClientInfo(clientInfo);
  setInstructionsSent(instructionsSent);
  if (instructionsSent) {
    markContextLoaded("instructions");
  }
}

/** Called from GetPromptRequest handler for any prompt read. */
export function trackPromptUsed(name: string): void {
  markPromptUsed(name);
}

/** Called from ReadResourceRequest handler for any resource read. */
export function trackResourceRead(uri: string): void {
  markResourceRead(uri);
}

/** Explicit hook for code paths that load context outside of the
 *  prompt / resource / instructions flow (e.g. direct RPC or manual). */
export function trackManualLoad(method: AutoloadMethod = "manual"): void {
  markContextLoaded(method);
}
