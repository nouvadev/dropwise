import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import React from 'react';
import { useIsHydrated } from '@/hooks/useIsHydrated';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useIsHydrated();

  // While the store is rehydrating, don't render anything or show a loader.
  // This prevents the premature redirect.
  if (!isHydrated) {
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-background">
            <Loader2 className="h-10 w-10 animate-spin text-terracotta" />
        </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 