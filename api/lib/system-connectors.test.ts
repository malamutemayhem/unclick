import { describe, expect, it } from "vitest";
import {
  completeSystemConnectorCredentials,
  deploymentSystemConnectorDefaults,
  publicSystemConnectorValues,
} from "./system-connectors";

describe("system connector schema", () => {
  it("retains a stored secret when a rotation patch leaves it blank", () => {
    expect(completeSystemConnectorCredentials("gitea", {
      base_url: "https://git.example.test",
      access_token: "stored-token",
    }, { base_url: "https://git.next.test", access_token: "" })).toEqual({
      credentials: { base_url: "https://git.next.test", access_token: "stored-token" },
    });
  });

  it("imports compatible legacy Gitea deployment variables without exposing the token", () => {
    const credentials = deploymentSystemConnectorDefaults("gitea", {
      GITEA_BASE_URL: "https://git.example.test",
      GITEA_TOKEN: "deployment-token",
    });
    expect(publicSystemConnectorValues("gitea", credentials)).toEqual({ base_url: "https://git.example.test" });
    expect(credentials.access_token).toBe("deployment-token");
  });
});
