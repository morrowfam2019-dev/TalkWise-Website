# TalkWise Play media assets

This directory is the destination for the two founder-provided gameplay
videos, referenced by `src/components/talkwise-play/video-showcase.tsx`:

- `talkwise-play-1.mp4`
- `talkwise-play-2.mp4`
- `poster.jpg` (a still frame from clip 1, used as the `<video poster>` and
  the manual-play background for reduced-motion visitors)

Source files (originals, preserved, not web-optimized):
- Google Drive: TalkWisePlay1.mp4 (22.8 MB)
- Google Drive: TalkWisePlay2.mp4 (18.6 MB)

These have not yet been added — this environment's network policy blocks
outbound requests to Google Drive and to the CDN used by the available video
tooling, so the raw source bytes could not be fetched into this repo
automatically. See the PR description / final report for how to complete
this step.
