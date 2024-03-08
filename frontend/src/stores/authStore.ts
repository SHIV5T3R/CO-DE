import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/services/auth/types";

interface UserState {
  user: User | null;
}

interface Actions {
  setUser: (user: User) => void;
  resetUser: () => void;
  githubOauth: {
    [antiCSRF: string]: {
      expiresAt: number;
    };
  };
  setGithubOauth: () => void;
}

const useAuthStore = create<UserState & Actions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      resetUser: () => set({ user: null }),
      githubOauth: {},
      setGithubOauth: () => {
        const antiCSRF = crypto.randomUUID();
        const expiresAt = Date.now() + 1000 * 60 * 15; // 15 minutes
        const ghLoginUrl = import.meta.env.VITE_GITHUB_AUTHORIZE_URL;
        const ghClientId = import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID;
        // create url with query params of client_id and state using urlSearchParams
        const url = new URL(ghLoginUrl);
        const params = new URLSearchParams(url.search);
        const credentials = {
          client_id: ghClientId,
          state: antiCSRF,
          scope: "repo",
        };
        Object.entries(credentials).forEach(([key, value]) => {
          params.set(key, value);
        });

        set({
          githubOauth: {
            [antiCSRF]: {
              expiresAt,
            },
          },
        });

        window.location.replace(`${ghLoginUrl}?${params.toString()}`);
      },
    }),

    {
      name: "code_auth_store",
    }
  )
);

export default useAuthStore;
