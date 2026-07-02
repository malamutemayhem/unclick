// Type declarations for wiring-model.mjs (a build-time JS helper). NodeNext
// resolves the ".mjs" import in schema-handler-contract.test.ts to this file.
export function readWiring(srcDir: string): string;
export function readHandlers(srcDir: string): string;
export function readTools(srcDir: string): string;
export function section(wiring: string, marker: string, openTok: string): string;
export function parseImportCategories(wiring: string): Record<string, string>;
export function parseToolIndex(
  toolsText: string,
  importsText?: string,
): Array<{ app: string; category: string; tools: Array<{ name: string; description: string }> }>;
export function toolDefsFor(toolsBody: string, slug: string): string | null;
export function handlersFor(
  handlersBody: string,
  slug: string,
): Array<{ tool: string; fn: string }> | null;
export function loadWiringBlocks(
  wiring: string,
): Record<string, { toolNames: string[]; toolCount: number; props: number; describedProps: number }>;
