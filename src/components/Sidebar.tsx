import React from 'react';
import { 
  Briefcase, 
  Database, 
  LineChart, 
  History as HistoryIcon, 
  Settings as SettingsIcon, 
  HelpCircle, 
  Plus, 
  Cpu
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewProject: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onNewProject }: SidebarProps) {
  const menuItems = [
    { id: 'workspace', label: 'Workspace', icon: Briefcase },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'insights', label: 'Insights', icon: LineChart },
    { id: 'history', label: 'History', icon: HistoryIcon },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <aside id="app-sidebar" className="w-68 bg-[#F5F2ED] border-r border-black/10 flex flex-col justify-between h-full select-none shrink-0 font-sans">
      {/* Upper Section */}
      <div className="flex flex-col pt-6 px-4">
        {/* New Project Button */}
        <button
          id="btn-new-project"
          onClick={onNewProject}
          className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] hover:bg-[#D4AF37] text-[#F5F2ED] hover:text-[#1A1A1A] font-sans font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-none transition-all duration-200 border border-black cursor-pointer mb-6"
        >
          <Plus size={16} className="stroke-[2.5]" />
          <span>New Project</span>
        </button>

        {/* Navigation Section */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-none text-xs uppercase tracking-widest font-sans font-bold transition-all duration-200 border-l-[3px] cursor-pointer text-left ${
                  isActive
                    ? 'bg-black/5 text-[#1A1A1A] border-[#D4AF37]'
                    : 'text-[#1A1A1A]/60 border-transparent hover:bg-black/[0.02] hover:text-[#1A1A1A]'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-[#D4AF37]' : 'text-[#1A1A1A]/40'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col px-4 pb-6 gap-1">
        <div className="border-t border-black/10 my-4"></div>
        
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-item-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-none text-xs uppercase tracking-widest font-sans font-bold transition-all duration-200 border-l-[3px] cursor-pointer text-left ${
                isActive
                  ? 'bg-black/5 text-[#1A1A1A] border-[#D4AF37]'
                  : 'text-[#1A1A1A]/60 border-transparent hover:bg-black/[0.02] hover:text-[#1A1A1A]'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-[#D4AF37]' : 'text-[#1A1A1A]/40'} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* System Footnote */}
        <div className="mt-6 px-2 text-center border-t border-black/5 pt-4">
          <p className="font-mono text-[9px] text-[#1A1A1A]/50 tracking-[0.25em] uppercase flex items-center justify-center gap-1">
            <Cpu size={10} />
            <span>Seq2Seq Model Active</span>
          </p>
          <p className="font-serif italic text-xs text-[#1A1A1A]/40 mt-1">
            Vanguard Anthology © 2026
          </p>
        </div>
      </div>
    </aside>
  );
}
