#!/usr/bin/env bash
# Render in chunks with retries (a headless tab occasionally stalls), then stitch losslessly.
set -u
B=${BROWSER:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}
TOTAL=972; STEP=162; mkdir -p out/chunks; : > out/chunks/list.txt
for ((s=0; s<TOTAL; s+=STEP)); do
  e=$((s+STEP-1)); ((e>=TOTAL)) && e=$((TOTAL-1))
  f=out/chunks/c$(printf %04d $s).mp4
  for try in 1 2 3; do
    [ -s "$f" ] && break
    npx remotion render src/index.ts DuongDenMocNhi "$f" --frames=$s-$e --browser-executable="$B" \
      --codec=h264 --crf=20 --concurrency=2 --timeout=120000 >> out/render.log 2>&1 && break
    rm -f "$f"; echo "chunk $s-$e failed (try $try)"
  done
  [ -s "$f" ] || { echo "GAVE UP on $s-$e"; exit 1; }
  echo "file '$(basename $f)'" >> out/chunks/list.txt; echo "chunk $s-$e ok"
done
npx remotion ffmpeg -y -loglevel error -f concat -safe 0 -i out/chunks/list.txt -c copy out/duong-den-moc-nhi.mp4 && echo DONE
