import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const thirtyShineReelSchema = z.object({
  captions: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  comboHighlight: z.string(),
  outroHeadline: z.string(),
  outroSubline: z.string(),
  outroCta: z.string(),
  // Single brand navy, sampled from the salon's own reference photos —
  // used for the caption outline, the combo badge text and the outro
  // background/CTA text. Keep this the only blue in the composition.
  brandColor: zColor(),
  textColor: zColor(),
});

export type ThirtyShineReelProps = z.infer<typeof thirtyShineReelSchema>;
