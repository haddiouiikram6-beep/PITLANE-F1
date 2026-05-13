import React from 'react';
import { Navbar, Footer } from '../components/Navigation';
import { RaceCard } from '../components/RaceCard';
import races from '../races.json';
import { useRaceStore } from '../lib/store';
import { Rocket, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const Garage = () => {
  const { favorites } = useRaceStore();
  const favoriteRaces = races.filter(r => favorites.includes(r.raceId));

  return (
    <div className="min-h-screen bg-background text-text-primary relative overflow-hidden">
      <div className="ambient-bg" />
      <div className="ambient-glow-red" />
      <div className="ambient-glow-blue" />
      <Navbar />

      <main className="pt-32 pb-24 px-6 relative z-10 max-w-7xl mx-auto">
        <header className="mb-16 border-l-4 border-electric-blue pl-8">
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-accent-red block mb-2">Engineering Hub // Personnel</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">The Virtual Garage</h1>
        </header>

        {favoriteRaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 bg-[#161B24]/40 border border-white/10 flex items-center justify-center mb-8 rounded-sm -skew-x-12">
              <Rocket size={40} className="text-accent-red opacity-50" />
            </div>
            <h2 className="text-3xl font-black italic uppercase mb-4 text-white">No data streams found</h2>
            <p className="text-text-secondary max-w-md mb-12 text-sm leading-relaxed">
              Your futuristic driver vault is empty. Pin races from the calendar to build your personalized technical dataset.
            </p>
            <Link to="/calendrier" className="bg-accent-red text-white px-10 py-4 font-black italic uppercase tracking-widest rounded-sm hover:bg-accent-red/80 transition-all hover:scale-105">
              Initialize Scan
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteRaces.map((race) => (
              <RaceCard key={race.raceId} race={race} />
            ))}
          </div>
        )}

        {favoriteRaces.length > 0 && (
          <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-[#161B24]/40 p-6 border border-white/5 rounded-lg backdrop-blur-sm">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary mb-2 uppercase">Saved Archives</p>
              <p className="text-3xl font-black italic text-accent-red">{favoriteRaces.length}</p>
            </div>
            <div className="bg-[#161B24]/40 p-6 border border-white/5 rounded-lg backdrop-blur-sm">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary mb-2 uppercase">Sync Status</p>
              <p className="text-3xl font-black italic text-electric-blue">STABLE</p>
            </div>
            <div className="md:col-span-2 bg-gradient-to-r from-accent-red/5 to-electric-blue/5 p-6 border border-white/10 rounded-lg backdrop-blur-sm flex items-center justify-between">
              <div>
                 <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary mb-1 uppercase">Global Ranking</p>
                 <p className="text-xl font-black italic uppercase text-white">#2,842 Top Strategist</p>
              </div>
              <LayoutGrid size={32} className="text-white/10" />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Garage;
