import React, { useEffect, useState, useMemo } from 'react';
import { GeoJSON } from 'react-leaflet';

interface CountryHighlighterProps {
  visitedCountries: Set<string>;
}

const CountryHighlighter: React.FC<CountryHighlighterProps> = ({ visitedCountries }) => {
  const [countriesGeoJson, setCountriesGeoJson] = useState<any>(null);

  // Fetch GeoJSON data for world countries on mount
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then((res) => res.json())
      .then((data) => setCountriesGeoJson(data))
      .catch((err) => console.error('Error fetching countries GeoJSON', err));
  }, []);

  // Style function for the GeoJSON layer: highlight visited countries
  const geoJsonStyle = (feature: any) => {
    // Expecting the country name in feature.properties.ADMIN
    const countryName = feature.properties.ADMIN;
    if (visitedCountries.has(countryName)) {
      return {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.15,
        weight: 1,
      };
    } else {
      return {
        color: 'gray',
        fillColor: 'white',
        fillOpacity: 0.1,
        weight: 1,
      };
    }
  };

  if (!countriesGeoJson) return null;

  return <GeoJSON data={countriesGeoJson} style={geoJsonStyle} />;
};

export default CountryHighlighter; 