
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

type User = {
  id: string;
  email: string;
  name: string;
}

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored auth data on component mount
    const storedToken = localStorage.getItem('taskapp_token');
    const storedUser = localStorage.getItem('taskapp_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      if (email === 'demo@example.com' && password === 'password') {
        // Mock successful login
        const mockUser = { 
          id: '1', 
          email: 'demo@example.com', 
          name: 'Demo User' 
        };
        const mockToken = 'mock-jwt-token';
        
        localStorage.setItem('taskapp_token', mockToken);
        localStorage.setItem('taskapp_user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setToken(mockToken);
        
        toast({
          title: 'Login successful',
          description: `Welcome back, ${mockUser.name}!`,
        });
      } else if (email === 'admin@example.com' && password === 'password') {
        // Mock admin login
        const mockUser = { 
          id: '2', 
          email: 'admin@example.com', 
          name: 'Admin User' 
        };
        const mockToken = 'mock-admin-jwt-token';
        
        localStorage.setItem('taskapp_token', mockToken);
        localStorage.setItem('taskapp_user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setToken(mockToken);
        
        toast({
          title: 'Login successful',
          description: `Welcome back, ${mockUser.name}!`,
        });
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: 'An error occurred during login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call to create a user
      // For this demo, we'll simulate a successful registration
      const mockUser = { 
        id: (Math.random() * 1000).toFixed(0), 
        email, 
        name 
      };
      const mockToken = 'mock-jwt-token-new-user';
      
      localStorage.setItem('taskapp_token', mockToken);
      localStorage.setItem('taskapp_user', JSON.stringify(mockUser));
      
      setUser(mockUser);
      setToken(mockToken);
      
      toast({
        title: 'Registration successful',
        description: `Welcome, ${name}!`,
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: 'An error occurred during registration',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('taskapp_token');
    localStorage.removeItem('taskapp_user');
    setUser(null);
    setToken(null);
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        isLoading, 
        isAuthenticated: !!user, 
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
