
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Check, Trash, Edit, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Task, useTask } from '@/contexts/TaskContext';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskCompletion, deleteTask, updateTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const handleSaveEdit = () => {
    updateTask(task.id, {
      title: editedTitle.trim(),
      description: editedDescription.trim(),
      priority: editedPriority
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedPriority(task.priority);
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className={cn(
      "task-card mb-3 overflow-hidden border-l-4 transition-all",
      task.isComplete ? "border-l-green-500 bg-gray-50" : `border-l-task-${task.priority}`
    )}>
      {isEditing ? (
        <CardContent className="p-4">
          <div className="space-y-3">
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Task title"
              className="font-medium"
            />
            
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Add description (optional)"
              rows={2}
            />
            
            <div className="flex space-x-2 items-center">
              <span className="text-sm text-gray-500">Priority:</span>
              <Select 
                value={editedPriority} 
                onValueChange={(value) => setEditedPriority(value as 'low' | 'medium' | 'high')}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button 
                size="sm"
                variant="outline"
                onClick={handleCancelEdit}
              >
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
              <Button 
                size="sm"
                onClick={handleSaveEdit}
                disabled={!editedTitle.trim()}
              >
                <Check className="h-4 w-4 mr-1" /> Save
              </Button>
            </div>
          </div>
        </CardContent>
      ) : (
        <>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Checkbox 
                id={`task-${task.id}`}
                checked={task.isComplete}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 
                    className={cn(
                      "font-medium text-lg mb-1 break-words", 
                      task.isComplete && "line-through text-gray-500"
                    )}
                  >
                    {task.title}
                  </h3>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                {task.description && (
                  <p 
                    className={cn(
                      "text-gray-700 whitespace-pre-wrap break-words", 
                      task.isComplete && "text-gray-400"
                    )}
                  >
                    {task.description}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between items-center border-t text-sm text-gray-500">
            <span>Created: {format(task.createdAt, 'MMM d, yyyy')}</span>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsEditing(true)} 
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => deleteTask(task.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default TaskItem;
