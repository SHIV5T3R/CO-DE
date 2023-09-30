import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/services/auth/types";

interface UserState {
  user: User | null;
}

interface Actions {
  setUser: (user: User) => void;
  resetuser: () => void;
}

const useAuthStore = create<UserState & Actions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      resetuser: () => set({ user: null }),
    }),
    {
      name: "code_auth_store",
    }
  )
);

export default useAuthStore;
