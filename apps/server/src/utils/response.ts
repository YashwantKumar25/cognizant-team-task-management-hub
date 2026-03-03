
import { ApiError, ApiSuccess } from "../types";

export const ok = <T>(data: T): ApiSuccess<T> => ({ success: true, data });

export const fail = (code: string, message: string, details?: unknown): ApiError => ({
  success: false,
  error: { code, message, details },
});
