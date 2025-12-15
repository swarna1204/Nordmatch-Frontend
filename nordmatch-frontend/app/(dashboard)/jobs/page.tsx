"use client";

import { useState, useEffect } from "react";
import {
  Search, Plus, LayoutGrid, List, MapPin, Clock, Users,
  MoreVertical, Briefcase, Building2, DollarSign, Sparkles,
  Edit, Trash2, Eye, CheckCircle2, PauseCircle, XCircle,
  FileText, TrendingUp, X, ArrowRight, Loader2, Check,
  AlertCircle, Play, Archive,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockJobs as initialJobs, departments, jobTypes } from "@/lib/mock-data";
import type { Job, JobStatus, JobFormData, JobType } from "@/types";

// ============== STATUS BADGE ==============
function StatusBadge({ status }: { status: JobStatus }) {
  const config: Record<JobStatus, { className: string; icon: React.ReactNode }> = {
    active: {
      className: "bg-success-500/10 text-success-500 border-success-500/20",
      icon: <CheckCircle2 size={12} />,
    },
    paused: {
      className: "bg-warning-500/10 text-warning-500 border-warning-500/20",
      icon: <PauseCircle size={12} />,
    },
    draft: {
      className: "bg-neutral-200 text-neutral-600 border-neutral-300",
      icon: <FileText size={12} />,
    },
    closed: {
      className: "bg-error-500/10 text-error-500 border-error-500/20",
      icon: <XCircle size={12} />,
    },
  };

  const { className, icon } = config[status];

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", className)}>
      {icon} {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ============== TOAST NOTIFICATION ==============
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-in slide-in-from-bottom-5",
      type === "success" ? "bg-success-500 text-white border-success-500" : "bg-error-500 text-white border-error-500"
    )}>
      {type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X size={16} />
      </button>
    </div>
  );
}

// ============== DELETE CONFIRMATION MODAL ==============
function DeleteModal({ job, onConfirm, onCancel }: { job: Job; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-error-500/10 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} className="text-error-500" />
        </div>
        <h3 className="text-lg font-bold text-neutral-900 text-center mb-2">Delete Job?</h3>
        <p className="text-neutral-600 text-center mb-6">
          Are you sure you want to delete "<strong>{job.title}</strong>"? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-error-500 text-white font-medium hover:bg-error-500/90 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ============== JOB ACTIONS DROPDOWN ==============
function JobActionsDropdown({ 
  job, 
  onEdit, 
  onDelete, 
  onStatusChange 
}: { 
  job: Job; 
  onEdit: () => void; 
  onDelete: () => void;
  onStatusChange: (status: JobStatus) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
      >
        <MoreVertical size={16} />
      </button>
      
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl border border-neutral-200 shadow-lg z-20 py-1">
            <button
              onClick={() => { onEdit(); setOpen(false); }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            >
              <Edit size={14} /> Edit Job
            </button>
            
            {job.status !== "active" && (
              <button
                onClick={() => { onStatusChange("active"); setOpen(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-success-500 hover:bg-success-500/5"
              >
                <Play size={14} /> Set Active
              </button>
            )}
            
            {job.status === "active" && (
              <button
                onClick={() => { onStatusChange("paused"); setOpen(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-warning-500 hover:bg-warning-500/5"
              >
                <PauseCircle size={14} /> Pause Job
              </button>
            )}
            
            {job.status !== "closed" && (
              <button
                onClick={() => { onStatusChange("closed"); setOpen(false); }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
              >
                <Archive size={14} /> Close Job
              </button>
            )}
            
            <div className="border-t border-neutral-100 my-1" />
            
            <button
              onClick={() => { onDelete(); setOpen(false); }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-error-500 hover:bg-error-500/5"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ============== HELPER ==============
function formatSalary(salary: { min: number; max: number; currency: string }): string {
  const formatter = new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: salary.currency,
    maximumFractionDigits: 0,
  });
  return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
}

function generateId(): string {
  return `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============== JOB CARD ==============
function JobCard({
  job,
  onEdit,
  onView,
  onDelete,
  onStatusChange,
}: {
  job: Job;
  onEdit: (job: Job) => void;
  onView: (job: Job) => void;
  onDelete: (job: Job) => void;
  onStatusChange: (job: Job, status: JobStatus) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-lg hover:border-primary-300 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <Briefcase size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 group-hover:text-primary-500 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-neutral-600 flex items-center gap-1">
              <Building2 size={12} /> {job.department}
            </p>
          </div>
        </div>
        <StatusBadge status={job.status} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-600 text-xs font-medium">
          <MapPin size={12} /> {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-600 text-xs font-medium">
          <Clock size={12} /> {job.type.replace("-", " ")}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-600 text-xs font-medium">
          <DollarSign size={12} /> {formatSalary(job.salary)}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-neutral-400" />
            <span className="text-sm font-semibold text-neutral-700">{job.applicants}</span>
            {job.newApplicants > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-secondary-300 text-white text-xs font-bold">
                +{job.newApplicants}
              </span>
            )}
          </div>
          {job.aiScore > 0 && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-info-500/10">
              <Sparkles size={12} className="text-info-500" />
              <span className="text-xs font-semibold text-info-500">{job.aiScore}% match</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(job)}
            className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-primary-500 transition-colors"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onEdit(job)}
            className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-primary-500 transition-colors"
          >
            <Edit size={16} />
          </button>
          <JobActionsDropdown
            job={job}
            onEdit={() => onEdit(job)}
            onDelete={() => onDelete(job)}
            onStatusChange={(status) => onStatusChange(job, status)}
          />
        </div>
      </div>
    </div>
  );
}

// ============== CREATE/EDIT MODAL ==============
function CreateJobModal({
  isOpen,
  onClose,
  editJob,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  editJob: Job | null;
  onSave: (job: Job) => void;
}) {
  const [step, setStep] = useState<number>(1);
  const [generating, setGenerating] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const getInitialFormData = (): JobFormData => ({
    title: editJob?.title || "",
    department: editJob?.department || "",
    location: editJob?.location || "",
    type: editJob?.type || "full-time",
    salaryMin: editJob?.salary.min.toString() || "",
    salaryMax: editJob?.salary.max.toString() || "",
    currency: editJob?.salary.currency || "EUR",
    description: editJob?.description || "",
    requirements: editJob?.requirements.join("\n") || "",
    benefits: editJob?.benefits.join("\n") || "",
  });

  const [formData, setFormData] = useState<JobFormData>(getInitialFormData());

  // Reset form when modal opens/closes or editJob changes
  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData());
      setStep(1);
    }
  }, [isOpen, editJob]);

  const generateAIDescription = (): void => {
    setGenerating(true);
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        description: `We are seeking a talented ${formData.title || "professional"} to join our ${formData.department || "team"}. The ideal candidate will bring expertise, creativity, and a passion for excellence.\n\nIn this role, you'll collaborate with cross-functional teams to deliver high-impact solutions that drive our business forward.`,
        requirements: "5+ years of relevant experience\nStrong communication and collaboration skills\nProblem-solving mindset with attention to detail\nExperience with modern tools and methodologies\nBachelor's degree in related field or equivalent",
        benefits: "Competitive salary and equity package\nFlexible remote work options\nHealth, dental, and vision insurance\nProfessional development budget\n25 days paid vacation + holidays",
      }));
      setGenerating(false);
    }, 1500);
  };

  const handleSave = (): void => {
    setSaving(true);
    
    // Create the job object
    const now = new Date().toISOString();
    const jobData: Job = {
      id: editJob?.id || generateId(),
      title: formData.title,
      department: formData.department,
      location: formData.location,
      type: formData.type as JobType,
      salary: {
        min: parseInt(formData.salaryMin) || 0,
        max: parseInt(formData.salaryMax) || 0,
        currency: formData.currency,
      },
      description: formData.description,
      requirements: formData.requirements.split("\n").filter(r => r.trim()),
      benefits: formData.benefits.split("\n").filter(b => b.trim()),
      status: editJob?.status || "draft",
      applicants: editJob?.applicants || 0,
      newApplicants: editJob?.newApplicants || 0,
      aiScore: editJob?.aiScore || Math.floor(Math.random() * 30) + 70, // Random AI score for new jobs
      postedAt: editJob?.postedAt || null,
      deadline: editJob?.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: editJob?.createdAt || now,
      updatedAt: now,
    };

    // Simulate save delay
    setTimeout(() => {
      onSave(jobData);
      setSaving(false);
      onClose();
    }, 500);
  };

  const isFormValid = formData.title && formData.department && formData.location && formData.salaryMin && formData.salaryMax;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-linear-to-r from-primary-500 to-primary-700">
          <div>
            <h2 className="text-xl font-bold text-white">
              {editJob ? "Edit Job" : "Create New Job"}
            </h2>
            <p className="text-sm text-white/70">Step {step} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-2 px-6 pt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                s <= step ? "bg-primary-500" : "bg-neutral-200"
              )}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-900 mb-4">Basic Information</h3>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Job Title <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Department <span className="text-error-500">*</span>
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
                  >
                    <option value="">Select department</option>
                    {departments.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Job Type <span className="text-error-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as JobType })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
                  >
                    {jobTypes.map((t) => (
                      <option key={t} value={t}>{t.replace("-", " ")}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Location <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Stockholm, Sweden or Remote"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Salary Min (€) <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                    placeholder="40000"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Salary Max (€) <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                    placeholder="60000"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-neutral-900">Job Description</h3>
                <button
                  onClick={generateAIDescription}
                  disabled={generating}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50"
                >
                  {generating ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Sparkles size={16} />
                  )}
                  {generating ? "Generating..." : "AI Generate"}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the role and responsibilities..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Requirements (one per line)
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="List the requirements..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-900 mb-4">Benefits & Preview</h3>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Benefits (one per line)
                </label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  placeholder="What benefits do you offer?"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200">
                <h4 className="font-semibold text-neutral-900 mb-3">Preview</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center shrink-0">
                      <Briefcase size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">{formData.title || "Job Title"}</p>
                      <p className="text-sm text-neutral-600">{formData.department || "Department"}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs px-2 py-1 rounded bg-white text-neutral-600">
                      📍 {formData.location || "Location"}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-white text-neutral-600">
                      💼 {formData.type.replace("-", " ")}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-white text-neutral-600">
                      💰 €{formData.salaryMin || "0"} - €{formData.salaryMax || "0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 flex items-center justify-between bg-neutral-50">
          <button
            onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
            className="px-5 py-2.5 rounded-xl border border-neutral-300 text-neutral-600 font-medium hover:bg-white transition-colors"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>
          
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !isFormValid}
              className="px-5 py-2.5 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving || !isFormValid}
              className="px-5 py-2.5 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={16} />
                  {editJob ? "Save Changes" : "Create Job"}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============== MAIN PAGE ==============
export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState<string>("");
  const [department, setDepartment] = useState<string>("All Departments");
  const [status, setStatus] = useState<string>("All Status");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [deleteJob, setDeleteJob] = useState<Job | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const statusFilters = ["All Status", "Active", "Paused", "Draft", "Closed"];

  const filteredJobs = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.department.toLowerCase().includes(search.toLowerCase());
    const matchDept = department === "All Departments" || job.department === department;
    const matchStatus = status === "All Status" || job.status === status.toLowerCase();
    return matchSearch && matchDept && matchStatus;
  });

  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => j.status === "active").length,
    applicants: jobs.reduce((sum, j) => sum + j.applicants, 0),
    newApplicants: jobs.reduce((sum, j) => sum + j.newApplicants, 0),
  };

  // Handle save (create or update)
  const handleSaveJob = (job: Job) => {
    if (editJob) {
      // Update existing job
      setJobs(jobs.map((j) => (j.id === job.id ? job : j)));
      setToast({ message: `"${job.title}" has been updated successfully!`, type: "success" });
    } else {
      // Create new job
      setJobs([job, ...jobs]);
      setToast({ message: `"${job.title}" has been created successfully!`, type: "success" });
    }
    setEditJob(null);
  };

  // Handle delete
  const handleDeleteJob = () => {
    if (deleteJob) {
      setJobs(jobs.filter((j) => j.id !== deleteJob.id));
      setToast({ message: `"${deleteJob.title}" has been deleted.`, type: "success" });
      setDeleteJob(null);
    }
  };

  // Handle status change
  const handleStatusChange = (job: Job, newStatus: JobStatus) => {
    const updatedJob = { 
      ...job, 
      status: newStatus, 
      updatedAt: new Date().toISOString(),
      postedAt: newStatus === "active" && !job.postedAt ? new Date().toISOString() : job.postedAt,
    };
    setJobs(jobs.map((j) => (j.id === job.id ? updatedJob : j)));
    setToast({ message: `"${job.title}" is now ${newStatus}.`, type: "success" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Jobs</h1>
          <p className="text-neutral-600 text-sm mt-1">
            Manage your job postings and track applications
          </p>
        </div>
        <button
          onClick={() => {
            setEditJob(null);
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-all hover:shadow-lg hover:shadow-primary-500/25"
        >
          <Plus size={18} /> Create Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Jobs", value: stats.total, icon: Briefcase, color: "bg-primary-500" },
          { label: "Active Jobs", value: stats.active, icon: CheckCircle2, color: "bg-success-500" },
          { label: "Total Applicants", value: stats.applicants, icon: Users, color: "bg-info-500" },
          { label: "New This Week", value: stats.newApplicants, icon: TrendingUp, color: "bg-secondary-300" },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-neutral-200"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shadow-lg", stat.color)}>
              <stat.icon size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-sm text-neutral-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white"
            />
          </div>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 outline-none bg-white text-neutral-600 font-medium"
          >
            <option>All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 outline-none bg-white text-neutral-600 font-medium"
          >
            {statusFilters.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-100">
          <button
            onClick={() => setView("grid")}
            className={cn(
              "p-2 rounded-lg transition-all",
              view === "grid"
                ? "bg-white shadow text-primary-500"
                : "text-neutral-400 hover:text-neutral-600"
            )}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn(
              "p-2 rounded-lg transition-all",
              view === "list"
                ? "bg-white shadow text-primary-500"
                : "text-neutral-400 hover:text-neutral-600"
            )}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={(j) => {
                setEditJob(j);
                setShowModal(true);
              }}
              onView={() => {}}
              onDelete={(j) => setDeleteJob(j)}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Job</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Department</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Location</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Applicants</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-600">AI Score</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center shrink-0">
                          <Briefcase size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">{job.title}</p>
                          <p className="text-xs text-neutral-500">{job.type.replace("-", " ")}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{job.department}</td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{job.location}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-neutral-900">{job.applicants}</span>
                      {job.newApplicants > 0 && (
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-secondary-300 text-white text-xs font-bold">
                          +{job.newApplicants}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="px-6 py-4">
                      {job.aiScore > 0 && (
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-info-500">
                          <Sparkles size={14} /> {job.aiScore}%
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-primary-500">
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setEditJob(job);
                            setShowModal(true);
                          }}
                          className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-primary-500"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteJob(job)}
                          className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-error-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <Briefcase size={24} className="text-neutral-400" />
          </div>
          <h3 className="font-semibold text-neutral-900 mb-2">No jobs found</h3>
          <p className="text-neutral-500 text-sm mb-4">
            {search || department !== "All Departments" || status !== "All Status"
              ? "Try adjusting your filters"
              : "Create your first job posting to get started"}
          </p>
          {!search && department === "All Departments" && status === "All Status" && (
            <button
              onClick={() => {
                setEditJob(null);
                setShowModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              <Plus size={16} /> Create Job
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      <CreateJobModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditJob(null);
        }}
        editJob={editJob}
        onSave={handleSaveJob}
      />

      {deleteJob && (
        <DeleteModal
          job={deleteJob}
          onConfirm={handleDeleteJob}
          onCancel={() => setDeleteJob(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}