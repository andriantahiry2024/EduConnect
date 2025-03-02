import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "student" | "teacher" | "parent" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<User>;
  logout: () => void;
}

// This is a simple auth store using Zustand
// In a real app, you would connect this to your backend authentication system
export const useAuth = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string, role: UserRole) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock user data based on role
        const userData: Record<UserRole, User> = {
          student: {
            id: "student-1",
            email,
            name: "Alex Johnson",
            role: "student",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student1",
          },
          teacher: {
            id: "teacher-1",
            email,
            name: "Sarah Davis",
            role: "teacher",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1",
          },
          parent: {
            id: "parent-1",
            email,
            name: "Michael Johnson",
            role: "parent",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=parent1",
          },
          admin: {
            id: "admin-1",
            email,
            name: "Admin User",
            role: "admin",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin1",
          },
        };

        const user = userData[role];
        set({ user, isAuthenticated: true });
        return user;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "edusmart-auth",
    },
  ),
);

// Auth context provider for React components
export const getCurrentUser = (): User | null => {
  return useAuth.getState().user;
};

export const isAuthenticated = (): boolean => {
  return useAuth.getState().isAuthenticated;
};

export const login = (
  email: string,
  password: string,
  role: UserRole,
): Promise<User> => {
  return useAuth.getState().login(email, password, role);
};

export const logout = (): void => {
  useAuth.getState().logout();
};
