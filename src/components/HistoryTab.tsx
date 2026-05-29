import React, { useState } from 'react';
import { Calendar, History as HistoryIcon, Search, Trash2, ArrowRight } from 'lucide-react';
import { TranslationProject } from '../types';

interface HistoryTabProps {
  history: TranslationProject[];
  onLoadProject: (project: TranslationProject) => void;
  onClearHistory: () => void;
}

export default function HistoryTab({ history, onLoadProject, onClearHistory }: HistoryTabProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.pythonCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.javaCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white border border-black/10 rounded-none p-8 shadow-xs animate-fade-in font-sans text-[#1A1A1A]">
      {/* Header with quick stats */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-black/10 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <HistoryIcon className="text-[#D4AF37]" size={18} />
            <h2 className="font-serif italic font-extrabold text-xl text-[#1A1A1A]">
              Historial de Traducciones y Proyectos
            </h2>
          </div>
          <p className="font-serif italic text-sm text-[#1A1A1A]/70 max-w-2xl">
            Revisa y carga traducciones e inferencias pasadas de tus sesiones de trabajo en el editor actual.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-rose-600 font-sans font-bold hover:text-rose-800 transition cursor-pointer self-start sm:self-center"
          >
            <Trash2 size={12} />
            <span>Limpiar Historial</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40">
          <Search size={14} />
        </span>
        <input
          type="text"
          placeholder="Buscar traducciones guardadas por palabra clave o fragmento de código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#F5F2ED]/50 border border-black/10 rounded-none py-3.5 pl-10 pr-4 text-xs font-sans tracking-wider focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-[#1A1A1A] transition-all placeholder-[#1A1A1A]/40"
        />
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-16 bg-[#F5F2ED]/40 rounded-none border border-dashed border-black/10 flex flex-col items-center justify-center">
          <HistoryIcon className="text-[#1A1A1A]/30 mb-3" size={28} />
          <h3 className="font-serif italic font-bold text-[#1A1A1A] text-base mb-1">No se encontraron traducciones</h3>
          <p className="font-serif italic text-sm text-[#1A1A1A]/60 max-w-sm px-6">
            Escribe código Python en la pestaña Workspace y selecciona "Trascodificar" para registrar el primer análisis semántico.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredHistory.map((item) => (
            <div 
              key={item.id} 
              className="border border-black/10 rounded-none p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-5 hover:border-black transition-all duration-200"
            >
              <div className="flex-1 min-w-0 space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-serif italic font-bold text-base text-[#1A1A1A]">
                    {item.name}
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-[#F5F2ED] border border-black/5 text-[#1A1A1A]/70 px-2 py-0.5 rounded-none flex items-center gap-1 uppercase tracking-wider">
                    <Calendar size={10} />
                    {item.lastUpdated}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-[#D4AF37] bg-black px-2 py-0.5 rounded-none uppercase tracking-wider">
                    BLEU: {item.bleuScore}
                  </span>
                </div>

                {/* Micro code snippet previews */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[11px] bg-[#1A1A1A] p-4 rounded-none border border-black/10 text-slate-300">
                  <div className="truncate space-y-1">
                    <strong className="text-[#D4AF37] font-mono text-[9px] uppercase tracking-widest block font-bold">Python Source:</strong>
                    <code className="text-emerald-400 font-mono text-xs">{item.pythonCode.replace(/\n/g, ' ')}</code>
                  </div>
                  <div className="truncate border-t md:border-t-0 md:border-l border-white/10 pt-2.5 md:pt-0 md:pl-4 space-y-1">
                    <strong className="text-white/40 font-mono text-[9px] uppercase tracking-widest block font-bold">Java Compiled:</strong>
                    <code className="text-[#F5F2ED] font-mono text-xs">{item.javaCode.replace(/\n/g, ' ')}</code>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <button
                onClick={() => onLoadProject(item)}
                className="flex items-center gap-2 px-5 py-3.5 bg-[#1A1A1A] hover:bg-[#D4AF37] hover:text-black text-[#F5F2ED] rounded-none text-[10px] font-sans font-bold uppercase tracking-widest cursor-pointer transition active:scale-98 shrink-0 shadow-xs"
              >
                <span>Cargar Editor</span>
                <ArrowRight size={12} className="stroke-[2.5]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
