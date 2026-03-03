
import React, { useState } from 'react';
import { useCreateTaskMutation } from './tasksApi';
import { TaskCreateSchema, PriorityEnum, StatusEnum } from '@cognizant-team-task-management-hub/shared';

export default function TaskForm() {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', status: 'todo' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = TaskCreateSchema.safeParse(form);
    if (!parsed.success) {
      alert(parsed.error.errors.map((e) => e.message).join(''));
      return;
    }
    await createTask(parsed.data).unwrap();
    setForm({ title: '', description: '', priority: 'medium', status: 'todo' });
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3 className="mb-3 text-lg font-semibold">Create Task</h3>
      <div className="grid gap-3">
        <input
          className="input"
          placeholder="Title *"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="textarea"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
        />
        <div className="flex gap-3">
          <select
            className="select"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            aria-label="Priority"
          >
            {PriorityEnum.options.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select
            className="select"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            aria-label="Status"
          >
            {StatusEnum.options.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={isLoading || !form.title.trim()} className="btn">
          {isLoading ? 'Saving...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}
