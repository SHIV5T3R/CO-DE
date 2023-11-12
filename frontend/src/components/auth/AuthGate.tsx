import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuthStore from "@/stores/authStore";

interface Props {
  children: ReactNode;
  required?: true;
}

function AuthGate({ children, required }: Props) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  if (!user && required) {
    return (
      <Navigate to="/sign-in" state={{ from: location.pathname }} replace />
    );
  } else if (user && !required) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default AuthGate;
