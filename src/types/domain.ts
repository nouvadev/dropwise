export interface Tag {
  id: number;
  name: string;
}

export type DropStatus = "new" | "sent" | "archived" | "snoozed";

export interface Drop {
  id: string;
  topic: string;
  url: string;
  user_notes?: string | null;
  added_date: string; // Or Date, depending on API response
  status: DropStatus;
  tags: Tag[];
} 