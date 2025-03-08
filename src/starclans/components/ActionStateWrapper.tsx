import { ReactNode } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useActionStatus } from '../hooks/useActionStatus';

interface ActionStateWrapperProps {
  actionType: string;
  targetId?: string;
  children: ReactNode;
  LoadingComponent?: ReactNode;
  ErrorComponent?: ReactNode;
}

export function ActionStateWrapper({
  actionType,
  targetId,
  children,
  LoadingComponent,
  ErrorComponent
}: ActionStateWrapperProps) {
  const { isProcessing, error } = useActionStatus(actionType, targetId);
  
  if (isProcessing) {
    return LoadingComponent || (
      <Box sx={{ position: 'relative' }}>
        {children}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }}>
          <CircularProgress size={24} />
        </Box>
      </Box>
    );
  }
  
  if (error && ErrorComponent) {
    return ErrorComponent;
  }
  
  return <>{children}</>;
} 