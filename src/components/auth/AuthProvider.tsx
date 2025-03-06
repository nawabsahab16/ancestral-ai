import { useState, useEffect } from "react";
import { AuthContext, User } from "./AuthContext";
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';
import { supabase } from "@/lib/supabase";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("AuthProvider initializing...");
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        
        if (session) {
          console.log("Session found", session.user.id);
          const userData: User = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata.name || "",
          };
          setUser(userData);
        } else {
          console.log("No session");
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    const initializeAuth = async () => {
      try {
        console.log("Getting initial session...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          setError(sessionError.message);
          setIsLoading(false);
          return;
        }
        
        if (session) {
          console.log("Initial session found", session.user.id);
          const userData: User = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata.name || "",
          };
          setUser(userData);
        } else {
          console.log("No initial session");
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Auth initialization error:", err);
        setError(err instanceof Error ? err.message : "Failed to initialize authentication");
        setIsLoading(false);
      }
    };
    
    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Login error:", error);
        throw new Error(error.message);
      }
      
      if (!data.user) {
        throw new Error("Login failed");
      }
      
      console.log("Login successful");
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (!data.user) {
        throw new Error("Signup failed");
      }
      
      toast.success("Account created successfully. Check your email for verification.");
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
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (error && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md max-w-md w-full">
          <h2 className="text-lg font-semibold mb-2">Authentication Error</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm">
            Please check your Supabase configuration and try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
