import React from 'react';
import { Sparkles, GraduationCap } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  developerName?: string;
  specialty?: string;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  developerName = 'Junior Dev', 
  specialty = 'Python to Java Specialist' 
}: HeaderProps) {
  
  return (
    <header id="app-header" className="bg-[#F5F2ED] border-b border-black/10 h-24 px-12 flex items-center justify-between select-none shrink-0">
      {/* Brand Title */}
      <div className="flex flex-col">
        <div className="text-[10px] tracking-[0.3em] uppercase font-sans font-semibold text-[#1A1A1A]/50">
          Archives / Seq2Seq
        </div>
        <h1 className="font-serif font-black text-xl md:text-2xl text-[#1A1A1A] tracking-tight italic flex items-baseline gap-2 mt-0.5">
          <span>TRADUCTOR DE CÓDIGO</span>
          <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#D4AF37] not-italic hidden lg:inline-block ml-1">
            Edu-Bridge T5
          </span>
        </h1>
      </div>

      {/* Center Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 h-full">
        {[
          { id: 'workspace', label: 'Workspace' },
          { id: 'documentation', label: 'Documentation' },
          { id: 'benchmarks', label: 'Benchmarks' },
        ].map((link) => {
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              id={`nav-${link.id}`}
              onClick={() => setActiveTab(link.id)}
              className={`relative h-full flex items-center px-1 text-[11px] uppercase tracking-widest font-sans font-bold transition-all duration-200 cursor-pointer ${
                isActive ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
              }`}
            >
              <span>{link.label}</span>
              {isActive && (
                <div className="absolute bottom-6 left-0 right-0 h-[1.5px] bg-[#1A1A1A] transition-all duration-300"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Developer Widget */}
      <div className="flex items-center gap-4">
        {/* Profile Card */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="font-sans font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
              {developerName}
            </div>
            <div className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase font-medium">
              {specialty}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              alt="Developer Avatar"
              className="w-10 h-10 rounded-none object-cover border border-black shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-0.5 -right-0.5 block h-2.5 w-2.5 rounded-none bg-[#D4AF37] ring-1 ring-black"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
