/**
 * Represents a single tag. In the backend response, tags are just strings.
 * This interface is kept for potential future use where tags might become objects.
 */
export interface Tag {
  id: number;
  name: string;
}

export type DropStatus = "new" | "sent" | "archived" | "snoozed";

/**
 * Represents a Drop object, aligned with the clean DTO from the backend.
 */
export interface Drop {
  id: string;
  topic: string;
  url: string;
  status: DropStatus;
  tags: string[];
  added_date: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
  user_notes?: string | null;
  last_sent_date?: string | null;
  send_count: number;
  priority?: number | null;
} 