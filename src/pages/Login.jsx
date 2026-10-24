import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { LogIn, Sparkles, UserCheck, Shield } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
      navigate(from, { replace: true });
    }
  };

  const handleDemoUserLogin = () => {
    login('rohan.sharma@example.com', 'demo123');
    navigate(from, { replace: true });
  };

  const handleDemoAdminLogin = () => {
    login('admin@lafhub.org', 'admin123');
    navigate('/admin', { replace: true });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-md shadow-brand-500/25">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to access your dashboard, reports, and sightings
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="p-3 bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-2xl space-y-2">
          <div className="text-[11px] font-bold text-brand-700 dark:text-brand-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> One-Click Quick Demo Login:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoUserLogin}
              className="py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 flex items-center justify-center gap-1 shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-500" /> Demo User
            </button>
            <button
              type="button"
              onClick={handleDemoAdminLogin}
              className="py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-purple-600 dark:text-purple-400 hover:bg-slate-50 flex items-center justify-center gap-1 shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 text-purple-500" /> Demo Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full" size="lg">
            Sign In
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-600 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
