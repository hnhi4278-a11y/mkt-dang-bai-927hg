import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const fadeTextSchema = z.object({
  text: z.string(),
  color: zColor(),
  fontSize: z.number(),
  fadeInFrames: z.number(),
  holdFrames: z.number(),
  fadeOutFrames: z.number(),
});

export type FadeTextProps = z.infer<typeof fadeTextSchema>;
