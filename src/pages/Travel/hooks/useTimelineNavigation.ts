// src/pages/Travel/hooks/useTimelineNavigation.ts
import { useCallback } from 'react';

export function useTimelineNavigation() {
  const focusTimelineTrip = useCallback((tripId: number) => {
    // Wait for React to finish rendering
    console.log("Focusing on trip:", tripId);

    setTimeout(() => {
      const element = document.getElementById(`timeline-${tripId}`);
      if (!element) return;
      
      // This is the critical part - ensure we're finding the scrollable container
      const scrollContainer = element.closest('[data-timeline-container]');
      if (!scrollContainer) return;
      
      // Get the position of the element relative to the scroll container
      const containerRect = scrollContainer.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      // Calculate how far to scroll
      const relativePosition = elementRect.top - containerRect.top;
      const scrollPosition = scrollContainer.scrollTop + relativePosition - (containerRect.height / 2) + (elementRect.height / 2);
      
      // Perform the scroll
      scrollContainer.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }, 250);
  }, []);

  return { focusTimelineTrip };
}