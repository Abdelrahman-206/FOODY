import { create } from 'zustand';

type AppStore = {
  hasOnboarded: boolean;
  isLoggedIn: boolean;
  userName: string;
  userEmail: string;
  setOnboarded: () => void;
  setLoggedIn: (name: string, email: string) => void;
  logout: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  hasOnboarded: false,
  isLoggedIn: false,
  userName: '',
  userEmail: '',
  setOnboarded: () => set({ hasOnboarded: true }),
  setLoggedIn: (name, email) => set({ isLoggedIn: true, userName: name, userEmail: email }),
  logout: () => set({ isLoggedIn: false, userName: '', userEmail: '' }),
}));
