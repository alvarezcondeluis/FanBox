import { z } from 'zod';

const productSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string'
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string'
  }),
  sport: z.string({
    required_error: 'Sport is required',
    invalid_type_error: 'Sport must be a string'
  }),
  brand: z.string({
    required_error: 'Brand is required',
    invalid_type_error: 'Brand must be a string'
  }),
  releaseDate: z.string({
    required_error: 'Release date is required',
    invalid_type_error: 'Release date must be a string'
  }).refine(val => !isNaN(Date.parse(val)), {
    message: 'Release date must be a valid date'
  }),
  isActive: z.boolean({
    required_error: 'isActive is required',
    invalid_type_error: 'isActive must be a boolean'
  }).transform(val => val ? 1 : 0), // Transformar si es necesario
  categoryID: z.number({
    required_error: 'Category ID is required',
    invalid_type_error: 'Category ID must be a number'
  }),
  teamID: z.number({
    invalid_type_error: 'Team ID must be a number'
  }).optional(), // Opcional, ya que puede ser null
});

export function validateProduct(input) {
  return productSchema.safeParse(input);
}

export function validatePartialProduct(input) {
  return productSchema.partial().safeParse(input);
}
