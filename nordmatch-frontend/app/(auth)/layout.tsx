"use client";

import { CheckCircle2, Users, Zap, TrendingUp, Shield } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const stats = [
  { value: "50K+", label: "Candidates Placed" },
  { value: "500+", label: "Companies Trust Us" },
  { value: "35%", label: "Faster Hiring" },
];

const features = [
  { 
    icon: Zap, 
    title: "AI-Powered Matching", 
    desc: "Smart algorithms find the best candidates instantly" 
  },
  { 
    icon: Users, 
    title: "Streamlined Pipeline", 
    desc: "Manage candidates from application to hire" 
  },
  { 
    icon: TrendingUp, 
    title: "Analytics & Insights", 
    desc: "Data-driven decisions for better hiring" 
  },
  { 
    icon: Shield, 
    title: "GDPR Compliant", 
    desc: "Enterprise-grade security for your data" 
  },
];

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Clean Brand Section */}
      <div className="hidden lg:flex lg:w-[48%] bg-primary-700 text-white flex-col justify-between p-10 relative">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {/* Network/Share Icon - 3 nodes connected */}
              <circle cx="18" cy="5" r="3" fill="white" />
              <circle cx="6" cy="12" r="3" fill="white" />
              <circle cx="18" cy="19" r="3" fill="white" />
              <line x1="8.5" y1="10.5" x2="15.5" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="8.5" y1="13.5" x2="15.5" y2="17.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Nord match</h1>
            <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase">
              Applicant Tracking System
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center max-w-md py-8">
          {/* Headline */}
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Hire the best talent,
            <br />
            <span className="text-primary-200">faster than ever.</span>
          </h2>
          <p className="text-base text-white/70 mb-10 leading-relaxed">
            Join hundreds of Nordic companies using AI-powered recruitment to build exceptional teams.
          </p>

          {/* Stats Row */}
          <div className="flex gap-8 mb-10 pb-10 border-b border-white/10">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">{feature.title}</p>
                  <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary-300 flex items-center justify-center text-primary-800 font-bold text-sm flex-shrink-0">
              EK
            </div>
            <div className="flex-1">
              <p className="text-sm text-white/80 italic leading-relaxed mb-3">
                &ldquo;NordMatch reduced our time-to-hire by 40%. The AI matching is incredibly accurate.&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">Erik Karlsson</p>
                  <p className="text-xs text-white/50">Head of Talent, TechNordic AB</p>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-white/30 mt-6">
          © 2025 Nordmatch. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[420px]">{children}</div>
      </div>
    </div>
  );
}