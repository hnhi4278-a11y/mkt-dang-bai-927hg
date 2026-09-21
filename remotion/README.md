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
