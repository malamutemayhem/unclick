import { describe, expect, it } from "vitest";

import { ENDPOINT_MAP } from "../catalog.js";
import { ADDITIONAL_HANDLERS } from "../tool-wiring.js";
import { resolveUnclickCallHandlerKey } from "../server.js";

// Regression guard for the connector-call dispatch order. Live connector
// tools (gmail_search, dropbox_list_folder, higgsfield_generate_image, ...)
// exist only in ADDITIONAL_HANDLERS, not in the built-in ENDPOINT_MAP, so
// unclick_call must consult the generated handlers BEFORE the map. The old
// map-first order answered "Endpoint not found" for exactly the tools that
// unclick_search had just listed.
describe("unclick_call endpoint resolution", () => {
  const CONNECTOR_ENDPOINTS = [
    "gmail_search",
    "drive_search",
    "onedrive_list",
    "dropbox_list_folder",
    "higgsfield_generate_image",
  ];

  it("resolves live connector endpoint ids to generated handlers", () => {
    for (const endpointId of CONNECTOR_ENDPOINTS) {
      expect(resolveUnclickCallHandlerKey(endpointId)).toBe(endpointId);
    }
  });

  it("resolves dotted ids via dot-to-underscore conversion", () => {
    expect(resolveUnclickCallHandlerKey("gmail.search")).toBe("gmail_search");
    expect(resolveUnclickCallHandlerKey("dropbox.list_folder")).toBe(
      "dropbox_list_folder",
    );
  });

  it("returns null for unknown or empty ids so the map/not-found path runs", () => {
    expect(resolveUnclickCallHandlerKey("definitely_not_a_tool")).toBeNull();
    expect(resolveUnclickCallHandlerKey("")).toBeNull();
    expect(resolveUnclickCallHandlerKey("   ")).toBeNull();
  });

  it("documents why order matters: these connectors are absent from ENDPOINT_MAP", () => {
    for (const endpointId of CONNECTOR_ENDPOINTS) {
      expect(ADDITIONAL_HANDLERS[endpointId]).toBeTypeOf("function");
      expect(ENDPOINT_MAP.has(endpointId)).toBe(false);
    }
  });
});
