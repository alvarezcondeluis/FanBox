import { z } from 'zod';

const categorySchema = z.object({
  name: z.string({
    required_error: 'Category name is required',
    invalid_type_error: 'Category name must be a string'
  })
});

export function validateCategory(input) {
  return categorySchema.safeParse(input);
}

export function validatePartialCategory(input) {
  return categorySchema.partial().safeParse(input);
}
