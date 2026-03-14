import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, UserProfile, DailyLog, TestResult, CareerSuggestion } from '@/lib/types';
import { analyzeCareer } from '@/lib/careerEngine';

interface AppContextType extends AppState {
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
  setProfile: (profile: UserProfile) => void;
  addDailyLog: (log: DailyLog) => void;
  setTestResult: (result: TestResult) => void;
  refreshSuggestions: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = 'pathfinder_state';

function loadState(): Partial<AppState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(state: Partial<AppState>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const saved = loadState();
  const [isAuthenticated, setIsAuthenticated] = useState(saved.isAuthenticated || false);
  const [profile, setProfileState] = useState<UserProfile | null>(saved.profile || null);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>(saved.dailyLogs || []);
  const [testResult, setTestResultState] = useState<TestResult | null>(saved.testResult || null);
  const [careerSuggestions, setCareerSuggestions] = useState<CareerSuggestion[]>(saved.careerSuggestions || []);

  useEffect(() => {
    saveState({ isAuthenticated, profile, dailyLogs, testResult, careerSuggestions });
  }, [isAuthenticated, profile, dailyLogs, testResult, careerSuggestions]);

  const login = (email: string, _password: string) => {
    if (email) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = (email: string, _password: string) => {
    if (email) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setProfileState(null);
    setDailyLogs([]);
    setTestResultState(null);
    setCareerSuggestions([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const setProfile = (p: UserProfile) => setProfileState(p);

  const addDailyLog = (log: DailyLog) => {
    setDailyLogs(prev => [log, ...prev]);
  };

  const setTestResult = (result: TestResult) => {
    setTestResultState(result);
    const suggestions = analyzeCareer(result, dailyLogs);
    setCareerSuggestions(suggestions);
  };

  const refreshSuggestions = () => {
    const suggestions = analyzeCareer(testResult, dailyLogs);
    setCareerSuggestions(suggestions);
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated, profile, dailyLogs, testResult, careerSuggestions,
      login, signup, logout, setProfile, addDailyLog, setTestResult, refreshSuggestions
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
