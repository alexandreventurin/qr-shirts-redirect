import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { storage } from './utils/storage';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuth();
  return auth.isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  return storage.isAdminAuthenticated() ? <>{children}</> : <Navigate to="/admin" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/panel"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;