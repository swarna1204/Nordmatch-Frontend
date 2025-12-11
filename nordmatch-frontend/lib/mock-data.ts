import type {
  User, Company, Job, Candidate, Application, Interview,
  DashboardStats, RecruitmentFunnel, SourceOfHire, TimeInStage
} from "@/types";

// Current User (logged in)
export const currentUser: User = {
  id: "usr_001",
  email: "sarah@justeragroups.com",
  firstName: "Sarah",
  lastName: "Anderson",
  role: "hr_manager",
  avatar: "/avatars/sarah.jpg",
  company: {
    id: "comp_001",
    name: "Justera Groups",
    logo: "/logo.svg",
  },
};

// Dashboard Statistics
export const dashboardStats: DashboardStats = {
  timeToFill: 35,
  candidatesInPipeline: 450,
  openRequisitions: 18,
  hiredThisMonth: 12,
};

export const recruitmentFunnel: RecruitmentFunnel = {
  new: 124,
  inReview: 87,
  interviewed: 45,
  hired: 12,
};

export const sourceOfHire: SourceOfHire[] = [
  { source: "LinkedIn", percentage: 35, color: "#2D5F8D" },
  { source: "Employee Referral", percentage: 28, color: "#366EA6" },
  { source: "Career Site", percentage: 20, color: "#E6A23C" },
  { source: "Agency", percentage: 12, color: "#2E7D32" },
  { source: "Others", percentage: 5, color: "#D6DEE6" },
];

export const timeInStage: TimeInStage[] = [
  { stage: "Screening", days: 5 },
  { stage: "Interview", days: 12 },
  { stage: "Hiring Manager Review", days: 10 },
];

// Jobs Data
export const jobs: Job[] = [
  {
    id: "job_001",
    title: "Senior Product Designer",
    department: "Design",
    location: "Stockholm, Sweden",
    type: "full-time",
    status: "active",
    salary: { min: 55000, max: 75000, currency: "SEK" },
    description: "We are looking for a Senior Product Designer to join our growing team...",
    requirements: ["5+ years of experience", "Figma proficiency", "Design systems experience"],
    postedAt: "2025-11-15T10:00:00Z",
    applicantCount: 45,
  },
  {
    id: "job_002",
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "full-time",
    status: "active",
    salary: { min: 60000, max: 85000, currency: "SEK" },
    description: "Join our engineering team to build modern web applications...",
    requirements: ["React/Next.js", "TypeScript", "3+ years experience"],
    postedAt: "2025-11-20T09:00:00Z",
    applicantCount: 67,
  },
  {
    id: "job_003",
    title: "HR Business Partner",
    department: "Human Resources",
    location: "Stockholm, Sweden",
    type: "full-time",
    status: "active",
    salary: { min: 45000, max: 60000, currency: "SEK" },
    description: "Looking for an experienced HR professional...",
    requirements: ["HR certification", "5+ years in HR", "Swedish fluency"],
    postedAt: "2025-11-25T08:00:00Z",
    applicantCount: 23,
  },
];

// Candidates Data
export const candidates: Candidate[] = [
  {
    id: "cand_001",
    firstName: "Ruben",
    lastName: "Philips",
    email: "ruben.philips@email.com",
    phone: "+46 70 123 4567",
    currentRole: "Product Designer",
    currentCompany: "Spotify",
    location: "Stockholm",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    experience: 6,
    appliedAt: "2025-12-01T10:00:00Z",
    source: "linkedin",
    matchScore: 92,
  },
  {
    id: "cand_002",
    firstName: "Emma",
    lastName: "Larsson",
    email: "emma.larsson@email.com",
    phone: "+46 70 234 5678",
    currentRole: "UX Designer",
    currentCompany: "Klarna",
    location: "Stockholm",
    skills: ["UI Design", "Figma", "Adobe XD", "Motion Design"],
    experience: 4,
    appliedAt: "2025-12-02T14:00:00Z",
    source: "referral",
    matchScore: 88,
  },
  {
    id: "cand_003",
    firstName: "Henrik",
    lastName: "Olsen",
    email: "henrik.olsen@email.com",
    phone: "+46 70 345 6789",
    currentRole: "Senior Frontend Developer",
    currentCompany: "Ericsson",
    location: "Gothenburg",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    experience: 8,
    appliedAt: "2025-12-03T09:00:00Z",
    source: "career_site",
    matchScore: 95,
  },
];

// Upcoming Interviews
export const upcomingInterviews: Interview[] = [
  {
    id: "int_001",
    applicationId: "app_001",
    candidate: { id: "cand_001", firstName: "Ruben", lastName: "Philips" },
    type: "technical",
    scheduledAt: "2025-12-30T09:00:00Z",
    duration: 30,
    interviewers: [
      { id: "usr_001", firstName: "Sarah", lastName: "Anderson" },
      { id: "usr_002", firstName: "Erik", lastName: "Berg" },
    ],
    meetingLink: "https://meet.google.com/abc-defg-hij",
    status: "scheduled",
  },
  {
    id: "int_002",
    applicationId: "app_002",
    candidate: { id: "cand_002", firstName: "Emma", lastName: "Larsson" },
    type: "portfolio_review",
    scheduledAt: "2025-12-30T14:00:00Z",
    duration: 45,
    interviewers: [
      { id: "usr_001", firstName: "Sarah", lastName: "Anderson" },
      { id: "usr_003", firstName: "Lisa", lastName: "Svensson" },
    ],
    meetingLink: "https://meet.google.com/xyz-uvwx-rst",
    status: "scheduled",
  },
  {
    id: "int_003",
    applicationId: "app_003",
    candidate: { id: "cand_003", firstName: "Henrik", lastName: "Olsen" },
    type: "final",
    scheduledAt: "2025-12-29T10:00:00Z",
    duration: 60,
    interviewers: [
      { id: "usr_001", firstName: "Sarah", lastName: "Anderson" },
    ],
    status: "scheduled",
  },
];

// Mock API functions (simulate async behavior)
export const mockApi = {
  async login(email: string, password: string): Promise<User | null> {
    await delay(800);
    if (email && password.length >= 6) return currentUser;
    return null;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    await delay(500);
    return dashboardStats;
  },

  async getJobs(): Promise<Job[]> {
    await delay(600);
    return jobs;
  },

  async getCandidates(): Promise<Candidate[]> {
    await delay(600);
    return candidates;
  },

  async getUpcomingInterviews(): Promise<Interview[]> {
    await delay(400);
    return upcomingInterviews;
  },
};

// Utility function
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}