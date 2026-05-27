declare module "@unclick/wizard" {
  export type CardSeverity = "info" | "success" | "warning" | "error";

  export type CardSection =
    | CardTextSection
    | CardListSection
    | CardTableSection
    | CardLinkSection
    | CardActionButtonSection;

  export interface CardTextSection {
    kind: "text";
    heading?: string;
    text: string;
  }

  export interface CardListSection {
    kind: "list";
    heading?: string;
    items: string[];
    ordered?: boolean;
  }

  export interface CardTableSection {
    kind: "table";
    heading?: string;
    columns: string[];
    rows: Array<Array<string | number | boolean | null>>;
  }

  export interface CardLinkSection {
    kind: "link";
    heading?: string;
    label: string;
    href: string;
    description?: string;
  }

  export interface CardActionButtonSection {
    kind: "action-button";
    heading?: string;
    label: string;
    description?: string;
    action: CardAction;
  }

  export interface CardAction {
    tool: string;
    args: Record<string, unknown>;
    confirmation?: "confirm" | "auto";
  }

  export interface CardFollowUp {
    label: string;
    action?: CardAction;
  }

  export interface ConversationalCard {
    title: string;
    summary: string;
    severity?: CardSeverity;
    body?: CardSection[];
    followUps?: CardFollowUp[];
    meta?: Record<string, string | number | boolean>;
  }

  export interface WithCard<T> {
    results: T;
    card: ConversationalCard;
  }
}
