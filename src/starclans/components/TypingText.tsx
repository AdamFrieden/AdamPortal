import React, { useState, useEffect, useRef } from 'react';
import { keyframes } from '@emotion/react';

// Define the blink animation using keyframes
const blink = keyframes`
  50% { opacity: 0 }
`;

interface TypingTextProps {
  text: string;
  speed?: number;
  component?: React.ElementType; // Allow wrapping component override (e.g., Typography)
  sx?: object; // Allow passing sx props
  variant?: string; // Allow passing variant if using Typography
  color?: string; // Allow passing color if using Typography
}

export const TypingText: React.FC<TypingTextProps> = ({ 
  text, 
  speed = 50, // Slightly slower default speed
  component: Component = 'span', // Default to span
  sx = {}, 
  ...rest // Pass other props like variant, color to the wrapping component
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Use ref for timeout ID

  useEffect(() => {
    // Clear previous timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setDisplayedText(''); // Reset displayed text
    indexRef.current = 0; // Reset index ref

    if (!text) return; // Handle empty or null text

    const typeCharacter = () => {
      const currentIndex = indexRef.current;
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        indexRef.current += 1;

        // Calculate randomized delay for the next character
        // Example: speed +/- 50% variability
        const randomDelay = speed + (Math.random() - 0.5) * speed;
        const nextDelay = Math.max(10, randomDelay); // Ensure minimum delay

        timeoutRef.current = setTimeout(typeCharacter, nextDelay);
      } else {
        // Typing complete, ensure timeout ref is cleared
        timeoutRef.current = null;
      }
    }

    // Start the first timeout
    timeoutRef.current = setTimeout(typeCharacter, speed);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [text, speed]); // Rerun effect if text or speed changes

  // Check if animation is complete to hide cursor
  const isComplete = displayedText.length === text?.length;

  return (
    <Component sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', ...sx }} {...rest}>
      {displayedText}
      {/* Blinking cursor only when not complete and text exists */}
      {!isComplete && text && <span style={{ animation: `${blink} 1s step-end infinite` }}>|</span>}
    </Component>
  );
} 