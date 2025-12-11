"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Building2, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const password = formData.password;
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password),
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    
    return {
      score: strength,
      checks,
      label: strength <= 2 ? "Weak" : strength <= 3 ? "Fair" : strength <= 4 ? "Good" : "Strong",
      color: strength <= 2 ? "bg-red-500" : strength <= 3 ? "bg-yellow-500" : strength <= 4 ? "bg-blue-500" : "bg-green-500",
    };
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreeToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/login?registered=true");
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-neutral-900">Create your account</h1>
        <p className="text-neutral-600 mt-2">
          Start your 14-day free trial. No credit card required.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">1</div>
          <span className="text-sm font-medium text-neutral-900">Account</span>
        </div>
        <div className="w-8 h-px bg-neutral-300" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center text-sm font-semibold">2</div>
          <span className="text-sm text-neutral-500">Setup</span>
        </div>
        <div className="w-8 h-px bg-neutral-300" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-500 flex items-center justify-center text-sm font-semibold">3</div>
          <span className="text-sm text-neutral-500">Done</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm border border-red-200 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-sm font-medium text-neutral-700">
              First Name
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className="pl-10 h-11 bg-neutral-50 border-neutral-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-sm font-medium text-neutral-700">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              className="h-11 bg-neutral-50 border-neutral-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
        </div>

        {/* Work Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
            Work Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 h-11 bg-neutral-50 border-neutral-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
        </div>

        {/* Company Name */}
        <div className="space-y-1.5">
          <Label htmlFor="companyName" className="text-sm font-medium text-neutral-700">
            Company Name
          </Label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              id="companyName"
              name="companyName"
              placeholder="Acme Inc."
              value={formData.companyName}
              onChange={handleChange}
              className="pl-10 h-11 bg-neutral-50 border-neutral-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
        </div>

        {/* Password with Strength Indicator */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-sm font-medium text-neutral-700">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 pr-11 h-11 bg-neutral-50 border-neutral-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
          {/* Password Strength Bar */}
          {formData.password && (
            <div className="space-y-2 mt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= passwordStrength.score ? passwordStrength.color : "bg-neutral-200"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${
                  passwordStrength.score <= 2 ? "text-red-500" : 
                  passwordStrength.score <= 3 ? "text-yellow-600" : 
                  passwordStrength.score <= 4 ? "text-blue-500" : "text-green-500"
                }`}>
                  {passwordStrength.label}
                </span>
                <div className="flex gap-2 text-xs text-neutral-500">
                  <span className={passwordStrength.checks.length ? "text-green-500" : ""}>
                    {passwordStrength.checks.length ? <Check className="w-3 h-3 inline" /> : "○"} 8+ chars
                  </span>
                  <span className={passwordStrength.checks.number ? "text-green-500" : ""}>
                    {passwordStrength.checks.number ? <Check className="w-3 h-3 inline" /> : "○"} Number
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="peer sr-only"
            />
            <div className="w-5 h-5 border-2 border-neutral-300 rounded-md peer-checked:bg-primary peer-checked:border-primary transition-all">
              {agreeToTerms && (
                <svg className="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-neutral-600 leading-relaxed">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:underline font-medium">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline font-medium">
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>

      {/* Sign In Link */}
      <p className="text-center text-neutral-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primary-700 font-semibold transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}