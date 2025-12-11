"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is logged in (mock auth)
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("nordmatch_user");
        if (user) {
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  // Loading state while checking auth
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="18" cy="5" r="3" fill="white" />
              <circle cx="6" cy="12" r="3" fill="white" />
              <circle cx="18" cy="19" r="3" fill="white" />
              <line x1="8.5" y1="10.5" x2="15.5" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <line x1="8.5" y1="13.5" x2="15.5" y2="17.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto" />
        </div>
      </div>
    );
  }

  return null;
}