/** Motion tokens for the editorial paper journey. */

export const MOTION = {
  instant: 0.12,
  fast: 0.18,
  base: 0.28,
  emphasis: 0.42,
  act: 0.55,
  reveal: 0.7,
  likertConfirmMs: 350,
  slideStep: 22,
  slideStory: 14,
  blur: 6,
} as const;

export const EASE = {
  exit: [0.4, 0, 1, 1] as const,
  enter: [0, 0, 0.2, 1] as const,
  standard: [0.22, 1, 0.36, 1] as const,
};

export const stepVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? MOTION.slideStep : -MOTION.slideStep,
    filter: `blur(${MOTION.blur}px)`,
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir >= 0 ? -MOTION.slideStep : MOTION.slideStep,
    filter: `blur(${MOTION.blur}px)`,
  }),
};

export const stepTransition = {
  exit: { duration: MOTION.fast, ease: EASE.exit },
  enter: { duration: MOTION.base, ease: EASE.enter },
};

export const storyVariants = {
  enter: {
    opacity: 0,
    y: MOTION.slideStory,
    filter: `blur(${MOTION.blur}px)`,
  },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: {
    opacity: 0,
    y: -MOTION.slideStory / 2,
    filter: `blur(${MOTION.blur}px)`,
  },
};

export const reducedStepVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};
