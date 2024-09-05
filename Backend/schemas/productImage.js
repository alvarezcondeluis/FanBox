import { z } from 'zod';

const productImageSchema = z.object({
  
  url: z.string({
    required_error: 'URL is required',
    invalid_type_error: 'URL must be a string'
  }).url('Invalid URL'),

  description: z.string().optional(),

  isMain: z.boolean({
    required_error: 'isMain is required',
    invalid_type_error: 'isMain must be a boolean'
  }).transform(val => val ? 1: 0),

 
});

export function validateProductImage(input) {
  return productImageSchema.safeParse(input);
}

export function validatePartialProductImage(input) {
  return productImageSchema.partial().safeParse(input);
}
