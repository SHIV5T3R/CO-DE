// User Data Store (Zustand)
// This is a store to hold the user data and provide a method to update it.
// Obviously, feel free to remove these comments before you push to production.
import { create } from "zustand";

interface UserStore {
  user: null | { id: number; username: string; email: string };
  login: (user: { username: string; password: string }) => Promise<void>;
  register: (user: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  login: async (user) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        set({ user: data });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  },
  register: async (user) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.ok) {
        set({ user: data });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Registering user process failed:", error);
    }
  },
  logout: async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      const data = await response.json();
      if (response.ok) {
        set({ user: null });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },
}));

export default useUserStore;
