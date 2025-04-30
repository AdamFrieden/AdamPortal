// src/starclans/components/dnd/DraggableListItem.tsx
import React, { useEffect } from 'react';
import { Box, Paper, Typography, alpha, useTheme } from '@mui/material';
import type { DraggableSyntheticListeners } from '@dnd-kit/core';
import type { Transform } from '@dnd-kit/utilities';

// Assuming these are MUI components or styled appropriately
// If not, they might need adjustment or replacement.
import { Remove } from '../Remove'; // Adjust path if necessary
import { Handle } from './Handle';   // Keep using the existing Handle for now

export interface DraggableListItemProps {
  id: string | number; // Keep id prop
  children: React.ReactNode; // Added children prop for generic content
  dragOverlay?: boolean;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: (React.HTMLAttributes<any> & { ref?: React.Ref<any> }) | undefined; // Refined type
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  // style?: React.CSSProperties; // Removed style prop
  transition?: string | null;
  // wrapperStyle?: React.CSSProperties; // Removed wrapperStyle prop
  // value prop removed
  onRemove?(): void;
  sx?: object; // Add sx prop for customization
  // renderItem prop removed
}

export const DraggableListItem = React.memo( // Renamed component
  React.forwardRef<HTMLDivElement, DraggableListItemProps>( // Changed ref type to HTMLDivElement, updated props type
    (
      {
        id,
        children, // Destructure children
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        index,
        listeners,
        onRemove,
        // renderItem, // Removed renderItem
        sorting,
        // style, // Removed style
        transition,
        transform,
        // value prop removed
        // wrapperStyle, // Removed wrapperStyle
        sx,
        ...props
      },
      ref
    ) => {
      const theme = useTheme();

      useEffect(() => {
        if (!dragOverlay) {
          return;
        }
        document.body.style.cursor = 'grabbing';
        return () => {
          document.body.style.cursor = '';
        };
      }, [dragOverlay]);

      // renderItem logic removed

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
            // ...wrapperStyle, // Removed wrapperStyle
            ...sx // Apply incoming sx prop to outer Box
          }}
          {...props} // Pass any other props through
        >
          <Paper
            elevation={dragOverlay ? 8 : 2} // Increase shadow for overlay
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              p: 1, // Adjusted padding slightly
              minHeight: '60px', // Reduced default height, let content dictate more
              width: '100%', // Ensure paper takes full width of Box
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
              // ...style, // Removed style prop application
            }}
            {...(!handle ? listeners : undefined)}
            tabIndex={!handle && !disabled ? 0 : undefined}
          >
            {/* Render the generic children passed into the component */}
            <Box sx={{ flexGrow: 1, overflow: 'hidden', mr: 1 /* Add some margin */ }}>
              {children}
            </Box>

            {/* Actions (Handle/Remove) */}
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' /* Push buttons to the right */ }}>
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
DraggableListItem.displayName = 'DraggableListItem'; // Updated display name 