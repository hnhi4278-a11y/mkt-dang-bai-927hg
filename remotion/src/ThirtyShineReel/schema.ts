import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const thirtyShineReelSchema = z.object({
  captions: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  accentColor: zColor(),
  textColor: zColor(),
});

export type ThirtyShineReelProps = z.infer<typeof thirtyShineReelSchema>;
