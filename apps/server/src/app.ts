
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { tasksRouter } from "./routes/tasks";
import { errorHandler, notFound } from "./middleware/error";
import { ok } from "./utils/response";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(express.json());

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "X-Task-Auth"],
    })
  );

  app.get("/health", (_req, res) => res.json(ok({ status: "ok", version: "1.0.0" })));

  app.use("/api/tasks", tasksRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
