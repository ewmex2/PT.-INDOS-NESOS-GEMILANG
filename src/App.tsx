import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { useAdminStore } from './store/adminStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAdmin = useAdminStore((state) => state.isAdmin);
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  const loadContent = useAdminStore((state) => state.loadContent);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
