
import { NextFunction, Request, Response } from "express";
import { fail } from "../utils/response";

export function notFound(req: Request, res: Response) {
  return res
    .status(404)
    .json(fail("NOT_FOUND", `Route ${req.method} ${req.originalUrl} not found`));
}

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  console.error("Unhandled error:", err);
  const status = err?.status || 500;
  const message = status === 500 ? "Internal Server Error" : err.message ?? "Request failed";
  return res.status(status).json(fail("INTERNAL_ERROR", message));
}
