import React, { useState } from 'react';
import { Database, Search, Filter, ShieldCheck, HelpCircle, HardDrive, Cpu, Terminal } from 'lucide-react';

export default function DatasetsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const datasetList = [
    {
      id: 'codexglue',
      name: 'CodeXGLUE (Translation-PY-to-JV)',
      category: 'Microsoft Research',
      size: '124,500 samples',
      description: 'Un benchmark de transferencia masivo diseñado por Microsoft para evaluar la traducción de código semántico de Python a Java y viceversa.',
      parameters: 'Complejidad C-Index, tipado tipificado, firmas optimizadas',
      accuracySim: 91.4,
      status: 'Active',
      sampleText: 'def duplicate_val(arr):\n    return [v * 2 for v in arr]'
    },
    {
      id: 'xlcost',
      name: 'XLCoST (Cross-Lingual Code Static Translation)',
      category: 'Academic Benchmarks',
      size: '48,200 samples',
      description: 'Colección de códigos paralelos alineados a nivel de método y de sentencia. Permite traducción fina de flujos lógicos estructurados.',
      parameters: 'Sentencias estructuradas, alineamiento semántico',
      accuracySim: 88.7,
      status: 'Active',
      sampleText: 'def sum_two(a, b):\n    return a + b'
    },
    {
      id: 'rosettacode',
      name: 'RosettaCode Parallel Snippets',
      category: 'Open Source Community',
      size: '15,600 templates',
      description: 'Repositorio abierto que presenta soluciones al mismo problema computacional en múltiples lenguajes de programación diferentes.',
      parameters: 'Estilos idomáticos, paradigmas de POO, patrones clásicos',
      accuracySim: 93.1,
      status: 'Active',
      sampleText: 'def is_even(num):\n    return num % 2 == 0'
    }
  ];

  const filteredDatasets = datasetList.filter(ds => {
    const matchesSearch = ds.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ds.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ds.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white border border-black/10 rounded-none p-8 shadow-xs animate-fade-in font-sans text-[#1A1A1A]">
      {/* Tab Header with general statistics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/10 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <Database className="text-[#D4AF37]" size={18} />
            <h2 className="font-serif italic font-extrabold text-xl text-[#1A1A1A]">
              Datasets y Corpus de Entrenamiento
            </h2>
          </div>
          <p className="font-serif italic text-sm text-[#1A1A1A]/70 max-w-3xl leading-relaxed">
            Nuestros conjuntos de datos paralelos para modelos Seq2Seq y CodeT5 garantizan que las traducciones estructurales de Python preserven patrones de programación orientada a objetos (POO) idiomáticos de Java.
          </p>
        </div>

        {/* Global Dataset Metrics Badge */}
        <div className="flex items-center gap-5 bg-[#F5F2ED] p-5 rounded-none border border-black/10 shrink-0">
          <div className="text-center px-1">
            <span className="block font-mono font-bold text-[#1A1A1A] text-lg">188K+</span>
            <span className="font-sans text-[9px] font-bold text-[#1A1A1A]/40 uppercase tracking-widest block mt-1">Muestras</span>
          </div>
          <div className="h-10 w-[1px] bg-black/10"></div>
          <div className="text-center px-1">
            <span className="block font-mono font-bold text-[#D4AF37] text-lg">91.2%</span>
            <span className="font-sans text-[9px] font-bold text-[#1A1A1A]/40 uppercase tracking-widest block mt-1">Acierto Promedio</span>
          </div>
          <div className="h-10 w-[1px] bg-black/10"></div>
          <div className="text-center px-1">
            <span className="block font-mono font-bold text-[#1A1A1A] text-lg">100%</span>
            <span className="font-sans text-[9px] font-bold text-[#1A1A1A]/40 uppercase tracking-widest block mt-1">OFF-LINE</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 min-w-[280px]">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Buscar dataset o parámetros de entrenamiento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F2ED]/50 border border-black/10 rounded-none py-3.5 pl-10 pr-4 text-xs font-sans tracking-wider focus:outline-none focus:ring-1 focus:ring-black focus:bg-white text-[#1A1A1A] transition-all placeholder-[#1A1A1A]/35"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'Microsoft Research', 'Academic Benchmarks', 'Open Source Community'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[10px] uppercase font-sans font-bold tracking-widest px-4 py-3.5 rounded-none border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#1A1A1A] border-black text-[#F5F2ED]'
                  : 'bg-white border-black/10 text-[#1A1A1A]/60 hover:bg-black/5 hover:text-[#1A1A1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dataset Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {filteredDatasets.map((ds) => (
          <div 
            key={ds.id} 
            className="border border-black/10 rounded-none overflow-hidden hover:border-black transition-all duration-200 flex flex-col justify-between"
          >
            {/* Upper Info */}
            <div className="p-6">
              <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-black/5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#1A1A1A]/60 font-bold">
                  {ds.category}
                </span>
                <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase font-bold tracking-widest text-[#D4AF37]">
                  <ShieldCheck size={10} />
                  {ds.status}
                </span>
              </div>

              <h3 className="font-serif italic font-bold text-[#1A1A1A] text-base mb-2">{ds.name}</h3>
              <p className="font-serif text-sm text-[#1A1A1A]/70 leading-relaxed mb-6">
                {ds.description}
              </p>

              {/* Core Specs */}
              <div className="space-y-2 border-t border-black/5 pt-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#1A1A1A]/50 flex items-center gap-1 tracking-wider uppercase font-bold text-[10px]">
                    <HardDrive size={11} /> Tamaño:
                  </span>
                  <span className="font-mono font-bold text-[#1A1A1A]">{ds.size}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#1A1A1A]/50 flex items-center gap-1 tracking-wider uppercase font-bold text-[10px]">
                    <Cpu size={11} /> Params:
                  </span>
                  <span className="font-sans text-[#1A1A1A]/85 font-semibold text-right max-w-[180px] truncate">
                    {ds.parameters}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#1A1A1A]/50 flex items-center gap-1 tracking-wider uppercase font-bold text-[10px]">
                    <Terminal size={11} /> BLEU Estimado:
                  </span>
                  <span className="font-mono font-bold text-[#D4AF37]">{ds.accuracySim}%</span>
                </div>
              </div>
            </div>

            {/* Snippet box */}
            <div className="bg-[#1A1A1A] p-5 font-mono text-xs text-[#F5F2ED] border-t border-black/10">
              <div className="text-white/30 text-[9px] uppercase tracking-widest mb-2 font-bold font-mono">Código Python muestra:</div>
              <pre className="overflow-x-auto text-emerald-400"><code>{ds.sampleText}</code></pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
