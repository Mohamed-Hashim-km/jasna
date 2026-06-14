"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Globe, Database, Wrench, Sparkles, Snowflake } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

import { Section } from "./Section";
import { skills } from "@/data/skills";

const iconMap: Record<string, typeof Code2> = {
  Languages: Code2,
  Web: Globe,
  Python: Snowflake,
  Databases: Database,
  Tools: Wrench,
  Other: Sparkles,
};

export function Skills() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const rotations = [-6, -3, -1, 1, 3, 6];

  // Prevent hydration mismatch by waiting for mount
  if (!mounted) return null;

  return (
    <Section id="skills" title="Skills & Tools" kicker="What I Work With">
      
      {/* DESKTOP: Framer Motion Fan Layout */}
      {isLargeScreen ? (
        <div className="relative flex items-center justify-center w-full max-w-[1400px] h-[380px] lg:h-[420px] mt-10 mx-auto overflow-visible px-8 z-10 hidden lg:flex">
          <div className="flex items-center justify-center -space-x-20 xl:-space-x-24 w-full max-w-full">
            {skills.map((group, index) => {
              const isActive = activeIndex === index;
              const isLeft = activeIndex !== null && index < activeIndex;
              const baseRotate = rotations[index % rotations.length] || 0;

              let xOffset = 0;
              let yOffset = 0;
              let scaleValue = 1;
              let rotateValue = baseRotate;
              let zIndexValue = index + 10;
              let opacityValue = 1;

              if (activeIndex !== null) {
                if (isActive) {
                  xOffset = 0;
                  yOffset = -25;
                  scaleValue = 1.05;
                  rotateValue = 0;
                  zIndexValue = 100;
                  opacityValue = 1;
                } else {
                  xOffset = isLeft ? -50 : 50;
                  yOffset = 15;
                  scaleValue = 0.95;
                  rotateValue = isLeft ? baseRotate - 3 : baseRotate + 3;
                  zIndexValue = index < activeIndex ? index + 5 : 20 - index;
                  opacityValue = 0.5;
                }
              }

              const Icon = iconMap[group.category] ?? Code2;

              return (
                <motion.div
                  key={group.category}
                  animate={{
                    x: xOffset,
                    y: yOffset,
                    scale: scaleValue,
                    rotate: rotateValue,
                    zIndex: zIndexValue,
                    opacity: opacityValue,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 110,
                    damping: 18,
                    mass: 0.9,
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  // Reduced height by using aspect-[4/5] instead of [3/4.2]
                  className="relative w-[260px] xl:w-[280px] aspect-[4/5] border border-border/70 bg-card/70 backdrop-blur-md rounded-[2rem] p-6 flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.15)] cursor-pointer select-none transition-colors duration-300 hover:border-primary/40"
                  style={{
                    transformOrigin: "center bottom",
                    willChange: "transform, opacity",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="skillCardGlow"
                      className="absolute inset-0 rounded-[2rem] opacity-20 bg-primary filter blur-2xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-5 inline-flex self-start rounded-xl bg-gradient-to-br from-primary to-secondary p-3 text-primary-foreground shadow-md">
                      <Icon size={22} />
                    </div>
                    
                    <h3 className="text-xl xl:text-2xl font-bold text-foreground font-display mb-4">
                      {group.category}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 overflow-y-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {group.items.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border/80 bg-background/50 px-3 py-1.5 text-[11px] xl:text-xs text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-foreground hover:bg-background/80"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        /* MOBILE & TABLET: Swiper.js Cards Layout */
        <div className="w-full flex justify-center items-center mt-8 py-10 lg:hidden overflow-hidden">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Pagination]}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="w-[240px] xs:w-[280px] sm:w-[320px] !pb-12"
          >
            {skills.map((group) => {
              const Icon = iconMap[group.category] ?? Code2;

              return (
                <SwiperSlide key={group.category} className="bg-transparent">
                  {/* Same reduced-height aspect ratio applied here */}
                  <div className="w-full aspect-[4/5] border border-border/70 bg-card backdrop-blur-md rounded-[2rem] p-6 flex flex-col shadow-xl">
                    <div className="mb-5 inline-flex self-start rounded-xl bg-gradient-to-br from-primary to-secondary p-3 text-primary-foreground shadow-md">
                      <Icon size={22} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground font-display mb-4">
                      {group.category}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 overflow-y-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      {group.items.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </Section>
  );
}