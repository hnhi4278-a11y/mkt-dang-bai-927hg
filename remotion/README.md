# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Compositions

- **ThirtyShineReel** — final edited reel: the 4 salon clips in
  `public/footage/` (not committed — see `public/footage/README.md`), each
  with a burned-in caption in the TikTok-caption look (bold white fill,
  thick colored outline via `-webkit-text-stroke`), one caption per clip.
  The clips' own audio is muted (`OffthreadVideo muted`) — the source had an
  unusable stuttering take of dialogue — and replaced by a synthesized
  upbeat background track plus sound effects, all in `public/sfx/`
  (generated locally with Python's `wave` module — no licensing/network
  dependency, see `scripts/` note below): a whoosh on every cut, a pop when
  each caption appears, a chime going into the outro, and `bg-music.wav`
  (kick/hihat/bass/pluck loop) under the whole thing. The services clip also
  gets a highlighted combo badge (`comboHighlight` prop) on top of its
  caption, and after the 4 clips a closing end-card (`Outro.tsx`) with a
  headline, subline and an orange CTA pill. Frame-accurate to each clip's
  exact length (see `src/ThirtyShineReel/clips.ts`); `bg-music.wav` is
  generated to match the total duration exactly (currently 25.2s — regenerate
  it if you change the footage or outro length).

  ```console
  npx remotion render ThirtyShineReel out/30shine-reel.mp4 --crf=30 --color-space=bt709
  ```

  `--crf=30` trades a bit of quality for a much smaller file (a straight
  render came out ~40MB for 22s at 1080×1920; crf=30 brought that to ~6MB).
  Drop the flag for max quality.

  `--color-space=bt709` matters: without it, Remotion tags the output as
  full-range/unspecified colorimetry, which some phones and messaging apps
  (WhatsApp/Zalo/Messenger previews, some Android/iOS players) fail to open
  or play. `bt709` matches how normal camera footage is tagged and is the
  broadly-compatible choice.

- **ThirtyShinePromo** — vertical (1080×1920, 9:16) 30Shine promo overlay,
  transparent background, ~8s: brand name fades in, tagline zooms in,
  services list fades in, then a CTA pill — each beat holds ~2s before the
  next. Meant to be composited over real salon footage in an editor. Text,
  colors and the four lines are editable in Remotion Studio's sidebar or via
  `--props`:

  ```console
  npx remotion render ThirtyShinePromo out/30shine-promo.mov \
    --codec=prores --prores-profile=4444 \
    --image-format=png --pixel-format=yuva444p10le
  ```

  Uses local system fonts (Liberation Sans, bold) rather than Google Fonts —
  no network needed at render time, and it has full Vietnamese glyph
  coverage.

- **FadeText** — simple 1920×1080, transparent-background clip: text fades
  in (1s), holds (2s), then fades out (1s). Timings and text are editable in
  Remotion Studio's sidebar, or per-render via `--props`. Transparency needs
  an alpha-capable codec/pixel format, since the default H.264 mp4 output
  has no alpha channel:

  ```console
  # ProRes 4444 .mov — opens with alpha in Premiere/After Effects/Final Cut/DaVinci
  npx remotion render FadeText out/fade-text.mov \
    --codec=prores --prores-profile=4444 \
    --image-format=png --pixel-format=yuva444p10le

  # VP8 .webm — transparent, plays in browsers
  npx remotion render FadeText out/fade-text.webm \
    --codec=vp8 --image-format=png --pixel-format=yuva420p
  ```

  Regular video players and image viewers don't understand alpha and will
  show the transparent area as solid black or white — check in a video
  editor, or composite it over another clip, to see the transparency.

- **MarketingVideo** — vertical (1080×1920, 9:16) marketing/promo template with
  an animated title, subtitle and call-to-action, ready for Facebook, TikTok,
  Instagram and Zalo posts. Text and colors are editable live in Remotion
  Studio's sidebar, or per-render:

  ```console
  npx remotion render MarketingVideo out/video.mp4 --props='{"title":"Ưu đãi cuối tuần","subtitle":"Giảm 20% cho khách mới","cta":"Đặt lịch ngay"}'
  ```

- **HelloWorld** / **OnlyLogo** — the default Remotion starter examples, kept
  for reference; feel free to delete `src/HelloWorld.tsx`,
  `src/HelloWorld/` and their `<Composition>` entries in `src/Root.tsx`
  once you no longer need them.

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npx remotion render
```

> In this sandboxed Claude Code environment, Remotion's own Chrome Headless
> Shell download is blocked by the network policy. Point Remotion at the
> Chromium that's already installed for Playwright instead:
>
> ```console
> REMOTION_BROWSER_EXECUTABLE=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell npx remotion render
> ```
>
> This isn't needed on a normal machine with unrestricted network access.

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
