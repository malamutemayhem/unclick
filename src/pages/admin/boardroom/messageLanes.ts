export type BoardroomMessageLaneTag = "heartbeat" | "event";

export interface BoardroomLaneMessage {
  tags: string[] | null;
}

const ACTION_QUEUE_TAGS = new Set([
  "blocker",
  "handoff",
  "needs-doing",
  "tripwire",
]);

const ROUTINE_LANE_TAGS = new Set<BoardroomMessageLaneTag>([
  "heartbeat",
  "event",
]);

export function hasMessageLaneTag(
  message: BoardroomLaneMessage,
  tag: BoardroomMessageLaneTag,
): boolean {
  return hasMessageTag(message, tag);
}

export function hasMessageTag(
  message: BoardroomLaneMessage,
  tag: string,
): boolean {
  return message.tags?.includes(tag) ?? false;
}

export function isHandoffMessage(message: BoardroomLaneMessage): boolean {
  return hasMessageTag(message, "handoff");
}

export function isActionQueueMessage(message: BoardroomLaneMessage): boolean {
  return message.tags?.some((tag) => ACTION_QUEUE_TAGS.has(tag)) ?? false;
}

export function isRoutineLaneOnlyMessage(message: BoardroomLaneMessage): boolean {
  const tags = message.tags ?? [];
  return tags.length > 0 && tags.every((tag) => ROUTINE_LANE_TAGS.has(tag as BoardroomMessageLaneTag));
}

export function getLaneMessages<T extends BoardroomLaneMessage>(
  messages: T[],
  tag: BoardroomMessageLaneTag,
): T[] {
  return messages.filter((message) => hasMessageLaneTag(message, tag));
}

export function getMainFeedMessages<T extends BoardroomLaneMessage>(messages: T[]): T[] {
  return messages.filter((message) => !isRoutineLaneOnlyMessage(message));
}

export function getActionQueueMessages<T extends BoardroomLaneMessage>(messages: T[]): T[] {
  return messages.filter(isActionQueueMessage);
}
