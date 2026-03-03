
import { z } from "zod";

export const PriorityEnum = z.enum(["low", "medium", "high", "critical"]);
export const StatusEnum = z.enum(["todo", "in_progress", "done", "blocked"]);

export const TaskBase = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional().default(""),
  priority: PriorityEnum.default("medium"),
  status: StatusEnum.default("todo"),
});

export const TaskCreateSchema = TaskBase;

export const TaskUpdateSchema = z.object({
  title: z.string().trim().min(1).optional(),
  description: z.string().trim().optional(),
  priority: PriorityEnum.optional(),
  status: StatusEnum.optional(),
});

export const TaskSchema = TaskBase.extend({
  id: z.string().uuid(),
  createdAt: z.string(), // ISO
  updatedAt: z.string(),
});

export type Priority = z.infer<typeof PriorityEnum>;
export type Status = z.infer<typeof StatusEnum>;
export type Task = z.infer<typeof TaskSchema>;
export type TaskCreate = z.infer<typeof TaskCreateSchema>;
export type TaskUpdate = z.infer<typeof TaskUpdateSchema>;
