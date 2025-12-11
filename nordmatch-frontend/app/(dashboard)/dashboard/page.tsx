"use client";

import { useEffect, useState } from "react";
import { 
  Plus, Clock, CalendarDays, ChevronRight, ChevronDown,
  TrendingUp, TrendingDown, Video, FileText,
  CheckCircle2, AlertCircle, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  currentUser, recruitmentFunnel,
  sourceOfHire, mockApi
} from "@/lib/mock-data";
import type { DashboardStats, Interview } from "@/types";
import { format, parseISO } from "date-fns";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

// Quick Actions Data
const quickActions = [
  { label: "Post New Job", icon: Plus, color: "bg-primary-100 text-primary-600" },
  { label: "Review Candidates", icon: FileText, color: "bg-amber-50 text-amber-600" },
  { label: "Schedule Interview", icon: CalendarDays, color: "bg-green-50 text-green-600" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [statsData, interviewsData] = await Promise.all([
        mockApi.getDashboardStats(),
        mockApi.getUpcomingInterviews(),
      ]);
      setStats(statsData);
      setInterviews(interviewsData);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Transform data for Recharts with colors
  const timeInStageChartData = [
    { name: "Screening", days: 5, fill: "#1C3F5C" },
    { name: "Interview", days: 12, fill: "#366EA6" },
    { name: "Hiring Manager Review", days: 10, fill: "#E6A23C" },
  ];

  // Transform sourceOfHire for PieChart
  const sourceOfHireChartData = sourceOfHire.map((item) => ({
    name: item.source,
    value: item.percentage,
    color: item.color,
  }));

  return (
    <div className="space-y-6">
      {/* Welcome Banner with Quick Stats */}
      <Card className="bg-gradient-to-r from-primary-600 to-primary-700 border-0 text-white overflow-hidden relative">
        <CardContent className="py-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Good {getGreeting()}, {currentUser.firstName}! 👋
              </h2>
              <p className="text-white/70 mt-1 mb-4">
                Here&apos;s your recruitment overview for today
              </p>
              
              {/* Quick Stats Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <AlertCircle className="w-4 h-4 text-amber-300" />
                  <span className="text-sm font-medium">5 candidates to review</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Video className="w-4 h-4 text-green-300" />
                  <span className="text-sm font-medium">3 interviews today</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-300" />
                  <span className="text-sm font-medium">2 offers pending</span>
                </div>
              </div>
            </div>
            
            <Button className="bg-white text-primary-600 hover:bg-white/90 font-semibold shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Create New Job
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Grid - Stats, Schedule, Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - Stats & Funnel */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#9810FA" strokeWidth="2"/>
                  <path d="M12 7V12L15 15" stroke="#9810FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              iconBg="bg-[#F1E5FD]"
              label="Time to Fill"
              value={`${stats?.timeToFill} days`}
              subtitle="Average hiring time"
              trend={{ value: 8, isPositive: true, label: "vs last month" }}
            />
            <StatCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="7" r="3" stroke="#E6A23C" strokeWidth="2"/>
                  <path d="M3 20C3 16.6863 5.68629 14 9 14C12.3137 14 15 16.6863 15 20" stroke="#E6A23C" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="17" cy="9" r="2.5" stroke="#E6A23C" strokeWidth="1.5"/>
                  <path d="M21 20C21 17.7909 19.2091 16 17 16" stroke="#E6A23C" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              }
              iconBg="bg-[#FEF3C7]"
              label="Candidates in Pipeline"
              value={stats?.candidatesInPipeline.toString() || "0"}
              subtitle="Active candidates"
              trend={{ value: 12, isPositive: true, label: "vs last month" }}
            />
            <StatCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="7" width="20" height="14" rx="2" stroke="#2D5F8D" strokeWidth="2"/>
                  <path d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V7" stroke="#2D5F8D" strokeWidth="2"/>
                  <path d="M12 12V12.01" stroke="#2D5F8D" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M2 12H22" stroke="#2D5F8D" strokeWidth="2"/>
                </svg>
              }
              iconBg="bg-[#EFF6FF]"
              label="Open Requisitions"
              value={`${stats?.openRequisitions} Reqs`}
              subtitle="Active job postings"
              trend={{ value: 3, isPositive: false, label: "vs last month" }}
            />
          </div>

          {/* Recruitment Funnel */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">Recruitment Funnel</CardTitle>
                  <p className="text-sm text-neutral-500 mt-0.5">
                    Candidate flow through hiring stages
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-700">
                  View Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <FunnelBar label="New" value={recruitmentFunnel.new} max={150} color="bg-primary" />
              <FunnelBar label="In Review" value={recruitmentFunnel.inReview} max={150} color="bg-primary-400" />
              <FunnelBar label="Interviewed" value={recruitmentFunnel.interviewed} max={150} color="bg-secondary-300" />
              <FunnelBar label="Hired" value={recruitmentFunnel.hired} max={150} color="bg-success-500" />
              
              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-neutral-100 mt-4">
                <MiniStat label="Total in Pipeline" value={450} color="bg-primary" />
                <MiniStat label="New This Week" value={32} color="bg-primary-400" />
                <MiniStat label="In Interview" value={45} color="bg-secondary-300" />
                <MiniStat label="Hired" value={12} color="bg-success-500" />
              </div>
            </CardContent>
          </Card>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Time in Stage Chart */}
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Average Time in Stage</CardTitle>
                <p className="text-sm text-neutral-500">Days candidates spend at each stage</p>
              </CardHeader>
              <CardContent className="flex-1">
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsBarChart data={timeInStageChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#6B7280', fontSize: 11 }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      tickLine={{ stroke: '#E5E7EB' }}
                    />
                    <YAxis
                      label={{
                        value: 'Days',
                        angle: -90,
                        position: 'insideLeft',
                        style: { fill: '#6B7280', fontSize: 11 },
                      }}
                      tick={{ fill: '#6B7280', fontSize: 11 }}
                      axisLine={{ stroke: '#E5E7EB' }}
                      tickLine={{ stroke: '#E5E7EB' }}
                      domain={[0, 16]}
                      ticks={[0, 4, 8, 12, 16]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value: number) => [`${value} days`, 'Time']}
                    />
                    <Bar dataKey="days" radius={[6, 6, 0, 0]}>
                      {timeInStageChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Source of Hire */}
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Source of Hire</CardTitle>
                <p className="text-sm text-neutral-500">Top hiring sources</p>
              </CardHeader>
              <CardContent className="flex-1 flex items-center gap-6">
                {/* Donut Chart with Recharts */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceOfHireChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={55}
                        dataKey="value"
                        nameKey="name"
                        strokeWidth={0}
                      >
                        {sourceOfHireChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          fontSize: '12px',
                          padding: '8px 12px'
                        }}
                        formatter={(value: number, name: string) => [`${value}%`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-2">
                  {sourceOfHire.map((source) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: source.color }} 
                        />
                        <span className="text-sm text-neutral-600">{source.source}</span>
                      </div>
                      <span className="font-semibold text-sm text-neutral-900">{source.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Schedule & Activity */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Schedule Panel */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-primary font-semibold">Schedule</CardTitle>
                <div className="w-9 h-9 rounded-lg border border-neutral-200 flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-neutral-400" />
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                {["Today", "This Week", "Next Week"].map((tab, i) => (
                  <button
                    key={tab}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      i === 0 
                        ? "bg-neutral-100 text-neutral-900 font-medium" 
                        : "text-neutral-500 hover:bg-neutral-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="pt-3 space-y-4">
              {/* Upcoming Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-neutral-500">Upcoming</p>
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                </div>
                <div className="space-y-3">
                  {interviews.slice(0, 2).map((interview) => (
                    <ScheduleCard key={interview.id} interview={interview} />
                  ))}
                </div>
              </div>
              
              {/* Tomorrow Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-neutral-500">Tomorrow</p>
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                </div>
                <div className="space-y-3">
                  {interviews.slice(2, 3).map((interview) => (
                    <ScheduleCard key={interview.id} interview={interview} />
                  ))}
                </div>
              </div>

              {/* View Full Calendar */}
              <Button variant="ghost" className="w-full text-primary hover:text-primary-700 hover:bg-primary-50 mt-2">
                View Full Calendar
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:border-primary-200 hover:bg-primary-50/50 transition-all group"
                >
                  <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center`}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm text-neutral-700 group-hover:text-neutral-900">
                    {action.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-neutral-300 ml-auto group-hover:text-primary-500 transition-colors" />
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper function
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

// Sub-components
function StatCard({ 
  icon, 
  iconBg, 
  label, 
  value, 
  subtitle,
  trend
}: { 
  icon: React.ReactNode; 
  iconBg: string;
  label: string; 
  value: string; 
  subtitle: string;
  trend?: { value: number; isPositive: boolean; label: string };
}) {
  return (
    <Card className="border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-500'
            }`}>
              {trend.isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {trend.value}%
            </div>
          )}
        </div>
        <p className="text-xs text-neutral-500 uppercase tracking-wide font-medium">{label}</p>
        <p className="text-2xl font-bold text-neutral-900 mt-1">{value}</p>
        <p className="text-sm text-neutral-500 mt-0.5">{subtitle}</p>
      </CardContent>
    </Card>
  );
}

function FunnelBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const width = (value / max) * 100;
  return (
    <div className="space-y-1.5 group cursor-pointer">
      <div className="flex justify-between text-sm">
        <span className="text-neutral-700 font-medium group-hover:text-primary-600 transition-colors">{label}</span>
        <span className="font-semibold text-neutral-900">{value}</span>
      </div>
      <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500 group-hover:opacity-80`} 
          style={{ width: `${width}%` }} 
        />
      </div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="text-center">
      <p className="text-xs text-neutral-500 mb-1">{label}</p>
      <div className="flex items-center justify-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        <span className="font-bold text-neutral-900">{value}</span>
      </div>
    </div>
  );
}

function ScheduleCard({ interview }: { interview: Interview }) {
  const date = parseISO(interview.scheduledAt);
  const endTime = new Date(date.getTime() + interview.duration * 60000);
  
  return (
    <div className="p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-all">
      {/* Time */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
        <Clock className="w-4 h-4" />
        {format(date, "HH:mm")} - {format(endTime, "HH:mm")}
      </div>
      
      {/* Title */}
      <p className="font-semibold text-neutral-900">
        Interview with <span className="text-neutral-900">{interview.candidate.firstName} {interview.candidate.lastName}</span>
      </p>
      
      {/* Description */}
      <p className="text-sm text-neutral-500 mt-1">
        {interview.duration} min call with {interview.type.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
      </p>
      
      {/* Bottom Row - Date, Avatars, Join Button */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-xs text-neutral-400">{format(date, "MMMM d, yyyy")}</span>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1.5">
            {interview.interviewers.slice(0, 2).map((interviewer) => (
              <Avatar key={interviewer.id} className="w-6 h-6 border-2 border-white">
                <AvatarFallback className="text-[9px] bg-primary-100 text-primary font-medium">
                  {interviewer.firstName[0]}{interviewer.lastName[0]}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Button 
            size="sm" 
            className="h-7 px-3 text-xs bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
          >
            <Video className="w-3 h-3 mr-1.5" />
            Join
          </Button>
        </div>
      </div>
    </div>
  );
}