import { User as UserIcon } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

/**
 * UserAvatar: the operator's chosen avatar, shared by the You page and
 * the admin shell. Three states, in precedence order:
 *
 *   1. photo - a small square data URL the user uploaded (stored in
 *      auth user_metadata.avatar_photo, kept tiny so the JWT stays slim)
 *   2. face  - one of the hand-drawn line-art faces from the homepage
 *      cast sheet (user_metadata.avatar_face holds the library id)
 *   3. none  - the neutral icon disc
 */

/** The face library: the same hand-drawn set the homepage cast uses. */
export const FACE_LIBRARY = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { id: `face-${n}`, src: `/faces/library/face-${n}.svg` };
});

export interface AvatarChoice {
  kind: "photo" | "face" | "none";
  src: string | null;
}

export function getAvatarChoice(user: User | null): AvatarChoice {
  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const photo =
    typeof meta.avatar_photo === "string" && meta.avatar_photo.startsWith("data:image/")
      ? meta.avatar_photo
      : null;
  if (photo) return { kind: "photo", src: photo };
  const face =
    typeof meta.avatar_face === "string"
      ? FACE_LIBRARY.find((f) => f.id === meta.avatar_face)
      : undefined;
  if (face) return { kind: "face", src: face.src };
  return { kind: "none", src: null };
}

export default function UserAvatar({
  user,
  className,
}: {
  user: User | null;
  className?: string;
}) {
  const choice = getAvatarChoice(user);

  if (choice.kind === "photo") {
    return (
      <img
        src={choice.src ?? undefined}
        alt="Your avatar"
        className={cn("shrink-0 rounded-full border border-primary/30 object-cover", className)}
      />
    );
  }

  if (choice.kind === "face") {
    return (
      <span
        className={cn(
          "flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/40 bg-[#07212d]",
          className,
        )}
      >
        <img
          src={choice.src ?? undefined}
          alt="Your avatar"
          className="h-full w-full [filter:drop-shadow(0_0_3px_rgba(134,218,221,0.5))]"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary",
        className,
      )}
    >
      <UserIcon className="h-1/2 w-1/2" />
    </span>
  );
}
