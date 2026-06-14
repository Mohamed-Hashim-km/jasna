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
import { ProximityText } from "./ProximityText";
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

  if (!mounted) return null;

  return (
    <Section id="skills" title="Skills & Tools" kicker="What I Work With">
      {isLargeScreen ? (
        <div className="relative mx-auto mt-10 hidden h-[380px] w-full max-w-[1400px] items-center justify-center overflow-visible px-8 lg:flex lg:h-[420px]">
          <div className="flex w-full max-w-full items-center justify-center -space-x-20 xl:-space-x-24">
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
                  className="relative flex aspect-[4/5] w-[260px] cursor-pointer select-none flex-col rounded-[2rem] border border-border/70 bg-card/70 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-colors duration-300 hover:border-primary/40 xl:w-[280px]"
                  style={{
                    transformOrigin: "center bottom",
                    willChange: "transform, opacity",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="skillCardGlow"
                      className="pointer-events-none absolute inset-0 rounded-[2rem] bg-primary opacity-20 blur-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-5 inline-flex self-start rounded-xl bg-gradient-to-br from-primary to-secondary p-3 text-primary-foreground shadow-md">
                      <Icon size={22} />
                    </div>

                    <h3 className="mb-4 text-xl font-display font-bold text-foreground xl:text-2xl">
                      <ProximityText
                        text={group.category}
                        fromFontVariationSettings="'wght' 650"
                        toFontVariationSettings="'wght' 900"
                        radius={125}
                      />
                    </h3>

                    <div className="flex flex-wrap gap-2 overflow-y-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-border/80 bg-background/50 px-3 py-1.5 text-[11px] text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-background/80 hover:text-foreground xl:text-xs"
                        >
                          <ProximityText text={item} radius={90} />
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
        <div className="flex w-full items-center justify-center overflow-hidden py-10 mt-8 lg:hidden">
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards, Pagination]}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="w-[240px] !pb-12 xs:w-[280px] sm:w-[320px]"
          >
            {skills.map((group) => {
              const Icon = iconMap[group.category] ?? Code2;

              return (
                <SwiperSlide key={group.category} className="bg-transparent">
                  <div className="flex aspect-[4/5] w-full flex-col rounded-[2rem] border border-border/70 bg-card p-6 shadow-xl backdrop-blur-md">
                    <div className="mb-5 inline-flex self-start rounded-xl bg-gradient-to-br from-primary to-secondary p-3 text-primary-foreground shadow-md">
                      <Icon size={22} />
                    </div>

                    <h3 className="mb-4 text-xl font-display font-bold text-foreground">
                      <ProximityText
                        text={group.category}
                        fromFontVariationSettings="'wght' 650"
                        toFontVariationSettings="'wght' 900"
                        radius={125}
                      />
                    </h3>

                    <div className="flex flex-wrap gap-2 overflow-y-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-xs text-muted-foreground"
                        >
                          <ProximityText text={item} radius={90} />
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
