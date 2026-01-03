'use client';

import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { ShieldAlert } from 'lucide-react';

function AdminContent() {
  const { user, isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="bg-rose-100 p-4 rounded-full inline-block mb-4">
            <ShieldAlert size={48} className="text-rose-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-600">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Admin Dashboard</h1>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Welcome, Admin</h2>
          <p className="text-slate-600 mb-4">
            You have access to administrative functions.
          </p>
          <p className="text-sm text-slate-500 mb-4">
            Signed in as: {user?.email}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
              <h3 className="font-bold text-indigo-900">Marketplace Management</h3>
              <p className="text-sm text-indigo-700 mt-1">Manage published notes and permissions.</p>
            </div>
            <div className="p-4 bg-slate-100 border border-slate-200 rounded-lg">
              <h3 className="font-bold text-slate-900">User Management</h3>
              <p className="text-sm text-slate-600 mt-1">View and manage registered users.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminContent />
    </ProtectedRoute>
  );
}
