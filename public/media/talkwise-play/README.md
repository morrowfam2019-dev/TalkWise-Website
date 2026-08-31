# TalkWise Play media assets

Gameplay videos referenced by `src/components/talkwise-play/video-showcase.tsx`,
looped back-to-back on `/talkwise-play`:

- `talkwise-play-1.mp4` — optimized web copy, 1.33 MB, 494x960, H.264/AAC-free
  (muted playback), 30fps, ~44.5s
- `talkwise-play-2.mp4` — optimized web copy, 1.33 MB, 558x960, H.264, 30fps,
  ~37.3s
- `poster.jpg` — first frame of clip 1, used as the `<video poster>` and the
  manual-play background for reduced-motion visitors

## Source

Originals were founder-provided gameplay recordings (`TalkWisePlay1.mp4`,
22.8 MB; `TalkWisePlay2.mp4`, 18.6 MB — HEVC 10-bit HDR screen recordings,
~1320px wide, 60fps) delivered via a temporary GitHub Release
(`talkwise-play-sources-videos`) and are preserved there as the canonical
originals; they are intentionally not committed to the repo.

## Optimization performed

Encoded from the HDR sources with ffmpeg: `zscale`/`tonemap` (Hable) to
convert HDR (bt2020/PQ) to SDR (bt709) for consistent playback across
browsers, downscaled to 960px on the long edge, resampled to 30fps, encoded
H.264 (`-profile main -crf 23 -preset slow`), `yuv420p`, `+faststart`, audio
stripped (both clips play muted in the loop). Combined output is ~2.7 MB for
both clips versus ~41.5 MB for the two originals.
