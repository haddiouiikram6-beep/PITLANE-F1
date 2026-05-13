import React from 'react';
import { Navbar, Footer } from '../components/Navigation';
import races from '../races.json';
import { useRaceStore } from '../lib/store';
import { Activity, Clock, BarChart3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Season = () => {
  const { watched } = useRaceStore();
  const watchedRaces = races.filter(r => watched.includes(r.raceId));

  return (
    <div className="min-h-screen bg-background text-text-primary relative overflow-hidden">
      <div className="ambient-bg" />
      <div className="ambient-glow-red" />
      <div className="ambient-glow-blue" />
      <Navbar />

      <main className="pt-32 pb-24 px-6 relative z-10 max-w-7xl mx-auto">
        <header className="mb-16 border-l-4 border-accent-red pl-8">
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-electric-blue block mb-2">Performance Analytics // Archive</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Season Journey</h1>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-[#161B24]/40 p-8 border border-white/5 backdrop-blur-sm rounded-lg group hover:border-white/10 transition-all">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary mb-2 uppercase">Predicted Points</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black italic text-electric-blue">342.5</span>
              <span className="text-xs text-electric-blue/60">+12.4%</span>
            </div>
            <div className="w-full bg-white/5 h-0.5 mt-4 overflow-hidden">
               <div className="bg-electric-blue h-full w-[75%] shadow-[0_0_10px_rgba(69,208,255,0.5)]" />
            </div>
          </div>
          <div className="bg-[#161B24]/40 p-8 border border-white/5 backdrop-blur-sm rounded-lg group hover:border-white/10 transition-all">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary mb-2 uppercase">Races Watched</p>
            <p className="text-3xl font-black italic text-accent-red">{watchedRaces.length} / {races.length}</p>
            <div className="flex gap-1 mt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`h-0.5 flex-1 ${i < 4 ? 'bg-accent-red' : 'bg-white/5'}`} />
              ))}
            </div>
          </div>
          <div className="bg-[#161B24]/40 p-8 border border-white/5 backdrop-blur-sm rounded-lg group hover:border-white/10 transition-all">
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary mb-2 uppercase">Accuracy</p>
            <p className="text-3xl font-black italic">88.2%</p>
            <div className="mt-4 flex items-center gap-2 text-text-secondary text-[10px] font-bold uppercase tracking-wider">
              <TrendingUp size={12} className="text-electric-blue" />
              Global Rank: #442
            </div>
          </div>
          <div className="bg-[#161B24]/40 p-8 border border-white/5 backdrop-blur-sm rounded-lg group hover:border-white/10 transition-all flex justify-between items-center">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary mb-2 uppercase">Fan Engagement</p>
              <p className="text-2xl font-black italic text-electric-blue uppercase tracking-tighter">Ultra</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
              <div className="w-2 h-2 bg-accent-red rounded-full animate-pulse shadow-[0_0_8px_rgba(255,59,92,0.8)]" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Timeline Feed */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <h2 className="text-2xl font-black italic uppercase flex items-center gap-3 tracking-tighter">
                <Activity size={20} className="text-accent-red" />
                Race History Log
              </h2>
              <button className="text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 rounded-sm px-6 py-2 text-text-secondary hover:text-white transition-colors hover:bg-white/10">
                Export Log
              </button>
            </div>

            <div className="space-y-6">
              {watchedRaces.length === 0 ? (
                <div className="bg-[#161B24]/40 border border-white/5 p-8 rounded-lg text-center backdrop-blur-sm">
                  <p className="text-text-secondary italic font-medium uppercase text-xs tracking-widest">No races logged in your season journal yet.</p>
                </div>
              ) : (
                watchedRaces.map((race) => (
                  <div key={race.raceId} className="group relative bg-[#161B24]/40 border border-white/5 rounded-lg p-2 flex gap-6 hover:border-white/10 transition-all backdrop-blur-sm">
                    <div className="w-40 h-28 shrink-0 overflow-hidden rounded-sm">
                      <img 
                        src={race.heroImage} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                        alt="" 
                      />
                    </div>
                    <div className="flex-1 py-2 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-black italic uppercase tracking-tight">{race.raceName}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-accent-red/20 text-accent-red px-3 py-1 rounded-full">Watched</span>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{race.circuit} • {race.raceDate}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-0.5 bg-white/5 relative">
                          <div className="absolute inset-y-0 left-0 bg-electric-blue w-[85%]" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-electric-blue">85% Match</span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Fake upcoming spacer as seen in design */}
              <div className="h-px bg-gradient-to-r from-transparent via-accent-red to-transparent opacity-20 my-12" />
              <div className="glass-panel p-2 flex gap-6 opacity-40 grayscale">
                 <div className="w-40 h-28 bg-card flex items-center justify-center">
                   <Clock className="text-text-secondary" />
                 </div>
                 <div className="py-4">
                    <h3 className="text-xl font-bold uppercase">Next Up: Azerbaijan GP</h3>
                    <p className="text-[10px] font-mono">SIMULATION_DATA_PENDING</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Activity Feed Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-panel p-8 border border-border">
              <h3 className="text-lg font-bold uppercase mb-8 flex items-center gap-2">
                <BarChart3 size={20} className="text-electric-blue" />
                Performance Performance
              </h3>
              <div className="space-y-8">
                <div>
                   <div className="flex justify-between text-[10px] font-mono text-text-secondary mb-2">
                     <span>AVG_REACTION_TIME</span>
                     <span className="text-white">0.24s</span>
                   </div>
                   <div className="h-12 flex items-end gap-1">
                      {[20, 40, 80, 90, 30].map((h, i) => (
                        <div key={i} className={`flex-1 ${i === 3 ? 'bg-electric-blue' : 'bg-border/30'}`} style={{ height: `${h}%` }} />
                      ))}
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-[10px] font-mono text-text-secondary mb-2 uppercase">
                     <span>Activity Feed</span>
                   </div>
                   <div className="space-y-6">
                      {[
                        { icon: Activity, text: 'You moved up 12 places in FERRARI_FANS_LGE' },
                        { icon: TrendingUp, text: 'New analysis available for RD_14_MONACO' },
                      ].map((act, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-accent-red/10 flex items-center justify-center shrink-0">
                            <act.icon size={14} className="text-accent-red" />
                          </div>
                          <p className="text-xs text-white leading-relaxed">{act.text}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Season;
