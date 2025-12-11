"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Briefcase, Users, UserCircle, Gift,
  MessageSquare, BarChart3, Globe, HelpCircle, Settings,
  Bell, Search, ChevronDown, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/lib/mock-data";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Jobs", href: "/jobs", icon: Briefcase },
  { label: "Candidates", href: "/candidates", icon: Users },
  { label: "Employee", href: "/employees", icon: UserCircle },
  { label: "Promotion", href: "/promotions", icon: Gift },
  { label: "Message", href: "/messages", icon: MessageSquare },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Career site", href: "/career-site", icon: Globe },
  { label: "Help Center", href: "/help", icon: HelpCircle },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-white border-r border-neutral-200 z-50 transform transition-transform duration-200 ease-in-out",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-neutral-200">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="18" cy="5" r="3" fill="white" />
                <circle cx="6" cy="12" r="3" fill="white" />
                <circle cx="18" cy="19" r="3" fill="white" />
                <line x1="8.5" y1="10.5" x2="15.5" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="8.5" y1="13.5" x2="15.5" y2="17.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-primary text-lg">Nord match</span>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider -mt-0.5">
                Applicant Tracking System
              </p>
            </div>
          </Link>
          <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-primary-100">
              <AvatarFallback className="bg-primary text-white text-sm">
                {currentUser.company.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-neutral-900 truncate">
                {currentUser.company.name}
              </p>
              <p className="text-xs text-neutral-500 capitalize">{currentUser.role.replace("_", " ")}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5 text-neutral-600" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-neutral-900">Recruitment Dashboard</h1>
              <p className="text-sm text-neutral-500">Monitor your hiring pipeline and team performance</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search jobs, candidates..."
                className="w-64 pl-10 h-10 bg-neutral-50 border-neutral-200"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-neutral-100">
              <Bell className="w-5 h-5 text-neutral-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-3 pl-2 border-l border-neutral-200">
              <Avatar className="w-9 h-9">
                <AvatarFallback className="bg-primary-100 text-primary text-sm font-medium">
                  {currentUser.firstName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-neutral-900">
                  {currentUser.firstName}
                </p>
                <p className="text-xs text-neutral-500 capitalize">
                  {currentUser.role.replace("_", " ")}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}