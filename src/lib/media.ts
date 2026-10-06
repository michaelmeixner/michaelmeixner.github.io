export type Category = "Film" | "Music" | "Magazine" | "Recipe" | "Other";

export interface MediaItem {
  id: string;
  category: Category;
  title: string;
  creator: string;
  note: string;
  year?: string;
  image?: string; // path relative to /public, e.g. "/media/some-album.jpg"
  link?: string;
}

export const CATEGORY_COLORS: Record<Category, string> = {
  Film: "#a9322c",
  Music: "#315d68",
  Magazine: "#C1ACCB",
  Recipe: "#2D6B3F",
  Other: "#766b59",
};

export const MEDIA: MediaItem[] = [
  {
    id: "media-1",
    category: "Film",
    title: "The French Dispatch",
    creator: "Wes Anderson",
    note: "A Wes Anderson film that is a love letter to journalism and the art of storytelling. Great vignettes and great cast.",
    image: "/media/french_dispatch.jpeg",
  },
  {
    id: "media-2",
    category: "Music",
    title: "Relaxer",
    creator: "Alt J",
    note: "Recently revisited this album and still enjoying it.",
    image: "/media/relaxer_alt_j.jpeg",
  },
  {
    id: "media-3",
    category: "Magazine",
    title: "Issue #949: Cars",
    creator: "Popeye Magazine",
    note: "Awesome collection of interviews and photos of cars and their owners",
    image: "/media/popeye_cars.webp",
  },
  {
    id: "media-4",
    category: "Recipe",
    title: "Tan Tan Ramen",
    creator: "Woks of Life",
    note: "Solid recipe. Tasty, relatively easy to make, and few specialized ingredients. Warning: does use a lot of pans.",
    link: "https://thewoksoflife.com/tan-tan-ramen/#recipe",
    image: "/media/tan_tan_ramen.jpeg",
  },
  {
    id: "media-5",
    category: "Other",
    title: "Articles of Interest",
    creator: "Avery Trufelman",
    note: "Killer podcast series about clothing, its history, and its cultural significance.",
    image: "/media/articles_of_interest.jpeg",
    link: "https://www.articlesofinterest.co/podcast",
  },
  {
    id: "media-6",
    category: "Other",
    title: "Auto Catalog Archive",
    creator: "ACA",
    note: "Cool website with a huge collection of new and old car brochures and catalogs. Great for research or just browsing.",
    image: "/media/aca.jpeg",
    link: "https://autocatalogarchive.com",
  },
];
// ─────────────────────────────────────────────────────────────────────────────
