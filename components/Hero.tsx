'use client';

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { LightRays } from "./LightRays";
import { ProximityText } from "./ProximityText";

const roles = [
  "Aspiring Python Developer",
  "Full Stack Developer",
  "Problem Solver",
];

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);

  const blobX = useMotionValue(0);
  const blobY = useMotionValue(0);
  const springConfig = { stiffness: 50, damping: 28, mass: 0.8 };
  const blobXSpring = useSpring(blobX, springConfig);
  const blobYSpring = useSpring(blobY, springConfig);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX - innerWidth / 2) * 0.12;
      const y = (event.clientY - innerHeight / 2) * 0.12;
      blobX.set(x);
      blobY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [blobX, blobY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((index) => (index + 1) % roles.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-85 mix-blend-screen">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={1.15}
            followMouse={false}
            mouseInfluence={0.5}
            pulsating={false}
            fadeDistance={1.0}
            saturation={1.0}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/6 via-transparent to-background/70" />
      </div>

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 z-10 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]"
        style={{ x: blobXSpring, y: blobYSpring }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-12 right-12 z-10 h-[350px] w-[350px] rounded-full bg-secondary/15 blur-[120px]"
        style={{
          x: useSpring(blobX, { stiffness: 40, damping: 30 }),
          y: useSpring(blobY, { stiffness: 40, damping: 30 }),
        }}
      />

      <div className="relative z-20 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/85"
        >
          <ProximityText
            text="Hi, I'm"
            fromFontVariationSettings="'wght' 500"
            toFontVariationSettings="'wght' 800"
            radius={100}
          />
        </motion.p>

        <h1 className="mb-6 text-5xl font-display font-extrabold leading-[1.1] tracking-tight md:text-8xl">
          <ProximityText
            text="Jesna Beegum S"
            className="bg-gradient-to-r from-white via-muted-foreground to-white bg-clip-text text-transparent"
            fromFontVariationSettings="'wght' 700"
            toFontVariationSettings="'wght' 900"
            radius={190}
          />
        </h1>

        <div className="mt-4 h-10 overflow-hidden text-lg text-foreground md:text-2xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIdx}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.215, 0.61, 0.355, 1] }}
              className="font-display font-medium tracking-wide text-foreground/90"
            >
              <ProximityText
                text={roles[roleIdx] ?? ""}
                fromFontVariationSettings="'wght' 500"
                toFontVariationSettings="'wght' 850"
                radius={140}
              />
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-muted-foreground/80"
        >
          <ProximityText
            text="Crafting clean, scalable software - turning ideas into delightful digital experiences with Python, JavaScript, and modern web tools."
            fromFontVariationSettings="'wght' 300"
            toFontVariationSettings="'wght' 700"
            radius={130}
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          <Magnetic range={45} strength={0.3}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_-8px_var(--color-primary)] transition-shadow hover:shadow-[0_0_45px_-4px_var(--color-primary)]"
            >
              <ProximityText
                text="View Projects"
                fromFontVariationSettings="'wght' 600"
                toFontVariationSettings="'wght' 850"
                radius={110}
              />
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>

          <Magnetic range={45} strength={0.3}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/45 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:border-primary/50 hover:bg-card/85"
            >
              <Mail size={15} />
              <ProximityText
                text="Contact"
                fromFontVariationSettings="'wght' 600"
                toFontVariationSettings="'wght' 850"
                radius={110}
              />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
