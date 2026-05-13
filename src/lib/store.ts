import { useState, useEffect } from 'react';

export interface Race {
  raceId: string;
  raceName: string;
  country: string;
  continent: string;
  circuit: string;
  laps: number;
  circuitLength: string;
  raceDate: string;
  sprintWeekend: boolean;
  heroImage: string;
  description: string;
}

export function useRaceStore() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('pitlane_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [watched, setWatched] = useState<string[]>(() => {
    const saved = localStorage.getItem('pitlane_watched');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pitlane_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('pitlane_watched', JSON.stringify(watched));
  }, [watched]);

  const toggleFavorite = (raceId: string) => {
    setFavorites(prev => 
      prev.includes(raceId) ? prev.filter(id => id !== raceId) : [...prev, raceId]
    );
  };

  const toggleWatched = (raceId: string) => {
    setWatched(prev => 
      prev.includes(raceId) ? prev.filter(id => id !== raceId) : [...prev, raceId]
    );
  };

  return { favorites, watched, toggleFavorite, toggleWatched };
}
