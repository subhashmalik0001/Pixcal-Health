import React, { useState, useEffect } from "react";
import { Activity, Globe, Check, LogIn, UserPlus, User, LogOut, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
];

function getSubtitle(lang: string) {
  if (lang === "hi") return "आपका स्वास्थ्य साथी";
  if (lang === "ta") return "உங்கள் சுகாதார துணை";
  if (lang === "te") return "మీ ఆరోగ్య సహాయకుడు";
  return "Your Health Companion";
}

export function DashboardHeader() {
  const { currentLanguage, setLanguage } = useLanguage();
  const [langDropdown, setLangDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLangChange = (code: string) => {
    setLanguage(code as any);
    setLangDropdown(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfileDropdown(false);
    navigate("/");
  };

  const currentLangName = languages.find(l => l.code === currentLanguage)?.name || "English";
  const displayName = user?.user_metadata?.username || user?.email?.split('@')[0] || "Profile";

  return (
    <div className="w-full flex flex-col gap-2 pt-4 pb-2 px-4 bg-white/80 rounded-b-2xl shadow-sm relative">
      {/* Top Right Controls */}
      <div className="absolute top-3 right-4 z-10 flex items-center gap-2">

        {/* Auth Buttons / Profile Dropdown */}
        {user ? (
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-700 hover:bg-gray-100/50 h-8"
              onClick={() => setProfileDropdown(!profileDropdown)}
            >
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="w-3 h-3" />
              </div>
              <span className="font-medium text-sm hidden sm:inline-block">{displayName}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </Button>

            {profileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden py-1">
                <div className="px-4 py-2 border-b border-gray-50">
                  <p className="text-xs font-medium text-gray-500">Signed in as</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                </div>
                <button
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 text-left text-sm text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-primary hover:text-primary hover:bg-white/50 h-8">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="hidden sm:flex bg-primary hover:bg-accent text-white shadow-md rounded-xl h-8">
                <UserPlus className="w-4 h-4 mr-2" />
                Signup
              </Button>
            </Link>
          </>
        )}

        {/* Language Selector */}
        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-1 rounded-xl bg-white shadow hover:bg-gray-50 border border-gray-200 h-8"
            onClick={() => setLangDropdown((d) => !d)}
          >
            <Globe className="w-4 h-4 text-primary" />
            <span className="font-medium text-gray-700 text-sm">
              {currentLangName}
            </span>
          </button>
          {langDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-20">
              {languages.map((l) => (
                <button
                  key={l.code}
                  className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 text-left"
                  onClick={() => handleLangChange(l.code)}
                >
                  <span>
                    {l.name} <span className="text-xs text-gray-400 ml-1">{l.native}</span>
                  </span>
                  {currentLanguage === l.code && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Logo & Subtitle */}
      <div className="flex flex-col gap-1 pt-1">
        <img
          src="/logo.png"
          alt="Pixal Health"
          className="h-14 w-40 object-contain self-start mb-0"
        />
      </div>
      {/* Health Status Card */}

    </div>
  );
}