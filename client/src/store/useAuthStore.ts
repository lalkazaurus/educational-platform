import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../types/User';
import type { TokenData } from '../types/token-data';

interface AuthService {
  user: User | null;
  isAuthenticated: boolean;
  setLogin: (user: User, tokenData: TokenData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthService>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: !!localStorage.getItem("accessToken"),
      
      setLogin: (user, tokenData) => {
        localStorage.setItem("accessToken", tokenData.accessToken);
        localStorage.setItem("refreshToken", tokenData.refreshToken);
        
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => localStorage), 
      
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);