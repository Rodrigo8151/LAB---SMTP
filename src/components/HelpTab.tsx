import React from 'react';
import { HelpCircle, BookOpen, GraduationCap, ChevronRight, Layers } from 'lucide-react';

export default function HelpTab() {
  const guidePairs = [
    {
      concept: 'Firma de Funciones / Tipado',
      python: 'def calcular_precio(valor):',
      java: 'public double calcularPrecio(double valor) { ... }',
      desc: 'Python determina tipos dinámicamente en ejecución. Java requiere firmas con visibilidad (`public`), tipo devuelto y tipos obligatorios para cada argumento.'
    },
    {
      concept: 'Colecciones de Listas',
      python: 'arreglo = [1, 2, 3]',
      java: 'List<Integer> arreglo = List.of(1, 2, 3);',
      desc: 'La flexibilidad nativa de los arreglos dinámicos en Python se maneja en Java con la API de colecciones (`import java.util.List;`) especificando el tipo genérico.'
    },
    {
      concept: 'Lista por Comprensión',
      python: '[x for x in lista if x > 2]',
      java: 'lista.stream().filter(x -> x > 2).toList();',
      desc: 'Las comprensiones compactas de Python se traducen en bucles imperativos con `ArrayList` o vía Streams funcionales de Java con predicados condicionales.'
    },
    {
      concept: 'Retorno Nulo / Ausentes',
      python: 'return None',
      java: 'return null; // O usar Optional<T>',
      desc: 'En Python `None` representa la ausencia. En Java se usa el literal `null` (disponible solo en objetos wrap de tipos primarios como `Integer` o `Double`).'
    }
  ];

  return (
    <div className="bg-white border border-black/10 rounded-none p-8 shadow-xs animate-fade-in space-y-8 font-sans text-[#1A1A1A]">
      
      {/* Help Banner Header */}
      <div className="flex items-center gap-3 pb-5 border-b border-black/10">
        <GraduationCap className="text-[#D4AF37]" size={22} />
        <div>
          <h2 className="font-serif italic font-extrabold text-xl text-[#1A1A1A]">
            Guía Educativa y Tutoriales de Programación
          </h2>
          <p className="font-serif italic text-sm text-[#1A1A1A]/70">
            Aprende a transformar la flexibilidad iterativa de Python en código estático óptimo y robusto de Java.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Quick Reference Rules Grid */}
        <div className="space-y-4">
          <h3 className="font-serif italic font-bold text-base text-[#1A1A1A] flex items-center gap-2 pb-2 border-b border-black/5">
            <BookOpen size={16} className="text-[#D4AF37]" />
            <span>Puente de Sintaxis Clave</span>
          </h3>

          <div className="space-y-4">
            {guidePairs.map((pair) => (
              <div 
                key={pair.concept}
                className="border border-black/10 rounded-none p-5 space-y-4 hover:border-black transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif italic font-bold text-[#1A1A1A] text-sm">
                    {pair.concept}
                  </span>
                  <span className="bg-[#F5F2ED]/60 border border-black/5 text-[#D4AF37] text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-none font-bold">
                    Equivalencias
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 items-center">
                  {/* Python Column */}
                  <div className="col-span-2 bg-[#1A1A1A] p-2.5 rounded-none text-[10px] font-mono text-cyan-300 truncate">
                    <span className="text-white/35 font-bold tracking-wider mr-1 uppercase text-[8px] block font-mono">Python:</span>
                    <code>{pair.python}</code>
                  </div>

                  <div className="col-span-1 justify-self-center">
                    <ChevronRight size={14} className="text-[#D4AF37] stroke-[2.5]" />
                  </div>

                  {/* Java Column */}
                  <div className="col-span-2 bg-[#1A1A1A] p-2.5 rounded-none text-[10px] font-mono text-emerald-400 truncate">
                    <span className="text-white/35 font-bold tracking-wider mr-1 uppercase text-[8px] block font-mono">Java:</span>
                    <code>{pair.java}</code>
                  </div>
                </div>

                <p className="font-serif text-xs text-[#1A1A1A]/70 leading-relaxed">
                  {pair.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning track instructions */}
        <div className="space-y-4">
          <h3 className="font-serif italic font-bold text-base text-[#1A1A1A] flex items-center gap-2 pb-2 border-b border-black/5">
            <Layers size={16} className="text-[#D4AF37]" />
            <span>Ruta Educativa de Transición</span>
          </h3>

          <div className="bg-[#F5F2ED] border border-black/10 rounded-none p-6 space-y-5">
            <h4 className="font-serif italic font-bold text-sm text-[#1A1A1A]">¿Por qué aprender Java a partir de Python?</h4>
            
            <p className="font-serif text-xs text-[#1A1A1A]/75 leading-relaxed">
              Python es excelente para la velocidad inicial de desarrollo y prototipado rápido, pero sufre de pérdida de resolución de tipos en grandes bases de código industriales. 
            </p>

            <ul className="space-y-4 pt-1">
              {[
                { title: 'Tasa de Compilación Estricta', text: 'El tipado fuerte garantiza la detección de errores tipográficos y errores de nulos comunes antes de lanzar el software.' },
                { title: 'Diseño Orientado a Objetos', text: 'Permite comprender el encapsulamiento absoluto, polimorfismo robusto y aserción de contratos mediante interfaces.' },
                { title: 'Velocidad de Inferencia', text: 'Java JVM compila a bytecode altamente optimizado mediante compilador JIT, logrando velocidades superiores a scripts interpretados.' }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start text-xs">
                  <span className="font-mono font-bold bg-[#1A1A1A] text-[#F5F2ED] w-[18px] h-[18px] text-[10px] rounded-none flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-sans font-extrabold uppercase tracking-wide text-xs text-[#1A1A1A] block">
                      {item.title}
                    </span>
                    <span className="font-serif italic text-[#1A1A1A]/70 mt-0.5 block leading-normal">
                      {item.text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
