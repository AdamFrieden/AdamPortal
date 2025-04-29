// src/starclans/components/dnd/GladiatorItem.tsx
import React, { useEffect } from 'react';
import { Box, Paper, Typography, alpha, useTheme } from '@mui/material';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';

// Assuming these are MUI components or styled appropriately
// If not, they might need adjustment or replacement.
import { Remove } from '../Remove'; // Adjust path if necessary
import { Handle } from './Handle';   // Keep using the existing Handle for now

export interface GladiatorItemProps {
  id: string | number; // Added id prop for clarity
  dragOverlay?: boolean;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties; // Keep original style prop for potential overrides
  transition?: string | null;
  wrapperStyle?: React.CSSProperties; // Keep wrapperStyle for now, though sx is preferred
  value: React.ReactNode; // Placeholder for gladiator data/display
  onRemove?(): void;
  // renderItem prop is less likely needed now styling is internal, but kept for API consistency
  renderItem?(args: {
    dragOverlay: boolean;
    dragging: boolean;
    sorting: boolean;
    index: number | undefined;
    fadeIn: boolean;
    listeners: DraggableSyntheticListeners;
    ref: React.Ref<HTMLElement>;
    style: React.CSSProperties | undefined;
    transform: GladiatorItemProps['transform'];
    transition: GladiatorItemProps['transition'];
    value: GladiatorItemProps['value'];
  }): React.ReactElement;
}

export const GladiatorItem = React.memo(
  React.forwardRef<HTMLDivElement, GladiatorItemProps>( // Changed ref type to HTMLDivElement
    (
      {
        id,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value, // This will eventually be replaced/used by specific gladiator details
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      const theme = useTheme();

      useEffect(() => {
        if (!dragOverlay) {
          return;
        }
        // Still useful for global cursor change
        document.body.style.cursor = 'grabbing';
        return () => {
          document.body.style.cursor = '';
        };
      }, [dragOverlay]);

      // If a custom renderItem is provided, use it (maintains compatibility if needed)
      if (renderItem) {
        return renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style, // Pass original style through
          transform,
          transition,
          value,
        });
      }

      // Default rendering using MUI Box/Paper
      return (
        <Box
          ref={ref}
          sx={{
            display: 'flex',
            boxSizing: 'border-box',
            transform: transform
              ? `translate3d(${Math.round(transform.x)}px, ${Math.round(transform.y)}px, 0) scaleX(${transform.scaleX ?? 1}) scaleY(${transform.scaleY ?? 1})`
              : undefined,
            transformOrigin: '0 0',
            touchAction: 'manipulation', // Equivalent to manipulation
            transition: transition || undefined, // Apply dnd-kit transition
            zIndex: dragOverlay ? 999 : undefined, // Lift drag overlay
            opacity: dragging && !dragOverlay ? 0.5 : undefined, // Fade non-overlay item when dragging
            cursor: !handle && !disabled ? 'grab' : undefined, // Grab cursor if draggable without handle
            animation: fadeIn ? 'fadeIn 500ms ease' : undefined, // Basic fade-in similar to original
            '@keyframes fadeIn': { // Define keyframe directly in sx
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
            ...wrapperStyle, // Apply wrapperStyle if provided
          }}
          {...props} // Pass any other props through
        >
          <Paper
            elevation={dragOverlay ? 8 : 2} // Increase shadow for overlay
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              p: 2, // Standard padding
              height: '120px', // Set a fixed height (adjust as needed)
              borderRadius: theme.shape.borderRadius, // Use theme border radius
              boxSizing: 'border-box',
              listStyle: 'none', // Ensure no list styles
              transformOrigin: '50% 50%',
              backgroundColor: disabled ? alpha(theme.palette.background.paper, 0.7) : theme.palette.background.paper,
              color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
              cursor: disabled ? 'not-allowed' : (handle ? 'default' : 'grab'),
              outline: 'none', // Remove default outline
              '&:focus-visible': {
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}`, // Example focus ring
              },
              ...style, // Apply original style prop for overrides last
            }}
            {...(!handle ? listeners : undefined)}
            tabIndex={!handle && !disabled ? 0 : undefined}
          >
            {/* Placeholder for Gladiator Content */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1">Gladiator: {value}</Typography>
              <Typography variant="caption">ID: {id}</Typography>
              {/* Add Avatar, Power etc. here later */}
            </Box>

            {/* Actions (Handle/Remove) */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              {onRemove && !disabled ? (
                <Remove
                    // Potentially add some sx styling if Remove needs adjustments
                    onClick={onRemove}
                />
              ) : null}
              {handle && !disabled ? (
                <Handle
                    {...handleProps} // Spread props for the handle component
                    {...listeners}   // Apply listeners to the handle itself
                />
              ) : null}
            </Box>
          </Paper>
        </Box>
      );
    }
  )
);

// Ensure component has a display name for debugging/React DevTools
GladiatorItem.displayName = 'GladiatorItem'; 