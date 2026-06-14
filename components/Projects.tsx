'use client';

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Folder, ArrowUpRight, UserCircle2 } from "lucide-react";
import { Section } from "./Section";
import { projects } from "@/data/projects";

export function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
  // Motion values for tracking cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smoothing the floating preview follow lag
  const springX = useSpring(mouseX, { stiffness: 150, damping: 22, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 22, mass: 0.2 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Offset slightly so it floats next to the cursor instead of directly under it
    mouseX.set(e.clientX + 25);
    mouseY.set(e.clientY - 120);
  };

  return (
    <Section id="projects" title="Featured Projects" kicker="Recent Work">
      <div 
        className="relative grid gap-8 md:grid-cols-2"
        onMouseMove={handleMouseMove}
      >
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            onMouseEnter={() => setActiveProject(i)}
            onMouseLeave={() => setActiveProject(null)}
            data-cursor-text="VIEW"
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/20 p-8 transition-all duration-300 hover:border-primary/50 hover:bg-card/50 hover:-translate-y-1.5"
          >
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-gradient-to-br from-primary to-secondary p-3 text-primary-foreground shadow-md transition-transform group-hover:scale-105">
                    <Folder size={22} />
                  </div>
                  <div className="rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1 text-[10px] uppercase tracking-wider text-primary font-mono font-semibold flex items-center gap-1">
                    Featured
                    <ArrowUpRight size={10} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
                
                <h3 className="mt-6 text-2xl font-bold text-foreground font-display leading-tight">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground/80 leading-relaxed font-light">{p.description}</p>
              </div>

              <div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-1 text-xs text-foreground/90 border border-border/40 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2.5 border-t border-border/40 pt-4 text-xs text-muted-foreground/70 font-light">
                  <UserCircle2 size={15} className="text-primary" />
                  <span>{p.role}</span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}

        {/* Floating Project Image Hover Preview Container */}
        <motion.div
          style={{
            x: springX,
            y: springY,
          }}
          className="fixed pointer-events-none z-[80] hidden lg:block w-[320px] h-[210px] rounded-2xl overflow-hidden border border-border/60 bg-background/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: activeProject !== null ? 1 : 0.8,
            opacity: activeProject !== null ? 1 : 0,
            rotate: activeProject !== null ? (activeProject % 2 === 0 ? 3 : -3) : 0,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        >
          {projects.map((p, i) => (
            <div
              key={p.title}
              className="w-full h-full absolute transition-transform duration-500 ease-[0.76,0,0.24,1]"
              style={{ 
                transform: `translateY(${(i - (activeProject ?? 0)) * 100}%)`,
              }}
            >
              <img
                src={p.title === "Diet Hut" ? "/images/diet-hut.png" : "/images/paw.png"}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
