import { CareerSuggestion, DailyLog, TestResult } from './types';

interface CareerProfile {
  title: string;
  requiredTraits: Record<string, number>;
  icon: string;
  roadmap: string[];
  keySkills: string[];
}

const CAREER_PROFILES: CareerProfile[] = [
  {
    title: 'Software Engineer',
    requiredTraits: { Technical: 5, Analysis: 3, Creative: 2, Research: 1 },
    icon: '💻',
    roadmap: ['Learn Data Structures & Algorithms', 'Master a programming language (Python/JS)', 'Build 3+ real projects', 'Contribute to open source', 'Prepare for technical interviews'],
    keySkills: ['Coding', 'Problem Solving', 'Critical Thinking']
  },
  {
    title: 'Data Scientist',
    requiredTraits: { Analysis: 5, Technical: 3, Research: 3, Detail: 2 },
    icon: '📊',
    roadmap: ['Master statistics and probability', 'Learn Python + pandas/numpy', 'Study machine learning fundamentals', 'Complete Kaggle competitions', 'Build a data portfolio'],
    keySkills: ['Analysis', 'Research', 'Critical Thinking']
  },
  {
    title: 'Product Designer',
    requiredTraits: { Creative: 5, Design: 4, Social: 2, Communication: 2 },
    icon: '🎨',
    roadmap: ['Learn UI/UX principles', 'Master Figma or Sketch', 'Study human psychology', 'Build a design portfolio', 'Practice with real-world projects'],
    keySkills: ['Creativity', 'Design', 'Empathy']
  },
  {
    title: 'Doctor / Medical Professional',
    requiredTraits: { Research: 4, Social: 3, Empathy: 4, Detail: 3 },
    icon: '🩺',
    roadmap: ['Excel in Biology and Chemistry', 'Volunteer at healthcare facilities', 'Prepare for medical entrance exams', 'Shadow practicing doctors', 'Develop patient communication skills'],
    keySkills: ['Research', 'Empathy', 'Communication']
  },
  {
    title: 'Business Analyst',
    requiredTraits: { Analysis: 4, Leadership: 3, Organization: 3, Communication: 2 },
    icon: '📈',
    roadmap: ['Learn Excel and SQL', 'Study business fundamentals', 'Get certified in data analytics', 'Practice case studies', 'Develop presentation skills'],
    keySkills: ['Analysis', 'Leadership', 'Organization']
  },
  {
    title: 'Content Creator / Writer',
    requiredTraits: { Communication: 5, Creative: 4, Social: 2, Empathy: 2 },
    icon: '✍️',
    roadmap: ['Write daily — blogs, stories, journals', 'Study storytelling techniques', 'Build an online portfolio', 'Learn SEO and content marketing', 'Network with other creators'],
    keySkills: ['Writing', 'Creativity', 'Communication']
  },
  {
    title: 'Research Scientist',
    requiredTraits: { Research: 5, Analysis: 4, Detail: 3, Technical: 2 },
    icon: '🔬',
    roadmap: ['Strengthen math and science foundations', 'Join a research lab or program', 'Learn research methodology', 'Publish papers or reports', 'Pursue advanced degrees'],
    keySkills: ['Research', 'Analysis', 'Critical Thinking']
  },
  {
    title: 'Entrepreneur',
    requiredTraits: { Leadership: 5, Innovation: 3, Organization: 3, Social: 2 },
    icon: '🚀',
    roadmap: ['Study business models and strategy', 'Build a minimum viable product', 'Learn financial basics', 'Network and find mentors', 'Launch and iterate on your idea'],
    keySkills: ['Leadership', 'Problem Solving', 'Communication']
  },
  {
    title: 'Psychologist / Counselor',
    requiredTraits: { Empathy: 5, Social: 4, Communication: 3, Research: 2 },
    icon: '🧠',
    roadmap: ['Study psychology fundamentals', 'Practice active listening', 'Volunteer at counseling services', 'Read case studies extensively', 'Pursue a psychology degree'],
    keySkills: ['Empathy', 'Communication', 'Research']
  },
  {
    title: 'Civil Engineer',
    requiredTraits: { Technical: 4, Analysis: 3, Organization: 3, Detail: 3 },
    icon: '🏗️',
    roadmap: ['Excel in Mathematics and Physics', 'Learn CAD software', 'Study structural engineering basics', 'Visit construction sites', 'Pursue engineering degree'],
    keySkills: ['Problem Solving', 'Analysis', 'Organization']
  }
];

function computeTraitsFromTest(result: TestResult): Record<string, number> {
  const traits: Record<string, number> = {};

  // Logical score contributes to Technical and Analysis
  const logicalNorm = result.logical / 5;
  traits['Technical'] = (traits['Technical'] || 0) + logicalNorm * 3;
  traits['Analysis'] = (traits['Analysis'] || 0) + logicalNorm * 3;

  // Interest scores
  for (const [trait, score] of Object.entries(result.interest)) {
    traits[trait] = (traits[trait] || 0) + score;
  }

  // Personality scores
  for (const [trait, score] of Object.entries(result.personality)) {
    traits[trait] = (traits[trait] || 0) + score;
  }

  return traits;
}

function computeTraitsFromLogs(logs: DailyLog[]): Record<string, number> {
  const traits: Record<string, number> = {};
  if (logs.length === 0) return traits;

  const avgMood = logs.reduce((s, l) => s + l.mood, 0) / logs.length;
  const avgMotivation = logs.reduce((s, l) => s + l.motivation, 0) / logs.length;
  const avgHours = logs.reduce((s, l) => s + l.studyHours, 0) / logs.length;

  // High study consistency
  if (avgHours >= 4) {
    traits['Detail'] = (traits['Detail'] || 0) + 2;
    traits['Organization'] = (traits['Organization'] || 0) + 2;
  }

  // Mood & motivation factor
  if (avgMood >= 4 && avgMotivation >= 4) {
    traits['Social'] = (traits['Social'] || 0) + 1;
    traits['Leadership'] = (traits['Leadership'] || 0) + 1;
  }

  // Subject interests
  const subjectCounts: Record<string, number> = {};
  logs.forEach(l => l.likedSubjects.forEach(s => {
    subjectCounts[s] = (subjectCounts[s] || 0) + 1;
  }));

  const techSubjects = ['Mathematics', 'Physics', 'Computer Science'];
  const creativeSubjects = ['Art', 'Music', 'English'];
  const scienceSubjects = ['Biology', 'Chemistry'];
  const socialSubjects = ['Psychology', 'History', 'Economics'];

  for (const [subj, count] of Object.entries(subjectCounts)) {
    const weight = count / logs.length;
    if (techSubjects.includes(subj)) traits['Technical'] = (traits['Technical'] || 0) + weight * 2;
    if (creativeSubjects.includes(subj)) traits['Creative'] = (traits['Creative'] || 0) + weight * 2;
    if (scienceSubjects.includes(subj)) traits['Research'] = (traits['Research'] || 0) + weight * 2;
    if (socialSubjects.includes(subj)) traits['Social'] = (traits['Social'] || 0) + weight * 2;
  }

  // Skills mapping
  const skillTraitMap: Record<string, string> = {
    'Problem Solving': 'Analysis', 'Communication': 'Communication', 'Leadership': 'Leadership',
    'Creativity': 'Creative', 'Critical Thinking': 'Analysis', 'Teamwork': 'Social',
    'Coding': 'Technical', 'Writing': 'Communication', 'Research': 'Research',
    'Design': 'Design', 'Analysis': 'Analysis', 'Organization': 'Organization',
    'Empathy': 'Empathy', 'Public Speaking': 'Communication'
  };

  const skillCounts: Record<string, number> = {};
  logs.forEach(l => l.skills.forEach(s => {
    skillCounts[s] = (skillCounts[s] || 0) + 1;
  }));

  for (const [skill, count] of Object.entries(skillCounts)) {
    const trait = skillTraitMap[skill];
    if (trait) {
      traits[trait] = (traits[trait] || 0) + (count / logs.length) * 1.5;
    }
  }

  return traits;
}

export function analyzeCareer(testResult: TestResult | null, dailyLogs: DailyLog[]): CareerSuggestion[] {
  const testTraits = testResult ? computeTraitsFromTest(testResult) : {};
  const logTraits = computeTraitsFromLogs(dailyLogs);

  // Merge traits (test weighted 60%, logs 40%)
  const allTraitKeys = new Set([...Object.keys(testTraits), ...Object.keys(logTraits)]);
  const mergedTraits: Record<string, number> = {};
  for (const key of allTraitKeys) {
    mergedTraits[key] = (testTraits[key] || 0) * 0.6 + (logTraits[key] || 0) * 0.4;
  }

  // Normalize traits to 0-1
  const maxTrait = Math.max(...Object.values(mergedTraits), 1);
  const normalizedTraits: Record<string, number> = {};
  for (const [key, val] of Object.entries(mergedTraits)) {
    normalizedTraits[key] = val / maxTrait;
  }

  // Score each career
  const scored = CAREER_PROFILES.map(career => {
    let totalWeight = 0;
    let weightedScore = 0;

    for (const [trait, weight] of Object.entries(career.requiredTraits)) {
      totalWeight += weight;
      weightedScore += (normalizedTraits[trait] || 0) * weight;
    }

    const match = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0;

    // Determine skills to improve
    const weakTraits = Object.entries(career.requiredTraits)
      .filter(([trait]) => (normalizedTraits[trait] || 0) < 0.5)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([trait]) => trait);

    const strongTraits = Object.entries(career.requiredTraits)
      .filter(([trait]) => (normalizedTraits[trait] || 0) >= 0.5)
      .map(([trait]) => trait);

    const reason = `Strong alignment in ${strongTraits.length > 0 ? strongTraits.join(', ') : 'general aptitude'}${weakTraits.length > 0 ? `. Developing ${weakTraits.join(', ')} would strengthen this path.` : '.'}`;

    return {
      title: career.title,
      match,
      reason,
      skillsToImprove: career.keySkills.filter(s => !dailyLogs.some(l => l.skills.includes(s))),
      roadmap: career.roadmap,
      icon: career.icon,
    };
  });

  return scored.sort((a, b) => b.match - a.match).slice(0, 3);
}
