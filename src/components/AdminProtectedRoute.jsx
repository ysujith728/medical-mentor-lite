import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';
import api from '../services/apiService';

const AdminProtectedRoute = () => {
  const { user, loading } = useAuthStore();
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const checkRole = async () => {
      if (user) {
        try {
          // We can determine admin status by making a lightweight protected call, 
          // or we can fetch the profile explicitly if it includes the role.
          // Because user state from Supabase doesn't natively have our Prisma Role,
          // we check via the /api/dashboard/profile endpoint (which we should ensure returns role).
          
          const res = await api.get('/dashboard/profile');
          if (isMounted) setIsAdmin(res.data.role === 'ADMIN');
        } catch (error) {
          if (isMounted) setIsAdmin(false);
        }
      }
    };

    if (!loading) {
      if (!user) setIsAdmin(false);
      else checkRole();
    }
    
    return () => { isMounted = false; };
  }, [user, loading]);

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return isAdmin ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AdminProtectedRoute;
