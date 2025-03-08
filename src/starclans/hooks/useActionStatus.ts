import useStarclanStore from '../context/useStarclanStore';

export function useActionStatus(actionType: string, targetId?: string) {
  const isProcessing = useStarclanStore(
    state => state.isActionProcessing(actionType, targetId)
  );
  const error = useStarclanStore(
    state => state.activeActions.find(
      a => a.actionType === actionType && a.targetId === targetId
    )?.error
  );
  
  return {
    isProcessing,
    error,
    isIdle: !isProcessing && !error,
    isError: !!error
  };
} 