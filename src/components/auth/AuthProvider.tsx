import { useState, useEffect } from "react";
import { AuthContext, User } from "./AuthContext";
import { toast } from "sonner";

const USERS_STORAGE_KEY = "auth_users";
const CURRENT_USER_KEY = "current_user";


const getStoredUsers = (): Record<string, User & { password: string }> => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : {};
};

const saveUsers = (users: Record<string, User & { password: string }>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};


const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};


const saveCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCurrentUser();
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {

      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = getStoredUsers();
      const foundUser = Object.values(users).find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      const { password: _, ...cleanUser } = foundUser;
      setUser(cleanUser);
      saveCurrentUser(cleanUser);
      
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = getStoredUsers();

      if (Object.values(users).some(u => u.email === email)) {
        throw new Error("User with this email already exists");
      }
 
      const id = Date.now().toString();
      const newUser = { id, email, name, password };
      
   
      users[id] = newUser;
      saveUsers(users);
    
      const { password: _, ...cleanUser } = newUser;
      setUser(cleanUser);
      saveCurrentUser(cleanUser);
      
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Signup failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      saveCurrentUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
