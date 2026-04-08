import type { ConnectorConfig } from "./index.js";

export const blueskyConnector: ConnectorConfig = {
  name: "Bluesky",
  slug: "bluesky",
  authType: "api_key",
  description: "Bluesky social network (AT Protocol). Post, read feeds, follow accounts, and manage your profile.",
  credentialFields: [
    {
      key:         "identifier",
      label:       "Handle or Email",
      description: "Your Bluesky handle (e.g. you.bsky.social) or account email.",
      secret:      false,
      placeholder: "you.bsky.social",
      findGuideUrl: "https://bsky.app/settings",
    },
    {
      key:         "password",
      label:       "App Password",
      description: "Generate an app password in Bluesky settings. Do not use your main password.",
      secret:      true,
      placeholder: "xxxx-xxxx-xxxx-xxxx",
      findGuideUrl: "https://bsky.app/settings/app-passwords",
    },
  ],
  docsUrl: "https://docs.bsky.app/",
};
