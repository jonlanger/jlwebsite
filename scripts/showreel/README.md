# Home page showreel

Screen recordings of real interactions with the live products, encoded to
`public/showreel/`. Chapter times live in `src/data/showreel.ts`.

Re-record (run from this folder; frames land in `./frames/`, which is ignored):

    node clips.mjs relationshipviz shortlist careshift fluidsim climate atomicatlas botanica
    swiftc -O encode.swift -o encode
    ./encode manifest.json ../../public/showreel/showreel-1080.mp4 1920 1080 3500000 ../../public/showreel/showreel-poster.jpg
    ./encode manifest.json ../../public/showreel/showreel-720.mp4 1280 720 1800000

- `lib.mjs` borrows Playwright from `../productbench` (see the `createRequire` path).
  Chromium runs headed so WebGL/WebGPU scenes render on the GPU.
- `manifest.json` sets each clip's in/out points (seconds) and playback speed.
  The encoder prints chapter start/duration; copy them into `src/data/showreel.ts`.

Device renders: a project file can export `screens` + `stage` instead of `act`
(see `projects/solar-field-installation-devices.mjs`). Each screen is recorded with the
normal harness, then `lib/devices.mjs` maps the recordings onto a laptop and two
phones in `lib/stage.html` and renders the scene frame by frame.
