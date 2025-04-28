import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Typography } from '@mui/material';

interface AnimatedCounterProps {
  endValue: number;
  duration?: number; // Optional duration for animation
  component?: React.ElementType; // Allow wrapping component override (e.g., Typography)
  sx?: object; // Allow passing sx props
  variant?: string; // Allow passing variant if using Typography
  color?: string; // Allow passing color if using Typography
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  endValue,
  duration = 1.5, // Default animation duration in seconds
  component: Component = Typography, // Default to Typography
  sx = {},
  ...rest // Pass other props like variant, color 
}) => {
  // Motion value starting from 0 or the previous value if endValue changes later
  const count = useMotionValue(0);
  
  // Transform the count to a rounded integer for display
  const rounded = useTransform(count, latest => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, endValue, {
      duration: duration,
      ease: "easeOut" // Make the animation slow down towards the end
    });

    // Cleanup function to stop the animation if the component unmounts
    // or if endValue/duration changes before completion
    return controls.stop;

  }, [count, endValue, duration]); // Dependencies for the effect

  // Use motion version of the component to render the animated value
  const MotionComponent = motion(Component);

  return (
    <MotionComponent sx={sx} {...rest}>
      {rounded}
    </MotionComponent>
  );
}; 