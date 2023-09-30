import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuthStore from "@/stores/authStore";

interface Props {
  children: ReactNode;
}

function AuthGate({ children }: Props) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  return user ? (
    children
  ) : (
    <Navigate to="/sign-in" state={{ from: location.pathname }} replace />
  );
}

export default AuthGate;
