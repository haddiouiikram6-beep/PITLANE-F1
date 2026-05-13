import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="fixed top-0 w-full z-50 h-20 px-6 md:px-10 flex items-center justify-between backdrop-blur-md bg-background/60 border-b border-white/5">
      <div className="flex items-center gap-4">
        <NavLink to="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-red to-electric-blue flex items-center justify-center rounded-sm -skew-x-12 transition-transform group-hover:scale-110">
            <span className="text-black font-black text-xl italic">P</span>
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tighter uppercase italic">
            Pitlane <span className="text-accent-red">F1</span> 2026
          </span>
        </NavLink>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-widest uppercase">
        {[
          { name: 'Calendrier', path: '/calendrier' },
          { name: 'Mon Garage', path: '/mongarage' },
          { name: 'Ma Saison', path: '/masaison' },
          { name: 'Écuries', path: '/ecuries' },
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `pb-1 transition-all duration-300 hover:text-electric-blue ${
                isActive ? 'text-electric-blue border-b-2 border-electric-blue' : 'text-text-primary/60 hover:text-text-primary'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex w-10 h-10 rounded-full border border-white/20 bg-white/5 items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        </div>
        <button className="md:hidden text-text-primary">
          <Search size={24} />
        </button>
      </div>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="h-12 px-6 md:px-10 bg-[#10141C] border-t border-white/5 flex items-center justify-between text-[10px] font-bold tracking-[0.2em] uppercase text-text-secondary">
      <div className="hidden md:flex gap-8">
        <div className="flex items-center gap-2">
          <span className="text-white opacity-40">Air:</span>
          <span className="text-electric-blue">24.2°C</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white opacity-40">Track:</span>
          <span className="text-accent-red">38.5°C</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white opacity-40">Humidity:</span>
          <span className="text-white">14%</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
         <span className="hidden sm:inline">FIA Formula 1 World Championship 2026</span>
         <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
         <span>Live Session</span>
      </div>
    </footer>
  );
};
