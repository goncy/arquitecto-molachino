import type { z } from "astro:content";

import { projectSchema } from "./api";

export type Project = z.infer<typeof projectSchema>;
