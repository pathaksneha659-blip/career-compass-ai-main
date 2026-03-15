import React, { createContext, useContext, useState, ReactNode } from 'react';
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

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [testResult, setTestResultState] = useState<TestResult | null>(null);
  const [careerSuggestions, setCareerSuggestions] = useState<CareerSuggestion[]>([]);

  const login = (email: string, password: string) => {
    if (email && password.length >= 6) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = (email: string, password: string) => {
    if (email && password.length >= 6) {
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