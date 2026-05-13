import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Navigation';
import races from '../races.json';
import { useRaceStore, Race } from '../lib/store';
import { Flag, Trophy, Gauge, Clock, ArrowLeft, Heart, CheckCircle } from 'lucide-react';
import gsap from 'gsap';

const RaceDetail = () => {
  const { raceId } = useParams();
  const race = races.find(r => r.raceId === raceId) as Race;
  const { favorites, watched, toggleFavorite, toggleWatched } = useRaceStore();

  const isFavorite = favorites.includes(race?.raceId);
  const isWatched = watched.includes(race?.raceId);

  useEffect(() => {
    gsap.from('.stat-box', {
      x: -30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, [race]);

  if (!race) return <div>Race not found</div>;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="ambient-bg" />
      <div className="ambient-glow-red" />
      <div className="ambient-glow-blue" />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={race.heroImage} 
          alt={race.raceName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-background/20" />
        
        <div className="absolute bottom-12 left-0 w-full">
          <div className="max-w-7xl mx-auto px-6">
            <Link to="/calendrier" className="inline-flex items-center gap-2 text-accent-red font-mono text-[10px] font-bold uppercase mb-8 hover:gap-4 transition-all tracking-widest border border-accent-red/20 px-4 py-2 bg-black/40 backdrop-blur-sm">
              <ArrowLeft size={14} /> BACK TO CALENDAR
            </Link>
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-electric-blue block mb-2">{race.circuit.toUpperCase()}</span>
            <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter">{race.raceName}</h1>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Info */}
          <div className="lg:col-span-8">
            <div className="prose prose-invert max-w-none">
              <div className="flex gap-4 mb-12">
                <button 
                  onClick={() => toggleFavorite(race.raceId)}
                  className={`flex items-center gap-3 px-6 py-3 font-mono font-bold text-xs uppercase border transition-all ${
                    isFavorite ? 'bg-accent-red border-accent-red text-white' : 'border-border text-white hover:border-accent-red'
                  }`}
                >
                  <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
                  {isFavorite ? 'In Garage' : 'Add to Garage'}
                </button>
                <button 
                  onClick={() => toggleWatched(race.raceId)}
                  className={`flex items-center gap-3 px-6 py-3 font-mono font-bold text-xs uppercase border transition-all ${
                    isWatched ? 'bg-electric-blue border-electric-blue text-white' : 'border-border text-white hover:border-electric-blue'
                  }`}
                >
                  <CheckCircle size={14} />
                  {isWatched ? 'Completed' : 'Mark as Watched'}
                </button>
              </div>

              <h2 className="text-3xl font-bold uppercase mb-8 border-b border-border pb-4">Circuit Overview</h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-12">
                {race.description}
                <br /><br />
                The 2026 regulations bring a new challenge to {race.circuit} with increased reliance on active aerodynamics and power unit efficiency. This track will test the drivers' ability to manage battery deployment across its unique layout.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card/50 p-8 glass-panel diagonal-cut">
                  <h3 className="font-mono text-accent-red text-[10px] uppercase tracking-widest mb-4">Historical Record</h3>
                  <div className="flex items-end justify-between">
                    <p className="text-4xl font-mono font-bold">1:12.422</p>
                    <span className="text-text-secondary text-xs font-mono uppercase">V. Bottas (2025)</span>
                  </div>
                </div>
                <div className="bg-card/50 p-8 glass-panel diagonal-cut">
                  <h3 className="font-mono text-electric-blue text-[10px] uppercase tracking-widest mb-4">Top Speed Zone</h3>
                  <div className="flex items-end justify-between">
                    <p className="text-4xl font-mono font-bold">342<span className="text-lg">km/h</span></p>
                    <span className="text-text-secondary text-xs font-mono uppercase">DRS Zone 3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Data Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-card/30 p-8 border border-border">
              <h3 className="font-mono text-accent-red text-xs uppercase tracking-widest mb-8 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-red animate-pulse-slow rounded-full" />
                Technical Dataset
              </h3>
              
              <div className="space-y-6">
                {[
                  { label: 'Total Laps', val: race.laps, icon: Flag },
                  { label: 'Track Length', val: race.circuitLength, icon: Trophy },
                  { label: 'Complexity', val: 'Level_III', icon: Gauge },
                  { label: 'UTC Offset', val: '+05:00', icon: Clock },
                ].map((stat, i) => (
                  <div key={i} className="stat-box flex items-center justify-between py-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <stat.icon size={16} className="text-text-secondary" />
                      <span className="text-text-secondary text-xs uppercase font-mono">{stat.label}</span>
                    </div>
                    <span className="font-bold font-mono">{stat.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-accent-red/5 p-8 border border-accent-red/20 glass-panel">
              <p className="font-mono text-[10px] text-accent-red mb-2 uppercase">Next Session Status</p>
              <h4 className="font-bold text-lg uppercase mb-4 text-white">Simulation Pending</h4>
              <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                Atmospheric data indicates a 40% probability of low friction surface temperatures during qualifying.
              </p>
              <button className="w-full bg-accent-red/10 border border-accent-red text-accent-red font-mono text-[10px] py-3 uppercase font-bold hover:bg-accent-red hover:text-white transition-all">
                SYNCHRONIZE HUD
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RaceDetail;
