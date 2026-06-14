'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";

type Subscriber = () => void;

interface ProximityTextContextValue {
  containerRef: MutableRefObject<HTMLElement | null>;
  subscribe: (callback: Subscriber) => () => void;
  getMousePosition: () => { x: number; y: number };
}

const ProximityTextContext = createContext<ProximityTextContextValue | null>(null);

export function ProximityTextProvider({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const subscribersRef = useRef(new Set<Subscriber>());
  const mouseClientRef = useRef({ x: 0, y: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const notifySubscribers = () => {
      frameIdRef.current = null;
      subscribersRef.current.forEach((subscriber) => subscriber());
    };

    const scheduleUpdate = () => {
      if (frameIdRef.current !== null) return;
      frameIdRef.current = requestAnimationFrame(notifySubscribers);
    };

    const updatePosition = (clientX: number, clientY: number) => {
      mouseClientRef.current = { x: clientX, y: clientY };

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mousePositionRef.current = {
          x: clientX - rect.left,
          y: clientY - rect.top,
        };
      } else {
        mousePositionRef.current = { x: clientX, y: clientY };
      }

      scheduleUpdate();
    };

    const handleMouseMove = (event: MouseEvent) => {
      updatePosition(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleViewportShift = () => {
      updatePosition(mouseClientRef.current.x, mouseClientRef.current.y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleViewportShift, { passive: true });
    window.addEventListener("resize", handleViewportShift);

    return () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
      }

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleViewportShift);
      window.removeEventListener("resize", handleViewportShift);
    };
  }, []);

  const value = useMemo<ProximityTextContextValue>(
    () => ({
      containerRef,
      subscribe: (callback) => {
        subscribersRef.current.add(callback);
        return () => {
          subscribersRef.current.delete(callback);
        };
      },
      getMousePosition: () => mousePositionRef.current,
    }),
    []
  );

  return (
    <ProximityTextContext.Provider value={value}>
      <div ref={containerRef as MutableRefObject<HTMLDivElement | null>} className={className}>
        {children}
      </div>
    </ProximityTextContext.Provider>
  );
}

export function useProximityTextContext() {
  const context = useContext(ProximityTextContext);

  if (!context) {
    throw new Error("ProximityText components must be used within ProximityTextProvider.");
  }

  return context;
}
