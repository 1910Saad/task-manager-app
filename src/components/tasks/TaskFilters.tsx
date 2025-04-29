
import React from 'react';
import { Button } from "@/components/ui/button";
import { useTask } from '@/contexts/TaskContext';

const TaskFilters: React.FC = () => {
  const { currentFilter, setFilter, filteredTasks } = useTask();
  
  return (
    <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-2">
      <div className="flex gap-2">
        <Button 
          variant={currentFilter === 'all' ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={currentFilter === 'active' ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button 
          variant={currentFilter === 'completed' ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>
      <p className="text-sm text-gray-500">
        {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default TaskFilters;
