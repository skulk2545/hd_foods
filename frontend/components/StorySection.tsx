'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const storySteps = [
  {
    title: "The Heritage",
    subtitle: "Rooted in Tradition",
    description: "HD Foods & Masale started with a simple vision: to bring the authentic, ground-at-home taste of Indian spices to every kitchen. Our journey began with a single mission of purity.",
    part: "H"
  },
  {
    title: "Dedication",
    subtitle: "Purity in Every Grain",
    description: "Our dedication to quality drives us to source directly from the richest spice-growing regions. We ensure that every 'D' in our story stands for double the dedication to your health.",
    part: "D"
  },
  {
    title: "The Legacy",
    subtitle: "A Complete Experience",
    description: "Today, the complete HD Foods logo represents a gold standard in the spice industry. From turmeric to exotic blends, we complete your culinary journey with perfection.",
    part: "Full"
  }
];

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress but keep it responsive
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.0001
  });

  // Animation Thresholds (Balanced Steps)
  // Step 1: 0.0 -> 0.33 (Read Heritage)
  // Step 2: 0.33 -> 0.66 (See Dedication)
  // Step 3: 0.66 -> 1.0 (Final Logo)

  // SVG Part Animations - H is ALWAYS visible once section starts
  const hOpacity = 1;
  const dOpacity = useTransform(smoothProgress, [0.33, 0.45], [0, 1]);
  const circleOpacity = useTransform(smoothProgress, [0.66, 0.76], [0, 1]);
  const circleScale = useTransform(smoothProgress, [0.66, 0.8], [0.7, 1]);

  // Text Animations
  // Text 1: Visible from start, fades out after 0.33
  const text1Opacity = useTransform(smoothProgress, [0.33, 0.38], [1, 0]);
  const text1Y = useTransform(smoothProgress, [0.33, 0.38], [0, -40]);

  // Text 2: Fades in after 0.33, fades out after 0.66
  const text2Opacity = useTransform(smoothProgress, [0.33, 0.38, 0.66, 0.71], [0, 1, 1, 0]);
  const text2Y = useTransform(smoothProgress, [0.33, 0.38, 0.66, 0.71], [40, 0, 0, -40]);

  // Text 3: Fades in after 0.66
  const text3Opacity = useTransform(smoothProgress, [0.66, 0.71], [0, 1]);
  const text3Y = useTransform(smoothProgress, [0.66, 0.71], [40, 0]);

  return (
    <div id="our-story" ref={containerRef} className="relative h-[300vh] bg-stone-50">

      {/* Single Sticky Wrapper to prevent empty scroll space */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">

        {/* Sticky Background Decorative */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 1], [0.03, 0.1]) }}
          className="absolute inset-0 flex items-center justify-center text-[30vw] font-serif font-black text-stone-900 select-none pointer-events-none"
        >
          STORY
        </motion.div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left Side: Animated SVG Logo */}
          <div className="flex justify-center items-center h-[400px] md:h-[600px]">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">

              {/* The SVG Logo Building Up */}
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
                {/* Background Circle / Ring */}
                <motion.g style={{ opacity: circleOpacity, scale: circleScale }}>
                  <circle cx="100" cy="100" r="95" fill="#CA8A04" stroke="#A61717" strokeWidth="6" />
                </motion.g>

                {/* H Character (Smaller, inside D's embrace) */}
                <motion.g
                  style={{ opacity: hOpacity }}
                >
                  {/* H - Left vertical stroke (Longer, slanted) */}
                  <path
                    d="M 72.6 73 L 63.4 153"
                    fill="none"
                    stroke="#A61717"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* H - Right vertical stroke (Shorter than left) */}
                  <path
                    d="M 98.6 85 L 92.2 141"
                    fill="none"
                    stroke="#A61717"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* H - Crossbar */}
                  <path
                    d="M 68 113 L 95.4 113"
                    fill="none"
                    stroke="#A61717"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </motion.g>

                {/* D Character — Big curve wrapping from bottom tip to above top tip */}
                <motion.g style={{ opacity: dOpacity }}>
                  <path
                    d="M 63.4 153 C 165 180 165 45 71 55"
                    fill="none"
                    stroke="#A61717"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </motion.g>

              </svg>

              {/* Step Progress Bar (Minimalist) */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <div className="w-48 h-1 bg-stone-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-red-600"
                    style={{ scaleX: smoothProgress, originX: 0 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="relative h-[400px] md:h-[500px]">
            {/* Step 1: Heritage */}
            <motion.div
              style={{ opacity: text1Opacity, y: text1Y }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <span className="text-red-600 font-black uppercase text-xs mb-4 block tracking-[0.3em]">
                {storySteps[0].subtitle}
              </span>
              <h2 className="text-6xl md:text-8xl font-serif text-stone-900 leading-none mb-8">
                {storySteps[0].title}
              </h2>
              <p className="text-2xl text-stone-600 leading-relaxed font-medium max-w-xl">
                {storySteps[0].description}
              </p>
            </motion.div>

            {/* Step 2: Dedication */}
            <motion.div
              style={{ opacity: text2Opacity, y: text2Y }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <span className="text-red-600 font-black uppercase text-xs mb-4 block tracking-[0.3em]">
                {storySteps[1].subtitle}
              </span>
              <h2 className="text-6xl md:text-8xl font-serif text-stone-900 leading-none mb-8">
                {storySteps[1].title}
              </h2>
              <p className="text-2xl text-stone-600 leading-relaxed font-medium max-w-xl">
                {storySteps[1].description}
              </p>
            </motion.div>

            {/* Step 3: Legacy */}
            <motion.div
              style={{ opacity: text3Opacity, y: text3Y }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <span className="text-red-600 font-black uppercase text-xs mb-4 block tracking-[0.3em]">
                {storySteps[2].subtitle}
              </span>
              <h2 className="text-6xl md:text-8xl font-serif text-stone-900 leading-none mb-8">
                {storySteps[2].title}
              </h2>
              <p className="text-2xl text-stone-600 leading-relaxed font-medium max-w-xl">
                {storySteps[2].description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
