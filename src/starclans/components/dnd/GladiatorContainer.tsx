// src/starclans/components/dnd/GladiatorContainer.tsx
import React, { forwardRef } from 'react';
import { Box, Paper, Typography, ButtonBase, useTheme, alpha, SxProps, Theme } from '@mui/material';

// Assuming these are MUI components or styled appropriately
import { Remove } from '../Remove'; // Adjust path if necessary
import { Handle } from './Handle';   // Keep using the existing Handle

// Mimic the props from the original ContainerProps for compatibility
export interface GladiatorContainerProps {
  children: React.ReactNode;
  label?: string;
  sx?: object; // Allow passing sx prop for overrides
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: (React.HTMLAttributes<any> & {
    ref?: React.Ref<any>;
    // Add other potential attributes from useSortable if needed, though HTMLAttributes covers most
  }) | undefined;
  scrollable?: boolean;
  elevation?: number; // Renamed from shadow, expects 0-24
  placeholder?: boolean;
  style?: React.CSSProperties; // Explicitly added standard style prop back
  onClick?(): void;
  onRemove?(): void;
}

export const GladiatorContainer = forwardRef<HTMLDivElement, GladiatorContainerProps>(
  (
    {
      children,
      handleProps,
      horizontal, // We'll use gridAutoFlow for horizontal layout
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      sx,
      scrollable,
      elevation, // Renamed from shadow
      style, // Destructure standard style prop
      ...props
    }: GladiatorContainerProps,
    ref
  ) => {
    const theme = useTheme();
    const Component: React.ElementType = onClick ? ButtonBase : Box; // Explicitly type Component

    const baseSx: SxProps<Theme> = {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden', // Default overflow
      boxSizing: 'border-box',
      minWidth: 350,
      m: 1.25, // Equivalent to margin: 10px
      borderRadius: theme.shape.borderRadius,
      minHeight: 200,
      transition: theme.transitions.create(['background-color', 'box-shadow'], { duration: theme.transitions.duration.standard }), // Add box-shadow to transition
      bgcolor: 'background.paper', // Use theme paper background
      border: `1px solid ${alpha(theme.palette.common.black, 0.05)}`, // Subtle border
      outline: 'none',
      ...(onClick && { // Styles for ButtonBase
          textAlign: 'initial',
      }),
    };

    const stateSx: SxProps<Theme> = {
      ...(hover && {
        // Use a slightly different background on hover, e.g., default background or a slightly lighter/darker paper
        bgcolor: alpha(theme.palette.primary.light, 0.1), // Example hover effect using theme
      }),
      ...(placeholder && {
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        color: 'text.disabled',
        bgcolor: 'transparent', // Transparent background for placeholder
        borderStyle: 'dashed',
        borderColor: alpha(theme.palette.divider, 0.5), // Dashed border using divider color
        overflow: 'visible', // Allow content visibility for placeholder text
        '&:hover': {
          borderColor: theme.palette.divider, // Darker border on hover
        },
      }),
      ...(elevation !== undefined && { // Use elevation prop for shadow
          boxShadow: theme.shadows[elevation], // Use provided elevation
      }),
      '&:focus-visible': { // Consistent focus outline
          borderColor: 'transparent',
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
      },
    };

    const headerSx: SxProps<Theme> = {
        display: 'flex',
        p: theme.spacing(0.625, 2.5, 0.625, 2.5), // 5px 20px
        pr: 1, // padding-right: 8px
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
    };

    const contentSx: SxProps<Theme> = {
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        gap: theme.spacing(1.25),
        listStyle: 'none',
        p: 2.5,
        m: 0,
        overflowY: scrollable ? 'auto' : undefined,
        flexGrow: 1,
    };

    return (
      <Component
        ref={ref as any} // Cast ref type if needed for Component polymorphism
        sx={{ ...baseSx, ...stateSx, ...sx }} // Combine styles, allow sx override
        style={style} // Apply standard style object if provided
        {...props} // Pass remaining props
        {...(onClick && { onClick: onClick, tabIndex: 0, role: 'button' })} // Add onClick and a11y props if clickable
      >
        {label ? (
          <Box sx={headerSx}>
            <Typography variant="subtitle1" component="span">{label}</Typography>
            <Box sx={{ display: 'flex' }}>
              {onRemove ? <Remove onClick={onRemove} /> : undefined}
              {handleProps ? <Handle {...handleProps} /> : undefined}
            </Box>
          </Box>
        ) : null}

        {placeholder ? (
          // Placeholder text/content goes directly in the main component
          <Typography variant="button">{children}</Typography>
        ) : (
          // Render actual children
          <Box sx={contentSx}>
            {children}
          </Box>
        )}
      </Component>
    );
  }
);

GladiatorContainer.displayName = 'GladiatorContainer';