import React from 'react';
import { Navbar, Footer } from '../components/Navigation';

const Teams = () => {
  const teams = [
    { name: 'Oracle Red Bull Racing', power: 'Red Bull Powertrains', drivers: ['Max Verstappen', 'Liam Lawson'], color: 'bg-accent-red', image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Formula%201%20Red%20Bull%20Racing%20Car&image_size=landscape_16_9' },
    { name: 'Scuderia Ferrari', power: 'Ferrari', drivers: ['Charles Leclerc', 'Lewis Hamilton'], color: 'bg-electric-blue', image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Formula%201%20Scuderia%20Ferrari%20Car&image_size=landscape_16_9' },
    { name: 'Mercedes-AMG F1', power: 'Mercedes', drivers: ['George Russell', 'Andrea Kimi Antonelli'], color: 'bg-[#00D2BE]', image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Formula%201%20Mercedes%20AMG%20Car&image_size=landscape_16_9' },
    { name: 'McLaren Formula 1 Team', power: 'Mercedes', drivers: ['Lando Norris', 'Oscar Piastri'], color: 'bg-[#FF8700]', image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Formula%201%20McLaren%20Car&image_size=landscape_16_9' },
    { name: 'Aston Martin Aramco', power: 'Mercedes', drivers: ['Fernando Alonso', 'Lance Stroll'], color: 'bg-[#006F62]', image: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Formula%201%20Aston%20Martin%20Car&image_size=landscape_16_9' },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary relative overflow-hidden">
      <div className="ambient-bg" />
      <div className="ambient-glow-red" />
      <div className="ambient-glow-blue" />
      <Navbar />

      <main className="pt-32 pb-24 px-6 relative z-10 max-w-7xl mx-auto">
        <header className="mb-16 border-l-4 border-accent-red pl-8">
          <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-electric-blue block mb-2">Constructor Standings // 2026</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Écuries F1</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teams.map((team) => (
            <div key={team.name} className="bg-[#161B24]/40 border border-white/5 rounded-lg backdrop-blur-sm group hover:border-white/20 transition-all overflow-hidden flex flex-col">
              <div className="h-48 w-full overflow-hidden">
                <img src={team.image} alt={team.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black italic uppercase tracking-tight group-hover:text-white transition-colors">{team.name}</h2>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mt-1">{team.power}</p>
                  </div>
                  <div className={`w-2 h-12 ${team.color}`} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 mt-auto">
                  {team.drivers.map((driver) => (
                    <div key={driver}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">Driver</p>
                      <p className="text-sm font-bold uppercase">{driver}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Teams;
