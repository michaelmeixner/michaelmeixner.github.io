import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { MEDIA, MediaItem, Category, CATEGORY_COLORS } from "./media";

export function useShelfItems() {
  const [items, setItems] = useState<MediaItem[]>(MEDIA);

  useEffect(() => {
    supabase
      .from("shelf_suggestions")
      .select("id, category, title, creator, note, year")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        const suggested: MediaItem[] = data
          .filter((row) => row.category in CATEGORY_COLORS)
          .map((row) => ({
            id: `suggestion-${row.id}`,
            category: row.category as Category,
            title: row.title,
            creator: row.creator,
            note: row.note,
            year: row.year ?? undefined,
          }));
        setItems([...MEDIA, ...suggested]);
      });
  }, []);

  return items;
}
