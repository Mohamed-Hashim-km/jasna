'use client';

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import { Folder, ArrowUpRight, UserCircle2 } from "lucide-react";
import { Section } from "./Section";
import { ProximityText } from "./ProximityText";
import { projects } from "@/data/projects";

export function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 22, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 22, mass: 0.2 });

  const handleMouseMove = (event: React.MouseEvent) => {
    mouseX.set(event.clientX + 25);
    mouseY.set(event.clientY - 120);
  };

  return (
    <Section id="projects" title="Featured Projects" kicker="Recent Work">
      <div className="relative grid gap-8 md:grid-cols-2" onMouseMove={handleMouseMove}>
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.12 }}
            onMouseEnter={() => setActiveProject(index)}
            onMouseLeave={() => setActiveProject(null)}
            data-cursor-text="VIEW"
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/20 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:bg-card/50"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-gradient-to-br from-primary to-secondary p-3 text-primary-foreground shadow-md transition-transform group-hover:scale-105">
                    <Folder size={22} />
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-primary">
                    <ProximityText
                      text="Featured"
                      fromFontVariationSettings="'wght' 600"
                      toFontVariationSettings="'wght' 850"
                      radius={90}
                    />
                    <ArrowUpRight size={10} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>

                <h3 className="mt-6 text-2xl font-display font-bold leading-tight text-foreground">
                  <ProximityText
                    text={project.title}
                    fromFontVariationSettings="'wght' 650"
                    toFontVariationSettings="'wght' 900"
                    radius={145}
                  />
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground/80">
                  <ProximityText text={project.description} radius={120} />
                </p>
              </div>

              <div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border/40 bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-1 text-xs font-mono text-foreground/90"
                    >
                      <ProximityText text={tech} radius={90} />
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2.5 border-t border-border/40 pt-4 text-xs font-light text-muted-foreground/70">
                  <UserCircle2 size={15} className="text-primary" />
                  <span>
                    <ProximityText text={project.role} radius={110} />
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}

        <motion.div
          style={{ x: springX, y: springY }}
          className="fixed z-[80] hidden h-[210px] w-[320px] overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] pointer-events-none lg:block"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: activeProject !== null ? 1 : 0.8,
            opacity: activeProject !== null ? 1 : 0,
            rotate: activeProject !== null ? (activeProject % 2 === 0 ? 3 : -3) : 0,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="absolute h-full w-full transition-transform duration-500 ease-[0.76,0,0.24,1]"
              style={{
                transform: `translateY(${(index - (activeProject ?? 0)) * 100}%)`,
              }}
            >
              <img
                src={project.title === "Diet Hut" ? "/images/diet-hut.png" : "/images/paw.png"}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
