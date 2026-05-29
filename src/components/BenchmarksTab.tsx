import React, { useState } from 'react';
import { Award, BarChart2, CheckCircle, Sliders } from 'lucide-react';

export default function BenchmarksTab() {
  const [temperature, setTemperature] = useState(0.4);
  const [beamSize, setBeamSize] = useState(4);
  const [testComplexity, setTestComplexity] = useState('Medium');

  // Simulated formula calculating expected translation speed and BLEU
  const simulatedBleu = Math.round(
    42 + 
    (beamSize * 1.5) - 
    (temperature * 8) + 
    (testComplexity === 'Basic' ? 12 : testComplexity === 'Medium' ? -2 : -14)
  );

  const simulatedSpeed = Math.round(
    140 + 
    (beamSize * 55) - 
    (temperature * 20)
  );

  const models = [
    { name: 'LSTM Seq2Seq (Legacy)', bleu: 24.1, rate: 64, activeColor: 'bg-rose-500' },
    { name: 'Codex Base Model', bleu: 32.5, rate: 82, activeColor: 'bg-amber-500' },
    { name: 'CodeT5 Base Model', bleu: 36.8, rate: 91, activeColor: 'bg-[#7d4ce7]' },
    { name: 'CodeT5 Seq2Seq (Our Core)', bleu: 38.2, rate: 96, activeColor: 'bg-[#004ac6]' },
    { name: 'Gemini Hybrid-Engine', bleu: 86.4, rate: 98, activeColor: 'bg-[#00ddc6]' }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-[#1A1A1A] font-sans">
      
      {/* Benchmarks Header Card */}
      <div className="bg-white border border-black/10 rounded-none p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <Award className="text-[#D4AF37]" size={20} />
          <h2 className="font-serif italic font-extrabold text-xl text-[#1A1A1A]">
            Rendimiento y Evaluación Empírica
          </h2>
        </div>
        <p className="font-serif italic text-sm text-[#1A1A1A]/75 leading-relaxed max-w-4xl">
          Nuestras pruebas automatizadas evalúan de forma exhaustiva los códigos generados en términos de exactitud funcional, concordancia semántica (BLEU Score) y tasa de compilación sin errores utilizando el compilador oficial de OpenJDK.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Widget: Model Comparison Chart (SVG-based) - Col 7 */}
        <div className="lg:col-span-7 bg-white border border-black/10 rounded-none p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-black/5">
              <BarChart2 className="text-[#D4AF37]" size={16} />
              <h3 className="font-sans font-bold text-[11px] text-[#1A1A1A] uppercase tracking-[0.2em]">
                PRESIÓN COMPARADA DEL MODELO // BLEU & TASA DE COMPILACIÓN
              </h3>
            </div>

            <div className="space-y-5">
              {models.map((model) => (
                <div key={model.name} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-serif italic font-bold text-[#1A1A1A] text-sm">{model.name}</span>
                    <div className="font-mono text-[10px] text-[#1A1A1A]/50 flex gap-4 uppercase font-bold tracking-wider">
                      <span>BLEU: <strong className="text-[#1A1A1A]">{model.bleu}</strong></span>
                      <span>COMPILACIÓN: <strong className="text-[#1A1A1A]">{model.rate}%</strong></span>
                    </div>
                  </div>
                  
                  {/* Custom stacked visual bar chart */}
                  <div className="w-full bg-[#F5F2ED] h-2 rounded-none overflow-hidden flex border border-[#1a1a1a]/5">
                    <div 
                      className="bg-[#1A1A1A] h-full transition-all duration-1000" 
                      style={{ width: `${(model.bleu / 90) * 100}%` }}
                    />
                    <div className="bg-[#D4AF37] h-full opacity-60 transition-all duration-1000" style={{ width: `${(model.rate - (model.bleu / 95 * 100))}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#F5F2ED] border border-black/5 p-4 rounded-none mt-8 text-xs text-[#1A1A1A]/70 italic leading-relaxed">
            <CheckCircle className="text-[#D4AF37] shrink-0" size={14} />
            <span>Nota: El motor hibridado <strong>Gemini</strong> optimiza la salida reestructurando clases y detectando patrones genéricos ausentes en convertidores tradicionales.</span>
          </div>
        </div>

        {/* Right Widget: Real-time Hyperparameter Simulator - Col 5 */}
        <div className="lg:col-span-5 bg-white border border-black/10 rounded-none p-8 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-black/5">
              <Sliders className="text-[#D4AF37]" size={16} />
              <h3 className="font-sans font-bold text-[11px] text-[#1A1A1A] uppercase tracking-[0.2em]">
                SIMULADOR DE MOTOR DE INFERENCIA
              </h3>
            </div>

            <div className="space-y-6">
              
              {/* Parameter 1: Temperature */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#1A1A1A] font-sans font-bold uppercase tracking-wider text-[10px]">Temperatura (Incertidumbre):</span>
                  <span className="font-mono text-[#D4AF37] font-bold">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-[#1A1A1A] cursor-pointer"
                />
                <p className="text-[10px] text-[#1A1A1A]/50 font-serif italic text-justify">Inferencia baja (0.1 - 0.4) garantiza consistencia estructural rígida.</p>
              </div>

              {/* Parameter 2: Beam Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#1A1A1A] font-sans font-bold uppercase tracking-wider text-[10px]">Beam Search Core:</span>
                  <span className="font-mono text-[#D4AF37] font-bold">{beamSize}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={beamSize}
                  onChange={(e) => setBeamSize(parseInt(e.target.value))}
                  className="w-full accent-[#1A1A1A] cursor-pointer"
                />
                <p className="text-[10px] text-[#1A1A1A]/50 font-serif italic text-justify">Haces densos amplían la búsqueda, incrementando la fidelidad.</p>
              </div>

              {/* Parameter 3: Complexity Level */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#1A1A1A] font-sans font-bold uppercase tracking-wider text-[10px]">Complejidad Algorítmica:</span>
                  <span className="font-mono text-[#D4AF37] font-bold uppercase tracking-wider text-[11px]">{testComplexity}</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5 mt-1.5">
                  {['Basic', 'Medium', 'Complex'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setTestComplexity(level)}
                      className={`text-[10px] uppercase font-sans font-bold tracking-widest py-2 rounded-none border transition-all cursor-pointer ${
                        testComplexity === level
                          ? 'bg-[#1A1A1A] border-black text-[#F5F2ED]'
                          : 'bg-white border-black/10 text-[#1A1A1A]/60 hover:bg-black/5'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Simulated Outputs widgets */}
          <div className="border-t border-black/10 pt-5 mt-8 grid grid-cols-2 gap-4">
            <div className="bg-[#F5F2ED] p-4 rounded-none border border-black/10 text-center">
              <span className="block font-mono font-black text-[#1A1A1A] text-xl">
                {simulatedBleu}
              </span>
              <span className="font-sans text-[9px] text-[#1A1A1A]/40 uppercase tracking-widest font-black block mt-1">BLEU Estimado</span>
            </div>
            <div className="bg-white p-4 rounded-none border border-black/10 text-center">
              <span className="block font-mono font-black text-[#D4AF37] text-xl">
                {simulatedSpeed} ms
              </span>
              <span className="font-sans text-[9px] text-[#1A1A1A]/40 uppercase tracking-widest font-black block mt-1">Latencia Inferencia</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
