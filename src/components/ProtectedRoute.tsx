import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PageSkeleton from "./PageSkeleton";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <PageSkeleton />;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
