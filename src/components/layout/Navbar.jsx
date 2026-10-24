import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  Search,
  PlusCircle,
  CheckCircle,
  Dog,
  HelpCircle,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Compass,
  Shield,
  LayoutDashboard,
  MapPin,
  Sparkles
} from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                LOST & FOUND <span className="text-brand-600 dark:text-brand-400">HUB</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-slate-500 dark:text-slate-400">
                Recovery Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 font-medium text-sm">
            <Link
              to="/explore"
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                isActive('/explore')
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              Explore
            </Link>

            <Link
              to="/pets"
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                isActive('/pets')
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Dog className="w-4 h-4 text-amber-500" />
              Pets
            </Link>

            <Link
              to="/mystery-items"
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                isActive('/mystery-items')
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-purple-500" />
              Mystery Items
            </Link>

            <Link
              to="/how-it-works"
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors ${
                isActive('/how-it-works')
                  ? 'bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              How It Works
            </Link>

            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />

            {/* Quick Action CTAs */}
            <Link
              to="/report-lost"
              className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900/60 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-800/60 font-semibold flex items-center gap-1.5 transition-all text-xs shadow-sm active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              Report Lost
            </Link>

            <Link
              to="/report-found"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-semibold flex items-center gap-1.5 transition-all text-xs shadow-sm active:scale-95"
            >
              <CheckCircle className="w-4 h-4" />
              Report Found
            </Link>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Notification Bell */}
            <Link
              to="/notifications"
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-800"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Authenticated User Menu or Auth CTAs */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-800"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-500/30"
                  />
                  <span className="hidden md:block text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-slide-up"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {currentUser.email}
                      </p>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-bold border border-brand-200 dark:border-brand-800">
                        {currentUser.reputation?.badgeTier || 'Community Helper'}
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      className="px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4 text-brand-500" />
                      Dashboard
                    </Link>

                    <Link
                      to="/my-reports"
                      className="px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 flex items-center gap-2"
                    >
                      <Search className="w-4 h-4 text-indigo-500" />
                      My Reports
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="px-4 py-2.5 text-xs font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/20 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3 animate-slide-up">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <Link
              to="/report-lost"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-300 font-bold text-center text-xs border border-red-200 dark:border-red-800/60"
            >
              🔴 Report Lost
            </Link>
            <Link
              to="/report-found"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 font-bold text-center text-xs border border-emerald-200 dark:border-emerald-800/60"
            >
              🟢 Report Found
            </Link>
          </div>

          <div className="flex flex-col space-y-1 font-medium text-sm">
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-brand-500" />
              Explore Reports
            </Link>

            <Link
              to="/pets"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <Dog className="w-4 h-4 text-amber-500" />
              Pets Recovery Mode
            </Link>

            <Link
              to="/mystery-items"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-purple-500" />
              Mystery Items
            </Link>

            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              How It Works
            </Link>

            {isAuthenticated ? (
              <>
                <div className="border-t border-slate-100 dark:border-slate-800 my-2" />
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-brand-500" />
                  My Dashboard
                </Link>
                <Link
                  to="/my-reports"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-indigo-500" />
                  My Reports
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-xl text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-semibold rounded-xl bg-brand-600 text-white"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
