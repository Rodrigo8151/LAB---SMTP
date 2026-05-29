import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  Play, 
  RotateCw, 
  AlertCircle, 
  BookOpen, 
  Settings, 
  HelpCircle,
  FolderOpen
} from 'lucide-react';
import { TranslationProject } from '../types';

interface WorkspaceTabProps {
  currentProject: TranslationProject;
  onProjectChange: (project: TranslationProject) => void;
  onTranslate: (code: string) => Promise<void>;
  isTranslating: boolean;
  presets: TranslationProject[];
}

export default function WorkspaceTab({
  currentProject,
  onProjectChange,
  onTranslate,
  isTranslating,
  presets
}: WorkspaceTabProps) {
  const [pythonCode, setPythonCode] = useState(currentProject.pythonCode);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);
  const [votes, setVotes] = useState({ likes: 42, dislikes: 2 });
  
  // Update local python editor state when preset changes
  useEffect(() => {
    setPythonCode(currentProject.pythonCode);
    setFeedback(null);
  }, [currentProject]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentProject.javaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type: 'like' | 'dislike') => {
    if (feedback === type) {
      // Toggle off
      setFeedback(null);
      setVotes(prev => ({
        ...prev,
        [type === 'like' ? 'likes' : 'dislikes']: prev[type === 'like' ? 'likes' : 'dislikes'] - 1
      }));
    } else {
      // Toggle on or switch
      const oldType = feedback;
      setFeedback(type);
      setVotes(prev => {
        const update = { ...prev };
        update[type === 'like' ? 'likes' : 'dislikes'] += 1;
        if (oldType) {
          update[oldType === 'like' ? 'likes' : 'dislikes'] -= 1;
        }
        return update;
      });
    }
  };

  // Dynamic parameters for SVG Gauges
  const calculateStrokeDash = (percentage: number, radius = 30) => {
    const circumference = 2 * Math.PI * radius;
    return circumference - (percentage / 100) * circumference;
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in p-1">
      {/* Target Track Selector Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/70 p-5 rounded-none border border-black/10 shadow-xs">
        <div className="flex items-center gap-3">
          <FolderOpen size={16} className="text-[#D4AF37]" />
          <span className="font-sans font-bold text-[10px] text-[#1A1A1A]/60 uppercase tracking-[0.2em]">
            PROYECTO ACTIVO //
          </span>
          <span className="font-serif italic font-black text-sm text-[#1A1A1A] border-b border-black/20 pb-0.5">
            {currentProject.name}
          </span>
        </div>
        
        {/* Preset Selector Rail */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
          <span className="font-sans text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 hidden lg:inline mr-2">Estudio de Caso:</span>
          {presets.map((preset) => {
            const isSelected = preset.id === currentProject.id;
            return (
              <button
                key={preset.id}
                id={`btn-preset-${preset.id}`}
                onClick={() => onProjectChange(preset)}
                className={`text-[10px] uppercase tracking-widest px-4 py-2 rounded-none font-sans font-bold transition-all duration-200 whitespace-nowrap cursor-pointer border ${
                  isSelected 
                    ? 'bg-[#1A1A1A] text-[#F5F2ED] border-black' 
                    : 'bg-white text-[#1A1A1A]/65 border-black/10 hover:bg-black/5 hover:text-[#1A1A1A]'
                }`}
              >
                {preset.name.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Coding Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Python Input Panel - Col 5 */}
        <div id="python-panel" className="lg:col-span-5 flex flex-col bg-white border border-black/10 rounded-none overflow-hidden relative">
          <div className="bg-[#F5F2ED] border-b border-black/10 px-5 py-4.5 flex items-center justify-between">
            <span className="font-sans text-[11px] font-bold text-[#1A1A1A] tracking-[0.2em] uppercase">
              INPUT / PYTHON SCRIPT
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono tracking-wider font-bold text-[#D4AF37]">SRC_CODE</span>
            </div>
          </div>
          
          <div className="flex-1 min-h-[300px] bg-[#1A1A1A] p-5 flex flex-col relative font-mono">
            {/* Styled overlay numbers */}
            <div className="absolute left-3 top-5 text-[#F5F2ED]/30 text-xs text-right pr-3 select-none border-r border-[#F5F2ED]/10 flex flex-col gap-1 w-6 h-full font-mono font-medium">
              <span>01</span>
              <span>02</span>
              <span>03</span>
              <span>04</span>
              <span>05</span>
              <span>06</span>
              <span>07</span>
              <span>08</span>
              <span>09</span>
            </div>
            
            <textarea
              id="python-code-editor"
              value={pythonCode}
              onChange={(e) => setPythonCode(e.target.value)}
              placeholder="# Escribe o pega tu código Python educativo aquí..."
              className="w-full h-full bg-transparent text-[#F5F2ED] font-mono text-sm focus:outline-none resize-none pl-11 outline-none relative leading-relaxed placeholder-white/30"
              spellCheck="false"
              disabled={isTranslating}
            />
          </div>

          <div className="bg-[#F5F2ED] border-t border-black/5 px-5 py-3 flex items-center justify-between text-[#1A1A1A]/60">
            <span className="font-mono text-[10px] uppercase tracking-wider">utf-8 | python3</span>
            <button 
              id="clear-python-btn"
              onClick={() => setPythonCode('')}
              className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A] hover:text-[#D4AF37] transition-all cursor-pointer"
              disabled={isTranslating}
            >
              [ Limpiar ]
            </button>
          </div>
        </div>

        {/* Action Column - Translation Trigger - Col 2 */}
        <div className="lg:col-span-2 flex flex-col justify-center items-center gap-6 py-4 min-h-[160px] lg:min-h-0 relative">
          
          {/* Elegant geometric frame decorations */}
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 -translate-y-12 h-[1px] bg-black/10 z-0" />

          {/* Translation Rectangular Elegant Button */}
          <button
            id="translate-button"
            onClick={() => onTranslate(pythonCode)}
            disabled={isTranslating}
            className={`relative z-10 w-24 h-24 rounded-none flex flex-col items-center justify-center text-white transition-all duration-300 border border-black ${
              isTranslating 
                ? 'bg-black opacity-80 cursor-wait'
                : 'bg-[#1A1A1A] hover:bg-[#D4AF37] hover:text-[#1A1A1A] hover:scale-105 cursor-pointer shadow-md'
            }`}
          >
            <div className="relative mb-1">
              <RotateCw size={20} className={`stroke-[2] ${isTranslating ? 'animate-spin text-[#D4AF37]' : ''}`} />
            </div>
            <span className="font-sans font-bold text-[10px] tracking-[0.2em] mt-1 uppercase">
              {isTranslating ? '...' : 'TRADUCIR'}
            </span>
          </button>

          {/* Success compilation status label */}
          <div className="z-10 mt-1">
            {isTranslating ? (
              <div className="flex items-center gap-2 border border-[#D4AF37]/50 bg-white/50 text-[#D4AF37] px-3.5 py-1.5 rounded-none text-[10px] font-sans font-bold tracking-widest animate-pulse">
                <span>EJECUTANDO...</span>
              </div>
            ) : currentProject.compilerSuccess ? (
              <div 
                id="compile-success-pill"
                className="flex items-center gap-2 bg-emerald-50/80 text-emerald-800 border border-emerald-800/20 px-4 py-1.5 rounded-none text-[10px] font-sans font-bold tracking-widest uppercase"
              >
                <span>COMPILE SUCCESS</span>
                <Check size={11} className="stroke-[3]" />
              </div>
            ) : (
              <div 
                id="compile-error-pill"
                className="flex items-center gap-2 bg-rose-50 text-rose-800 border border-rose-800/20 px-4 py-1.5 rounded-none text-[10px] font-sans font-bold tracking-widest uppercase"
              >
                <span>COMPILE ERROR</span>
                <AlertCircle size={11} className="stroke-[3]" />
              </div>
            )}
          </div>
        </div>

        {/* Java Output Panel - Col 5 */}
        <div id="java-panel" className="lg:col-span-5 flex flex-col bg-white border border-black/10 rounded-none overflow-hidden relative">
          <div className="bg-[#F5F2ED] border-b border-black/10 px-5 py-4.5 flex items-center justify-between">
            <span className="font-sans text-[11px] font-bold text-[#1A1A1A] tracking-[0.2em] uppercase">
              OUTPUT / JAVA IDE
            </span>
            
            {/* Copy Button */}
            <button
              id="copy-java-btn"
              onClick={handleCopy}
              className={`flex items-center gap-2 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-none border font-sans font-bold transition-all duration-200 cursor-pointer ${
                copied 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                  : 'bg-white text-[#1A1A1A]/70 border-black/15 hover:bg-[#1A1A1A] hover:text-[#F5F2ED]'
              }`}
            >
              {copied ? (
                <>
                  <Check size={11} className="text-emerald-700 stroke-[2.5]" />
                  <span>COPIADO</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>COPIAR</span>
                </>
              )}
            </button>
          </div>

          <div className="flex-1 min-h-[300px] bg-[#1A1A1A] p-5 flex flex-col relative font-mono text-slate-100 overflow-auto">
            <pre className="text-sm leading-relaxed whitespace-pre-wrap select-all focus:outline-none outline-none">
              <code className="text-emerald-300 font-mono">
                {isTranslating ? (
                  <span className="text-white/40 italic">Generando traducción educativa de Java...</span>
                ) : (
                  currentProject.javaCode
                )}
              </code>
            </pre>
          </div>

          <div className="bg-[#F5F2ED] border-t border-black/5 px-5 py-3 flex items-center justify-between text-[#1A1A1A]/60 select-none">
            <span className="font-mono text-[10px] uppercase tracking-wider">jdk-21 | standard-oop</span>
            <span className="text-[9px] bg-black text-[#F5F2ED] px-2 py-0.5 rounded-none font-mono font-bold tracking-wider">SANDBOX</span>
          </div>
        </div>

      </div>

      {/* Bottom Education Bridge & Metrics Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Education Bridge - Spans 8 cols */}
        <div id="education-bridge-panel" className="lg:col-span-8 bg-white border border-black/10 rounded-none p-6.5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-3.5 mb-5 pb-3 border-b border-black/5">
              <Sparkles className="text-[#D4AF37]" size={16} />
              <h3 className="font-sans font-bold text-[11px] text-[#1A1A1A] tracking-[0.2em] uppercase">
                GUÍA PUENTE EDUCATIVO
              </h3>
            </div>

            <div className="text-[#1A1A1A] text-sm md:text-base leading-relaxed mb-6 font-serif italic text-justify opacity-90 pl-3 border-l-2 border-[#D4AF37]/50">
              {isTranslating ? (
                <div className="space-y-2.5 animate-pulse">
                  <div className="h-4 bg-black/5 rounded-none w-full"></div>
                  <div className="h-4 bg-black/5 rounded-none w-11/12"></div>
                  <div className="h-4 bg-black/5 rounded-none w-3/4"></div>
                </div>
              ) : (
                <p>
                  {currentProject.explanation}
                </p>
              )}
            </div>
          </div>

          {/* User Feedback Interaction */}
          <div className="pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-sans text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A]/50">
                ¿Fue útil el puente?
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  id="vote-like-btn"
                  onClick={() => handleFeedback('like')}
                  className={`p-2 rounded-none border transition-all duration-200 cursor-pointer flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-wider ${
                    feedback === 'like'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-white border-black/10 text-[#1A1A1A]/70 hover:bg-black/5'
                  }`}
                >
                  <ThumbsUp size={11} />
                  <span>({votes.likes})</span>
                </button>
                <button
                  id="vote-dislike-btn"
                  onClick={() => handleFeedback('dislike')}
                  className={`p-2 rounded-none border transition-all duration-200 cursor-pointer flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-wider ${
                    feedback === 'dislike'
                      ? 'bg-rose-50 border-rose-300 text-rose-800'
                      : 'bg-white border-black/10 text-[#1A1A1A]/70 hover:bg-black/5'
                  }`}
                >
                  <ThumbsDown size={11} />
                  <span>({votes.dislikes})</span>
                </button>
              </div>
            </div>

            {/* Micro Details output log */}
            <div className="font-mono text-[10px] text-[#1A1A1A]/60 bg-black/[0.02] px-3.5 py-1 rounded-none border border-black/5 self-end max-w-full truncate">
              {isTranslating ? 'Running virtual sandbox compiler...' : currentProject.compilationDetails}
            </div>
          </div>
        </div>

        {/* Right Column: Datasets & Success Metrics - Spans 4 cols */}
        <div id="datasets-metrics-column" className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Datasets Utilizados Card */}
          <div id="datasets-card" className="bg-white border border-black/10 rounded-none p-6.5 shadow-xs">
            <span className="block font-sans text-[11px] font-bold text-[#1A1A1A]/50 tracking-[0.2em] uppercase mb-4.5">
              DATOS DE ENTRENAMIENTO
            </span>
            
            <div className="flex flex-col gap-3">
              {[
                { name: 'CodeXGLUE', desc: 'Microsoft benchmark de traducción neural', icon: 'check', color: 'border-l-black bg-[#F5F2ED]/60' },
                { name: 'XLCoST', desc: 'Dataset cruzado multilenguaje avanzado', icon: 'share', color: 'border-l-[#D4AF37] bg-[#F5F2ED]/30' },
                { name: 'RosettaCode', desc: 'Repositorio comunitario de soluciones idomáticas', icon: 'nodes', color: 'border-l-[#1A1A1A] bg-white' }
              ].map((ds) => (
                <div 
                  key={ds.name}
                  className={`p-3 rounded-none border-l-[3.5px] border-y border-r border-[#1a1a1a]/10 flex items-start gap-3 transition-all duration-200 group ${ds.color}`}
                >
                  <div className="mt-0.5">
                    {ds.icon === 'check' && (
                      <span className="w-5 h-5 rounded-none bg-black text-[#F5F2ED] flex items-center justify-center">
                        <Check size={11} className="stroke-[3]" />
                      </span>
                    )}
                    {ds.icon === 'share' && (
                      <span className="w-5 h-5 rounded-none bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </span>
                    )}
                    {ds.icon === 'nodes' && (
                      <span className="w-5 h-5 rounded-none bg-black/10 flex items-center justify-center text-black">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="5" r="3" />
                          <circle cx="5" cy="19" r="3" />
                          <circle cx="19" cy="19" r="3" />
                          <path d="M5 16l4-8M19 16l-4-8" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-sans font-bold text-xs text-[#1A1A1A] flex items-center justify-between">
                      <span>{ds.name}</span>
                      <span className="font-mono text-[9px] text-[#1A1A1A]/40 font-normal group-hover:text-[#D4AF37] transition-colors">
                        Ready
                      </span>
                    </div>
                    <div className="font-sans text-[10px] text-[#1A1A1A]/60 mt-0.5 leading-tight">
                      {ds.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Métricas de Éxito Circular Progress Dial */}
          <div id="metrics-card" className="bg-white border border-black/10 rounded-none p-6.5 shadow-xs flex-1 flex flex-col justify-between">
            <div>
              <span className="block font-sans text-[11px] font-bold text-[#1A1A1A]/50 tracking-[0.2em] uppercase mb-4.5">
                MÉTRICAS DE ÉXITO
              </span>
              
              <div className="grid grid-cols-3 gap-2 items-center justify-items-center mt-2">
                
                {/* Gauge 1: BLEU Score */}
                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="36" cy="36" r="30" stroke="#F5F2ED" strokeWidth="5" fill="transparent" />
                      <circle 
                        cx="36" 
                        cy="36" 
                        r="30" 
                        stroke="#1A1A1A" 
                        strokeWidth="5" 
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 30}
                        strokeDashoffset={calculateStrokeDash(isTranslating ? 20 : currentProject.bleuScore)}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="square"
                      />
                    </svg>
                    <div className="absolute font-mono font-bold text-xs text-[#1A1A1A]">
                      {isTranslating ? '...' : currentProject.bleuScore}
                    </div>
                  </div>
                  <span className="font-mono text-[8px] text-[#1A1A1A]/60 font-bold tracking-wider mt-2.5 uppercase text-center leading-tight">
                    BLEU Score
                  </span>
                </div>

                {/* Gauge 2: Compile Rate */}
                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="36" cy="36" r="30" stroke="#F5F2ED" strokeWidth="5" fill="transparent" />
                      <circle 
                        cx="36" 
                        cy="36" 
                        r="30" 
                        stroke="#D4AF37" 
                        strokeWidth="5" 
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 30}
                        strokeDashoffset={calculateStrokeDash(isTranslating ? 40 : currentProject.compileRate)}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="square"
                      />
                    </svg>
                    <div className="absolute font-mono font-bold text-xs text-[#1A1A1A]">
                      {isTranslating ? '...' : `${currentProject.compileRate}%`}
                    </div>
                  </div>
                  <span className="font-mono text-[8px] text-[#1A1A1A]/60 font-bold tracking-wider mt-2.5 uppercase text-center leading-tight">
                    Compile
                  </span>
                </div>

                {/* Gauge 3: Acceptance */}
                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="36" cy="36" r="30" stroke="#F5F2ED" strokeWidth="5" fill="transparent" />
                      <circle 
                        cx="36" 
                        cy="36" 
                        r="30" 
                        stroke="#1A1A1A" 
                        strokeWidth="5" 
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 30}
                        strokeDashoffset={calculateStrokeDash(isTranslating ? 30 : currentProject.acceptanceRate)}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="square"
                      />
                    </svg>
                    <div className="absolute font-mono font-bold text-xs text-[#1A1A1A]">
                      {isTranslating ? '...' : `${currentProject.acceptanceRate}%`}
                    </div>
                  </div>
                  <span className="font-mono text-[8px] text-[#1A1A1A]/60 font-bold tracking-wider mt-2.5 uppercase text-center leading-tight">
                    Acceptance
                  </span>
                </div>

              </div>
            </div>
            
            <div className="mt-5 text-center border-t border-black/5 pt-3">
              <span className="font-sans text-[10px] text-[#1A1A1A]/50">
                Inferencia en lote verificado por LLM & Sandbox JVM interactiva.
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
