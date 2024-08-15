import { z } from "astro:content";
import slugify from "slugify";

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  featured: z.boolean(),
  date: z.string(),
  category: z.string(),
  status: z.string(),
  images: z.array(z.string()),
});

const api = {
  list: async () => {
    const document = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSOxDK3aFMGRc7GfyF4MCZ_8chgV8uHYQMcuyVFQfIMQlkQCi90hWdkDRe7czTzldFTG4gUd78aI8HK/pub?output=tsv"
    ).then((res) => res.text());
    const rows = document
      .split("\n")
      .slice(1)
      .map((row) => row.trim().split("\t"));

    return rows.map(([title, featured, date, category, status, images]) =>
      projectSchema.parse({
        id: slugify(title, { lower: true }),
        title,
        featured: featured === "TRUE",
        date,
        category,
        status,
        images: images.split(",").map((image) => image.trim()),
      })
    );
  },
};

export default api;
