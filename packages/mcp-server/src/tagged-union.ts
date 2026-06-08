export type TaggedUnion<Tag extends string, T> = { tag: Tag } & T;

export function createTag<Tag extends string>(tag: Tag) {
  return <T extends Record<string, unknown>>(data: T): TaggedUnion<Tag, T> => ({ tag, ...data });
}

export function isTag<Tag extends string>(value: { tag: string }, tag: Tag): value is TaggedUnion<Tag, Record<string, unknown>> {
  return value.tag === tag;
}

export type Matcher<Tags extends { tag: string }, R> = {
  [K in Tags["tag"]]: (value: Extract<Tags, { tag: K }>) => R;
};

export function matchTag<Tags extends { tag: string }, R>(
  value: Tags,
  matcher: Matcher<Tags, R>,
): R {
  const handler = (matcher as Record<string, (v: Tags) => R>)[value.tag];
  if (!handler) throw new Error(`No handler for tag: ${value.tag}`);
  return handler(value);
}

export function exhaustive<Tags extends { tag: string }, R>(
  value: Tags,
  matcher: Matcher<Tags, R>,
): R {
  return matchTag(value, matcher);
}

export function narrow<Tags extends { tag: string }, Tag extends Tags["tag"]>(
  value: Tags,
  tag: Tag,
): Extract<Tags, { tag: Tag }> | undefined {
  return value.tag === tag ? value as Extract<Tags, { tag: Tag }> : undefined;
}
