import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WorkspaceTab from './components/WorkspaceTab';
import DatasetsTab from './components/DatasetsTab';
import BenchmarksTab from './components/BenchmarksTab';
import HistoryTab from './components/HistoryTab';
import SettingsTab from './components/SettingsTab';
import HelpTab from './components/HelpTab';
import { PRESET_PROJECTS } from './presets';
import { TranslationProject } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('workspace');
  const [projects, setProjects] = useState<TranslationProject[]>(PRESET_PROJECTS);
  const [currentProjectId, setCurrentProjectId] = useState<string>(PRESET_PROJECTS[0].id);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Find the currently selected active project
  const currentProject = projects.find(p => p.id === currentProjectId) || projects[0];

  const handleProjectSelect = (project: TranslationProject) => {
    setCurrentProjectId(project.id);
    setErrorMessage(null);
  };

  // Create a new blank/custom template project on-the-fly
  const handleNewProject = () => {
    const newId = `new-custom-${Date.now()}`;
    const newProj: TranslationProject = {
      id: newId,
      name: 'Nuevo Proyecto Personal',
      pythonCode: '# Escribe tu propia función en Python aquí\ndef mi_funcion(x):\n    return x + 1',
      javaCode: 'public class MiClase {\n    // Haz clic en TRADUCIR para generar el código Java...\n}',
      explanation: 'Introduce tu código Python en el editor izquierdo y haz clic sobre el botón central de traducir para iniciar el motor semántico CodeT5 Seq2Seq y generar tu explicación puente interactiva.',
      bleuScore: 0.0,
      compileRate: 0,
      acceptanceRate: 0,
      compilerSuccess: true,
      compilationDetails: 'Listo para compilar. Presiona TRADUCIR.',
      datasets: [
        { name: 'CodeXGLUE', icon: 'check' },
        { name: 'XLCoST', icon: 'share' },
        { name: 'RosettaCode', icon: 'nodes' }
      ],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setProjects(prev => [newProj, ...prev]);
    setCurrentProjectId(newId);
    setActiveTab('workspace');
    setErrorMessage(null);
  };

  // Perform translation request to our server-side API (Gemini or simulated fallback)
  const handleTranslate = async (enteredPythonCode: string) => {
    if (!enteredPythonCode.trim()) {
      setErrorMessage('Por favor, ingresa código Python antes de traducir.');
      return;
    }

    setIsTranslating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pythonCode: enteredPythonCode }),
      });

      if (!response.ok) {
        throw new Error('No se pudo establecer conexión con el motor de traducción del servidor.');
      }

      const data = await response.json();

      // Ensure data schema is valid
      const updatedProject: TranslationProject = {
        id: currentProject.id.startsWith('new-custom') ? `project-${Date.now()}` : currentProject.id,
        name: currentProject.id.startsWith('new-custom') ? 'Análisis Personalizado' : currentProject.name,
        pythonCode: enteredPythonCode,
        javaCode: data.javaCode,
        explanation: data.explanation,
        bleuScore: Number(data.bleuScore || 35.0),
        compileRate: Number(data.compileRate || 90),
        acceptanceRate: Number(data.acceptanceRate || 80),
        compilerSuccess: Boolean(data.compilerSuccess),
        compilationDetails: String(data.compilationDetails || 'Procesado con éxito.'),
        datasets: currentProject.datasets,
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      setProjects(prev => {
        const foundIdx = prev.findIndex(p => p.id === currentProject.id);
        if (foundIdx > -1) {
          const next = [...prev];
          next[foundIdx] = updatedProject;
          return next;
        } else {
          return [updatedProject, ...prev];
        }
      });

      setCurrentProjectId(updatedProject.id);

    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error durante el proceso de traducción.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleClearHistory = () => {
    setProjects(PRESET_PROJECTS);
    setCurrentProjectId(PRESET_PROJECTS[0].id);
    setErrorMessage(null);
  };

  const handleLoadHistoryProject = (proj: TranslationProject) => {
    setCurrentProjectId(proj.id);
    setActiveTab('workspace');
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F5F2ED] text-[#1A1A1A] font-sans">
      {/* Target Application Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Command Rail */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onNewProject={handleNewProject} 
        />

        {/* Dynamic Content Stream Area */}
        <main className="flex-1 overflow-y-auto p-8 relative bg-[#F5F2ED]">
          
          {/* Error Alert Display */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-none bg-[#1A1A1A] text-[#F5F2ED] border-l-4 border-[#D4AF37] text-xs font-sans tracking-wider flex items-center justify-between shadow-xs animate-shake">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#D4AF37]">ALERT //</span>
                <span>{errorMessage}</span>
              </div>
              <button 
                onClick={() => setErrorMessage(null)}
                className="font-sans font-bold hover:text-[#D4AF37] transition cursor-pointer text-[10px] uppercase tracking-widest pl-4"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Navigational Tabs router */}
          {activeTab === 'workspace' && (
            <WorkspaceTab 
              currentProject={currentProject}
              onProjectChange={handleProjectSelect}
              onTranslate={handleTranslate}
              isTranslating={isTranslating}
              presets={projects.filter(p => !p.id.startsWith('new-custom'))}
            />
          )}

          {activeTab === 'datasets' && (
            <DatasetsTab />
          )}

          {(activeTab === 'insights' || activeTab === 'benchmarks') && (
            <BenchmarksTab />
          )}

          {activeTab === 'history' && (
            <HistoryTab 
              history={projects}
              onLoadProject={handleLoadHistoryProject}
              onClearHistory={handleClearHistory}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab />
          )}

          {(activeTab === 'help' || activeTab === 'documentation') && (
            <HelpTab />
          )}
        </main>
      </div>

      {/* Footer Navigation Bar */}
      <footer className="bg-[#1A1A1A] text-[#F5F2ED] border-t border-black/10 h-14 px-8 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-sans shrink-0 select-none">
        <div className="flex items-center gap-4">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
          <span>Educative Bridge Active (91.2% target BLEU accuracy)</span>
        </div>
        <div className="flex gap-12 text-[#F5F2ED]/70 hidden md:flex">
          <span>Curated for Developers</span>
          <span>Verified Sandbox Compiler</span>
          <span>Est. 2026 CodeT5</span>
        </div>
        <div className="flex items-center gap-6 font-sans">
          <button onClick={() => setActiveTab('help')} className="hover:text-[#D4AF37] transition cursor-pointer">Privacy Policy</button>
          <button onClick={() => setActiveTab('help')} className="hover:text-[#D4AF37] transition cursor-pointer">Terms of Service</button>
          <button onClick={() => setActiveTab('settings')} className="hover:text-[#D4AF37] transition cursor-pointer">API Docs</button>
        </div>
      </footer>
    </div>
  );
}
