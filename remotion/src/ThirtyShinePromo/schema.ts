import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const thirtyShinePromoSchema = z.object({
  brand: z.string(),
  tagline: z.string(),
  services: z.string(),
  cta: z.string(),
  accentColor: zColor(),
  textColor: zColor(),
});

export type ThirtyShinePromoProps = z.infer<typeof thirtyShinePromoSchema>;
