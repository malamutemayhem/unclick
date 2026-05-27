import type { ToolDescriptor } from "./index.js";
import type { PackInput } from "../pack-schema.js";
import { savePack } from "./store.js";

export interface LegalpassSavePackArgs {
  pack: PackInput;
  overwrite?: boolean;
}

export interface LegalpassSavePackResult {
  pack_id: string;
  saved: boolean;
  item_count: number;
  hat_count: number;
}

export const legalpassSavePackTool: ToolDescriptor<
  LegalpassSavePackArgs,
  LegalpassSavePackResult
> = {
  name: "legalpass_save_pack",
  description:
    "Save or update a LegalPass pack definition (12-hat roster, " +
    "jurisdictions, items). Validates against the Pack schema before persisting.",
  inputSchema: {
    type: "object",
    required: ["pack"],
    properties: {
      pack: { type: "object" },
      overwrite: { type: "boolean", default: false },
    },
  },
  handler: async (args) => {
    const pack = savePack(args.pack, args.overwrite ?? false);
    return {
      pack_id: pack.id,
      saved: true,
      item_count: pack.items.length,
      hat_count: pack.hats.length,
    };
  },
};
