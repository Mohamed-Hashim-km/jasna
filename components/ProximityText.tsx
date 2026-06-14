'use client';

import { useEffect, useMemo, useRef, type HTMLAttributes } from "react";
import { useProximityTextContext } from "./ProximityTextProvider";

type Falloff = "linear" | "exponential" | "gaussian";

interface ProximityTextProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  radius?: number;
  falloff?: Falloff;
}

interface ParsedAxis {
  axis: string;
  fromValue: number;
  toValue: number;
}

const DEFAULT_FROM_SETTINGS = "'wght' 400";
const DEFAULT_TO_SETTINGS = "'wght' 700";

export function ProximityText({
  text,
  fromFontVariationSettings = DEFAULT_FROM_SETTINGS,
  toFontVariationSettings = DEFAULT_TO_SETTINGS,
  radius = 120,
  falloff = "gaussian",
  className = "",
  style,
  ...restProps
}: ProximityTextProps) {
  const { containerRef, subscribe, getMousePosition } = useProximityTextContext();
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const parsedSettings = useMemo<ParsedAxis[]>(() => {
    const parseSettings = (settings: string) =>
      new Map(
        settings
          .split(",")
          .map((setting) => setting.trim())
          .map((setting) => {
            const [axis, value] = setting.split(" ");
            return [axis.replace(/['"]/g, ""), Number.parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  useEffect(() => {
    letterRefs.current.forEach((letterRef) => {
      if (letterRef) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
      }
    });
  }, [fromFontVariationSettings, text]);

  useEffect(() => {
    const calculateFalloff = (distance: number) => {
      const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1);

      switch (falloff) {
        case "exponential":
          return normalizedDistance ** 2;
        case "gaussian":
          return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
        case "linear":
        default:
          return normalizedDistance;
      }
    };

    const updateLetters = () => {
      if (!containerRef.current || !rootRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const mousePosition = getMousePosition();

      letterRefs.current.forEach((letterRef) => {
        if (!letterRef) return;

        const rect = letterRef.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;
        const distance = Math.hypot(
          mousePosition.x - letterCenterX,
          mousePosition.y - letterCenterY
        );

        if (distance >= radius) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
          return;
        }

        const intensity = calculateFalloff(distance);
        const nextSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const interpolatedValue = fromValue + (toValue - fromValue) * intensity;
            return `'${axis}' ${interpolatedValue}`;
          })
          .join(", ");

        letterRef.style.fontVariationSettings = nextSettings;
      });
    };

    updateLetters();
    return subscribe(updateLetters);
  }, [
    containerRef,
    falloff,
    fromFontVariationSettings,
    getMousePosition,
    parsedSettings,
    radius,
    subscribe,
    text,
  ]);

  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <span
      ref={rootRef}
      className={className}
      style={{ display: "inline", ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((letter) => {
            const currentLetterIndex = letterIndex++;

            return (
              <span
                key={`${letter}-${currentLetterIndex}`}
                ref={(element) => {
                  letterRefs.current[currentLetterIndex] = element;
                }}
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  fontVariationSettings: fromFontVariationSettings,
                }}
              >
                {letter}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span aria-hidden="true" style={{ display: "inline-block" }}>
              &nbsp;
            </span>
          )}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  );
}
