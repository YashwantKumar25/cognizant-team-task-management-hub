
import React, { useState } from 'react';
import { useListTasksQuery } from './tasksApi';
import TaskCard from '../../components/TaskCard';
import { useDebouncedValue } from "../../hooks/useDebouncedValue";

export default function TaskList() {
  const [search, setSearch] = useState('');

  // Debounce the search text
  const debounced = useDebouncedValue(search, 300);
  const { data, isFetching, isError, refetch } = useListTasksQuery({ q: debounced });
  // const { data, isFetching, isError, refetch } = useListTasksQuery({ q: search });

  return (
    <div>
      <div className="mb-2 flex gap-2">
        <input
          className="input"
          placeholder="Search tasks by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => refetch()} className="btn-outline">Refresh</button>
      </div>

      {isFetching && <p className="text-sm text-gray-600">Loading tasks…</p>}
      {isError && <p className="text-sm text-red-600">Failed to load tasks.</p>}

      <div className="grid gap-3">
        {data?.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
        {data?.length === 0 && <p className="text-sm text-gray-600">No tasks found.</p>}
      </div>
    </div>
  );
}
