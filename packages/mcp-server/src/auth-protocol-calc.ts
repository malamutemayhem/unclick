export type AuthProtocol = "oauth2" | "saml" | "openid_connect" | "kerberos" | "fido2";

export function adoptionPercent(a: AuthProtocol): number {
  const m: Record<AuthProtocol, number> = {
    oauth2: 10, saml: 7, openid_connect: 9, kerberos: 6, fido2: 4,
  };
  return m[a];
}

export function implementationComplexity(a: AuthProtocol): number {
  const m: Record<AuthProtocol, number> = {
    oauth2: 5, saml: 8, openid_connect: 4, kerberos: 9, fido2: 7,
  };
  return m[a];
}

export function phishingResistance(a: AuthProtocol): number {
  const m: Record<AuthProtocol, number> = {
    oauth2: 4, saml: 5, openid_connect: 5, kerberos: 7, fido2: 10,
  };
  return m[a];
}

export function mobileSupport(a: AuthProtocol): number {
  const m: Record<AuthProtocol, number> = {
    oauth2: 10, saml: 3, openid_connect: 9, kerberos: 2, fido2: 8,
  };
  return m[a];
}

export function ssoCapability(a: AuthProtocol): number {
  const m: Record<AuthProtocol, number> = {
    oauth2: 7, saml: 10, openid_connect: 9, kerberos: 10, fido2: 3,
  };
  return m[a];
}

export function passwordless(a: AuthProtocol): boolean {
  const m: Record<AuthProtocol, boolean> = {
    oauth2: false, saml: false, openid_connect: false, kerberos: false, fido2: true,
  };
  return m[a];
}

export function enterpriseFocused(a: AuthProtocol): boolean {
  const m: Record<AuthProtocol, boolean> = {
    oauth2: false, saml: true, openid_connect: false, kerberos: true, fido2: false,
  };
  return m[a];
}

export function tokenFormat(a: AuthProtocol): string {
  const m: Record<AuthProtocol, string> = {
    oauth2: "bearer_token", saml: "xml_assertion", openid_connect: "jwt",
    kerberos: "ticket", fido2: "attestation_object",
  };
  return m[a];
}

export function primaryUseCase(a: AuthProtocol): string {
  const m: Record<AuthProtocol, string> = {
    oauth2: "api_authorization", saml: "enterprise_sso",
    openid_connect: "consumer_identity", kerberos: "active_directory",
    fido2: "passwordless_auth",
  };
  return m[a];
}

export function authProtocols(): AuthProtocol[] {
  return ["oauth2", "saml", "openid_connect", "kerberos", "fido2"];
}
