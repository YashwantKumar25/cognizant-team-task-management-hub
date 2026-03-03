
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { fail } from "../utils/response";

export const validateBody =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json(fail("VALIDATION_ERROR", "Invalid request body", parsed.error.flatten()));
    }
    (req as any).validatedBody = parsed.data;
    next();
  };
