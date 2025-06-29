import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isAdmin, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/admin/login");
      return;
    }

    if (!isAdmin) {
      setLocation("/");
      return;
    }
  }, [isAuthenticated, isAdmin, setLocation]);

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-pulse">Checking authentication...</div>
      </div>
    );
  }

  return <>{children}</>;
}
