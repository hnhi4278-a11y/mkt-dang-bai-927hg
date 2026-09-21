import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const thirtyShineReelSchema = z.object({
  captions: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  comboHighlight: z.string(),
  outroHeadline: z.string(),
  outroSubline: z.string(),
  outroCta: z.string(),
  // Caption outline color (matches the reference TikTok clip's navy stroke).
  strokeColor: zColor(),
  // Brand accent for the combo badge and the outro CTA pill.
  highlightColor: zColor(),
  textColor: zColor(),
});

export type ThirtyShineReelProps = z.infer<typeof thirtyShineReelSchema>;
