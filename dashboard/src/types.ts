export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type SolvedAlone = 'yes' | 'hint' | 'no' | null
export type StoryStatus = 'written' | 'needs-work' | 'empty'

export interface Problem {
  id: number
  num: number
  name: string
  difficulty: Difficulty
  pattern: string
  week: number
  day: number
  solved: boolean
  date: string | null
  time: number | null
  solvedAlone: SolvedAlone
  notes: string
}

export interface SystemDesign {
  id: number
  name: string
  week: number
  completed: boolean
  confidence: number
  notes: string
}

export interface Stats {
  totalSolved: number
  easy: number
  medium: number
  hard: number
  systemDesigns: number
  mockInterviews: number
  starStories: number
  currentStreak: number
  longestStreak: number
}

export interface Confidence {
  arraysHashing: number
  twoPointers: number
  slidingWindow: number
  stack: number
  binarySearch: number
  linkedList: number
  trees: number
  tries: number
  heap: number
  backtracking: number
  graphs: number
  dp1d: number
  dp2d: number
  greedy: number
  intervals: number
  bitManipulation: number
  systemDesign: number
  behavioral: number
}

export interface StarStory {
  id: number
  theme: string
  title: string
  situation: string
  task: string
  action: string
  result: string
  status: StoryStatus
}

export interface WeeklyCheckin {
  week: number
  date: string
  notes: string
}

export interface ProgressData {
  startDate: string
  targetEndDate: string
  language: string
  totalWeeks: number
  currentWeek: number
  stats: Stats
  confidence: Confidence
  problems: Problem[]
  systemDesigns: SystemDesign[]
  starStories?: StarStory[]
  weeklyCheckins: WeeklyCheckin[]
}

export interface PatternInfo {
  key: string
  label: string
  color: string
}

export const PATTERNS: PatternInfo[] = [
  { key: 'arrays-hashing', label: 'Arrays & Hashing', color: '#58a6ff' },
  { key: 'two-pointers', label: 'Two Pointers', color: '#bc8cff' },
  { key: 'sliding-window', label: 'Sliding Window', color: '#3fb950' },
  { key: 'stack', label: 'Stack', color: '#d29922' },
  { key: 'binary-search', label: 'Binary Search', color: '#ff7b72' },
  { key: 'linked-list', label: 'Linked List', color: '#e3b341' },
  { key: 'trees', label: 'Trees', color: '#58a6ff' },
  { key: 'tries', label: 'Tries', color: '#bc8cff' },
  { key: 'heap', label: 'Heap / Priority Queue', color: '#3fb950' },
  { key: 'backtracking', label: 'Backtracking', color: '#d29922' },
  { key: 'graphs', label: 'Graphs', color: '#f85149' },
  { key: 'dp-1d', label: 'DP 1D', color: '#58a6ff' },
  { key: 'dp-2d', label: 'DP 2D', color: '#bc8cff' },
  { key: 'greedy', label: 'Greedy', color: '#3fb950' },
  { key: 'intervals', label: 'Intervals', color: '#d29922' },
  { key: 'bit-manipulation', label: 'Bit Manipulation', color: '#e3b341' },
  { key: 'design', label: 'Design', color: '#ff7b72' },
]

export const DEFAULT_STAR_STORIES: StarStory[] = [
  { id: 1, theme: 'Leadership', title: '', situation: '', task: '', action: '', result: '', status: 'empty' },
  { id: 2, theme: 'Conflict Resolution', title: '', situation: '', task: '', action: '', result: '', status: 'empty' },
  { id: 3, theme: 'Technical Challenge', title: '', situation: '', task: '', action: '', result: '', status: 'empty' },
  { id: 4, theme: 'Failure & Recovery', title: '', situation: '', task: '', action: '', result: '', status: 'empty' },
  { id: 5, theme: 'Innovation', title: '', situation: '', task: '', action: '', result: '', status: 'empty' },
  { id: 6, theme: 'Collaboration', title: '', situation: '', task: '', action: '', result: '', status: 'empty' },
  { id: 7, theme: 'Impact at Scale', title: '', situation: '', task: '', action: '', result: '', status: 'empty' },
  { id: 8, theme: 'Ownership', title: '', situation: '', task: '', action: '', result: '', status: 'empty' },
  { id: 9, theme: 'Mentorship', title: '', situation: '', task: '', action: '', result: '', status: 'empty' },
  { id: 10, theme: 'Deadline / Pressure', title: '', situation: '', task: '', action: '', result: '', status: 'empty' },
]
