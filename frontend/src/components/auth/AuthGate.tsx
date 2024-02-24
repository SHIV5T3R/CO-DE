import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getServerSession } from "@/services/auth/auth";

interface Props {
  children: ReactNode;
  required?: true;
}

function AuthGate({ children, required }: Props) {
  const location = useLocation();
  const { data: authState, isPending: isAuthenticating } = useQuery({
    queryKey: ["user-session"],
    queryFn: async () => {
      const session = await getServerSession();
      return {
        status: session.status ? "authenticated" : "unauthenticated",
        username: session.username,
      };
    },

    retry: 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    enabled: required,
  });
  if (required) {
    return isAuthenticating ||
      authState === undefined ? null : authState.status ===
      "unauthenticated" ? (
      <Navigate to="/sign-in" replace />
    ) : (
      <>{children}</>
    );
  }
  // if already authenticated, going to /sign-in should redirect to /editor
  if (
    location.pathname === "/sign-in" &&
    authState?.status === "authenticated"
  ) {
    return <Navigate to="/editor" replace />;
  }

  return <>{children}</>;
}

export default AuthGate;
