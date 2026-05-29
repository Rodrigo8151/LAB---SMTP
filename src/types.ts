export interface TranslationProject {
  id: string;
  name: string;
  pythonCode: string;
  javaCode: string;
  explanation: string;
  bleuScore: number;
  compileRate: number;
  acceptanceRate: number;
  compilerSuccess: boolean;
  compilationDetails: string;
  datasets: { name: string; icon: string; count?: string }[];
  lastUpdated: string;
}

export interface TranslationHistoryItem {
  id: string;
  projectName: string;
  pythonCode: string;
  javaCode: string;
  timestamp: string;
}

export interface MetricData {
  bleuScore: number;
  compileRate: number;
  acceptanceRate: number;
}
