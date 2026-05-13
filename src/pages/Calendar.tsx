import React, { useState } from 'react';
import { Navbar, Footer } from '../components/Navigation';
import { RaceCard } from '../components/RaceCard';
import races from '../races.json';
import { useRaceStore } from '../lib/store';
import { Filter, Grid, List } from 'lucide-react';

const CalendarPage = () => {
  const { watched } = useRaceStore();
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const continents = ['All', ...new Set(races.map(r => r.continent))];

  const filteredRaces = filter === 'All' 
    ? races 
    : races.filter(r => r.continent === filter);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="ambient-bg" />
      <div className="ambient-glow-red" />
      <div className="ambient-glow-blue" />
      <Navbar />

      <main className="pt-32 pb-24 px-6 relative z-10 max-w-7xl mx-auto">
        <header className="mb-16 border-l-4 border-accent-red pl-8">
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-electric-blue block mb-2">Circuit Directory // 2026</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Grand Prix Calendar</h1>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12 bg-card/20 p-6 border border-white/5 backdrop-blur-sm rounded-lg">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar w-full md:w-auto">
            <div className="flex items-center gap-2 text-text-secondary mr-4">
              <Filter size={16} />
              <span className="font-mono text-xs uppercase">Filter:</span>
            </div>
            {continents.map((cont) => (
              <button
                key={cont}
                onClick={() => setFilter(cont)}
                className={`text-[10px] uppercase font-black italic tracking-widest px-6 py-2 transition-all rounded-sm ${
                  filter === cont 
                    ? 'bg-accent-red text-white' 
                    : 'bg-white/5 border border-white/10 text-text-secondary hover:bg-white/10 hover:text-white'
                }`}
              >
                {cont}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-8 hidden lg:flex">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 transition-colors hover:text-accent-red ${view === 'grid' ? 'text-accent-red' : 'text-text-secondary'}`}
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 transition-colors hover:text-accent-red ${view === 'list' ? 'text-accent-red' : 'text-text-secondary'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className={`grid gap-8 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredRaces.map((race, index) => (
            <div key={race.raceId} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
              <RaceCard race={race} isWatched={watched.includes(race.raceId)} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CalendarPage;
