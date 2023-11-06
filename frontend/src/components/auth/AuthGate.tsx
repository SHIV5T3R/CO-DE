import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import useAuthStore from "@/stores/authStore";

interface Props {
  children: ReactNode;
  required?: true;
  notRequired?: true;
}

function AuthGate({ children, required, notRequired }: Props) {
  if (!required && !notRequired) {
    throw new Error("Reached invalid state, need required or not required.");
  }
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  if (!user && required) {
    return (
      <Navigate to="/sign-in" state={{ from: location.pathname }} replace />
    );
  } else if (user && notRequired) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default AuthGate;
