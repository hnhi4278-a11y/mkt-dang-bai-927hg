import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const marketingVideoSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  cta: z.string(),
  backgroundColorFrom: zColor(),
  backgroundColorTo: zColor(),
  accentColor: zColor(),
});

export type MarketingVideoProps = z.infer<typeof marketingVideoSchema>;
