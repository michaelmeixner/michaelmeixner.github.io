export type Category = "Film" | "Music" | "Magazine" | "Recipe" | "Other";

export interface MediaItem {
  id: string;
  category: Category;
  title: string;
  creator: string;
  note: string;
  year?: string;
  image?: string; // path relative to /public, e.g. "/media/some-album.jpg"
}

export const CATEGORY_COLORS: Record<Category, string> = {
  Film: "#a9322c",
  Music: "#315d68",
  Magazine: "#C1ACCB",
  Recipe: "#2D6B3F",
  Other: "#766b59",
};

// ── Update this list whenever your taste changes ──────────────────────────────
export const MEDIA: MediaItem[] = [
  {
    id: "media-1",
    category: "Film",
    title: "Add a title",
    creator: "Director / Artist / Publisher",
    note: "Write why you love this right now.",
    year: "2024",
  },
  {
    id: "media-2",
    category: "Music",
    title: "Add a title",
    creator: "Artist",
    note: "Write why you love this right now.",
  },
  {
    id: "media-3",
    category: "Magazine",
    title: "Add a title",
    creator: "Publisher",
    note: "Write why you love this right now.",
  },
  {
    id: "media-4",
    category: "Recipe",
    title: "Add a title",
    creator: "Publisher",
    note: "Write why you love this right now.",
  },
  {
    id: "media-5",
    category: "Other",
    title: "Add a title",
    creator: "Publisher",
    note: "Write why you love this right now.",
  },
];
// ─────────────────────────────────────────────────────────────────────────────
