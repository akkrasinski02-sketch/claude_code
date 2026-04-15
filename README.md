# Remotion Video Example

A minimal [Remotion](https://www.remotion.dev/) project showing how to build videos with React.

The `CLAUDE.md` file in the repo root contains the Remotion skill guidance so Claude Code knows the project conventions when editing or adding compositions.

## Getting started

```bash
npm install
npm run studio      # open the Remotion Studio preview
npm run build       # render MyComp to out/video.mp4
```

## Project layout

```
src/
  index.ts      # registers the Root
  Root.tsx      # declares the <Composition>
  MyComp.tsx    # the example video
```

## The example composition — `MyComp`

`src/MyComp.tsx` is a 240-frame (8 second @ 30fps) 1920x1080 video
demonstrating most of the core Remotion primitives from `CLAUDE.md`:

- **`TransitionSeries`** with `fade()` and `slide()` transitions between scenes
- **`spring()`** and **`interpolate()`** for frame-driven animation
- **`AbsoluteFill`** for layered scenes (twinkling starfield background)
- **`random()`** with static seeds for deterministic star positions
- **`Sequence`** for staggered child timing (progress bar appears mid-scene)
- **`useCurrentFrame()`** + **`useVideoConfig()`** hooks
- Gradient text, scaling shapes, and a pulsing finale — all pure, deterministic,
  frame-based.

### Scenes

1. **Title** — animated gradient title springs in, subtitle fades up
2. **Shapes** — five rounded squares pop in with staggered springs and rotate
   while a progress bar fills below
3. **Finale** — pulsing "Thanks!" with a gradient fill

Edit `Root.tsx` to change the `durationInFrames`, size, fps, or `defaultProps`
(the `title` and `subtitle` shown in the opening scene).
