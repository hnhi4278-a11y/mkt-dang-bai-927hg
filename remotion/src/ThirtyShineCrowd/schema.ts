import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const thirtyShineCrowdSchema = z.object({
  introCaption: z.string(),
  socialProofCaption: z.string(),
  outroHeadline: z.string(),
  outroSubline: z.string(),
  outroCta: z.string(),
  outroPhone: z.string(),
  brandColor: zColor(),
  textColor: zColor(),
});

export type ThirtyShineCrowdProps = z.infer<typeof thirtyShineCrowdSchema>;
