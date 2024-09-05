import { z } from 'zod';

const productUnitSchema = z.object({

  stock: z.number({
    required_error: 'Stock is required',
    invalid_type_error: 'Stock must be a number'
  }).int().positive(),

  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number'
  }).positive(),

  weight: z.number({
    required_error: 'Weight is required',
    invalid_type_error: 'Weight must be a number'
  }).positive(),

  size: z.enum(['XS', 'S', 'M', 'L', 'XL'], {
    invalid_type_error: 'Invalid size'
  }).optional()
});

export function validateProductUnit(input) {
  return productUnitSchema.safeParse(input);
}

export function validatePartialProductUnit(input) {
  return productUnitSchema.partial().safeParse(input);
}
