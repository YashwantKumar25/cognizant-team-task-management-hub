
import { Task, TaskCreate, TaskUpdate } from "@cognizant-team-task-management-hub/shared";
import { v4 as uuid } from "uuid";

const tasks = new Map<string, Task>();

export const tasksStore = {
  list: (q?: string): Task[] => {
    const all = Array.from(tasks.values());
    if (!q) return all;
    const query = q.toLowerCase();
    return all.filter((t) => t.title.toLowerCase().includes(query));
  },
  get: (id: string) => tasks.get(id),
  create: (input: TaskCreate): Task => {
    const now = new Date().toISOString();
    const task: Task = {
      id: uuid(),
      title: input.title,
      description: input.description || "",
      priority: input.priority,
      status: input.status,
      createdAt: now,
      updatedAt: now,
    };
    tasks.set(task.id, task);
    return task;
  },
  update: (id: string, patch: TaskUpdate): Task | undefined => {
    const existing = tasks.get(id);
    if (!existing) return undefined;
    const updated: Task = {
      ...existing,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    tasks.set(id, updated);
    return updated;
  },
  remove: (id: string): boolean => tasks.delete(id),
};
