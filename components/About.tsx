'use client';

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Award } from "lucide-react";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" title="About Me" kicker="Introduction">
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 text-muted-foreground"
        >
          <p>
            I&apos;m <span className="text-foreground font-medium">Jesna Beegum S</span>,
            an aspiring Python and full stack developer who loves building products
            that feel effortless to use.
          </p>
          <p>
            With a foundation in computer applications and hands-on experience
            building mobile and web apps, I focus on clean code, thoughtful UX, and
            scalable backends.
          </p>
          <p>
            When I&apos;m not coding, I&apos;m exploring new tools, prompt engineering
            techniques, and collaborating on real-world projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_0_40px_-15px_var(--color-primary)] transition-all hover:border-primary/50"
        >
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />
          <div className="relative flex items-start gap-3">
            <div className="rounded-lg bg-gradient-to-br from-primary to-secondary p-2.5 text-primary-foreground">
              <GraduationCap size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                Bachelor of Computer Applications
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                University Institute of Technology Vakkom, Attingal
              </p>
              <p className="text-xs text-muted-foreground">Kerala University · 2022–2025</p>
            </div>
          </div>
          <div className="relative mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-medium text-primary-foreground">
              <Award size={12} /> CGPA 7.00
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
              <MapPin size={12} /> Kerala, India
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
