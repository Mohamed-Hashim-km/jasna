'use client';

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Award } from "lucide-react";
import { Section } from "./Section";
import { ProximityText } from "./ProximityText";

export function About() {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);
  const rotateX = useTransform(rotateXVal, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(rotateYVal, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left - rect.width / 2;
    const mouseY = event.clientY - rect.top - rect.height / 2;

    rotateXVal.set(mouseY / rect.height);
    rotateYVal.set(mouseX / rect.width);
  };

  const handleMouseLeave = () => {
    rotateXVal.set(0);
    rotateYVal.set(0);
  };

  return (
    <Section id="about" title="About Me" kicker="Introduction">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-5 text-base font-light leading-relaxed text-muted-foreground/80 md:text-lg"
        >
          <p>
            <ProximityText text="I'm " />
            <span className="font-display font-semibold text-foreground">
              <ProximityText
                text="Jesna Beegum S"
                fromFontVariationSettings="'wght' 600"
                toFontVariationSettings="'wght' 850"
                radius={140}
              />
            </span>
            <ProximityText text=", an aspiring Python and full stack developer who loves building products that feel effortless to use." />
          </p>
          <p>
            <ProximityText text="With a foundation in computer applications and hands-on experience building mobile and web apps, I focus on clean code, thoughtful UX, and scalable backends." />
          </p>
          <p>
            <ProximityText text="When I'm not coding, I'm exploring new tools, prompt engineering techniques, and collaborating on real-world projects." />
          </p>
        </motion.div>

        <div
          className="perspective-[1000px] flex justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative w-full max-w-md overflow-hidden rounded-2xl border border-border/80 bg-card/40 p-8 shadow-[0_0_50px_-20px_var(--color-primary)] transition-all hover:border-primary/50 hover:bg-card/70"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />

            <div className="relative flex items-start gap-4" style={{ transform: "translateZ(30px)" }}>
              <div className="rounded-xl bg-gradient-to-br from-primary to-secondary p-3 text-primary-foreground shadow-lg">
                <GraduationCap size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-display font-bold leading-snug text-foreground">
                  <ProximityText
                    text="Bachelor of Computer Applications"
                    fromFontVariationSettings="'wght' 650"
                    toFontVariationSettings="'wght' 900"
                    radius={140}
                  />
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  <ProximityText text="University Institute of Technology Vakkom, Attingal" />
                </p>
                <p className="mt-1 text-xs text-muted-foreground/60">
                  <ProximityText text="Kerala University - 2022-2025" radius={95} />
                </p>
              </div>
            </div>

            <div className="relative mt-8 flex flex-wrap gap-3" style={{ transform: "translateZ(20px)" }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-secondary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm">
                <Award size={13} />
                <ProximityText
                  text="CGPA 7.00"
                  fromFontVariationSettings="'wght' 600"
                  toFontVariationSettings="'wght' 850"
                  radius={95}
                />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/50 px-3.5 py-1.5 text-xs text-muted-foreground/90">
                <MapPin size={13} className="text-primary" />
                <ProximityText text="Kerala, India" radius={95} />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
