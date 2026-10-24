import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LostFoundProvider } from './context/LostFoundContext';
import { NotificationProvider } from './context/NotificationContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { ReportLost } from './pages/ReportLost';
import { ReportFound } from './pages/ReportFound';
import { ItemDetail } from './pages/ItemDetail';
import { MissingTrailPage } from './pages/MissingTrailPage';
import { Pets } from './pages/Pets';
import { MysteryItems } from './pages/MysteryItems';
import { Dashboard } from './pages/Dashboard';
import { MyReports } from './pages/MyReports';
import { NotificationsPage } from './pages/NotificationsPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AdminDashboard } from './pages/AdminDashboard';
import { About } from './pages/About';
import { HowItWorks } from './pages/HowItWorks';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LostFoundProvider>
          <NotificationProvider>
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/report-lost" element={<ReportLost />} />
                    <Route path="/report-found" element={<ReportFound />} />
                    <Route path="/item/:id" element={<ItemDetail />} />
                    <Route path="/trail/:id" element={<MissingTrailPage />} />
                    <Route path="/pets" element={<Pets />} />
                    <Route path="/mystery-items" element={<MysteryItems />} />
                    
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/my-reports"
                      element={
                        <ProtectedRoute>
                          <MyReports />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/notifications"
                      element={
                        <ProtectedRoute>
                          <NotificationsPage />
                        </ProtectedRoute>
                      }
                    />
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute requireAdmin={true}>
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />
                    
                    <Route path="/about" element={<About />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <ToastContainer />
              </div>
            </BrowserRouter>
          </NotificationProvider>
        </LostFoundProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
