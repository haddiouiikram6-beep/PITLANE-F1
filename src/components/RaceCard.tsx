import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Flag, ChevronRight } from 'lucide-react';
import { Race } from '../lib/store';

interface RaceCardProps {
  race: Race;
  isWatched?: boolean;
}

export const RaceCard: React.FC<RaceCardProps> = ({ race, isWatched }) => {
  return (
    <Link 
      to={`/calendrier/${race.raceId}`}
      className="group relative block bg-[#161B24]/40 border border-white/5 overflow-hidden hover:border-white/20 transition-all duration-500 backdrop-blur-sm"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={race.heroImage} 
          alt={race.raceName}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] to-transparent opacity-60" />
        {race.sprintWeekend && (
          <span className="absolute top-4 left-4 bg-accent-red text-white text-[10px] font-bold px-2 py-1 tracking-widest uppercase italic">
            SPRINT
          </span>
        )}
      </div>

      <div className="p-6 relative">
        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-electric-blue mb-2">
          {race.country}
        </p>
        <div className="flex justify-between items-end">
          <h3 className="text-xl font-black uppercase italic group-hover:text-accent-red transition-colors">
            {race.raceName}
          </h3>
          <ChevronRight className="text-white/20 group-hover:text-accent-red transition-all group-hover:translate-x-1" size={20} />
        </div>

        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2 text-text-secondary">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Date</span>
            <span className="font-mono text-[10px] uppercase text-white">{race.raceDate}</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Circuit</span>
            <span className="font-mono text-[10px] uppercase text-white truncate max-w-[100px]">{race.circuit}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const Countdown = () => {
  return (
    <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar py-2">
      {[
        { val: '057', label: 'Days' },
        { val: '12', label: 'Hours' },
        { val: '44', label: 'Mins' },
        { val: '02', label: 'Secs' },
      ].map((item, i) => (
        <React.Fragment key={item.label}>
          <div className="flex flex-col">
            <span className="text-4xl md:text-6xl font-black italic tabular-nums">{item.val}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-text-secondary">{item.label}</span>
          </div>
          {i < 3 && <div className="text-4xl md:text-6xl font-light opacity-30">:</div>}
        </React.Fragment>
      ))}
    </div>
  );
};
