import { useState, useEffect, useRef, useCallback } from 'react';
import { Trip } from '../../TravelData';

export function useSearchFeature(trips: Trip[]) {
  // Ref for search input field
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  // Toggle search visibility
  const toggleSearchVisibility = useCallback(() => {
    setIsSearchVisible(prev => !prev);
  }, []);
  
  // Effect for filtering trips based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTrips([]);
      setShowSearchResults(false);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const results = trips.filter(trip => 
      trip.destination.toLowerCase().includes(searchTermLower) || 
      trip.description.toLowerCase().includes(searchTermLower) ||
      trip.country.toLowerCase().includes(searchTermLower)
    );
    
    setFilteredTrips(results);
    setShowSearchResults(true);
  }, [searchTerm, trips]);
  
  // Focus search input when search becomes visible
  useEffect(() => {
    if (isSearchVisible && searchInputRef.current) {
      // Short timeout to ensure the collapse animation has started
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchVisible]);
  
  // Clear search and hide results
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setShowSearchResults(false);
    setIsSearchVisible(false);
  }, []);
  
  return {
    searchInputRef,
    searchTerm,
    setSearchTerm,
    filteredTrips,
    showSearchResults,
    isSearchVisible,
    setIsSearchVisible,
    toggleSearchVisibility,
    clearSearch
  };
} 