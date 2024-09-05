import { z } from 'zod';

export const orderProductUnitSchema = z.object({
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number'
  }).int().positive(),

  cost: z.number({
    required_error: 'Cost is required',
    invalid_type_error: 'Cost must be a number'
  }).positive(),

  productID: z.string({
    required_error: 'Product ID is required',
    invalid_type_error: 'Product ID must be a string'
  }).uuid(),

  productNumber: z.number({
    required_error: 'Product Number is required',
    invalid_type_error: 'Product Number must be a number'
  }).int()
});

export function validateOrderProductUnit(input) {
  return orderProductUnitSchema.safeParse(input);
}

export function validatePartialOrderProductUnit(input) {
  return orderProductUnitSchema.partial().safeParse(input);
}
