// ============== USER & AUTH TYPES ==============
export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  size: string;
  location: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "recruiter" | "hiring_manager";
  company: Company;
  createdAt: string;
}

// ============== JOB TYPES ==============
export type JobStatus = "active" | "paused" | "draft" | "closed";
export type JobType = "full-time" | "part-time" | "contract" | "internship";

export interface JobSalary {
  min: number;
  max: number;
  currency: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: JobType;
  salary: JobSalary;
  description: string;
  requirements: string[];
  benefits: string[];
  status: JobStatus;
  applicants: number;
  newApplicants: number;
  aiScore: number;
  postedAt: string | null;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: JobType;
  salaryMin: string;
  salaryMax: string;
  currency: string;
  description: string;
  requirements: string;
  benefits: string;
}

// ============== CANDIDATE TYPES ==============
export type CandidateStatus = "new" | "screening" | "interview" | "offer" | "hired" | "rejected";

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  currentRole: string;
  experience: number;
  skills: string[];
  resumeUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  status: CandidateStatus;
  appliedJobId: string;
  appliedJobTitle: string;
  aiMatchScore: number;
  appliedAt: string;
  notes: string[];
}

// ============== EMPLOYEE TYPES ==============
export type EmployeeStatus = "active" | "on-leave" | "terminated";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  startDate: string;
  manager?: string;
  status: EmployeeStatus;
}

// ============== DASHBOARD TYPES ==============
export interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalCandidates: number;
  newCandidates: number;
  interviewsScheduled: number;
  offersExtended: number;
  avgTimeToHire: number;
  hiringRate: number;
  // Additional stats for dashboard
  timeToFill: number;
  candidatesInPipeline: number;
  openRequisitions: number;
}

// ============== INTERVIEW TYPES ==============
export type InterviewType = "phone" | "video" | "onsite" | "technical_screen" | "final_round";
export type InterviewStatus = "scheduled" | "completed" | "cancelled";

export interface Interviewer {
  id: string;
  firstName: string;
  lastName: string;
}

export interface InterviewCandidate {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidate: InterviewCandidate;
  jobId: string;
  jobTitle: string;
  scheduledAt: string;
  duration: number;
  type: InterviewType;
  interviewers: Interviewer[];
  status: InterviewStatus;
  notes?: string;
}

// ============== ACTIVITY TYPES ==============
export type ActivityType = "application" | "interview" | "offer" | "hire" | "rejection";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  userId: string;
  relatedId?: string;
}

// ============== MESSAGE TYPES ==============
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: string;
}

// ============== CHART TYPES ==============
export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface FunnelData {
  stage: string;
  count: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  applications: number;
  hires: number;
}

export interface SourceOfHireData {
  source: string;
  hires: number;
  percentage: number;
  color: string;
}

// ============== RECRUITMENT FUNNEL (OBJECT FORMAT) ==============
export interface RecruitmentFunnel {
  new: number;
  inReview: number;
  interviewed: number;
  hired: number;
}