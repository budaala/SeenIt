import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean;
  username: string | null;
  setUser: (username: string) => void;
  logOut: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  username: null,
  setUser: (username) => set({ isLoggedIn: true, username }),
  logOut: () => set({ isLoggedIn: false, username: null }),
}));