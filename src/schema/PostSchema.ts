import { z } from 'zod';

const PostSchema = z.object({
  history: z.array(z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }).min(3, {
      message: 'Title must be 3 or more characters long',
    }),
    body: z.string({
      invalid_type_error: 'Title must be a string',
    }).optional(),
    updatedAt: z.preprocess((arg) => {
      if (typeof arg == 'string' || arg instanceof Date) return new Date(arg);
    }, z.date()),
  }))});

type Post = z.infer<typeof PostSchema>;

interface ITestPost extends Post {
  id: string,
}

export {
  ITestPost,
  Post,
  PostSchema,
};
