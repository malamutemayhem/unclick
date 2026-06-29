// wiring/stapi.ts
// Per-app MCP wiring for the stapi connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { stapiSearchCharacter, stapiSearchSpecies, stapiSearchStarship } from "../stapi-tool.js";

export const stapiHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // stapi-tool.ts
  stapi_search_character:  (args) => stapiSearchCharacter(args),
  stapi_search_species:    (args) => stapiSearchSpecies(args),
  stapi_search_starship:   (args) => stapiSearchStarship(args),
};
