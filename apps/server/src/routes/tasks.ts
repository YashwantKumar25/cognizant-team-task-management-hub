
import { Router, Request, Response } from "express";
import { tasksStore } from "../store/tasksStore";
import { TaskCreateSchema, TaskUpdateSchema } from "@cognizant-team-task-management-hub/shared";
import { validateBody } from "../middleware/validate";
import { ok, fail } from "../utils/response";

export const tasksRouter = Router();

// GET /api/tasks?q=searchTerm
tasksRouter.get("/", (req: Request, res: Response) => {
  const q = (req.query.q as string | undefined) ?? undefined;
  return res.json(ok(tasksStore.list(q)));
});

// POST /api/tasks
tasksRouter.post("/", validateBody(TaskCreateSchema), (req: Request, res: Response) => {
  const body = (req as any).validatedBody;
  const created = tasksStore.create(body);
  return res.status(201).json(ok(created));
});

// PATCH /api/tasks/:id
tasksRouter.patch("/:id", validateBody(TaskUpdateSchema), (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = tasksStore.update(id, (req as any).validatedBody);
  if (!updated) return res.status(404).json(fail("TASK_NOT_FOUND", "Task not found"));
  return res.json(ok(updated));
});

// DELETE /api/tasks/:id (protected)
tasksRouter.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const token = req.header("X-Task-Auth");
  if (!token || token !== process.env.DELETE_TOKEN) {
    return res
      .status(403)
      .json(fail("UNAUTHORIZED", "Missing or invalid deletion authorization header"));
  }
  const existed = tasksStore.get(id);
  if (!existed) return res.status(404).json(fail("TASK_NOT_FOUND", "Task not found"));
  tasksStore.remove(id);
  return res.json(ok({ id }));
});
