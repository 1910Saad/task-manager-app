
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { TaskProvider } from '@/contexts/TaskContext';
import AppLayout from '@/components/layout/AppLayout';
import TaskForm from '@/components/tasks/TaskForm';
import TaskList from '@/components/tasks/TaskList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppLayout>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Task Management</h1>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>My Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskForm />
                <TaskList />
              </CardContent>
            </Card>
          </div>
        </AppLayout>
      </TaskProvider>
    </AuthProvider>
  );
};

export default Index;
