
import React from 'react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">TaskMaster</span>
          <span className="hidden sm:inline-block text-gray-500 text-xs px-2 py-1 rounded-full border">v1.0</span>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm hidden sm:block">
              Welcome, <span className="font-medium">{user.name}</span>
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
