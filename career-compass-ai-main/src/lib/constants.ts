import { TestQuestion } from './types';

export const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
  'English', 'History', 'Geography', 'Economics', 'Art', 'Music',
  'Physical Education', 'Psychology', 'Business Studies'
];

export const SKILLS = [
  'Problem Solving', 'Communication', 'Leadership', 'Creativity',
  'Critical Thinking', 'Teamwork', 'Time Management', 'Coding',
  'Writing', 'Public Speaking', 'Research', 'Design', 'Analysis',
  'Organization', 'Empathy'
];

export const APTITUDE_QUESTIONS: TestQuestion[] = [
  // Logical Reasoning (5)
  {
    id: 'l1', section: 'logical',
    question: 'If all roses are flowers and some flowers fade quickly, which statement is true?',
    options: ['All roses fade quickly', 'Some roses may fade quickly', 'No roses fade quickly', 'Roses are not flowers'],
    correctAnswer: 1
  },
  {
    id: 'l2', section: 'logical',
    question: 'What comes next: 2, 6, 12, 20, 30, ?',
    options: ['40', '42', '36', '38'],
    correctAnswer: 1
  },
  {
    id: 'l3', section: 'logical',
    question: 'A is taller than B. C is shorter than A but taller than D. Who is the shortest?',
    options: ['A', 'B or D', 'C', 'D'],
    correctAnswer: 3
  },
  {
    id: 'l4', section: 'logical',
    question: 'If APPLE = 50 and BANANA = 42, what does CAT = ?',
    options: ['24', '27', '30', '21'],
    correctAnswer: 0
  },
  {
    id: 'l5', section: 'logical',
    question: 'Which shape completes the pattern: □ △ ○ □ △ ?',
    options: ['□', '△', '○', '◇'],
    correctAnswer: 2
  },
  // Interest Based (5)
  {
    id: 'i1', section: 'interest',
    question: 'How would you prefer to spend a free afternoon?',
    options: ['Building or coding something', 'Reading or writing', 'Drawing or designing', 'Helping or teaching others'],
    weights: [
      { 'Technical': 3, 'Creative': 1 },
      { 'Research': 3, 'Communication': 1 },
      { 'Creative': 3, 'Design': 2 },
      { 'Social': 3, 'Communication': 2 }
    ]
  },
  {
    id: 'i2', section: 'interest',
    question: 'Which type of project excites you most?',
    options: ['Analyzing data to find patterns', 'Creating a website or app', 'Writing a compelling story', 'Organizing a community event'],
    weights: [
      { 'Research': 3, 'Analysis': 2 },
      { 'Technical': 3, 'Creative': 1 },
      { 'Communication': 3, 'Creative': 1 },
      { 'Social': 3, 'Leadership': 2 }
    ]
  },
  {
    id: 'i3', section: 'interest',
    question: 'What kind of problems do you enjoy solving?',
    options: ['Mathematical puzzles', 'Human behavior puzzles', 'Visual/design challenges', 'Business strategy problems'],
    weights: [
      { 'Technical': 3, 'Analysis': 2 },
      { 'Social': 3, 'Research': 1 },
      { 'Creative': 3, 'Design': 2 },
      { 'Leadership': 3, 'Analysis': 1 }
    ]
  },
  {
    id: 'i4', section: 'interest',
    question: 'Which tool would you most like to master?',
    options: ['A programming language', 'A scientific instrument', 'A design tool like Figma', 'A musical instrument'],
    weights: [
      { 'Technical': 3, 'Analysis': 1 },
      { 'Research': 3, 'Technical': 1 },
      { 'Design': 3, 'Creative': 2 },
      { 'Creative': 3, 'Communication': 1 }
    ]
  },
  {
    id: 'i5', section: 'interest',
    question: 'Which headline would you click first?',
    options: ['New AI breakthrough solves old math problem', 'How a designer reimagined city parks', 'Study reveals secrets of human motivation', 'Startup founder shares growth strategy'],
    weights: [
      { 'Technical': 3, 'Research': 2 },
      { 'Design': 3, 'Creative': 2 },
      { 'Social': 3, 'Research': 2 },
      { 'Leadership': 3, 'Analysis': 1 }
    ]
  },
  // Personality (5)
  {
    id: 'p1', section: 'personality',
    question: 'In a group project, you naturally take on the role of:',
    options: ['The planner and organizer', 'The idea generator', 'The researcher and analyst', 'The mediator and communicator'],
    weights: [
      { 'Leadership': 3, 'Organization': 2 },
      { 'Creative': 3, 'Innovation': 2 },
      { 'Analysis': 3, 'Detail': 2 },
      { 'Social': 3, 'Empathy': 2 }
    ]
  },
  {
    id: 'p2', section: 'personality',
    question: 'When facing a difficult problem, you tend to:',
    options: ['Break it into smaller parts systematically', 'Look for creative unconventional solutions', 'Research how others solved it', 'Discuss it with friends to brainstorm'],
    weights: [
      { 'Analysis': 3, 'Technical': 1 },
      { 'Creative': 3, 'Innovation': 2 },
      { 'Research': 3, 'Detail': 1 },
      { 'Social': 3, 'Communication': 2 }
    ]
  },
  {
    id: 'p3', section: 'personality',
    question: 'Your ideal work environment is:',
    options: ['Quiet and focused, working independently', 'Dynamic studio with creative tools', 'Collaborative open workspace', 'Structured office with clear goals'],
    weights: [
      { 'Analysis': 3, 'Detail': 2 },
      { 'Creative': 3, 'Design': 2 },
      { 'Social': 3, 'Communication': 2 },
      { 'Organization': 3, 'Leadership': 1 }
    ]
  },
  {
    id: 'p4', section: 'personality',
    question: 'What motivates you the most?',
    options: ['Solving complex challenges', 'Creating something beautiful', 'Making a difference in lives', 'Achieving success and recognition'],
    weights: [
      { 'Technical': 3, 'Analysis': 2 },
      { 'Creative': 3, 'Design': 2 },
      { 'Social': 3, 'Empathy': 2 },
      { 'Leadership': 3, 'Organization': 1 }
    ]
  },
  {
    id: 'p5', section: 'personality',
    question: 'How do you handle feedback on your work?',
    options: ['Analyze it objectively and improve', 'Feel it deeply but use it creatively', 'Discuss it to understand better', 'Use it to set new targets'],
    weights: [
      { 'Analysis': 3, 'Technical': 1 },
      { 'Creative': 3, 'Empathy': 1 },
      { 'Social': 3, 'Communication': 2 },
      { 'Leadership': 3, 'Organization': 2 }
    ]
  },
];
