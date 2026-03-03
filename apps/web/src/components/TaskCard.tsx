
import React, { useState } from 'react';
import { useDeleteTaskMutation, useUpdateTaskMutation } from '../features/tasks/tasksApi';
import type { Task } from '@cognizant-team-task-management-hub/shared';
import StatusBadge from './StatusBadge';

export default function TaskCard({ task }: { task: Task }) {
  const [updateTask, { isLoading: updating }] = useUpdateTaskMutation();
  const [deleteTask, { isLoading: deleting }] = useDeleteTaskMutation();
  const [editTitle, setEditTitle] = useState(task.title);

  async function toggleDone() {
    await updateTask({ id: task.id, patch: { status: task.status === 'done' ? 'todo' : 'done' } });
  }

  async function saveTitle() {
    const trimmed = editTitle.trim();
    if (!trimmed) return;
    await updateTask({ id: task.id, patch: { title: trimmed } });
  }

  return (
    <div className="card">
      <div className="mb-2 flex items-center justify-between gap-3">
        <input className="input" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} onBlur={saveTitle} />
        <StatusBadge status={task.status} />
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">{task.description || '—'}</p>

      <div className="mt-3 flex items-center justify-between">
        <small className="text-gray-600 dark:text-gray-300">
          Priority: <b className="capitalize">{task.priority}</b>
        </small>
        <div className="flex gap-2">
          <button onClick={toggleDone} disabled={updating} className="btn-outline">
            {task.status === 'done' ? 'Mark Todo' : 'Mark Done'}
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            disabled={deleting}
            className="btn bg-red-600 hover:bg-red-700"
            title="Protected: requires X-Task-Auth"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
