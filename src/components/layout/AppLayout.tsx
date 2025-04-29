
import React from 'react';
import Header from './Header';
import { useAuth } from '@/contexts/AuthContext';
import AuthRouter from '../auth/AuthRouter';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <AuthRouter />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-white border-t py-4">
        <div className="container max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
          TaskMaster &copy; {new Date().getFullYear()} - Your Productivity Partner
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
