
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './AuthContext';

// Task type definition
export type Task = {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  userId: string;
};

type TaskFilter = 'all' | 'active' | 'completed';

type TaskContextType = {
  tasks: Task[];
  filteredTasks: Task[];
  isLoading: boolean;
  currentFilter: TaskFilter;
  addTask: (title: string, description: string, priority: Task['priority']) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>) => void;
  setFilter: (filter: TaskFilter) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Sample tasks for demonstration
const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project setup',
    description: 'Set up the project structure and install dependencies',
    isComplete: true,
    priority: 'high',
    createdAt: new Date('2023-04-10'),
    userId: '1' 
  },
  {
    id: '2',
    title: 'Create authentication flow',
    description: 'Implement user registration and login',
    isComplete: false,
    priority: 'high',
    createdAt: new Date('2023-04-12'),
    userId: '1'
  },
  {
    id: '3',
    title: 'Design task interface',
    description: 'Create UI for task management',
    isComplete: false,
    priority: 'medium',
    createdAt: new Date('2023-04-15'),
    userId: '1'
  },
  {
    id: '4',
    title: 'Implement task filtering',
    description: 'Add ability to filter tasks by status',
    isComplete: false,
    priority: 'low',
    createdAt: new Date('2023-04-18'),
    userId: '2'
  },
  {
    id: '5',
    title: 'Add task priorities',
    description: 'Implement priority levels for tasks',
    isComplete: false,
    priority: 'medium',
    createdAt: new Date('2023-04-20'),
    userId: '2'
  }
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load tasks when the component mounts or user changes
  useEffect(() => {
    const loadTasks = () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call to fetch tasks
        const storedTasks = localStorage.getItem('taskapp_tasks');
        
        // If no stored tasks, use sample data for demo purposes
        if (!storedTasks) {
          localStorage.setItem('taskapp_tasks', JSON.stringify(sampleTasks));
          setTasks(sampleTasks);
        } else {
          // Parse stored tasks and convert date strings back to Date objects
          const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt)
          }));
          setTasks(parsedTasks);
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        toast({
          title: 'Error',
          description: 'Failed to load tasks',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      loadTasks();
    } else {
      setTasks([]);
      setIsLoading(false);
    }
  }, [user, toast]);

  // Apply filter when tasks or currentFilter changes
  useEffect(() => {
    if (!user) {
      setFilteredTasks([]);
      return;
    }
    
    // Filter by user ID first
    const userTasks = tasks.filter(task => task.userId === user.id);
    
    // Then apply status filter
    switch(currentFilter) {
      case 'active':
        setFilteredTasks(userTasks.filter(task => !task.isComplete));
        break;
      case 'completed':
        setFilteredTasks(userTasks.filter(task => task.isComplete));
        break;
      case 'all':
      default:
        setFilteredTasks(userTasks);
    }
  }, [tasks, currentFilter, user]);

  const saveTasksToStorage = (updatedTasks: Task[]) => {
    localStorage.setItem('taskapp_tasks', JSON.stringify(updatedTasks));
  };

  const addTask = (title: string, description: string, priority: Task['priority']) => {
    if (!user) return;
    
    try {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        isComplete: false,
        priority,
        createdAt: new Date(),
        userId: user.id
      };
      
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasksToStorage(updatedTasks);
      
      toast({
        title: 'Task added',
        description: `"${title}" has been added to your tasks`
      });
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: 'Error',
        description: 'Failed to add task',
        variant: 'destructive'
      });
    }
  };

  const toggleTaskCompletion = (id: string) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      );
      
      setTasks(updatedTasks);
      saveTasksToStorage(updatedTasks);
      
      const taskTitle = tasks.find(task => task.id === id)?.title;
      const isNowComplete = updatedTasks.find(task => task.id === id)?.isComplete;
      
      toast({
        title: isNowComplete ? 'Task completed' : 'Task reopened',
        description: `"${taskTitle}" has been ${isNowComplete ? 'marked as complete' : 'reopened'}`
      });
    } catch (error) {
      console.error('Error toggling task completion:', error);
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive'
      });
    }
  };

  const deleteTask = (id: string) => {
    try {
      const taskToDelete = tasks.find(task => task.id === id);
      const updatedTasks = tasks.filter(task => task.id !== id);
      
      setTasks(updatedTasks);
      saveTasksToStorage(updatedTasks);
      
      toast({
        title: 'Task deleted',
        description: `"${taskToDelete?.title}" has been deleted`
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete task',
        variant: 'destructive'
      });
    }
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'userId' | 'createdAt'>>) => {
    try {
      const updatedTasks = tasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      );
      
      setTasks(updatedTasks);
      saveTasksToStorage(updatedTasks);
      
      toast({
        title: 'Task updated',
        description: `Task has been updated successfully`
      });
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: 'Error',
        description: 'Failed to update task',
        variant: 'destructive'
      });
    }
  };

  const setFilter = (filter: TaskFilter) => {
    setCurrentFilter(filter);
  };

  return (
    <TaskContext.Provider 
      value={{ 
        tasks,
        filteredTasks,
        isLoading,
        currentFilter, 
        addTask, 
        toggleTaskCompletion, 
        deleteTask,
        updateTask,
        setFilter
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
