import { describe, it, expect } from "vitest";
import {
  adoptionPercent, implementationComplexity, phishingResistance,
  mobileSupport, ssoCapability, passwordless,
  enterpriseFocused, tokenFormat, primaryUseCase, authProtocols,
} from "../auth-protocol-calc.js";

describe("adoptionPercent", () => {
  it("oauth2 most adopted", () => {
    expect(adoptionPercent("oauth2")).toBeGreaterThan(
      adoptionPercent("fido2")
    );
  });
});

describe("implementationComplexity", () => {
  it("kerberos most complex", () => {
    expect(implementationComplexity("kerberos")).toBeGreaterThan(
      implementationComplexity("openid_connect")
    );
  });
});

describe("phishingResistance", () => {
  it("fido2 most phishing resistant", () => {
    expect(phishingResistance("fido2")).toBeGreaterThan(
      phishingResistance("oauth2")
    );
  });
});

describe("mobileSupport", () => {
  it("oauth2 best mobile support", () => {
    expect(mobileSupport("oauth2")).toBeGreaterThan(
      mobileSupport("kerberos")
    );
  });
});

describe("ssoCapability", () => {
  it("saml best sso", () => {
    expect(ssoCapability("saml")).toBeGreaterThan(
      ssoCapability("fido2")
    );
  });
});

describe("passwordless", () => {
  it("fido2 is passwordless", () => {
    expect(passwordless("fido2")).toBe(true);
  });
  it("oauth2 is not", () => {
    expect(passwordless("oauth2")).toBe(false);
  });
});

describe("enterpriseFocused", () => {
  it("saml is enterprise focused", () => {
    expect(enterpriseFocused("saml")).toBe(true);
  });
  it("oauth2 is not", () => {
    expect(enterpriseFocused("oauth2")).toBe(false);
  });
});

describe("tokenFormat", () => {
  it("openid connect uses jwt", () => {
    expect(tokenFormat("openid_connect")).toBe("jwt");
  });
});

describe("primaryUseCase", () => {
  it("kerberos for active directory", () => {
    expect(primaryUseCase("kerberos")).toBe("active_directory");
  });
});

describe("authProtocols", () => {
  it("returns 5 protocols", () => {
    expect(authProtocols()).toHaveLength(5);
  });
});
