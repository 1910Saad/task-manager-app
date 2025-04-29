
import React from 'react';
import { useTask } from '@/contexts/TaskContext';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';
import { Skeleton } from "@/components/ui/skeleton";

const TaskList: React.FC = () => {
  const { filteredTasks, isLoading } = useTask();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <TaskFilters />
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="mb-3">
            <Skeleton className="w-full h-24 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <TaskFilters />
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No tasks found</p>
          <p className="text-sm text-gray-400 mt-1">
            {filteredTasks.length === 0 ? 'Add a new task to get started!' : 'Try changing the filter'}
          </p>
        </div>
      ) : (
        <div>
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
