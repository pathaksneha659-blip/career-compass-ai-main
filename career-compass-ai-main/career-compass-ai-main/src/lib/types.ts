export interface UserProfile {
  name: string;
  age: number;
  class: string;
  stream: string;
  goals: string;
}

export interface DailyLog {
  id: string;
  date: string;
  studyHours: number;
  likedSubjects: string[];
  struggledSubjects: string[];
  mood: number; // 1-5
  motivation: number; // 1-5
  skills: string[];
}

export interface TestQuestion {
  id: string;
  section: 'logical' | 'interest' | 'personality';
  question: string;
  options: string[];
  correctAnswer?: number; // only for logical
  weights?: Record<string, number>[]; // for interest/personality
}

export interface TestResult {
  logical: number;
  interest: Record<string, number>;
  personality: Record<string, number>;
  completedAt: string;
}

export interface CareerSuggestion {
  title: string;
  match: number;
  reason: string;
  skillsToImprove: string[];
  roadmap: string[];
  icon: string;
}

export interface AppState {
  isAuthenticated: boolean;
  profile: UserProfile | null;
  dailyLogs: DailyLog[];
  testResult: TestResult | null;
  careerSuggestions: CareerSuggestion[];
}
