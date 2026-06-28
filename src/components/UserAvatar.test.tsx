import { render, screen, cleanup } from "@testing-library/react";
import type { User } from "@supabase/supabase-js";
import { afterEach, describe, expect, it } from "vitest";
import UserAvatar, { FACE_LIBRARY, getAvatarChoice } from "./UserAvatar";

const userWith = (meta: Record<string, unknown>): User =>
  ({ user_metadata: meta }) as unknown as User;

afterEach(cleanup);

describe("getAvatarChoice", () => {
  it("returns none for a signed-out or unstyled user", () => {
    expect(getAvatarChoice(null)).toEqual({ kind: "none", src: null });
    expect(getAvatarChoice(userWith({}))).toEqual({ kind: "none", src: null });
  });

  it("resolves a library face id to its asset path", () => {
    const choice = getAvatarChoice(userWith({ avatar_face: "face-03" }));
    expect(choice).toEqual({ kind: "face", src: "/faces/library/face-03.svg" });
  });

  it("ignores face ids outside the library", () => {
    expect(getAvatarChoice(userWith({ avatar_face: "face-99" }))).toEqual({
      kind: "none",
      src: null,
    });
  });

  it("prefers an uploaded photo over a face, and rejects non-data URLs", () => {
    const photo = "data:image/jpeg;base64,abc";
    expect(
      getAvatarChoice(userWith({ avatar_photo: photo, avatar_face: "face-01" })),
    ).toEqual({ kind: "photo", src: photo });
    expect(
      getAvatarChoice(userWith({ avatar_photo: "https://evil.example/x.png" })),
    ).toEqual({ kind: "none", src: null });
  });
});

describe("FACE_LIBRARY", () => {
  it("offers the full twelve-face sheet", () => {
    expect(FACE_LIBRARY).toHaveLength(12);
    expect(FACE_LIBRARY[0]).toEqual({ id: "face-01", src: "/faces/library/face-01.svg" });
    expect(FACE_LIBRARY[11]).toEqual({ id: "face-12", src: "/faces/library/face-12.svg" });
  });
});

describe("UserAvatar", () => {
  it("renders the chosen face image", () => {
    render(<UserAvatar user={userWith({ avatar_face: "face-05" })} />);
    expect(screen.getByAltText("Your avatar")).toHaveAttribute(
      "src",
      "/faces/library/face-05.svg",
    );
  });

  it("falls back to the neutral disc with no choice", () => {
    const { container } = render(<UserAvatar user={null} />);
    expect(screen.queryByAltText("Your avatar")).toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
