import { z } from 'zod';

const cartItemSchema = z.object({
  
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number'
  }).int().positive(),

  productID: z.string({
    required_error: 'Product ID is required',
    invalid_type_error: 'Product ID must be a string'
  }).refine(val => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(val), { // Hay que tener en cuenta los guiones
    message: 'Product ID must be a valid UUID'
  }),

  productNumber: z.number({
    required_error: 'Product Number is required',
    invalid_type_error: 'Product Number must be a number'
  }).int(),
});

export function validateCartItem(input) {
  return cartItemSchema.safeParse(input);
}

export function validatePartialCartItem(input) {
  return cartItemSchema.partial().safeParse(input);
}
