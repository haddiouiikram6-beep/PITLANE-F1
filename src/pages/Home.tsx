import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar, Footer } from '../components/Navigation';
import { Countdown, RaceCard } from '../components/RaceCard';
import races from '../races.json';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isBooting, setIsBooting] = useState(true);

  useGSAP(() => {
    if (isBooting) {
      const bootTl = gsap.timeline({
        onComplete: () => setIsBooting(false)
      });

      bootTl.to('.boot-text', {
        opacity: 1,
        stagger: 0.05,
        duration: 0.1,
        ease: 'none'
      })
      .to('.boot-progress', {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut'
      })
      .to('.boot-screen', {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.5
      });
      
      return;
    }

    const tl = gsap.timeline();
    tl.from('.hero-title span', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power4.out',
    })
    .from('.hero-content', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5');

    gsap.from('.section-reveal', {
      scrollTrigger: {
        trigger: '.section-reveal',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: 'power3.out',
    });
  }, { scope: container, dependencies: [isBooting] });

  const featuredRace = races[6];

  return (
    <div ref={container} className="min-h-screen bg-background text-text-primary relative overflow-hidden">
      <div className="ambient-bg" />
      <div className="ambient-glow-red" />
      <div className="ambient-glow-blue" />
      
      {isBooting && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center boot-screen">
          <div className="w-64 space-y-4">
            <div className="flex justify-between font-mono text-[10px] text-accent-red">
               <span className="boot-text opacity-0">SYSTEM_INITIALIZING...</span>
               <span className="boot-text opacity-0">v4.0.2</span>
            </div>
            <div className="h-0.5 w-full bg-white/5 relative overflow-hidden">
               <div className="absolute inset-y-0 left-0 bg-accent-red w-0 boot-progress" />
            </div>
            <div className="grid grid-cols-2 gap-2">
               {Array.from({ length: 4 }).map((_, i) => (
                 <div key={i} className="boot-text opacity-0 font-mono text-[8px] text-text-secondary">
                   MODULE_0{i+1}_LOADED
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}
      
      <Navbar />

      <main className="relative z-10 pt-20">
        <section className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row">
          {/* Left Content */}
          <div className="w-full lg:w-2/3 p-6 md:p-10 flex flex-col justify-center">
            <div className="hero-content">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-red/10 border border-accent-red/30 mb-6 group cursor-pointer hover:bg-accent-red/20 transition-colors">
                <div className="w-2 h-2 rounded-full bg-accent-red animate-pulse"></div>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent-red">Next Event: {featuredRace.raceName}</span>
              </div>
              
              <h1 className="hero-title text-5xl md:text-[100px] leading-[0.85] font-black uppercase tracking-tighter mb-8 italic">
                {featuredRace.circuit.split(' ')[0]} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-red via-white to-electric-blue">Countdown</span>
              </h1>

              <div className="mb-12">
                <Countdown />
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-accent-red hover:bg-accent-red/80 text-white font-bold uppercase tracking-widest italic rounded-sm transition-all hover:scale-105">
                  Get Tickets
                </button>
                <button className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-bold uppercase tracking-widest italic rounded-sm transition-all">
                  Track Details
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3 border-l border-white/10 p-6 md:p-10 flex flex-col gap-8 bg-black/20 backdrop-blur-sm">
            {/* Circuit Info Card */}
            <div className="p-6 bg-card/40 border border-white/5 rounded-lg backdrop-blur-sm relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="white">
                   <path d="M10,90 L90,90 L90,10 L80,10 L80,80 L10,80 Z" opacity="0.5"/>
                </svg>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-electric-blue mb-4">{featuredRace.circuit}</p>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-3xl font-black italic">{featuredRace.circuitLength}</span>
                  <span className="text-xs ml-1 opacity-60 uppercase">KM</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-bold tracking-widest opacity-40">Laps</span>
                  <span className="text-2xl font-bold">{featuredRace.laps}</span>
                </div>
              </div>
              <div className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="mt-4 flex justify-between">
                 <span className="text-[10px] uppercase font-bold text-text-secondary">Track Speed</span>
                 <span className="text-[10px] uppercase font-bold font-mono">High Intensity</span>
              </div>
            </div>

            {/* Drivers Ranking Mock */}
            <div className="p-6 bg-card/40 border border-white/5 rounded-lg">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-text-secondary mb-4">Drivers Ranking</h3>
              <div className="space-y-4">
                {[
                  { pos: '01', name: 'Max Verstappen', team: 'Oracle Red Bull Racing', pts: '420', color: 'bg-accent-red' },
                  { pos: '02', name: 'Charles Leclerc', team: 'Scuderia Ferrari', pts: '385', color: 'bg-electric-blue' },
                  { pos: '03', name: 'Lewis Hamilton', team: 'Mercedes-AMG F1', pts: '362', color: 'bg-[#00D2BE]' }
                ].map((driver) => (
                  <div key={driver.pos} className="flex items-center gap-4 group cursor-help">
                    <span className="w-4 text-xs font-bold opacity-30">{driver.pos}</span>
                    <div className={`w-1 h-8 ${driver.color}`}></div>
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-wide group-hover:text-white transition-colors">{driver.name}</p>
                      <p className="text-[10px] text-text-secondary">{driver.team}</p>
                    </div>
                    <span className="text-xs font-mono font-bold">{driver.pts} PTS</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Feed Card */}
            <div className="flex-1 border border-dashed border-white/10 rounded-lg flex items-center justify-center flex-col p-6 group hover:bg-white/5 transition-all">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-30 mb-2">Garage Sync</span>
              <span className="text-[10px] uppercase font-bold text-electric-blue">Live Data Feed 0x229F</span>
              <div className="mt-4 flex gap-1 h-4 items-end">
                {[60, 40, 80, 50, 90, 70, 45, 65].map((h, i) => (
                  <div key={i} className="w-1 bg-electric-blue/40 group-hover:bg-electric-blue transition-colors animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Content / Full Calendar Preview */}
        <section className="py-24 px-6 md:px-10 border-t border-white/5 bg-black/20 section-reveal">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-black italic uppercase">Season Calendar</h2>
                <p className="text-[10px] uppercase font-bold tracking-widest text-electric-blue mt-2">Upcoming High-Velocity Sessions</p>
              </div>
              <Link to="/calendrier" className="text-[10px] font-bold uppercase tracking-widest text-accent-red hover:underline pb-1 border-b border-accent-red/20">
                Full Schedule
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {races.slice(0, 3).map((race) => (
                <RaceCard key={race.raceId} race={race} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
