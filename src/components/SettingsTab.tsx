import React, { useState } from 'react';
import { Settings, ShieldCheck, Key, Cpu, BookOpen, ToggleLeft, ToggleRight } from 'lucide-react';

export default function SettingsTab() {
  const [activeModel, setActiveModel] = useState('gemini-3.5-flash');
  const [javaTarget, setJavaTarget] = useState('JDK 21');
  const [strictOop, setStrictOop] = useState(true);

  return (
    <div className="bg-white border border-black/10 rounded-none p-8 shadow-xs animate-fade-in space-y-8 font-sans text-[#1A1A1A]">
      
      {/* Settings Title */}
      <div className="flex items-center gap-3 pb-5 border-b border-black/10">
        <Settings className="text-[#D4AF37]" size={20} />
        <h2 className="font-serif italic font-extrabold text-xl text-[#1A1A1A]">
          Configuración del Configurado y Motor
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Connection Setup and API Keys Specs */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section: Credentials */}
          <div className="border border-black/10 rounded-none p-6 space-y-4 bg-[#F5F2ED]">
            <h3 className="font-serif italic font-bold text-[#1A1A1A] text-base flex items-center gap-2">
              <Key size={15} className="text-[#D4AF37]" />
              <span>Conexión de API Key de Gemini</span>
            </h3>
            <p className="font-serif italic text-sm text-[#1A1A1A]/70 leading-relaxed">
              Esta aplicación utiliza el nuevo SDK de Google <strong>@google/genai</strong> server-side. Para obtener traducciones 100% dinámicas e inteligentes de esquemas de código Python arbitrarios, configura tu clave:
            </p>
            
            <div className="bg-white p-5 rounded-none border border-black/10 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-black/5">
                <span className="font-sans font-bold uppercase tracking-wider text-[10px] text-[#1A1A1A]/50">Estado de API Key:</span>
                <span className="font-mono text-[#D4AF37] font-bold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                  <ShieldCheck size={12} />
                  ACTIVO EN ENTORNO
                </span>
              </div>
              <p className="font-serif text-xs text-[#1A1A1A]/70 leading-relaxed">
                La plataforma inyecta de forma segura tu variable <code className="bg-[#F5F2ED] px-1 py-0.5 rounded-none font-mono text-xs text-rose-600 font-bold">GEMINI_API_KEY</code> desde el panel de secreto en **Settings &gt; Secrets** para ocultarla por completo del navegador.
              </p>
            </div>
          </div>

          {/* Section: Model selection */}
          <div className="space-y-3.5">
            <h3 className="font-serif italic font-bold text-[#1A1A1A] text-base flex items-center gap-2">
              <Cpu size={15} className="text-[#D4AF37]" />
              <span>Motor Inteligente de Traducción</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash', desc: 'Inferencia inteligente ultrarrápida, explicaciones didácticas en prosa.' },
                { id: 'codet5-seq2seq-offline', name: 'CodeT5 Base (Local)', desc: 'Motor offline alternativo de lógica lingüística paramétrica.' }
              ].map((model) => (
                <button
                  key={model.id}
                  onClick={() => setActiveModel(model.id)}
                  className={`p-5 rounded-none border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    activeModel === model.id
                      ? 'border-black bg-[#F5F2ED]/60'
                      : 'border-black/10 bg-white hover:bg-black/5'
                  }`}
                >
                  <span className="font-sans font-extrabold text-xs uppercase tracking-wider text-[#1A1A1A] block mb-2">
                    {model.name}
                  </span>
                  <span className="font-serif italic text-xs text-[#1A1A1A]/70 leading-relaxed">
                    {model.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Section: Code Preferences */}
        <div className="lg:col-span-5 border border-black/10 rounded-none p-6 space-y-6">
          <h3 className="font-serif italic font-bold text-[#1A1A1A] text-base flex items-center gap-2 pb-2 border-b border-black/5">
            <BookOpen size={15} className="text-[#D4AF37]" />
            <span>Reglas de Salida de Java</span>
          </h3>

          {/* Target SDK version */}
          <div className="space-y-2">
            <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60">Versión Target de Java:</label>
            <select 
              value={javaTarget}
              onChange={(e) => setJavaTarget(e.target.value)}
              className="w-full bg-[#F5F2ED]/50 border border-black/10 rounded-none py-3 px-3.5 text-xs font-sans tracking-wide focus:outline-none focus:ring-1 focus:ring-black cursor-pointer text-[#1A1A1A]"
            >
              <option value="JDK 21">JDK 21 (Modern-Record, Streams, Sealed classes)</option>
              <option value="JDK 17">JDK 17 (Estándar corporativo de soporte largo)</option>
              <option value="JDK 11">JDK 11 (Legacy de soporte robusto)</option>
              <option value="JDK 8">JDK 8 (Soporte retrocompatible clásico)</option>
            </select>
          </div>

          {/* Strict OOP toggles */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center text-xs">
              <div className="space-y-1">
                <span className="block font-sans font-bold uppercase tracking-wider text-[10px] text-[#1A1A1A]">Encapsulamiento estricto POO:</span>
                <span className="font-serif italic text-xs text-[#1A1A1A]/60 block leading-normal">Agrupa el método dinámico siempre en clases explícitas.</span>
              </div>
              <button onClick={() => setStrictOop(!strictOop)} className="cursor-pointer transition hover:opacity-80">
                {strictOop ? (
                  <ToggleRight size={34} className="text-[#D4AF37]" />
                ) : (
                  <ToggleLeft size={34} className="text-black/30" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-[#F5F2ED] border border-black/5 p-4 rounded-none text-center text-xs font-serif italic text-[#1A1A1A]/70 leading-relaxed">
            Toda compilación es evaluada estáticamente en una sandbox estricta antes de reportar la tasa de compilación final (Compile Rate).
          </div>
        </div>

      </div>

    </div>
  );
}
