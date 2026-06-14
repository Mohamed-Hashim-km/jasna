'use client';

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  title,
  kicker,
  children,
}: {
  id: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          {kicker && (
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-primary font-mono font-semibold">
              {kicker}
            </p>
          )}
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl font-display">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}
