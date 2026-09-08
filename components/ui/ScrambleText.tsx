"use client";
import React, { useState, useEffect, useRef } from "react";
import { sfx } from "@/lib/sound";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function ScrambleText({
  text,
  className = "",
  style = {},
  triggerOnHover = true,
  autoPlayOnMount = false,
  scrambleSpeed = 25,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  triggerOnHover?: boolean;
  autoPlayOnMount?: boolean;
  scrambleSpeed?: number;
}) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimating = useRef(false);

  const startScramble = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    sfx.hover();

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        isAnimating.current = false;
      }

      iteration += 1 / 2;
    }, scrambleSpeed);
  };

  useEffect(() => {
    if (autoPlayOnMount) {
      startScramble();
    }
  }, []);

  return (
    <span
      onMouseEnter={triggerOnHover ? startScramble : undefined}
      className={className}
      style={{
        display: "inline-block",
        cursor: triggerOnHover ? "pointer" : "default",
        ...style,
      }}
    >
      {displayText}
    </span>
  );
}
