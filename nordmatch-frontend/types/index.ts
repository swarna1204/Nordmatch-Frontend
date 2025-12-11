// User & Authentication
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "hr_manager" | "recruiter" | "admin";
  avatar?: string;
  company: Company;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
}

// Jobs
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  status: "active" | "paused" | "closed";
  salary?: { min: number; max: number; currency: string };
  description: string;
  requirements: string[];
  postedAt: string;
  applicantCount: number;
}

// Candidates
export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  currentRole: string;
  currentCompany: string;
  location: string;
  skills: string[];
  experience: number; // years
  resumeUrl?: string;
  linkedinUrl?: string;
  appliedAt: string;
  source: "linkedin" | "referral" | "career_site" | "agency" | "other";
  matchScore?: number; // AI-powered match score 0-100
}

// Applications & Pipeline
export interface Application {
  id: string;
  candidateId: string;
  candidate: Candidate;
  jobId: string;
  job: Job;
  status: PipelineStage;
  appliedAt: string;
  updatedAt: string;
  notes: ApplicationNote[];
  interviews: Interview[];
}

export type PipelineStage = 
  | "new" 
  | "screening" 
  | "interview" 
  | "assessment" 
  | "offer" 
  | "hired" 
  | "rejected";

export interface ApplicationNote {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

// Interviews
export interface Interview {
  id: string;
  applicationId: string;
  candidate: Pick<Candidate, "id" | "firstName" | "lastName" | "avatar">;
  type: "phone_screen" | "technical" | "portfolio_review" | "final" | "culture_fit";
  scheduledAt: string;
  duration: number; // minutes
  interviewers: Pick<User, "id" | "firstName" | "lastName" | "avatar">[];
  location?: string;
  meetingLink?: string;
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  feedback?: string;
}

// Dashboard Stats
export interface DashboardStats {
  timeToFill: number; // days
  candidatesInPipeline: number;
  openRequisitions: number;
  hiredThisMonth: number;
}

export interface RecruitmentFunnel {
  new: number;
  inReview: number;
  interviewed: number;
  hired: number;
}

export interface SourceOfHire {
  source: string;
  percentage: number;
  color: string;
}

export interface TimeInStage {
  stage: string;
  days: number;
}