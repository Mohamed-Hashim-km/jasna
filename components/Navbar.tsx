'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { ProximityText } from "./ProximityText";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Magnetic range={40} strength={0.25}>
          <a href="#home" className="text-3xl font-bold tracking-tight inline-block py-1">
            <ProximityText
              text="Jesna"
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-display"
              fromFontVariationSettings="'wght' 700"
              toFontVariationSettings="'wght' 900"
              radius={140}
            />
            <span className="text-foreground">
              <ProximityText
                text=".dev"
                fromFontVariationSettings="'wght' 700"
                toFontVariationSettings="'wght' 900"
                radius={140}
              />
            </span>
          </a>
        </Magnetic>

        <div className="hidden gap-6 md:flex items-center">
          {links.map((l) => (
            <Magnetic key={l.href} range={30} strength={0.2}>
              <a
                href={l.href}
                className="relative text-sm text-muted-foreground transition-colors hover:text-foreground px-2 py-1"
              >
                <ProximityText text={l.label} radius={100} />
              </a>
            </Magnetic>
          ))}
        </div>

        <button
          className="md:hidden relative z-50 p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex flex-col gap-3 border-t border-border/40 bg-background/95 px-6 py-5 md:hidden overflow-hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ x: -15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-muted-foreground hover:text-foreground block py-1.5 transition-colors"
                >
                  <ProximityText text={l.label} radius={100} />
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
