
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// Define types
export interface User {
  id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  points: number;
  level: number;
  joinDate: Date;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Mock user data for demo
const MOCK_USERS = [
  {
    id: "1",
    username: "student",
    email: "student@example.com",
    password: "password",
    role: "user",
    points: 1250,
    level: 5,
    joinDate: new Date("2023-01-15"),
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=student"
  },
  {
    id: "2",
    username: "admin",
    email: "admin@example.com",
    password: "password",
    role: "admin",
    points: 9999,
    level: 50,
    joinDate: new Date("2022-06-01"),
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=admin"
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("engiquest_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        parsedUser.joinDate = new Date(parsedUser.joinDate);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("engiquest_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem("engiquest_user", JSON.stringify(userWithoutPassword));
      
      toast.success(`Welcome back, ${userWithoutPassword.username}!`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error("Email already in use");
      }

      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        role: "user" as const,
        points: 0,
        level: 1,
        joinDate: new Date(),
        avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${username}`
      };

      setUser(newUser);
      localStorage.setItem("engiquest_user", JSON.stringify(newUser));

      toast.success("Account created successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("engiquest_user");
    toast.info("You have been logged out");
  };

  const updateUser = (userData: Partial<User>): void => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("engiquest_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
