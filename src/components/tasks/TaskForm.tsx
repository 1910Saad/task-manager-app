
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useTask } from '@/contexts/TaskContext';
import { useForm } from '@/hooks/useForm';

type TaskFormValues = {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
};

const TaskForm: React.FC = () => {
  const { addTask } = useTask();
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  const validateForm = (values: TaskFormValues) => {
    const errors: Partial<Record<keyof TaskFormValues, string>> = {};
    
    if (!values.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!values.priority) {
      errors.priority = 'Priority is required';
    }
    
    return errors;
  };
  
  const { values, errors, handleChange, handleSubmit, resetForm, setValues } = useForm({
    initialValues: {
      title: '',
      description: '',
      priority: 'medium' as const
    },
    onSubmit: (values) => {
      addTask(values.title.trim(), values.description.trim(), values.priority);
      resetForm();
      setIsFormVisible(false);
    },
    validate: validateForm
  });

  const handlePriorityChange = (value: string) => {
    setValues({
      ...values,
      priority: value as 'low' | 'medium' | 'high'
    });
  };

  return (
    <div className="mb-6">
      {!isFormVisible ? (
        <Button 
          onClick={() => setIsFormVisible(true)}
          className="w-full"
        >
          Add New Task
        </Button>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md animate-fade-in">
          <h3 className="text-lg font-medium mb-4">Add New Task</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="What needs to be done?"
                value={values.title}
                onChange={handleChange}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Add details..."
                value={values.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={values.priority} 
                onValueChange={handlePriorityChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && (
                <p className="text-sm text-red-500">{errors.priority}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsFormVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                Add Task
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
