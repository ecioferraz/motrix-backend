import { ZodError } from 'zod';

export interface IServiceError {
  error: ZodError,
}
