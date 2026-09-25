import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const glanzenPromoSchema = z.object({
  // One caption per photo, in order.
  captions: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  hookBadge: z.string(),
  outroHeadline: z.string(),
  outroSubline: z.string(),
  outroCta: z.string(),
  outroPhone: z.string(),
  // Sampled from the product tin itself — product-specific red, not the
  // salon's navy, since this is a single-product spotlight.
  brandColor: zColor(),
  textColor: zColor(),
});

export type GlanzenPromoProps = z.infer<typeof glanzenPromoSchema>;
