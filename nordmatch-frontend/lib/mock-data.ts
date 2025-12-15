import type {
  User,
  Job,
  Candidate,
  Employee,
  DashboardStats,
  Interview,
  Activity,
  FunnelData,
  MonthlyData,
  RecruitmentFunnel,
  SourceOfHireData,
} from "@/types";

// ============== CURRENT USER ==============
export const currentUser: User = {
  id: "user-001",
  email: "sarah@techcorp.com",
  firstName: "Sarah",
  lastName: "Johnson",
  role: "recruiter",
  company: {
    id: "company-001",
    name: "TechCorp",
    logo: "/logo.png",
    industry: "Technology",
    size: "50-200",
    location: "Stockholm, Sweden",
  },
  createdAt: "2024-01-01T00:00:00Z",
};

// ============== JOBS ==============
export const mockJobs: Job[] = [
  {
    id: "job-001",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Stockholm, Sweden",
    type: "full-time",
    salary: { min: 65000, max: 85000, currency: "EUR" },
    description: "We are looking for a Senior Frontend Developer to join our growing team.",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Team leadership"],
    benefits: ["Remote work options", "Health insurance", "Stock options"],
    status: "active",
    applicants: 47,
    newApplicants: 12,
    aiScore: 89,
    postedAt: "2024-01-15T00:00:00Z",
    deadline: "2024-02-15",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "job-002",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "full-time",
    salary: { min: 55000, max: 70000, currency: "EUR" },
    description: "Join our design team to create beautiful user experiences.",
    requirements: ["3+ years UX/UI", "Figma expertise", "Design systems"],
    benefits: ["Flexible hours", "Learning budget", "Home office setup"],
    status: "active",
    applicants: 32,
    newApplicants: 5,
    aiScore: 76,
    postedAt: "2024-01-18T00:00:00Z",
    deadline: "2024-02-20",
    createdAt: "2024-01-18T00:00:00Z",
    updatedAt: "2024-01-22T00:00:00Z",
  },
  {
    id: "job-003",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Malmö, Sweden",
    type: "full-time",
    salary: { min: 70000, max: 90000, currency: "EUR" },
    description: "We need a DevOps engineer to improve our infrastructure.",
    requirements: ["AWS/GCP experience", "Kubernetes", "CI/CD pipelines"],
    benefits: ["Competitive salary", "Conference budget", "Gym membership"],
    status: "active",
    applicants: 23,
    newApplicants: 8,
    aiScore: 82,
    postedAt: "2024-01-10T00:00:00Z",
    deadline: "2024-02-10",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "job-004",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Stockholm, Sweden",
    type: "full-time",
    salary: { min: 50000, max: 65000, currency: "EUR" },
    description: "Lead our marketing initiatives and brand strategy.",
    requirements: ["5+ years marketing", "B2B experience", "Analytics skills"],
    benefits: ["Performance bonus", "Team events", "Parental leave"],
    status: "paused",
    applicants: 56,
    newApplicants: 0,
    aiScore: 71,
    postedAt: "2024-01-05T00:00:00Z",
    deadline: "2024-02-05",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
  },
  {
    id: "job-005",
    title: "Junior Backend Developer",
    department: "Engineering",
    location: "Gothenburg, Sweden",
    type: "full-time",
    salary: { min: 40000, max: 50000, currency: "EUR" },
    description: "Great opportunity for junior developers to grow.",
    requirements: ["Node.js basics", "SQL knowledge", "Eager to learn"],
    benefits: ["Mentorship program", "Training budget", "Career growth"],
    status: "active",
    applicants: 89,
    newApplicants: 15,
    aiScore: 94,
    postedAt: "2024-01-20T00:00:00Z",
    deadline: "2024-02-25",
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "job-006",
    title: "HR Coordinator",
    department: "Human Resources",
    location: "Stockholm, Sweden",
    type: "part-time",
    salary: { min: 35000, max: 45000, currency: "EUR" },
    description: "Support our HR team with daily operations.",
    requirements: ["HR experience", "Communication skills", "HRIS knowledge"],
    benefits: ["Flexible schedule", "Work-life balance", "Growth opportunities"],
    status: "draft",
    applicants: 0,
    newApplicants: 0,
    aiScore: 0,
    postedAt: null,
    deadline: "2024-03-01",
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
  },
  {
    id: "job-007",
    title: "Data Analyst",
    department: "Analytics",
    location: "Remote",
    type: "contract",
    salary: { min: 60000, max: 75000, currency: "EUR" },
    description: "Analyze data to drive business decisions.",
    requirements: ["SQL expertise", "Python/R", "Data visualization"],
    benefits: ["Remote first", "Project bonuses", "Flexible contract"],
    status: "closed",
    applicants: 41,
    newApplicants: 0,
    aiScore: 88,
    postedAt: "2023-12-01T00:00:00Z",
    deadline: "2024-01-15",
    createdAt: "2023-12-01T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z",
  },
];

// ============== CANDIDATES ==============
export const mockCandidates: Candidate[] = [
  {
    id: "cand-001",
    firstName: "Alex",
    lastName: "Chen",
    email: "alex.chen@email.com",
    phone: "+46 70 123 4567",
    location: "Stockholm, Sweden",
    currentRole: "Frontend Developer",
    experience: 6,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    resumeUrl: "/resumes/alex-chen.pdf",
    linkedinUrl: "https://linkedin.com/in/alexchen",
    status: "interview",
    appliedJobId: "job-001",
    appliedJobTitle: "Senior Frontend Developer",
    aiMatchScore: 94,
    appliedAt: "2024-01-18T00:00:00Z",
    notes: ["Strong portfolio", "Good culture fit"],
  },
  {
    id: "cand-002",
    firstName: "Maria",
    lastName: "Santos",
    email: "maria.santos@email.com",
    phone: "+46 73 987 6543",
    location: "Remote",
    currentRole: "UI/UX Designer",
    experience: 4,
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    resumeUrl: "/resumes/maria-santos.pdf",
    portfolioUrl: "https://mariasantos.design",
    status: "screening",
    appliedJobId: "job-002",
    appliedJobTitle: "Product Designer",
    aiMatchScore: 87,
    appliedAt: "2024-01-20T00:00:00Z",
    notes: ["Beautiful portfolio"],
  },
  {
    id: "cand-003",
    firstName: "Erik",
    lastName: "Lindqvist",
    email: "erik.l@email.com",
    phone: "+46 72 555 1234",
    location: "Malmö, Sweden",
    currentRole: "DevOps Engineer",
    experience: 5,
    skills: ["AWS", "Kubernetes", "Terraform", "Docker", "CI/CD"],
    resumeUrl: "/resumes/erik-l.pdf",
    linkedinUrl: "https://linkedin.com/in/eriklindqvist",
    status: "offer",
    appliedJobId: "job-003",
    appliedJobTitle: "DevOps Engineer",
    aiMatchScore: 91,
    appliedAt: "2024-01-12T00:00:00Z",
    notes: ["Excellent technical skills", "Salary negotiation pending"],
  },
  {
    id: "cand-004",
    firstName: "Sophie",
    lastName: "Andersson",
    email: "sophie.a@email.com",
    phone: "+46 70 111 2222",
    location: "Stockholm, Sweden",
    currentRole: "Junior Developer",
    experience: 1,
    skills: ["JavaScript", "React", "Node.js", "Git"],
    resumeUrl: "/resumes/sophie-a.pdf",
    status: "new",
    appliedJobId: "job-005",
    appliedJobTitle: "Junior Backend Developer",
    aiMatchScore: 78,
    appliedAt: "2024-01-22T00:00:00Z",
    notes: [],
  },
];

// ============== EMPLOYEES ==============
export const mockEmployees: Employee[] = [
  {
    id: "emp-001",
    firstName: "Johan",
    lastName: "Berg",
    email: "johan.berg@techcorp.com",
    department: "Engineering",
    role: "Engineering Manager",
    startDate: "2022-03-15",
    status: "active",
  },
  {
    id: "emp-002",
    firstName: "Emma",
    lastName: "Nilsson",
    email: "emma.nilsson@techcorp.com",
    department: "Design",
    role: "Lead Designer",
    startDate: "2021-08-01",
    manager: "emp-001",
    status: "active",
  },
  {
    id: "emp-003",
    firstName: "Lars",
    lastName: "Svensson",
    email: "lars.svensson@techcorp.com",
    department: "Engineering",
    role: "Senior Developer",
    startDate: "2023-01-10",
    manager: "emp-001",
    status: "active",
  },
];

// ============== DASHBOARD STATS ==============
export const dashboardStats: DashboardStats = {
  totalJobs: 7,
  activeJobs: 4,
  totalCandidates: 156,
  newCandidates: 28,
  interviewsScheduled: 12,
  offersExtended: 3,
  avgTimeToHire: 21,
  hiringRate: 68,
  // Additional stats for dashboard cards
  timeToFill: 18,
  candidatesInPipeline: 142,
  openRequisitions: 7,
};

// ============== RECRUITMENT FUNNEL (OBJECT FORMAT FOR DASHBOARD) ==============
export const recruitmentFunnel: RecruitmentFunnel = {
  new: 120,
  inReview: 85,
  interviewed: 45,
  hired: 12,
};

// ============== SOURCE OF HIRE DATA (WITH COLORS) ==============
export const sourceOfHire: SourceOfHireData[] = [
  { source: "LinkedIn", hires: 45, percentage: 35, color: "#2D5F8D" },
  { source: "Job Boards", hires: 32, percentage: 25, color: "#366EA6" },
  { source: "Referrals", hires: 28, percentage: 22, color: "#E6A23C" },
  { source: "Career Site", hires: 15, percentage: 12, color: "#6E9EC2" },
  { source: "Other", hires: 8, percentage: 6, color: "#B7CCE2" },
];

// ============== INTERVIEWS (WITH CANDIDATE OBJECT) ==============
export const upcomingInterviews: Interview[] = [
  {
    id: "int-001",
    candidateId: "cand-001",
    candidateName: "Alex Chen",
    candidate: {
      id: "cand-001",
      firstName: "Alex",
      lastName: "Chen",
    },
    jobId: "job-001",
    jobTitle: "Senior Frontend Developer",
    scheduledAt: "2024-01-25T10:00:00Z",
    duration: 60,
    type: "video",
    interviewers: [
      { id: "emp-001", firstName: "Johan", lastName: "Berg" },
      { id: "emp-002", firstName: "Emma", lastName: "Nilsson" },
    ],
    status: "scheduled",
  },
  {
    id: "int-002",
    candidateId: "cand-002",
    candidateName: "Maria Santos",
    candidate: {
      id: "cand-002",
      firstName: "Maria",
      lastName: "Santos",
    },
    jobId: "job-002",
    jobTitle: "Product Designer",
    scheduledAt: "2024-01-26T14:00:00Z",
    duration: 45,
    type: "video",
    interviewers: [
      { id: "emp-002", firstName: "Emma", lastName: "Nilsson" },
    ],
    status: "scheduled",
  },
  {
    id: "int-003",
    candidateId: "cand-003",
    candidateName: "Erik Lindqvist",
    candidate: {
      id: "cand-003",
      firstName: "Erik",
      lastName: "Lindqvist",
    },
    jobId: "job-003",
    jobTitle: "DevOps Engineer",
    scheduledAt: "2024-01-27T11:00:00Z",
    duration: 60,
    type: "technical_screen",
    interviewers: [
      { id: "emp-001", firstName: "Johan", lastName: "Berg" },
      { id: "emp-003", firstName: "Lars", lastName: "Svensson" },
    ],
    status: "scheduled",
  },
];

// ============== RECENT ACTIVITY ==============
export const recentActivity: Activity[] = [
  {
    id: "act-001",
    type: "application",
    title: "New Application",
    description: "Alex Chen applied for Senior Frontend Developer",
    timestamp: "2024-01-18T09:30:00Z",
    userId: "user-001",
    relatedId: "cand-001",
  },
  {
    id: "act-002",
    type: "interview",
    title: "Interview Scheduled",
    description: "Interview with Alex Chen scheduled for Jan 25",
    timestamp: "2024-01-19T14:00:00Z",
    userId: "user-001",
    relatedId: "int-001",
  },
  {
    id: "act-003",
    type: "offer",
    title: "Offer Extended",
    description: "Offer sent to Erik Lindqvist for DevOps Engineer",
    timestamp: "2024-01-20T11:00:00Z",
    userId: "user-001",
    relatedId: "cand-003",
  },
];

// ============== CONSTANTS ==============
export const departments: string[] = [
  "Engineering",
  "Design",
  "Marketing",
  "Human Resources",
  "Analytics",
  "Sales",
  "Finance",
  "Operations",
];

export const jobStatuses = ["active", "paused", "draft", "closed"] as const;
export const jobTypes = ["full-time", "part-time", "contract", "internship"] as const;
export const candidateStatuses = ["new", "screening", "interview", "offer", "hired", "rejected"] as const;

// ============== CHART DATA ==============
export const hiringFunnelData: FunnelData[] = [
  { stage: "Applied", count: 156, color: "#2D5F8D" },
  { stage: "Screening", count: 89, color: "#366EA6" },
  { stage: "Interview", count: 34, color: "#6E9EC2" },
  { stage: "Offer", count: 12, color: "#E6A23C" },
  { stage: "Hired", count: 8, color: "#2E7D32" },
];

export const applicationsByMonth: MonthlyData[] = [
  { month: "Jan", applications: 45, hires: 3 },
  { month: "Feb", applications: 52, hires: 4 },
  { month: "Mar", applications: 61, hires: 5 },
  { month: "Apr", applications: 48, hires: 2 },
  { month: "May", applications: 55, hires: 4 },
  { month: "Jun", applications: 67, hires: 6 },
];

// ============== MOCK API ==============
export const mockApi = {
  getDashboardStats: (): Promise<DashboardStats> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(dashboardStats), 300);
    });
  },

  getJobs: (): Promise<Job[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockJobs), 300);
    });
  },

  getJobById: (id: string): Promise<Job | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockJobs.find((j) => j.id === id)), 200);
    });
  },

  getCandidates: (): Promise<Candidate[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCandidates), 300);
    });
  },

  getCandidateById: (id: string): Promise<Candidate | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCandidates.find((c) => c.id === id)), 200);
    });
  },

  getUpcomingInterviews: (): Promise<Interview[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(upcomingInterviews), 300);
    });
  },

  getRecentActivity: (): Promise<Activity[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(recentActivity), 300);
    });
  },

  getEmployees: (): Promise<Employee[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockEmployees), 300);
    });
  },

  getHiringFunnel: (): Promise<FunnelData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(hiringFunnelData), 300);
    });
  },

  getSourceOfHire: (): Promise<SourceOfHireData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(sourceOfHire), 300);
    });
  },

  getRecruitmentFunnel: (): Promise<RecruitmentFunnel> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(recruitmentFunnel), 300);
    });
  },
};