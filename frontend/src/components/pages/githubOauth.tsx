import { generateGithubToken } from "@/services/auth/auth";
import useAuthStore from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { Navigate, useSearchParams } from "react-router-dom";

const LoadingEllipsis = () => (
  <div className="flex  w-8 items-end gap-1 ">
    <div className="size-1 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
    <div className="size-1 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
    <div className="size-1 animate-bounce rounded-full bg-primary"></div>
  </div>
);
const AUTHENTICATION_STATUS_MESSAGE = {
  authenticated: (
    <div className="flex h-6 w-fit animate-fade-in items-end justify-center gap-1">
      <CheckCircle2 className="size-6  stroke-current" />
      <span className="inline-block h-full ">
        Authentication successful, redirecting
      </span>
      <LoadingEllipsis />
    </div>
  ),
  authenticating: (
    <div className="flex h-6 w-fit animate-fade-in items-center justify-center gap-1">
      <Loader2 className="size-6 animate-spin stroke-current" />
      <span>Authenticating, please wait</span>
    </div>
  ),

  unauthenticated: (
    <>
      <div className="flex h-6 w-fit animate-fade-in items-end justify-center gap-1">
        <X className="size-6  stroke-current" />
        <span className="inline-block h-full ">
          Authentication failed, redirecting to sign in
        </span>
        <LoadingEllipsis />
      </div>
    </>
  ),
};
function GithubRedirectPage() {
  const [searchParams] = useSearchParams();
  const ghCode = searchParams.get("code");
  const state = searchParams.get("state");
  const [githubOauthState] = useAuthStore((store) => [store.githubOauth]);
  const { data: validation, isPending: authenticating } = useQuery({
    queryFn: async () =>
      (await generateGithubToken({ code: ghCode || "" })).status
        ? "authenticated"
        : "unauthenticated",
    queryKey: ["github-oauth", ghCode],
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: 0,
    refetchOnMount: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    enabled: !!ghCode && !!state && !!githubOauthState[state],
  });

  if (validation === "authenticated" && state) {
    return <Navigate to={"/editor"} replace />;
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3  text-lg text-white">
      <div className="flex h-6 items-end justify-center  ">
        {AUTHENTICATION_STATUS_MESSAGE[validation || "authenticating"]}
      </div>
    </div>
  );
}

export default GithubRedirectPage;
