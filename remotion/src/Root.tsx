import "./index.css";
import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { MarketingVideo } from "./MarketingVideo/MarketingVideo";
import { marketingVideoSchema } from "./MarketingVideo/schema";
import { FadeText } from "./FadeText/FadeText";
import { fadeTextSchema } from "./FadeText/schema";
import { ThirtyShinePromo } from "./ThirtyShinePromo/ThirtyShinePromo";
import { thirtyShinePromoSchema } from "./ThirtyShinePromo/schema";
import { ThirtyShineReel } from "./ThirtyShineReel/ThirtyShineReel";
import { thirtyShineReelSchema } from "./ThirtyShineReel/schema";
import { TOTAL_FRAMES } from "./ThirtyShineReel/clips";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Final edited reel: the 4 salon clips in public/footage, each with
          a burned-in caption (bold white + navy outline, TikTok-caption
          style), sound effects on cuts/text pops, a highlighted combo badge
          over the services clip, and a closing CTA end-card. brandColor is
          sampled from the salon's own reference photos (staff uniform) —
          keep it the only blue in the composition, no cyan/neon/purple.
          Render with: npx remotion render ThirtyShineReel out/30shine-reel.mp4 --color-space=bt709
          (the color-space flag matters — see README). Needs the
          clip-1..4.mov files in remotion/public/footage/ (not committed to
          git — see README). */}
      <Composition
        id="ThirtyShineReel"
        component={ThirtyShineReel}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
        schema={thirtyShineReelSchema}
        defaultProps={{
          captions: [
            "30SHINE",
            "ĐẸP TRAI KHÔNG CẦN ĐỢI ✂️",
            "Cắt tóc • Gội thư giãn • Chăm sóc da",
            "GHÉ 30SHINE 927 HẬU GIANG – QUẬN 6",
          ] as [string, string, string, string],
          comboHighlight: "SHINECOMBO 2",
          outroHeadline: "GHÉ 30SHINE",
          outroSubline: "927 Hậu Giang – Quận 6",
          outroCta: "ĐẶT LỊCH NGAY",
          brandColor: "#181D54",
          textColor: "#FFFFFF",
        }}
      />

      {/* Vertical (9:16) 30Shine promo overlay, transparent background.
          Render with: npx remotion render ThirtyShinePromo out/30shine-promo.mov --codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le */}
      <Composition
        id="ThirtyShinePromo"
        component={ThirtyShinePromo}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
        schema={thirtyShinePromoSchema}
        defaultProps={{
          brand: "30SHINE",
          tagline: "ĐẸP TRAI KHÔNG CẦN ĐỢI ✂️",
          services: "Cắt tóc • Gội thư giãn • Chăm sóc da",
          cta: "GHÉ 30SHINE 927 HẬU GIANG – QUẬN 6",
          accentColor: "#FF6A00",
          textColor: "#FFFFFF",
        }}
      />

      {/* Simple fade-in / hold 2s / fade-out text, transparent background.
          Render with: npx remotion render FadeText out/fade-text.mov --codec=prores --prores-profile=4444
          See README for a transparent .webm alternative. */}
      <Composition
        id="FadeText"
        component={FadeText}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
        schema={fadeTextSchema}
        defaultProps={{
          text: "Xin chào!",
          color: "#FFFFFF",
          fontSize: 120,
          fadeInFrames: 30,
          holdFrames: 60,
          fadeOutFrames: 30,
        }}
      />

      {/* Vertical (9:16) template for Facebook/TikTok/Instagram/Zalo posts.
          Render with: npx remotion render MarketingVideo
          Customize text/colors per-render with --props, see README. */}
      <Composition
        id="MarketingVideo"
        component={MarketingVideo}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
        schema={marketingVideoSchema}
        defaultProps={{
          title: "Ưu đãi hôm nay",
          subtitle: "Ghé salon để trải nghiệm dịch vụ mới nhất",
          cta: "Xem ngay",
          backgroundColorFrom: "#7C3AED",
          backgroundColorTo: "#DB2777",
          accentColor: "#111827",
        }}
      />

      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          logoColor1: "#91dAE2",
          logoColor2: "#86A8E7",
        }}
      />
    </>
  );
};
